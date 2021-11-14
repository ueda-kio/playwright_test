const playwright = require('playwright-core');

playwright.chromium.launch({channel: 'chrome', headless: false}).then(async browser => {
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('input[name="q"]', 'playwright');
  await Promise.all([
  	page.waitForNavigation(),
  	page.keyboard.press('Enter'),
  ]);
  await page.waitForTimeout(3000);
  await browser.close();
});
