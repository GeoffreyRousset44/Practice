import { test, expect } from '@playwright/test';

test('test2', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.locator('h6')).toHaveText('Dashboard');
  await page.getByText('(1) Pending Self Review').click();
  await expect(page.getByText('HR Manager')).toBeVisible;
});
