// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Logout from the dashboard', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Open the top-right user dropdown and click `Logout`
    // The dropdown entries expose role=menuitem (not link), and several
    // "profile picture" images exist elsewhere on the dashboard, so the
    // trigger is scoped to the banner.
    await page.getByRole('banner').getByRole('img', { name: 'profile picture' }).click();
    await page.getByRole('menuitem', { name: 'Logout' }).click();

    // 3. Verify the URL is `**/auth/login`
    await expect(page).toHaveURL(/\/auth\/login/);

    // 4. Navigate back to `/dashboard/index` and verify a redirect to login
    await page.goto('/web/index.php/dashboard/index');
    await expect(page).toHaveURL(/\/auth\/login/);
  });
});
