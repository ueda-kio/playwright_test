import { test, expect, webkit, devices } from '@playwright/test';
require('dotenv').config();
const { USERNAME, PASSWORD } = process.env;

if (!USERNAME || !PASSWORD) {
	throw new Error('process env is not defined.');
}

const url = 'https://playwright.dev/';
const username = USERNAME;
const password = PASSWORD;
const imageFolder = 'screenshots/';
const iOSVersions = [
	{
		version: '15.0',
		device: 'iPhone 11',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1',
	},
	{
		version: '16.0',
		device: 'iPhone 11',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
	},
	{
		version: '16.4',
		device: 'iPhone 11',
		userAgent:
			'Mozilla/5.0 (iPhone; CPU iPhone OS 16_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
	},
	{
		version: 'Android 11',
		device: 'Pixel 5',
		userAgent:
			'Mozilla/5.0 (Linux; Android 11; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',
	},
	{
		version: 'Android 12',
		device: 'Pixel 5',
		userAgent:
			'Mozilla/5.0 (Linux; Android 12; Pixel 4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Mobile Safari/537.36',
	},
];

(async () => {
	const browser = await webkit.launch();

	const screenshotPromises = iOSVersions.map(async (iosVersion) => {
		const { version, userAgent, device } = iosVersion;

		// 初期設定
		const context = await browser.newContext({
			...devices[device],
			userAgent,
			httpCredentials: {
				username,
				password,
			},
		});
		const page = await context.newPage();

		await page.goto(url);
		await page.screenshot({ path: `${imageFolder}screenshot_${version}.png`, fullPage: true });

		await context.close();
	});

	await Promise.all(screenshotPromises);
	await browser.close();
})();
