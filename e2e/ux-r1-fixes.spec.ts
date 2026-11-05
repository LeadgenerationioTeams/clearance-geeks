import { test, expect } from "@playwright/test";

test("quote links point to /#quote on pages without form and #quote on pages with form", async ({
  page,
}) => {
  // Check pages WITHOUT form
  for (const path of ["/services", "/areas", "/privacy", "/cookies", "/terms"]) {
    await page.goto(path);
    // Footer "Get a quote"
    const footerQuote = page.locator("footer").getByRole("link", { name: "Get a quote" });
    await expect(footerQuote).toHaveAttribute("href", "/#quote");

    // Header "Call" button
    const headerCall = page.locator("header").getByRole("link", { name: /call/i });
    if (await headerCall.count()) {
      await expect(headerCall).toHaveAttribute("href", "/#quote");
    }

    // Mobile "Get a quote" sticky bar (if present)
    const mobileQuote = page.locator(".fixed.bottom-0 a", { hasText: /get a quote/i });
    if (await mobileQuote.count()) {
      await expect(mobileQuote).toHaveAttribute("href", "/#quote");
    }
  }

  // Check pages WITH form
  for (const path of ["/", "/services/house-clearance", "/areas/stockport"]) {
    await page.goto(path);
    const footerQuote = page.locator("footer").getByRole("link", { name: "Get a quote" });
    await expect(footerQuote).toHaveAttribute("href", "#quote");

    const headerCall = page.locator("header").getByRole("link", { name: /call/i });
    if (await headerCall.count()) {
      await expect(headerCall).toHaveAttribute("href", "#quote");
    }

    const mobileQuote = page.locator(".fixed.bottom-0 a", { hasText: /get a quote/i });
    if (await mobileQuote.count()) {
      await expect(mobileQuote).toHaveAttribute("href", "#quote");
    }
  }
});

test("client-side phone validation shows inline error and preserves entered values", async ({
  page,
}) => {
  await page.goto("/");
  // Accept cookies
  const accept = page.getByRole("button", { name: /^accept$/i });
  if (await accept.isVisible()) {
    await accept.click();
  }

  const quote = page.locator("#quote");
  await quote.locator('input[name="name"]').fill("Jane Doe");
  await quote.locator('input[name="phone"]').fill("invalid-phone");
  await quote.locator('input[name="email"]').fill("jane@example.com");
  await quote.locator('input[name="postcode"]').fill("SK1 1AA");
  await quote.locator('select[name="jobType"]').selectOption("garden-waste");
  await quote.locator('textarea[name="details"]').fill("Tree branches and grass cuttings");

  // Attempt submit
  await quote.getByRole("button", { name: /send quote request/i }).click();

  // Expect inline phone error
  const phoneError = quote.locator("#phone-error");
  await expect(phoneError).toBeVisible();
  await expect(phoneError).toContainText(/valid UK phone number/i);

  // Expect all entered values to be preserved!
  await expect(quote.locator('input[name="name"]')).toHaveValue("Jane Doe");
  await expect(quote.locator('input[name="phone"]')).toHaveValue("invalid-phone");
  await expect(quote.locator('input[name="email"]')).toHaveValue("jane@example.com");
  await expect(quote.locator('input[name="postcode"]')).toHaveValue("SK1 1AA");
  await expect(quote.locator('select[name="jobType"]')).toHaveValue("garden-waste");
  await expect(quote.locator('textarea[name="details"]')).toHaveValue(
    "Tree branches and grass cuttings",
  );

  // Now enter a valid UK phone
  await quote.locator('input[name="phone"]').fill("07123 456789");
  await expect(phoneError).toBeHidden();

  // Service select is marked required
  await expect(quote.locator('select[name="jobType"]')).toHaveAttribute("required", "");

  // Phone input has pattern and placeholder hint
  const phoneInput = quote.locator('input[name="phone"]');
  await expect(phoneInput).toHaveAttribute("placeholder", "e.g. 07123 456789");
  await expect(phoneInput).toHaveAttribute("pattern", "^\\+?[0-9\\s]{10,17}$");
});

test("recycling centre links have at least 44px tap targets on area pages", async ({ page }) => {
  await page.goto("/areas/stockport");
  const sourceLink = page.locator("a", { hasText: /R4GM/i }).first();
  await expect(sourceLink).toBeVisible();
  const box = await sourceLink.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.height).toBeGreaterThanOrEqual(44);
});

test("server-side rejection preserves entered values and shows inline phone error", async ({
  page,
}) => {
  await page.goto("/");
  const accept = page.getByRole("button", { name: /^accept$/i });
  if (await accept.isVisible()) {
    await accept.click();
  }

  const quote = page.locator("#quote");
  await quote.locator('input[name="name"]').fill("Bob Builder");
  await quote.locator('input[name="phone"]').fill("12345");
  await quote.locator('input[name="email"]').fill("bob@example.com");
  await quote.locator('input[name="postcode"]').fill("M1 1AA");
  await quote.locator('select[name="jobType"]').selectOption("builders-waste");
  await quote.locator('textarea[name="details"]').fill("Bricks and plasterboard");

  // Bypass client-side onSubmit to test server-side rejection handling
  await page.evaluate(() => {
    const form = document.querySelector("#quote") as HTMLFormElement;
    // Remove pattern to avoid browser validation blocking submit
    form.querySelector('input[name="phone"]')?.removeAttribute("pattern");
    // Submit using FormData to the action
    form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });

  // Wait for server response
  const phoneError = quote.locator("#phone-error");
  await expect(phoneError).toBeVisible();
  await expect(phoneError).toContainText(/valid UK phone number/i);

  // Verify all entered values are still retained!
  await expect(quote.locator('input[name="name"]')).toHaveValue("Bob Builder");
  await expect(quote.locator('input[name="phone"]')).toHaveValue("12345");
  await expect(quote.locator('input[name="email"]')).toHaveValue("bob@example.com");
  await expect(quote.locator('input[name="postcode"]')).toHaveValue("M1 1AA");
  await expect(quote.locator('select[name="jobType"]')).toHaveValue("builders-waste");
  await expect(quote.locator('textarea[name="details"]')).toHaveValue("Bricks and plasterboard");
});
