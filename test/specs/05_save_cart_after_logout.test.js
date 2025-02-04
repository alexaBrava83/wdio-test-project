import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Saving the card after logout', () => {
    beforeEach(async () => {
        await browser.url('https://www.saucedemo.com/');
        await LoginPage.login('standard_user', 'secret_sauce');
    });
    it('should retain cart items after logging out and back in', async () => {

        await InventoryPage.addToCart();

        // Перевіряємо, чи індикатор кошика містить 1 товар
        const cartCountBeforeLogout = await CartPage.cartBadge.getText();
        console.log('Cart count before logout:', cartCountBeforeLogout); // Має бути 1
        expect(cartCountBeforeLogout).toBe('1');   

        await InventoryPage.openMenu();
        await InventoryPage.clickLogout();

        await LoginPage.login('standard_user', 'secret_sauce');

        const cartCountAfterLogin = await CartPage.cartBadge.getText();
        console.log('Cart count after login:', cartCountAfterLogin); // Має бути 1
        expect(cartCountAfterLogin).toBe('1');
    });
});
