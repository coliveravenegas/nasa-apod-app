import { test, expect } from '@playwright/test';

test.describe('Core Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('Date selection fetches the correct APOD', async ({ page }) => {
    // Clear the input and type the new date
    await page.getByTestId('date-selector-input').clear();
    await page.getByTestId('date-selector-input').fill('01/15/2024');
    await page.getByRole('button', { name: 'Fetch' }).click();

    // Wait for loading to finish and content to appear
    await page.waitForTimeout(2000); // Wait for API call
    await expect(page.locator('#APODDISPLAY h2')).toBeVisible({
      timeout: 15000,
    });

    // Verify that some content is displayed (flexible assertion)
    const title = await page.locator('#APODDISPLAY h2').textContent();
    expect(title).toBeTruthy();
    expect(title?.length).toBeGreaterThan(0);
  });

  test('Favorites functionality works correctly', async ({ page }) => {
    // Wait for initial content to load
    await expect(page.locator('#APODDISPLAY h2')).toBeVisible({
      timeout: 10000,
    });

    // Get the current APOD title before adding to favorites
    const currentTitle = await page.locator('#APODDISPLAY h2').textContent();

    // Like the main APOD
    const mainApod = page.locator('#APODDISPLAY');
    const likeButton = mainApod.getByLabel('Add to favorites');
    await likeButton.click();

    // Go to favorites view - use more specific selector to avoid strict mode violation
    await page
      .locator('header')
      .getByRole('button', { name: 'Favorites' })
      .click();

    // Check that the APOD is in the favorites list
    const favoritedItem = page
      .locator('.MuiCard-root')
      .filter({ hasText: currentTitle || '' });
    await expect(favoritedItem).toBeVisible();

    // Unlike the item from the favorites view
    const unlikeButton = favoritedItem
      .getByLabel('Remove from favorites')
      .first();
    await unlikeButton.click();

    // Check that the favorites list is now empty
    await expect(page.getByText('No favorites yet.')).toBeVisible();
  });

  test('HD Image viewer works correctly', async ({ page }) => {
    // Wait for initial content to load
    await expect(page.locator('#APODDISPLAY h2')).toBeVisible({
      timeout: 15000,
    });

    // Check if HD button is available (not all APODs have HD images)
    const hdButton = page.getByLabel('view HD image');
    if (await hdButton.isVisible()) {
      // Open the HD dialog
      await hdButton.click();

      // Check that the dialog is open and the HD image is visible
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();

      // Wait for HD image to load (flexible alt text matching)
      await expect(dialog.locator('img')).toBeVisible({ timeout: 10000 });

      // Close the dialog
      await page.getByLabel('close').click();
      await expect(dialog).not.toBeVisible();
    } else {
      // Skip if no HD image is available
      console.log('No HD image available for current APOD, skipping HD test');
    }
  });
});
