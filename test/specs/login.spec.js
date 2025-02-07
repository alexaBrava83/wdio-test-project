import loginPage from '../pageobjects/login.page.js'
import inventoryPage from '../pageobjects/inventory.page.js'

describe('Login', () => {
    it('Valid Login', async () => {
        
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isLoaded();
    });
    it('Login with invalid password', async () => {
        
        await loginPage.open();
        await loginPage.login('standard_user', 'wrong_password');
        
        await expect(loginPage.usernameErrorIcon).toBeDisplayed();
        await expect(loginPage.passwordErrorIcon).toBeDisplayed();
        
        await expect(loginPage.usernameInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        await expect(loginPage.passwordInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        
        const errorText = await loginPage.getErrorMessage();
        await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });    
    it('Login with invalid login', async () => {
        
        await loginPage.open();
        await loginPage.login('standarD_user', 'secret_sauce');
        
        await expect(loginPage.usernameErrorIcon).toBeDisplayed();
        await expect(loginPage.passwordErrorIcon).toBeDisplayed();
        
        await expect(loginPage.usernameInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        await expect(loginPage.passwordInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        
        const errorText = await loginPage.getErrorMessage();
        await expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });    
    it('Logout', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        await expect(inventoryPage.pageTitle).toBeDisplayed();
        await inventoryPage.openMenu();
        await inventoryPage.clickLogout();
        await expect(loginPage.usernameInput).toBeDisplayed();
        await expect(loginPage.usernameInput).toHaveText('');
        await expect(loginPage.passwordInput).toHaveText('');
    });
});