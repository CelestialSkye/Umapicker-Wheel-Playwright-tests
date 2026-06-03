import { type Page, type Locator } from '@playwright/test';

export class WinnerModal {
  readonly careerText: Locator;
  readonly closeHint: Locator;

  constructor(private readonly page: Page) {
    this.careerText = page.getByText('your next career is');
    this.closeHint = page.getByText('CLICK ANYWHERE TO CLOSE');
  }

  async close() {
    await this.page.mouse.click(10, 10);
  }
}
