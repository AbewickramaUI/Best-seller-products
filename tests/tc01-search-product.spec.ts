import { test, expect } from '@playwright/test';
import path from 'path';

test('TC01 - Verify main product appears after search', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  await page.goto(fileUrl);

  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  await expect(page.locator('#main-product')).toBeVisible();
  await expect(page.locator('#product-title')).toHaveText('Leather Wallet');
  await expect(page.locator('#main-product .price')).toContainText('5000');
  await expect(page.locator('img[alt="Leather Wallet"]')).toBeVisible();
});

