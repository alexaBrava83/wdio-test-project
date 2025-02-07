import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';
import cartPage from '../pageobjects/cart.page.js';

describe('Cart', () => {
    it('Saving the card after logout', async () => {
        
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');

        await inventoryPage.addToCart();
        const cartCountBeforeLogout = await cartPage.getBadge();
        await expect(cartCountBeforeLogout).toBe('1');   
        await inventoryPage.openMenu();
        await inventoryPage.clickLogout();
        await loginPage.login('standard_user', 'secret_sauce');
        const cartCountAfterLogin = await cartPage.getBadge();
        await expect(cartCountAfterLogin).toBe('1');
    });
});
