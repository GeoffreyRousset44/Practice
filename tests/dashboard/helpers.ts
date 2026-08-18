import { Page, expect } from '@playwright/test';

export const ADMIN_USERNAME = 'Admin';
export const ADMIN_PASSWORD = 'admin123';

/**
 * Logs in as the demo Admin user and waits for the dashboard to settle.
 */
export async function loginAsAdmin(page: Page): Promise<void> {
  await page.goto('/web/index.php/auth/login');
  await page.getByPlaceholder('Username').fill(ADMIN_USERNAME);
  await page.getByPlaceholder('Password').fill(ADMIN_PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL(/\/dashboard\/index/);
}
