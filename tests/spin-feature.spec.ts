import { test, expect } from '../fixtures';

test.describe('Spin Feature', () => {

  test.beforeEach(async ({ wheelPage }) => {
    await wheelPage.goto();
    await expect(wheelPage.spinButton).toBeVisible();
  });

  test('Spin button triggers wheel and shows Skip button', async ({ wheelPage }) => {
    await wheelPage.spin();
    await expect(wheelPage.skipButton).toBeVisible();
  });

  test('Skip button stops the wheel and shows winner modal', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await expect(wheelPage.skipButton).toBeVisible();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
  });

  test('Winner modal shows career result and close hint', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
  });

  test('Wheel stops automatically after set time without pressing Skip', async ({ wheelPage, winnerModal, page }) => {
    await wheelPage.spin();
    await expect(wheelPage.skipButton).toBeVisible();
    await page.waitForTimeout(15000);
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
  });

  test('Winner modal closes when clicking outside the character div', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
    await winnerModal.close();
  });

  test('Spin button returns after winner modal is closed', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
    await winnerModal.close();
    await expect(wheelPage.spinButton).toBeVisible();
  });

  test('Spinning again after a result works (second spin)', async ({ wheelPage, winnerModal }) => {
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
    await winnerModal.close();

    await expect(wheelPage.spinButton).toBeVisible();
    await wheelPage.spin();
    await wheelPage.skipButton.waitFor();
    await wheelPage.skip();
    await expect(winnerModal.careerText).toBeVisible();
    await expect(winnerModal.closeHint).toBeVisible();
  });

});
