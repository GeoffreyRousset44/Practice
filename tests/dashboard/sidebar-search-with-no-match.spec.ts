// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Sidebar search with no match', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Type `zzzzz` into the sidebar search input
    await page.getByPlaceholder('Search').fill('zzzzz');

    // 3. Verify zero menu items are visible
    // Scope to the menu list items rather than every link in the Sidepanel:
    // the panel also holds a permanent brand-banner link that never filters.
    const menuItems = page.getByRole('navigation', { name: 'Sidepanel' }).getByRole('listitem');
    await expect(menuItems).toHaveCount(0);
  });
});
