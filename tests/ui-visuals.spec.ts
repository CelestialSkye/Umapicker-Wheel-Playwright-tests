import { test, expect } from '@playwright/test';

test.describe('UI & Visuals', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://uma-picker.onrender.com/');
  });

  test('Music toggle switches state when clicked', async ({ page }) => {
    const toggle = page.locator('input[type="checkbox"].peer');
    // Default state — unchecked (music playing)
    await expect(toggle).not.toBeChecked();
    // Click toggle
    await toggle.click({ force: true });
    // Now checked (muted)
    await expect(toggle).toBeChecked();
    // Click again — back to playing
    await toggle.click({ force: true });
    await expect(toggle).not.toBeChecked();
  });

  test('Page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/uma/i);
  });

  test('Filter button is visible on load', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();
  });

  test('TAP button is visible on load', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();
  });

  test('No console errors on page load', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.goto('https://uma-picker.onrender.com/');
    expect(errors).toHaveLength(0);
  });

  test('Wheel is visible on mobile screen', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 }
    });
    const page = await context.newPage();
    await page.goto('https://uma-picker.onrender.com/');
    await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Filter' })).toBeVisible();
    await context.close();
  });

  test('GitHub link is present', async ({ page }) => {
    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
  });

});