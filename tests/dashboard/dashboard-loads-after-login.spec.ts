// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Dashboard loads after login', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('/web/index.php/auth/login');

    // 2. Fill Username with `Admin` and Password with `admin123`, then submit
    await page.getByPlaceholder('Username').fill(ADMIN_USERNAME);
    await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the URL matches `**/dashboard/index`
    await expect(page).toHaveURL(/\/dashboard\/index/);

    // 4. Verify the topbar header reads `Dashboard`
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 5. Verify the Quick Launch widget is visible
    await expect(page.getByText('Quick Launch')).toBeVisible();
  });
});
