import { test, expect } from '@playwright/test';
/* 
1. I have created global-setup.ts to save the login stage in /LoginAuth.json
2. In playwright.config.ts, I call this global setup
3. All tests using this url will now be authenticated 
*/


test('test1', async ({ page }) => {
  await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  await expect(page.locator('h6')).toHaveText('Dashboard');
});

