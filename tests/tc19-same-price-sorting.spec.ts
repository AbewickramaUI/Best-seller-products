import { test, expect } from '@playwright/test';
import path from 'path';

test('TC19 - Verify the behaviour when all related products are in the same price', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath + '#sameprice');

  // Search for the same price product group
  await page.fill('#search-bar', 'same price');
  await page.click('#search-button');

  const relatedItems = page.locator('.related-item');
  await expect(relatedItems).toHaveCount(6);

  const titles = await relatedItems.locator('.title').allTextContents();
  const sorted = [...titles].sort((a, b) => a.localeCompare(b));
  expect(titles).toEqual(sorted);
});
