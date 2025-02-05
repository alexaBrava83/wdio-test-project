import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Login', () => {
    it('Valid Login', async () => {
        
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });
    it('Login with invalid password', async () => {
        
        await LoginPage.open();
        await LoginPage.login('standard_user', 'wrong_password');
        
        await expect(LoginPage.usernameErrorIcon).toBeDisplayed();
        await expect(LoginPage.passwordErrorIcon).toBeDisplayed();
        
        await expect(LoginPage.usernameInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        await expect(LoginPage.passwordInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        
        const errorText = await LoginPage.getErrorMessage();
        await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });    
    it('Login with invalid login', async () => {
        
        await LoginPage.open();
        await LoginPage.login('standarD_user', 'secret_sauce');
        
        await expect(LoginPage.usernameErrorIcon).toBeDisplayed();
        await expect(LoginPage.passwordErrorIcon).toBeDisplayed();
        
        await expect(LoginPage.usernameInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        await expect(LoginPage.passwordInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        
        const errorText = await LoginPage.getErrorMessage();
        await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });    
    it('Logout', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await expect(InventoryPage.pageTitle).toBeDisplayed();
        await InventoryPage.openMenu();
        await InventoryPage.clickLogout();
        await expect(LoginPage.usernameInput).toBeDisplayed();
        await expect(LoginPage.usernameInput).toHaveText('');
        await expect(LoginPage.passwordInput).toHaveText('');
    });
});