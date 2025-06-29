import { test, expect } from '@playwright/test';
import path from 'path';

test('TC09 - Verify message is shown when no related products exist', async ({ page }) => {
  //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for a product with no related items
  await page.fill('#search-bar', 'Luxury Watch');
  await page.click('button');

  // Verify the fallback message is visible
  const message = page.locator('#no-related-msg');
  await expect(message).toBeVisible();
  await expect(message).toHaveText('No related products available.');
});
