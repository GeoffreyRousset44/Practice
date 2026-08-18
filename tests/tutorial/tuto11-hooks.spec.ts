import { test, expect } from '@playwright/test';

test.describe('All my tests', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com')
        await page.locator('[data-test="username"]').fill('standard_user');
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
    })

    test('homepage', async ({ page }) => {
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.locator('[data-test="add-to-cart"]').click();
    })

    test('logout', async ({ page }) => {
        await page.locator('[data-test="item-4-title-link"]').click();
        await page.locator('[data-test="add-to-cart"]').click();
        await page.getByRole('button', { name: 'Open Menu' }).click();
        await page.locator('[data-test="logout-sidebar-link"]').click();
        await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    })
})