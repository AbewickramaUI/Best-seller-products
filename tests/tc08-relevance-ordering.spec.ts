import { test, expect } from '@playwright/test';
import path from 'path';

test('TC08 - Verify the relevance ordering according to the best seller logic.', async ({ page }) => {
 //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Click on the first related product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Get all displayed related product prices
  const priceLocators = page.locator('.related-item .price');
  const count = await priceLocators.count();
  const prices: number[] = [];

 //Loop through each price element and extract numeric values
  for (let i = 0; i < count; i++) {
    const priceText = await priceLocators.nth(i).textContent(); //Rs. 5200.00
    const priceValue = parseFloat((priceText?.match(/\d+(\.\d+)?/) || ['0'])[0]);
    prices.push(priceValue);
  }

  // Verify that prices are sorted in descending order
  const sortedPrices = [...prices].sort((a, b) => b - a); // high to low
  expect(prices).toEqual(sortedPrices);
});
