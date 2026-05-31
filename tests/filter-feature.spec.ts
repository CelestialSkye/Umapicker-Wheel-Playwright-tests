import { test, expect } from '@playwright/test';

test.describe('Filter Feature', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://uma-picker.onrender.com/');
    await page.getByRole('button', { name: 'Filter' }).click();
    await expect(page.getByText('Select Trainees')).toBeVisible();
  });

  test('Filter modal opens with characters visible', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeVisible();
    await expect(page.getByText('Special Week').first()).toBeVisible();
  });

  test('Can deselect and select a character', async ({ page }) => {
    // Deselect Tokai Teio
    await page.getByText('Tokai Teio').first().click();

    // Select Gold Ship
    await page.getByText('Gold Ship').first().click();

    // Confirm
    await page.getByRole('button', { name: 'Confirm' }).click();

    // Modal should be closed
    await expect(page.getByText('Select Trainees')).not.toBeVisible();

    // Wheel should be ready
    await expect(page.getByRole('button', { name: 'Spin' })).toBeVisible();
  });

    test('Can deselect all characters', async ({ page }) => {
    // Unselect all
    await page.getByRole('button', { name: 'Unselect All' }).click();

    // Modal should be closed
    await expect(page.getByRole('button', { name: 'Confirm' })).toBeDisabled();
    
  });

   test('Selected characters are applied to the wheel', async ({ page }) => {
  // Deselect Silence Suzuka
  await page.getByText('Silence Suzuka').first().click();

  // Select Gold Ship
  await page.getByText('Gold Ship').first().click();

  // Confirm
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Modal closed
  await expect(page.getByText('Select Trainees')).not.toBeVisible();

  // Gold Ship is on the wheel
  await expect(page.getByAltText('Gold Ship')).toBeVisible();

  // Silence Suzuka is no longer on the wheel
  await expect(page.getByAltText('Silence Suzuka')).not.toBeVisible();
});

  test('Search bar filters results if its NOT empty', async ({ page }) => {
    //Enter gold ship inside the search bar
  await page.getByPlaceholder('Search by name...').fill('Gold Ship');

  // Gold Ship is in the modal
  await expect(page.getByText('Gold Ship').first()).toBeVisible();
    // Other results are expected to NOT be visible
  await expect(page.getByText('Tokai Teio').first()).not.toBeVisible();

  // Silence Suzuka is no longer on the wheel
  await expect (page.locator('label').filter({hasText:'Gold Ship'})).toHaveCount(1);
});

test('Selected characters reflect in the wheel and the counter', async ({ page }) => {


      await expect(page.getByRole('heading', { level: 2 })).toHaveText('Select Trainees (8 / 8)');

  
  // Verify count updated
  await page.getByText('Silence Suzuka').first().click();

    await expect(page.getByRole('heading', { level: 2 })).toHaveText('Select Trainees (7 / 8)');

  // Select Gold Ship
  await page.getByText('Gold Ship').first().click();

  // Verify count back to 8
  await expect(page.getByRole('heading', { level: 2 })).toHaveText('Select Trainees (8 / 8)');

  // Confirm
  await page.getByRole('button', { name: 'Confirm' }).click();

  // Modal closed
  await expect(page.getByText('Select Trainees')).not.toBeVisible();

  // Gold Ship on wheel
  await expect(page.getByAltText('Gold Ship').first()).toBeVisible();

  // Tokai Teio removed from wheel
  await expect(page.getByAltText('Silence Suzuka').first()).not.toBeVisible();
});

test('Closing filter without making any changes', async ({ page }) => {

  await expect(page.getByAltText('Special Week').first()).toBeVisible();

  await expect(page.getByAltText('Tokai Teio').first()).toBeVisible();

  await expect(page.getByAltText('Silence Suzuka').first()).toBeVisible();

await page.mouse.click(10,10);

await expect(page.getByAltText('Special Week').first()).toBeVisible();

  await expect(page.getByAltText('Tokai Teio').first()).toBeVisible();

  await expect(page.getByAltText('Silence Suzuka').first()).toBeVisible();
      
});


  test('Search then clear shows all results back ', async ({ page }) => {
    //Enter gold ship inside the search bar
  await page.getByPlaceholder('Search by name...').fill('Gold Ship');

  // Gold Ship is in the modal
  await expect(page.getByText('Gold Ship').first()).toBeVisible();

   await expect(page.getByText('Silence Suzuka').first()).not.toBeVisible();

await expect(page.getByText('Tokai Teio').first()).not.toBeVisible();
  
  await page.getByPlaceholder('Search by name...').fill('');

    await expect(page.getByText('Silence Suzuka').first()).toBeVisible();

await expect(page.getByText('Tokai Teio').first()).toBeVisible();
  
});

 test('Search with no results shows empry array ', async ({ page }) => {
    //Enter gold ship inside the search bar
  await page.getByPlaceholder('Search by name...').fill('Gold Shp');

  await expect(page.getByAltText('Gold Ship').first()).not.toBeVisible();
 
  
});



});