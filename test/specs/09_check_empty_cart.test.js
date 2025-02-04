import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';

describe('Checkout without products', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });
    it('should show an empty cart error message', async () => {
        await InventoryPage.cartButton.click();
        await CartPage.isLoaded();
        await CartPage.checkout();
        const errorMessage = await $('#checkout_info_container .error-message-container');
        expect(await errorMessage.getText()).toBe('Your cart is empty');
    });
})