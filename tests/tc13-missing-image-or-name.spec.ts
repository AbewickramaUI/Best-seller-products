import { test, expect } from '@playwright/test';
import path from 'path';

test('TC13 - Verify fallback is shown for missing image or name', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath + '#fallback');


  // Search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.getByRole('button', { name: 'Search' }).click();

  // Wait for items
  const relatedItems = page.locator('.related-item');
  await relatedItems.first().waitFor({ state: 'visible', timeout: 5000 });

  const count = await relatedItems.count();
  expect(count).toBeGreaterThan(0);

  let fallbackFound = false;

  for (let i = 0; i < count; i++) {
    const item = relatedItems.nth(i);
    const hasFallback = await item.locator('.fallback').isVisible().catch(() => false);
    if (hasFallback) fallbackFound = true;
  }

  expect(fallbackFound).toBe(true);
});
