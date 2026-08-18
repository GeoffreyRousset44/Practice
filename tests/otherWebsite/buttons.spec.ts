import { test, expect } from "@playwright/test";

test('Buttons Test', async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    //test1
    await page.locator('input[value="radio1"]').click();

    //test2
    await page.getByPlaceholder('Type to Select Countries').fill('fra');
    await page.getByText('France' ,{ exact: true }).click();

    //test3
    await page.locator('#dropdown-class-example').selectOption('option2');
   

    //test4
    await page.locator('input[value="option3"]').click();

    await page.waitForTimeout(2000);
});
