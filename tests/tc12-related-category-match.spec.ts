import { test, expect } from '@playwright/test';
import path from 'path';

test('TC12 - Verify out-of-category products are excluded from related list', async ({ page }) => {
  // Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  // Navigate to local demo HTML
  await page.goto(fileUrl);

  // Search for 'Leather Wallet'
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Wait for related items to be rendered
  const relatedItems = page.locator('.related-item');
  await expect(relatedItems).toHaveCount(6); // 6 visible items expected

  // Verify that all related products have category 'Wallets'
  const count = await relatedItems.count();
  for (let i = 0; i < count; i++) {
    const categoryText = await relatedItems.nth(i).locator('.category').innerText();
    expect(categoryText).toContain('Wallets'); // Ensure no 'Watches' or other categories
  }
});
