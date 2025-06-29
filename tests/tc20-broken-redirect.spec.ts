import { test, expect } from '@playwright/test';
import path from 'path';

test('TC20 - Verify the broken redirect from the best seller related items', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Search for the product with broken related redirect
  await page.fill('#search-bar', 'broken link product');
  await page.click('#search-button');

  const relatedItem = page.locator('.related-item', { hasText: 'Unavailable Bestseller' });
  await expect(relatedItem).toBeVisible();

  await relatedItem.click();

  const errorText = page.locator('#broken-msg');
  await expect(errorText).toBeVisible();
  await expect(errorText).toHaveText('Product temporarily unavailable');
});
