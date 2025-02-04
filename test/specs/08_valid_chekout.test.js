import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';
import CartPage from '../pageobjects/cart.page.js';
import OverviewPage from '../pageobjects/overview.page';
import CompletePage from '../pageobjects/complete.page.js';

describe('Valid Checkout', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });
    
    it('should complete a valid checkout process', async () => {
        // Додавання товару до кошика
        await InventoryPage.addToCart();
        const cartCount = await CartPage.cartBadge.getText();
        expect(cartCount).toBe('1');   

        // Перехід до кошика
        await InventoryPage.cartButton.click();
        await CartPage.isLoaded();
        const cartItemName = await CartPage.cartItemName.getText();
        expect(cartItemName).toBe('Sauce Labs Backpack');

        // Перехід до оформлення замовлення
        await CartPage.checkout();
        await CartPage.checkoutForm.waitForDisplayed();
        await CartPage.fillForm('John', 'Doe', '12345');

        // Перевірка сторінки огляду замовлення
        await OverviewPage.isLoaded();
        const overviewItemName = await CartPage.cartItemName.getText();
        expect(overviewItemName).toBe('Sauce Labs Backpack');
        await OverviewPage.finish();

        // Перевірка сторінки підтвердження замовлення
        await CompletePage.isLoaded();
        const completeMessage = await $('h2').getText();
        expect(completeMessage).toBe('Thank you for your order!');
        await CompletePage.backHome();

        // Перевірка повернення до інвентаря та очищення кошика
        await InventoryPage.isLoaded();
        const cartBadgeExists = await CartPage.cartBadge.isExisting();
        expect(cartBadgeExists).toBe(false);
    });
});
