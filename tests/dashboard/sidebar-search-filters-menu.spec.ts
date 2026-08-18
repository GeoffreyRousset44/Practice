// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Sidebar search filters the menu', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Type `Adm` into the sidebar search input
    const search = page.getByPlaceholder('Search');
    await search.fill('Adm');

    // 3. Verify `Admin` is visible and `Buzz` is hidden
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Buzz' })).toBeHidden();

    // 4. Clear the input and verify the full menu is restored
    await search.clear();
    await expect(page.getByRole('link', { name: 'Admin' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Buzz' })).toBeVisible();
  });
});
