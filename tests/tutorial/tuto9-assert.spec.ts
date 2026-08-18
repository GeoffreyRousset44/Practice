import { test, expect } from '@playwright/test';

test('tuto9', async ({ page }) => {
    await page.goto('https://kitchen.applitools.com/');
    //await page.pause();
    
    await expect(page.getByRole('heading', { name: 'The Kitchen' })).toHaveCount(1);
    
    
    /*if (await kitchen.count() > 0) {
        await kitchen.first().click();
    }
*/
    const kitchen = page.locator('text=The Kitchen');
   // await expect.soft(kitchen).toBeHidden();
    await expect(kitchen).toBeVisible();
    await expect(kitchen).toBeEnabled();
   // await expect.soft(kitchen).toBeDisabled();

    await expect(kitchen).toHaveText('The Kitchen');
    await expect(kitchen).not.toHaveText('Bondou');
    await expect(page).toHaveURL('https://kitchen.applitools.com/');
    await expect(page).toHaveTitle('The Kitchen');
   // await expect(page).toHaveScreenshot();
})