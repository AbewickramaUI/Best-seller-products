import { test, expect } from '@playwright/test';
import path from 'path';

test('TC18 - Verify that when there is long title and description, full detail is correctly displayed', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Search for the product with long title
  await page.fill('#search-bar', 'long title wallet');
  await page.click('#search-button');

  const longTitleText = 'Premium Black Leather Wallet with RFID Protection and Ultra-Durable Stitching';
  const longTitleItem = page.locator('.related-item', { hasText: longTitleText });
  await expect(longTitleItem).toBeVisible();

  // Optional: click and verify detail view
  await longTitleItem.click();
  const detailTitle = page.locator('#detail-title');
  await expect(detailTitle).toHaveText(longTitleText);
});
