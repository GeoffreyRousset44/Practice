// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { ADMIN_USERNAME } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Invalid credentials are rejected', async ({ page }) => {
    // 1. Navigate to the login page
    await page.goto('/web/index.php/auth/login');

    // 2. Fill Username with `Admin` and Password with `wrongpassword`, then submit
    await page.getByPlaceholder('Username').fill(ADMIN_USERNAME);
    await page.getByPlaceholder('Password').fill('wrongpassword');
    await page.getByRole('button', { name: 'Login' }).click();

    // 3. Verify the `Invalid credentials` alert is visible
    await expect(page.getByRole('alert')).toContainText('Invalid credentials');

    // 4. Verify the URL is still `**/auth/login`
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
