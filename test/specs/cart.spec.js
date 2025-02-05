import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Cart', () => {
    it('Saving the card after logout', async () => {
        
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');

        await InventoryPage.addToCart();
        const cartCountBeforeLogout = await CartPage.cartBadge.getText();
        await expect(cartCountBeforeLogout).toBe('1');   
        await InventoryPage.openMenu();
        await InventoryPage.clickLogout();
        await LoginPage.login('standard_user', 'secret_sauce');
        const cartCountAfterLogin = await CartPage.cartBadge.getText();
        await expect(cartCountAfterLogin).toBe('1');
    });
});
