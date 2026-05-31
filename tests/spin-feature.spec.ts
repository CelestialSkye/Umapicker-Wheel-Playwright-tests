import { test, expect } from '@playwright/test';

test.describe('Spin Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://uma-picker.onrender.com/');
    await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();
  });

  //Testing the Tap button
  test('Testing the TAP button', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    // ASSERT — verify what should have happened
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
  });

  test('Testing the SKIP button', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.getByRole('button', {name: 'Skip'}).click({timeout: 3000});
    // ASSERT — verify what should have happened
    await expect(page.getByText('your next career is')).toBeVisible();
  });

  test('Testing the winner modal', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.getByRole('button', {name: 'Skip'}).click({timeout: 3000});
    // ASSERT — verify what should have happened
    await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
  });

  test('Wheel stops automatically after set time (without pressing SKIP)', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.waitForTimeout(15000);
    await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
  });

   test('Winner modal closes when clicking outside the character div', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
    await page.mouse.click(10,10);
  });

  test('TAP button returns after winner modal is closed', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
    await page.mouse.click(10,10);
        await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();

  });

   test('Spinning again after a result works (second spin)', async ({ page }) => {
    // ACT — do the thing
    await page.getByRole('button', { name: 'Spin' }).click();
    await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
    await page.getByRole('button', { name: 'Skip' }).click();
    await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
    await page.mouse.click(10,10);
        await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();
        await page.getByRole('button', {name: 'Spin'}).click();
         await expect(page.getByRole('button', { name: 'Skip' })).toBeVisible();
await page.getByRole('button', {name: 'Skip'}).click();
 await expect(page.getByText('your next career is')).toBeVisible();
    await expect(page.getByText('CLICK ANYWHERE TO CLOSE')).toBeVisible();
  });



});