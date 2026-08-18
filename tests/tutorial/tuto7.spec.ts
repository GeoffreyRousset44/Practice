import { test, expect } from '@playwright/test';

test('tuto7 - login1', async ({ page }) => {
    await page.goto('https://demo.applitools.com/');
    await page.pause();
    await page.getByRole('textbox', { name: 'Username' }).fill('John');
    await page.getByRole('textbox', { name: 'Password' }).fill('1234');
    await page.getByRole('checkbox', { name: 'Remember Me' }).click();
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page.getByRole('heading', { name: 'Financial Overview' })).toBeVisible();
});

test('tuto7 - login2', async ({ page }) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
   // await page.pause();
    
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

});
