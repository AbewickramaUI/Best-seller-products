import { test, expect } from '@playwright/test';
import path from 'path';

test('TC14 - Verify the behaviour when the product is at exact price boundary', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Perform product search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('#search-button');

  // Wait for at least one related item
  const relatedItems = page.locator('.related-item');
  await expect(relatedItems.first()).toBeVisible({ timeout: 5000 });

  const count = await relatedItems.count();
  const boundaryPrice = 6000.00;
  let found = false;

  for (let i = 0; i < count; i++) {
    const priceText = await relatedItems.nth(i).locator('.price').textContent();
    const match = priceText?.match(/Rs\.\s?([\d,]+\.\d{2})/);
    const price = match ? parseFloat(match[1].replace(',', '')) : NaN;

    if (price === boundaryPrice) {
      found = true;
      break;
    }
  }

  expect(found).toBeTruthy(); // Assert presence of a product at the boundary price
});
