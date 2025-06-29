import { test, expect } from '@playwright/test';
import path from 'path';

test('TC21 - Verify behaviour when duplicate related products are shown', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  await page.fill('#search-bar', 'duplicate test');
  await page.click('#search-button');

  const titles = await page.locator('.related-item .title').allTextContents();
  const uniqueTitles = new Set(titles);

  expect(uniqueTitles.size).toBe(titles.length); // Assert no duplicates
});
