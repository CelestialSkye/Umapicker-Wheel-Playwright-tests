import { test as base } from '@playwright/test';
import { WheelPage } from './pages/WheelPage';
import { FilterModal } from './pages/FilterModal';
import { WinnerModal } from './pages/WinnerModal';

type Fixtures = {
  wheelPage: WheelPage;
  filterModal: FilterModal;
  winnerModal: WinnerModal;
};

export const test = base.extend<Fixtures>({
  wheelPage: async ({ page }, use) => {
    await use(new WheelPage(page));
  },
  filterModal: async ({ page }, use) => {
    await use(new FilterModal(page));
  },
  winnerModal: async ({ page }, use) => {
    await use(new WinnerModal(page));
  },
});

export { expect } from '@playwright/test';
