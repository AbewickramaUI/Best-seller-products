import { test, expect } from '@playwright/test';
import path from 'path';

test('TC09 - Verify message is shown when no related products exist', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath + '#norelated'; // special hash
  await page.goto(fileUrl);

  await page.fill('#search-bar', 'Anything'); // Query doesn't matter
  await page.click('#search-button');

  const message = page.locator('#no-related-msg');
  await expect(message).toBeVisible();
  await expect(message).toHaveText('No related products available.');
});
