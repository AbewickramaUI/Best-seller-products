import { test, expect } from '@playwright/test';
import path from 'path';

test('TC04 - Verify all related products are in the same category as main product', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  await page.goto(fileUrl);

  // Perform main product search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Get main product category text
  const mainCategory = await page.locator('#main-product .category').textContent();
  const expectedCategory = mainCategory?.replace('Category:', '').trim();

  // Verify each related product category matches with the main
  const relatedCategories = page.locator('.related-item .category');
  const count = await relatedCategories.count();

  for (let i = 0; i < count; i++) {
    const category = await relatedCategories.nth(i).textContent();
    expect(category?.trim()).toBe(expectedCategory);
  }
});
