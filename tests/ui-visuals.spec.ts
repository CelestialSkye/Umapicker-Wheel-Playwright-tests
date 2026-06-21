import { test, expect } from '../fixtures';
import { WheelPage } from '../pages/WheelPage';

test.describe('UI & Visuals', () => {

  test.beforeEach(async ({ wheelPage }) => {
    await wheelPage.goto();
  });

  test('Music toggle switches state when clicked', async ({ wheelPage }) => {
    await expect(wheelPage.musicToggle).not.toBeChecked();
    await wheelPage.musicToggle.dispatchEvent('click');
    await expect(wheelPage.musicToggle).toBeChecked();
    await wheelPage.musicToggle.dispatchEvent('click');
    await expect(wheelPage.musicToggle).not.toBeChecked();
  });

  test('Page has correct title', async ({ page }) => {
    await expect(page).toHaveTitle(/uma/i);
  });

  test('Filter button is visible on load', async ({ wheelPage }) => {
    await expect(wheelPage.filterButton).toBeVisible();
  });

  test('Spin button is visible on load', async ({ wheelPage }) => {
    await expect(wheelPage.spinButton).toBeVisible();
  });

test('No console errors on page load', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  await page.goto('/');
  const relevantErrors = errors.filter(e =>
    !e.includes('Preload failed') &&
    !e.includes('Sprite failed to decode')
  );
  expect(relevantErrors).toHaveLength(0);
});

  test('Wheel is visible on mobile screen', async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    const wheelPage = new WheelPage(page);
    await wheelPage.goto();
    await expect(wheelPage.spinButton).toBeVisible();
    await expect(wheelPage.filterButton).toBeVisible();
    await context.close();
  });

  test('GitHub link is present', async ({ wheelPage }) => {
    await expect(wheelPage.githubLink).toBeVisible();
  });

});
