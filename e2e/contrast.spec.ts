import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const innerPages = [
  "/",
  "/terms",
  "/privacy",
  "/cookies",
  "/areas",
  "/services/house-clearance",
  "/areas/stockport",
] as const;

test.describe("color contrast (light-van)", () => {
  for (const path of innerPages) {
    test(`axe color-contrast on ${path}`, async ({ page }, testInfo) => {
      test.skip(
        testInfo.project.name !== "desktop-1440",
        "desktop light-van contrast sweep",
      );
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute(
        "data-home-hero",
        "light-van",
      );
      const results = await new AxeBuilder({ page })
        .withRules(["color-contrast"])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
});
