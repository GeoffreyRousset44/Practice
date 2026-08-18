import { Page, Locator } from '@playwright/test';

export class LoginPage {
    private page: Page;
    private username_textbox: Locator;
    private password_textbox: Locator;
    private login_button: Locator;
    private menu_button: Locator;
    private logout_button: Locator;

    constructor(page: Page) {
        this.page = page;
        //login
        this.username_textbox = page.locator('[data-test="username"]');
        this.password_textbox = page.locator('[data-test="password"]');
        this.login_button = page.locator('[data-test="login-button"]');
        //logout
        this.menu_button = page.getByRole('button', { name: 'Open Menu' });
        this.logout_button = page.locator('[data-test="logout-sidebar-link"]');    
    }

    async login(username: string, password: string): Promise<void> {
        await this.username_textbox.fill(username);
        await this.password_textbox.fill(password);
        await this.login_button.click(); 
    }

    async logout(){
        await this.menu_button.click();
        await this.logout_button.click();
    }
}
