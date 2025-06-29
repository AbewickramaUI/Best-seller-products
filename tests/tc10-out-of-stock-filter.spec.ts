import { test, expect } from '@playwright/test';
import path from 'path';

test('TC10 - Verify out-of-stock items are excluded from related products', async ({ page }) => {
  // Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for Leather Wallet
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Ensure out-of-stock element is NOT visible
  const outOfStockItem = page.locator('.related-item.out-of-stock');
  await expect(outOfStockItem).toBeHidden();  //checks visibility
});
