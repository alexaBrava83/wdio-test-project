import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import OverviewPage from '../pageobjects/overview.page';
import CompletePage from '../pageobjects/complete.page.js';

describe('Checkout', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });
    it('Valid Checkout', async () => {

        await InventoryPage.addToCart();
        const cartCount = await CartPage.cartBadge.getText();
        await expect(cartCount).toBe('1');   

        await InventoryPage.cartButton.click();
        await CartPage.isLoaded();
        const cartItemName = await CartPage.cartItemName.getText();
        await expect(cartItemName).toBe('Sauce Labs Backpack');

        await CartPage.checkout();
        await CartPage.checkoutForm.waitForDisplayed();
        await CartPage.fillForm('John', 'Doe', '12345');

        await OverviewPage.isLoaded();
        const overviewItemName = await CartPage.cartItemName.getText();
        await expect(overviewItemName).toBe('Sauce Labs Backpack');
        await OverviewPage.finish();

        await CompletePage.isLoaded();
        const completeMessage = await $('h2').getText();
        await expect(completeMessage).toBe('Thank you for your order!');
        await CompletePage.backHome();

        await InventoryPage.isLoaded();
        const cartBadgeExists = await CartPage.cartBadge.isExisting();
        await expect(cartBadgeExists).toBe(false);
    });
    it('Checkout without products', async () => {

        await InventoryPage.cartButton.click();
        await CartPage.isLoaded();
        await CartPage.checkout();
        const errorMessage = await $('#checkout_info_container .error-message-container');
        await expect(await errorMessage.getText()).toBe('Your cart is empty');
    });
});
