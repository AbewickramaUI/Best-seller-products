import { test, expect } from '@playwright/test';
import path from 'path';

test('TC11 -Verify the product outside price threshold.', async ({ page }) => {
  //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for the Leather Wallet
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Check that Rs.6500 product does not exist
  const highPriceItem = page.locator('.related-item:has-text("6500")');
  await expect(highPriceItem).toHaveCount(0); // Excluded
});
