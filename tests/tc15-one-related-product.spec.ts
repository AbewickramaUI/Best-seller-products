import { test, expect } from '@playwright/test';
import path from 'path';

test('TC15 - Verify the behaviour when there is only 1 related product', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Search for the product that only has 1 related item
  await page.fill('#search-bar', 'Luxury Watch');
  await page.click('#search-button');

  const relatedItems = page.locator('.related-item');
  await expect(relatedItems).toHaveCount(1, { timeout: 5000 });

  const item = relatedItems.first();
  await expect(item.locator('.title')).toHaveText('Silver Wrist Watch');
  await expect(item.locator('.tag')).toHaveText('Best Seller');
  await expect(item.locator('img')).toBeVisible();
});
