import { test, expect } from '@playwright/test';
import path from 'path';

test('TC23 - Verify the navigate back to main product after clicking related item', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Search for a product
  await page.fill('#search-bar', 'leather wallet');
  await page.click('#search-button');

  const relatedItem = page.locator('.related-item').first();
  await expect(relatedItem).toBeVisible();

  // Click on the related product
  await relatedItem.click();

  const detailView = page.locator('#product-detail');
  await expect(detailView).toBeVisible();

  // Click the back button
  await page.click('#back-button');

  // Verify main product and related section are visible again
  await expect(page.locator('#main-product')).toBeVisible();
  await expect(page.locator('#related-products')).toBeVisible();
});
