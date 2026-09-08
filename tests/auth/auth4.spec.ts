import { test, expect } from '@playwright/test';

test('test4-other website', async ({ page }) => {
  await page.goto('https://demo.applitools.com/');
  await page.pause();
  await page.getByRole('textbox', { name: 'Username' }).fill('John');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('checkbox', { name: 'Remember Me' }).click();
  await page.getByRole('link', { name: 'Sign in' }).click();
  await expect(page.getByRole('heading', { name: 'Financial Overview' })).toBeVisible();
});