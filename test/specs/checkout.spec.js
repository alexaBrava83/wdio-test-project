import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';
import overviewPage from '../pageobjects/overview.page';
import completePage from '../pageobjects/complete.page.js';

describe('Checkout', () => {
    beforeEach(async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isLoaded();
    });
    it('Valid Checkout', async () => {

        await inventoryPage.addToCart();
        const cartCount = await cartPage.getBadge();
        await expect(cartCount).toBe('1');   

        await inventoryPage.cartButton.click();
        await cartPage.isLoaded();
        const cartItemName = await cartPage.getCartItem();
        await expect(cartItemName).toBe('Sauce Labs Backpack');

        await cartPage.checkout();
        await cartPage.checkoutForm.waitForDisplayed();
        await cartPage.fillForm('John', 'Doe', '12345');

        await overviewPage.isLoaded();
        await expect(cartItemName).toBe('Sauce Labs Backpack');
        await overviewPage.finish();

        await completePage.isLoaded();
        const completeMessage = await cartPage.getCompleteMessage();
        await expect(completeMessage).toBe('Thank you for your order!');
        await completePage.backHome();

        await inventoryPage.isLoaded();
        const cartBadgeExists = await cartPage.cartBadge.isExisting();
        await expect(cartBadgeExists).toBe(false);
    });
    it('Checkout without products', async () => {

        await inventoryPage.clickCartButton();
        await cartPage.isLoaded();
        await cartPage.checkout();
        const errorMessage = await cartPage.getErrorMessage();
        await expect(errorMessage).toBe('Your cart is empty');
    });
});
