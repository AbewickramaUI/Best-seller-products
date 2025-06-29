import { test, expect } from '@playwright/test';
import path from 'path';

test('TC06 - Verify each visible related product displays a Best Seller tag', async ({ page }) => {
  //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for the product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Select all visible related items
  const visibleItems = await page.locator('.related-item:not(.out-of-stock)').all();

  for (const item of visibleItems) {
    const tag = item.locator('.tag');
    await expect(tag).toBeVisible();
    await expect(tag).toHaveText('Best Seller');
  }
});
