const playwright = require('playwright');
const { chromium, devices, webkit } = require('playwright');
const iPhone11 = devices['iPhone SE'];

(async () => {
  const browser = await webkit.launch();
  const context = await browser.newContext({
    ...iPhone11,
  });
  const page = await context.newPage();
  await page.goto('https://qiita.com/stock');
  // await page.waitForRequest(/.*preview\/pwa/);
	// await page.click("button.p-hamburgerMenu");
  // await page.waitForTimeout(1000);
  await page.screenshot({ fullPage: true, path: 'colosseum-iphone.png' });
  await browser.close();
})();
