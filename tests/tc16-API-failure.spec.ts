import { test, expect } from '@playwright/test';
import path from 'path';
test('TC16 - Verify the behaviour when there is API failure or network issue', async ({ page }) => {
    const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
    await page.goto('file://' + filePath);
  
    await page.fill('#search-bar', 'api fail');
    await page.click('#search-button');
  
    const errorMsg = page.locator('#api-failure-msg');
    await expect(errorMsg).toBeVisible();
    await expect(errorMsg).toHaveText('System temporarily unavailable');
  });
  