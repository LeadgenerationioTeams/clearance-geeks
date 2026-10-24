import { test, expect } from "@playwright/test";
import { PLACEHOLDER_SERVICE_AREAS } from "../src/config/site";

async function acceptCookies(page: import("@playwright/test").Page) {
  const accept = page.getByRole("button", { name: /^accept$/i });
  if (await accept.isVisible()) {
    await accept.click();
  }
}

const sampleArea = PLACEHOLDER_SERVICE_AREAS[0];

test("homepage loads and quote form visible", async ({ page }) => {
  await page.goto("/");
  await acceptCookies(page);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: /get a quote/i })).toBeVisible();
});

test("services hub links to a service page", async ({ page }) => {
  await page.goto("/services");
  await acceptCookies(page);
  await page.getByRole("link", { name: /house clearance/i }).first().click();
  await expect(page).toHaveURL(/house-clearance/);
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("areas and legal pages respond", async ({ page }) => {
  await page.goto(`/areas/${sampleArea.slug}`);
  await acceptCookies(page);
  await expect(
    page.getByRole("heading", {
      name: new RegExp(`clearance in ${sampleArea.name}`, "i"),
    }),
  ).toBeVisible();
  await page.goto("/privacy");
  await expect(page.getByRole("heading", { name: /privacy/i })).toBeVisible();
});
