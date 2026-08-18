import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';

test.beforeEach(async ({ page }) => {
    const Login = new LoginPage(page);

    await page.goto('https://www.saucedemo.com');
    Login.login('standard_user', 'secret_sauce');
})

test('homepage', async ({ page }) => {
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
})

test('logout', async ({ page }) => {
    const Login = new LoginPage(page);
    await page.locator('[data-test="item-4-title-link"]').click();
    await page.locator('[data-test="add-to-cart"]').click();
    Login.logout();
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
})
