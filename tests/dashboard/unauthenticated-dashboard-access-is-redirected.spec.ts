// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';

test.describe('OrangeHRM Dashboard', () => {
  test('Unauthenticated dashboard access is redirected', async ({ page }) => {
    // 1. Without logging in, navigate directly to `/web/index.php/dashboard/index`
    await page.goto('/web/index.php/dashboard/index');

    // 2. Verify the URL lands on `**/auth/login`
    await expect(page).toHaveURL(/\/auth\/login/);

    // 3. Verify the `Login` heading is visible
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  });
});
