import { test, expect } from '@playwright/test';

test.describe('Smoke Tests', () => {
  test('Main page loads and essential components are visible', async ({
    page,
  }) => {
    await page.goto('/');

    // Check for Navbar title
    await expect(
      page.getByRole('heading', { name: 'NASA APOD App' }),
    ).toBeVisible();

    // Check for main APOD display area
    await expect(page.locator('#APODDISPLAY')).toBeVisible();

    // Check for Date Selector and Fetch button
    await expect(page.getByTestId('date-selector-input')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Fetch' })).toBeVisible();

    // Check for Recent Days section
    await expect(
      page.getByRole('heading', { name: 'Recent Days' }),
    ).toBeVisible();
  });
});
