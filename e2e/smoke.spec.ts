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

test("light hero: submit clears cookie banner at 1440", async ({ page }, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop-1440",
    "desktop layout only",
  );
  await page.goto("/");
  await page.evaluate(() => window.scrollTo(0, 0));
  const accept = page.getByRole("button", { name: /^accept$/i });
  await expect(accept).toBeVisible();
  const submit = page
    .locator("#quote")
    .getByRole("button", { name: /send quote request/i });
  await expect(submit).toBeVisible();
  const submitBox = await submit.boundingBox();
  const bannerBox = await accept.boundingBox();
  expect(submitBox).not.toBeNull();
  expect(bannerBox).not.toBeNull();
  const submitBottom = (submitBox?.y ?? 0) + (submitBox?.height ?? 0);
  expect(submitBottom).toBeLessThan(bannerBox?.y ?? 900);
  const privacy = page.locator("#quote").getByRole("link", { name: /privacy notice/i });
  await expect(privacy).toBeVisible();
  const privacyBox = await privacy.boundingBox();
  expect(privacyBox).not.toBeNull();
  const privacyBottom = (privacyBox?.y ?? 0) + (privacyBox?.height ?? 0);
  expect(privacyBottom).toBeLessThan(bannerBox?.y ?? 900);
  await expect(
    page.locator("#quote").getByRole("heading", { name: /get a free quote/i }),
  ).toBeVisible();
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
