// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Sidebar navigation from the dashboard', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Click the sidebar `PIM` item and verify `/pim/viewEmployeeList`
    await page.getByRole('link', { name: 'PIM' }).click();
    await expect(page).toHaveURL(/\/pim\/viewEmployeeList/);
    await expect(page.getByRole('heading', { name: 'PIM' })).toBeVisible();

    // 3. Click the sidebar `Dashboard` item and verify a return to `/dashboard/index`
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL(/\/dashboard\/index/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
  });
});
