import { test, expect } from '@playwright/test';
import path from 'path';

test('TC05 - Verify related product prices are within ±20% of main product price', async ({ page }) => {
  // Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Trigger search to display related products
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Extract the main product price
  const mainPriceText = await page.locator('#main-product .price').textContent(); // e.g. "Price: Rs. 5000.00"
  const mainPrice = parseFloat((mainPriceText?.match(/\d+(\.\d+)?/) || ['0'])[0]);

  // Calculate allowed ±20% range
  const lowerLimit = mainPrice * 0.8;
  const upperLimit = mainPrice * 1.2;

  // Get all related product price elements
  const priceLocators = page.locator('.related-item .price');
  const count = await priceLocators.count();

  // Validate each related price is in ±20% range
  for (let i = 0; i < count; i++) {
    const priceText = await priceLocators.nth(i).textContent(); // e.g. "Rs. 5200.00"
    const priceValue = parseFloat((priceText?.match(/\d+(\.\d+)?/) || ['0'])[0]);

    expect(priceValue).toBeGreaterThanOrEqual(lowerLimit);
    expect(priceValue).toBeLessThanOrEqual(upperLimit);
  }
});
