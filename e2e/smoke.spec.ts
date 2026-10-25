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

test("homepage loads and quote form visible", async ({ page }) => {
  await page.goto("/");
  await acceptCookies(page);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator("#quote").getByRole("heading")).toBeVisible();
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
