import { test, expect } from '@playwright/test';
import path from 'path';

test('TC17 - Verify the behaviour when the feature flag is disabled', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath + '#featureOff';
  await page.goto(fileUrl);

  // Try to trigger product rendering
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('#search-button');

  // Verify related section is NOT shown
  const relatedSection = page.locator('#related-products');
  await expect(relatedSection).toHaveCount(0);
});
