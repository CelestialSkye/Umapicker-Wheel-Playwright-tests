import { test, expect } from '../fixtures';

test.describe('Filter Feature', () => {

  test.beforeEach(async ({ wheelPage, filterModal }) => {
    await wheelPage.goto();
    await wheelPage.openFilter();
    await expect(filterModal.title).toBeVisible();
  });

  test('Filter modal opens with characters visible', async ({ filterModal }) => {
    await expect(filterModal.confirmButton).toBeVisible();
    await expect(filterModal.character('Special Week')).toBeVisible();
  });

  test('Can deselect and select a character', async ({ wheelPage, filterModal }) => {
    await filterModal.selectCharacter('Tokai Teio');
    await filterModal.selectCharacter('Gold Ship');
    await filterModal.confirm();
    await expect(filterModal.title).not.toBeVisible();
    await expect(wheelPage.spinButton).toBeVisible();
  });

  test('Unselect All disables the Confirm button', async ({ filterModal }) => {
    await filterModal.unselectAllButton.click();
    await expect(filterModal.confirmButton).toBeDisabled();
  });

  test('Selected characters are applied to the wheel', async ({ wheelPage, filterModal }) => {
    await filterModal.selectCharacter('Silence Suzuka');
    await filterModal.selectCharacter('Gold Ship');
    await filterModal.confirm();
    await expect(filterModal.title).not.toBeVisible();
    await expect(wheelPage.characterImage('Gold Ship')).toBeVisible();
    await expect(wheelPage.characterImage('Silence Suzuka')).not.toBeVisible();
  });

  test('Search bar filters results when not empty', async ({ filterModal }) => {
    await filterModal.search('Gold Ship');
    await expect(filterModal.character('Gold Ship')).toBeVisible();
    await expect(filterModal.character('Tokai Teio')).not.toBeVisible();
    await expect(filterModal.characterLabel('Gold Ship')).toHaveCount(1);
  });

  test('Selected characters reflect in the wheel and the counter', async ({ wheelPage, filterModal }) => {
    await expect(filterModal.heading).toHaveText('Select Trainees (8 / 8)');

    await filterModal.selectCharacter('Silence Suzuka');
    await expect(filterModal.heading).toHaveText('Select Trainees (7 / 8)');

    await filterModal.selectCharacter('Gold Ship');
    await expect(filterModal.heading).toHaveText('Select Trainees (8 / 8)');

    await filterModal.confirm();
    await expect(filterModal.title).not.toBeVisible();
    await expect(wheelPage.characterImage('Gold Ship').first()).toBeVisible();
    await expect(wheelPage.characterImage('Silence Suzuka').first()).not.toBeVisible();
  });

  test('Closing filter without changes preserves the wheel', async ({ wheelPage, filterModal }) => {
    await expect(filterModal.characterImage('Special Week').first()).toBeVisible();
    await expect(filterModal.characterImage('Tokai Teio').first()).toBeVisible();
    await expect(filterModal.characterImage('Silence Suzuka').first()).toBeVisible();

    await filterModal.close();

    await expect(wheelPage.characterImage('Special Week').first()).toBeVisible();
    await expect(wheelPage.characterImage('Tokai Teio').first()).toBeVisible();
    await expect(wheelPage.characterImage('Silence Suzuka').first()).toBeVisible();
  });

  test('Clearing the search bar restores all results', async ({ filterModal }) => {
    await filterModal.search('Gold Ship');
    await expect(filterModal.character('Gold Ship')).toBeVisible();
    await expect(filterModal.character('Silence Suzuka')).not.toBeVisible();
    await expect(filterModal.character('Tokai Teio')).not.toBeVisible();

    await filterModal.search('');
    await expect(filterModal.character('Silence Suzuka')).toBeVisible();
    await expect(filterModal.character('Tokai Teio')).toBeVisible();
  });

  test('Search with no matching results shows empty list', async ({ filterModal }) => {
    await filterModal.search('Gold Shp');
    await expect(filterModal.characterImage('Gold Ship').first()).not.toBeVisible();
  });

});
