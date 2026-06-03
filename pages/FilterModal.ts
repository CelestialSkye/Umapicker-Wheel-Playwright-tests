import { type Page, type Locator } from '@playwright/test';

export class FilterModal {
  readonly title: Locator;
  readonly heading: Locator;
  readonly confirmButton: Locator;
  readonly unselectAllButton: Locator;
  readonly searchBar: Locator;

  constructor(private readonly page: Page) {
    this.title = page.getByText('Select Trainees');
    this.heading = page.getByRole('heading', { level: 2 });
    this.confirmButton = page.getByRole('button', { name: 'Confirm' });
    this.unselectAllButton = page.getByRole('button', { name: 'Unselect All' });
    this.searchBar = page.getByPlaceholder('Search by name...');
  }

  character(name: string): Locator {
    return this.page.getByText(name).first();
  }

  characterLabel(name: string): Locator {
    return this.page.locator('label').filter({ hasText: name });
  }

  characterImage(name: string): Locator {
    return this.page.getByAltText(name);
  }

  async selectCharacter(name: string) {
    await this.character(name).click();
  }

  async search(query: string) {
    await this.searchBar.fill(query);
  }

  async confirm() {
    await this.confirmButton.click();
  }

  async close() {
    await this.page.mouse.click(10, 10);
  }
}
