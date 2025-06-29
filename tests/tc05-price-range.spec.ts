import { test, expect } from '@playwright/test';
import path from 'path';

test('TC05 - Verify all related product prices are within the range', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  await page.goto(fileUrl);

  // Search for the main product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Locate the related product prices
  const priceLocators = page.locator('.related-item .price');
  const count = await priceLocators.count();

  //Iterate through each related product item
  for (let i = 0; i < count; i++) {
    const priceText = await priceLocators.nth(i).textContent(); // e.g. "Rs. 4800.00"
    const priceValue = parseFloat((priceText?.match(/\d+(\.\d+)?/) || ['0'])[0]);

    // Asset the correct price range
    expect(priceValue).toBeGreaterThanOrEqual(4000);
    expect(priceValue).toBeLessThanOrEqual(6000);
  }
});
