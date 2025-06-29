import { test, expect } from '@playwright/test';
import path from 'path';

test('TC07 - Verify clicking a related product opens its detail view', async ({ page }) => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  await page.goto('file://' + filePath);

  // Trigger search
  await page.fill('#search-bar', 'Leather Wallet');
  await page.click('#search-button');

  // Wait for related items
  const relatedItems = page.locator('.related-item');
  await expect(relatedItems.first()).toBeVisible({ timeout: 5000 });

  // Loop through and click the first item with a `.title`
  const count = await relatedItems.count();
  let clicked = false;

  for (let i = 0; i < count; i++) {
    const item = relatedItems.nth(i);
    const title = item.locator('.title');

    if (await title.count() === 0) continue; // skip fallback-only items

    const expectedTitle = (await title.textContent())?.trim() || '';
    await item.evaluate((el) => el.scrollIntoView()); // ensure it's clickable
    await item.click();

    const detailTitle = page.locator('#detail-title');
    await expect(detailTitle).toBeVisible({ timeout: 10000 });
    await expect(detailTitle).toHaveText(expectedTitle);

    clicked = true;
    break;
  }

  expect(clicked).toBeTruthy(); // fail the test if no clickable item was found
});
