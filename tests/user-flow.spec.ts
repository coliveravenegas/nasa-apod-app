import { test, expect } from '@playwright/test';

test.describe('User Flow', () => {
  test('Browse and Favorite Flow', async ({ page }) => {
    await page.goto('/');

    // 1. Click on a recent APOD
    // This assumes there is at least one recent APOD. We will click the first one.
    const firstRecentApod = page
      .locator('.MuiMasonry-root .MuiCard-root')
      .first();
    await firstRecentApod.click();

    // 2. Assert that the main APOD display has updated.
    await expect(page.locator('#APODDISPLAY')).toBeVisible();

    // 3. Like the new current APOD
    const mainApod = page.locator('#APODDISPLAY');
    const likeButton = mainApod.getByLabel('Add to favorites');
    await likeButton.click();

    // 4. Go to favorites view
    await page
      .locator('header')
      .getByRole('button', { name: 'Favorites' })
      .click();

    // 5. Assert that there is at least one item in the favorites list
    await expect(page.locator('.MuiMasonry-root .MuiCard-root')).toHaveCount(1);

    // 6. Go back to the main view
    await page.getByRole('button', { name: 'Back' }).click();

    // 7. Assert that the main view is visible again
    await expect(page.locator('#APODDISPLAY')).toBeVisible();
  });
});
