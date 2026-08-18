# OrangeHRM Dashboard Test Plan

**Target:** `https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index`
**Credentials:** `Admin` / `admin123`
**Seed:** `tests/seed.spec.ts`
**Starting state:** blank/fresh — no cookies, no storage state. Scenarios are independent and may run in any order.

## Page model

| Region | Contents |
|---|---|
| Topbar | Header title `Dashboard`, user dropdown (About / Support / Change Password / Logout) |
| Sidebar | Search input + nav: Admin, PIM, Leave, Time, Recruitment, My Info, Performance, Dashboard, Directory, Maintenance, Claim, Buzz |
| Widgets | Time at Work, My Actions, Quick Launch, Buzz Latest Posts, Employees on Leave Today, Employee Distribution by Sub Unit, Employee Distribution by Location |
| Quick Launch | Assign Leave, Leave List, Timesheets, Apply Leave, My Leave, My Timesheet |

## 1. OrangeHRM Dashboard

### 1.1 Dashboard loads after login
**Steps:**
1. Navigate to the login page
2. Fill Username with `Admin` and Password with `admin123`, then submit
3. Verify the URL matches `**/dashboard/index`
4. Verify the topbar header reads `Dashboard`
5. Verify the Quick Launch widget is visible

**Success:** all assertions pass. **Failure:** redirect back to `/auth/login`, or header absent.

### 1.2 Core dashboard widgets are rendered
**Steps:**
1. Log in as Admin
2. Verify each of the seven widget titles is visible

**Note:** *Buzz Latest Posts* and *Employees on Leave Today* are data-dependent — assert the widget container is present, never its row count.

### 1.3 Quick Launch navigates correctly
**Steps:**
1. Log in as Admin
2. Click the Quick Launch "Assign Leave" button
3. Verify the URL contains `/leave/assignLeave` and the header reads `Assign Leave`
4. Navigate back to the dashboard
5. Click the Quick Launch "Apply Leave" button and verify `/leave/applyLeave`

### 1.4 Sidebar navigation from the dashboard
**Steps:**
1. Log in as Admin
2. Click the sidebar `PIM` item and verify `/pim/viewEmployeeList`
3. Click the sidebar `Dashboard` item and verify a return to `/dashboard/index`

### 1.5 Sidebar search filters the menu
**Steps:**
1. Log in as Admin
2. Type `Adm` into the sidebar search input
3. Verify `Admin` is visible and `Buzz` is hidden
4. Clear the input and verify the full menu is restored

### 1.6 Sidebar search with no match
**Steps:**
1. Log in as Admin
2. Type `zzzzz` into the sidebar search input
3. Verify zero menu items are visible

### 1.7 Unauthenticated dashboard access is redirected
**Steps:**
1. Without logging in, navigate directly to `/web/index.php/dashboard/index`
2. Verify the URL lands on `**/auth/login`
3. Verify the `Login` heading is visible

**Failure:** dashboard content renders for an anonymous user.

### 1.8 Invalid credentials are rejected
**Steps:**
1. Navigate to the login page
2. Fill Username with `Admin` and Password with `wrongpassword`, then submit
3. Verify the `Invalid credentials` alert is visible
4. Verify the URL is still `**/auth/login`

### 1.9 Logout from the dashboard
**Steps:**
1. Log in as Admin
2. Open the top-right user dropdown and click `Logout`
3. Verify the URL is `**/auth/login`
4. Navigate back to `/dashboard/index` and verify a redirect to login

## Conventions

- Role-based locators only (`getByRole`, `getByPlaceholder`, `getByText`). No CSS/XPath, no `.oxd-*` class selectors.
- Web-first assertions (`await expect(...)`). No `waitForTimeout`.
- `baseURL` is configured in `playwright.config.ts`; specs use relative paths.
- The demo site resets its data periodically, so assertions are structural rather than value-based.
