import LoginPage from '../pageobjects/login.page.js'
import InventoryPage from '../pageobjects/inventory.page.js'

describe('Login Tests', () => {
    it('should login successfully with valid credentials', async () => {
        await LoginPage.open();

        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.isLoaded();
    });
});
