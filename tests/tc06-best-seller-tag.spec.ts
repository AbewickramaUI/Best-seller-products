import { test, expect } from '@playwright/test';
import path from 'path';

test('TC06 - Verify each related product displays a Best Seller tag', async ({ page }) => {
  // Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Trigger search to display related products
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Get all related items
  const relatedItems = page.locator('.related-item');
  const count = await relatedItems.count();

  // Verify each has a visible "Best Seller" tag
  for (let i = 0; i < count; i++) {
    const tag = relatedItems.nth(i).locator('.tag');
    await expect(tag).toBeVisible();
    await expect(tag).toHaveText('Best Seller');
  }
});
