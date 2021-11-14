import { it, expect } from "@playwright/test";

it("Test with playwright", async ({ page }) => {
  // Go to https://playwright.dev/
  await page.goto("https://playwright.dev/");

  // Click //h1[normalize-space(.)='🎭 Playwright']
  await page.click("//h1[normalize-space(.)='🎭 Playwright']");

  // Click input[placeholder="start typing to search"]
  await page.click('input[placeholder="start typing to search"]');

  // Fill input[placeholder="start typing to search"]
  await page.fill('input[placeholder="start typing to search"]', "test");

  // Click text=/.*Integrations >.*/
  await page.click("text=/.*Integrations >.*/");
  // assert.equal(page.url(), 'https://playwright.dev/#version=v1.6.2&path=docs/test-runners.md&q=');

  // Click text="Test Runners"
  await page.click('text="Test Runners"');

  // h1 が "Test Runners" となっているか検証する
  const h1Text = await page.innerText("h1");
  expect(h1Text).toBe("Test Runners");
});

