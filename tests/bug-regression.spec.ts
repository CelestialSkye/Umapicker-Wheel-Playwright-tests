import { test, expect } from '../fixtures';

test.describe('Bug regression coverage', () => {

  test.beforeEach(async ({ wheelPage }) => {
    await wheelPage.goto();
    await expect(wheelPage.spinButton).toBeVisible();
  });

  // BUG-001: clicking inside the winner avatar/text div did not dismiss the
  // overlay, even though the UI explicitly says "CLICK ANYWHERE TO CLOSE".
  test('BUG-001: winner modal closes when clicking directly on the result text', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();

    await winnerModal.careerText.click();

    await expect(winnerModal.careerText).not.toBeVisible();
    await expect(wheelPage.spinButton).toBeVisible();
  });

  // BUG-002: the Filter button stayed clickable while the wheel was spinning,
  // letting the filter modal open mid-spin.
  test('BUG-002: filter button is disabled while the wheel is spinning', async ({ wheelPage, filterModal }) => {
    await wheelPage.spin();
    await expect(wheelPage.skipButton).toBeVisible();

    await expect(wheelPage.filterButton).toBeDisabled();

    await wheelPage.filterButton.click({ force: true });
    await expect(filterModal.title).not.toBeVisible();
  });

});
