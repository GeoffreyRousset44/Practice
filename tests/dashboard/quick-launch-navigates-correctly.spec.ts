// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

test.describe('OrangeHRM Dashboard', () => {
  test('Quick Launch navigates correctly', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Click the Quick Launch "Assign Leave" button
    await page.getByRole('button', { name: 'Assign Leave' }).click();

    // 3. Verify the URL contains `/leave/assignLeave` and the header reads `Assign Leave`
    await expect(page).toHaveURL(/\/leave\/assignLeave/);
    await expect(page.getByRole('heading', { name: 'Assign Leave' })).toBeVisible();

    // 4. Navigate back to the dashboard
    await page.goto('/web/index.php/dashboard/index');
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // 5. Click the Quick Launch "Apply Leave" button and verify `/leave/applyLeave`
    await page.getByRole('button', { name: 'Apply Leave' }).click();
    await expect(page).toHaveURL(/\/leave\/applyLeave/);
  });
});
