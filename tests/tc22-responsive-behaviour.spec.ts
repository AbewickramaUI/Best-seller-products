import { test, expect } from '@playwright/test';
import path from 'path';

test.describe('TC22 - Responsive behaviour of related product section', () => {
  const filePath = path.resolve(__dirname, '../demo-site/ebay-wallet-demo-site.html');
  const fileUrl = 'file://' + filePath;

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 }); // iPhone X dimensions
    await page.goto(fileUrl);
    await page.fill('#search-bar', 'leather wallet');
    await page.click('#search-button');

    const relatedSection = page.locator('#related-products');
    await expect(relatedSection).toBeVisible();
    const box = await relatedSection.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(375);
  });

  test('should be responsive on tablet', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 }); // iPad
    await page.goto(fileUrl);
    await page.fill('#search-bar', 'leather wallet');
    await page.click('#search-button');

    const relatedSection = page.locator('#related-products');
    await expect(relatedSection).toBeVisible();
    const box = await relatedSection.boundingBox();
    expect(box?.width).toBeLessThanOrEqual(768);
  });
});
