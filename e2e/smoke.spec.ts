import { test, expect } from "@playwright/test";

async function acceptCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: /^accept$/i });
  if (await accept.isVisible()) {
    await accept.click();
  }
}

async function readCls(page: import("@playwright/test").Page): Promise<number> {
  return page.evaluate(async () => {
    return new Promise<number>((resolve) => {
      let cls = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const shift = entry as PerformanceEntry & {
            value?: number;
            hadRecentInput?: boolean;
          };
          if (shift.hadRecentInput) continue;
          if (typeof shift.value === "number") cls += shift.value;
        }
      });
      observer.observe({ type: "layout-shift", buffered: true });
      window.setTimeout(() => {
        observer.disconnect();
        resolve(cls);
      }, 2500);
    });
  });
}

test("homepage loads and quote form visible", async ({ page }, testInfo) => {
  await page.goto("/");
  await acceptCookies(page);
  await expect(page.locator("html")).toHaveAttribute("data-home-hero", "light-van");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  const quote = page.locator("#quote");
  await expect(quote.getByRole("textbox", { name: /^name$/i })).toBeVisible();
  if (testInfo.project.name === "desktop-1440") {
    await expect(
      quote.getByRole("heading", { name: /get a free quote/i }),
    ).toBeVisible();
  }
});

async function cookieBannerTop(
  page: import("@playwright/test").Page,
): Promise<number> {
  const accept = page.getByRole("button", { name: /^accept$/i });
  await expect(accept).toBeVisible();
  const box = await accept.boundingBox();
  return box?.y ?? 900;
}

async function assertFocusClearsBanner(
  page: import("@playwright/test").Page,
  target: import("@playwright/test").Locator,
) {
  await target.focus();
  await page.waitForTimeout(150);
  const box = await target.boundingBox();
  expect(box).not.toBeNull();
  const bannerTop = await cookieBannerTop(page);
  expect(box!.y + box!.height).toBeLessThanOrEqual(bannerTop + 1);
}

async function assertFocusFullyInViewport(
  page: import("@playwright/test").Page,
  target: import("@playwright/test").Locator,
) {
  await target.focus();
  await page.waitForTimeout(150);
  const box = await target.boundingBox();
  const vh = page.viewportSize()?.height ?? 900;
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(-1);
  expect(box!.y + box!.height).toBeLessThanOrEqual(vh + 1);
}

test("light hero: quote controls clear cookie banner when focused", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1440",
    "desktop layout only",
  );
  await page.goto("/");
  const quote = page.locator("#quote");
  const fields = [
    quote.getByRole("textbox", { name: /^name$/i }),
    quote.getByRole("textbox", { name: /^phone$/i }),
    quote.getByRole("textbox", { name: /^email$/i }),
    quote.getByRole("textbox", { name: /^postcode$/i }),
    quote.locator('select[name="jobType"]'),
    quote.getByRole("textbox", { name: /what needs clearing/i }),
    quote.getByRole("button", { name: /send quote request/i }),
    quote.getByRole("link", { name: /privacy notice/i }),
  ];
  for (const field of fields) {
    await assertFocusClearsBanner(page, field);
  }
});

test("light hero: quote controls fully visible when banner closed", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1440",
    "desktop layout only",
  );
  await page.goto("/");
  await acceptCookies(page);
  const quote = page.locator("#quote");
  const fields = [
    quote.getByRole("textbox", { name: /^name$/i }),
    quote.getByRole("textbox", { name: /^phone$/i }),
    quote.getByRole("textbox", { name: /^email$/i }),
    quote.getByRole("textbox", { name: /^postcode$/i }),
    quote.locator('select[name="jobType"]'),
    quote.getByRole("textbox", { name: /what needs clearing/i }),
    quote.getByRole("button", { name: /send quote request/i }),
    quote.getByRole("link", { name: /privacy notice/i }),
  ];
  for (const field of fields) {
    await assertFocusFullyInViewport(page, field);
  }
});

test("homepage quote form does not shift after load (CLS)", async ({ page }) => {
  await page.goto("/");
  const quote = page.locator("#quote");
  await quote.waitFor({ state: "visible" });
  const first = await quote.boundingBox();
  await page.waitForTimeout(800);
  const second = await quote.boundingBox();
  expect(first?.y).toBeCloseTo(second?.y ?? 0, 0);
  const cls = await readCls(page);
  expect(cls).toBeLessThan(0.01);
});

test("services hub links to a service page", async ({ page }) => {
  await page.goto("/services");
  await acceptCookies(page);
  await page.getByRole("link", { name: /house clearance/i }).first().click();
  await expect(page).toHaveURL(/house-clearance/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("areas and legal pages respond", async ({ page }) => {
  await page.goto("/areas/stockport");
  await acceptCookies(page);
  await expect(
    page.getByRole("heading", {
      name: /Waste clearance in Stockport/i,
    }),
  ).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: /privacy/i })).toBeVisible();
});
