import { test, expect } from '@playwright/test';
import path from 'path';

test('TC13 - Verify fallback is shown for missing image or name', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Perform search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.getByRole('button', { name: 'Search' }).click();

  // Wait for at least one related item
  const relatedItems = page.locator('.related-item');
  await relatedItems.first().waitFor({ state: 'visible', timeout: 5000 });

  const count = await relatedItems.count();
  expect(count).toBeGreaterThan(0);

  for (let i = 0; i < count; i++) {
    const item = relatedItems.nth(i);
    const name = item.locator('.title'); // assuming this is the name class
    const img = item.locator('img');

    const nameText = await name.textContent().catch(() => '');
    const imgSrc = await img.getAttribute('src').catch(() => '');

    if (!nameText?.trim() || !imgSrc?.trim()) {
      await expect(item.locator('.fallback')).toBeVisible();
    }
  }
});
