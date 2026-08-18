import { test, expect } from '@playwright/test';
test('tuto3',async ({page}) => {
await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
await expect(page).toHaveTitle('Practice Page');



})