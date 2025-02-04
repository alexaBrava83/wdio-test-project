import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';


describe('Logout functionality', () => {
    beforeEach(async () => {
        // Логін перед тестом
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
    });

    it('should logout and redirect to the login page', async () => {
        // Перевірка, що користувач знаходиться на сторінці інвентаря
        await expect(InventoryPage.pageTitle).toBeDisplayed();

        // Клік по бургер-меню
        await InventoryPage.openMenu();
        
        // Клік по кнопці Logout
        await InventoryPage.clickLogout();
        
        // Перевірка, чи ми перейшли на сторінку логіну
        await expect(LoginPage.usernameInput).toBeDisplayed();
        
        // Перевірка, чи поля логіну порожні
        await expect(LoginPage.usernameInput).toHaveText('');
        await expect(LoginPage.passwordInput).toHaveText('');
    });
});
