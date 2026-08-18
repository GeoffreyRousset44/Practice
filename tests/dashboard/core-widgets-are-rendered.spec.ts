// spec: specs/dashboard-test-plan.md
// seed: tests/seed.spec.ts

import { test, expect } from '@playwright/test';
import { loginAsAdmin } from './helpers';

const WIDGET_TITLES = [
  'Time at Work',
  'My Actions',
  'Quick Launch',
  'Buzz Latest Posts',
  'Employees on Leave Today',
  'Employee Distribution by Sub Unit',
  'Employee Distribution by Location',
];

test.describe('OrangeHRM Dashboard', () => {
  test('Core dashboard widgets are rendered', async ({ page }) => {
    // 1. Log in as Admin
    await loginAsAdmin(page);

    // 2. Verify each of the seven widget titles is visible
    // Data-dependent widgets are asserted on their title only, never on row counts.
    for (const title of WIDGET_TITLES) {
      await expect(page.getByText(title, { exact: true })).toBeVisible();
    }
  });
});
