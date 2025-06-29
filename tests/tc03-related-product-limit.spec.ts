import { test, expect } from '@playwright/test';
import path from 'path';

test('TC03 - Validate max limit of 6 related products', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  await page.goto(fileUrl);

  // Trigger the main product search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Verify the related products are visible
  await expect(page.locator('#related-products')).toBeVisible();

  // Ensure only 6 related products are shown in the list
  const relatedItems = page.locator('.related-item');
  await expect(relatedItems).toHaveCount(6);
});
