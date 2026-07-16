import { test, expect } from '../fixtures';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('main page has no critical/serious a11y violations', async ({ wheelPage, page }) => {
    await wheelPage.goto();
    await expect(wheelPage.spinButton).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const seriousOrWorse = results.violations.filter(
      (v) => v.impact === 'critical' || v.impact === 'serious'
    );

    if (seriousOrWorse.length > 0) {
      console.log(JSON.stringify(seriousOrWorse, null, 2));
    }

    expect(seriousOrWorse).toEqual([]);
  });
});
