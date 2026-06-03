import { type Page, type Locator } from '@playwright/test';

export class WheelPage {
  readonly spinButton: Locator;
  readonly skipButton: Locator;
  readonly filterButton: Locator;
  readonly musicToggle: Locator;
  readonly githubLink: Locator;

  constructor(private readonly page: Page) {
    this.spinButton = page.getByRole('button', { name: 'Spin' });
    this.skipButton = page.getByRole('button', { name: 'Skip' });
    this.filterButton = page.getByRole('button', { name: 'Filter' });
    this.musicToggle = page.locator('input[type="checkbox"].peer');
    this.githubLink = page.locator('a[href*="github.com"]');
  }

  async goto() {
    await this.page.goto('/');
  }

  async spin() {
    await this.spinButton.click();
  }

  async skip() {
    await this.skipButton.click();
  }

  async openFilter() {
    await this.filterButton.click();
  }

  characterImage(name: string): Locator {
    return this.page.getByAltText(name);
  }
}
