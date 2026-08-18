import { test, expect } from '@playwright/test';

let context;
let page;
test.beforeAll(async ({ browser }) => {
    context =  await browser.newContext();
     await context .tracing.start({
        screenshots: true,
        snapshots: true
    });
    page = await context.newPage();
});
test.afterAll(async () => {
    await context.tracing.stop({ path: 'test6.zip' });
});

test('tuto6', async ({}) => {
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    await page.getByRole('textbox', { name: 'Username' }).click();
    await page.getByRole('textbox', { name: 'Username' }).fill('Admin');
    await page.getByRole('textbox', { name: 'Username' }).press('Tab');
    /* await context.tracing.start({
         screenshots: true,
         snapshots: true
     });*/
    await page.getByRole('textbox', { name: 'Password' }).fill('admin123');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('h6')).toHaveText('Dashboard');

    //await context.tracing.stop({ path: 'test6.zip' });

});