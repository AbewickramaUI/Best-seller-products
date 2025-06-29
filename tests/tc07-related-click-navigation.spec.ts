import { test, expect } from '@playwright/test';
import path from 'path';

test('TC07 - Verify clicking a related product opens its detail view', async ({ page }) => {
  //Navigate to local demo product page
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;
  await page.goto(fileUrl);

  // Search for the main product
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('button');

  // Click the first related product
  const firstRelated = page.locator('.related-item').first();
  const expectedTitle = await firstRelated.locator('.title').textContent();
  await firstRelated.click();

  // Ensure the detail section becomes visible
  const detailTitle = page.locator('#detail-title');
  await expect(detailTitle).toBeVisible({ timeout: 10000 });
  await expect(detailTitle).toHaveText(expectedTitle?.trim() || '');
});
