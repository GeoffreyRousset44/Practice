import { test, expect } from '@playwright/test';


test('test-expected-to-fail', async ({ page, context }) => {
  await context.clearCookies();
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.locator('h6')).toHaveText('Dashboard');
});
