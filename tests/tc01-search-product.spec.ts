import { test, expect } from '@playwright/test';
import path from 'path';

test('TC01 - Verify main product appears after search', async ({ page }) => {
  //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Assert main product details
  await expect(page.locator('#product-title')).toHaveText('Leather Wallet');
  await expect(page.locator('#main-product .price')).toContainText('5000');

  // Wait for image to become visible slow rendering
  await expect(page.locator('img[alt="Leather Wallet"]')).toBeVisible({ timeout: 10000 });
});
