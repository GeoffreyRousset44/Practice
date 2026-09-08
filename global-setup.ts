import {chromium, Page, Browser, expect} from '@playwright/test';

async function globalSetup () {
    //setup
    const browser: Browser = await chromium.launch({headless: false});
    const context = await browser.newContext();
    const page: Page = await context.newPage();

    //authentication
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();  
    await expect(page.locator('h6')).toHaveText('Dashboard');

    //save the state
    await page.context().storageState({path: "./LoginAuth.json"});

    await browser.close();
}

export default globalSetup;