import LoginPage from '../pageobjects/login.page.js';

describe('Login Tests', () => {
    it('should display error message, highlight fields in red, and show error icons with invalid credentials', async () => {
        await LoginPage.open();
    
        await LoginPage.login('standarD_user', 'secret_sauce');
        
        await expect(LoginPage.usernameErrorIcon).toBeDisplayed();
        await expect(LoginPage.passwordErrorIcon).toBeDisplayed();
        
        await expect(LoginPage.usernameInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        await expect(LoginPage.passwordInput).toHaveStyle({'border-bottom-color': 'rgba(226,35,26,1)'});
        
        const errorText = await LoginPage.getErrorMessage();
        expect(errorText).toContain('Epic sadface: Username and password do not match any user in this service');
    });    
      
});
