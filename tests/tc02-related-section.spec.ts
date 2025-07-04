import { test, expect } from '@playwright/test';
import path from 'path';

test('TC02 - Verify related product section appears after search', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  await page.goto(fileUrl);

  // Search for main product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Check that the related section is visible
  await expect(page.locator('#related-products')).toBeVisible();
  await expect(page.locator('#related-header')).toBeVisible();

  // Assert there are exactly 6 related products
  const relatedItems = page.locator('.related-item');
  await expect(relatedItems).toHaveCount(6);
});
