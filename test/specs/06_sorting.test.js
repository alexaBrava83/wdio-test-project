import InventoryPage from '../pageobjects/inventory.page';
import LoginPage from '../pageobjects/login.page';

describe('Sorting', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });

    it('should sort products by name (Z to A)', async () => {
        await InventoryPage.selectSorting('za');  // Вибір сортування Z-A
        const firstProduct = await InventoryPage.getFirstProductName();
        const lastProduct = await InventoryPage.getLastProductName();
        expect(firstProduct).toBe('Test.allTheThings() T-Shirt (Red)');
        expect(lastProduct).toBe('Sauce Labs Backpack');
    });

    it('should sort products by name (A to Z)', async () => {
        await InventoryPage.selectSorting('az');  // Вибір сортування A-Z
        const firstProduct = await InventoryPage.getFirstProductName();
        const lastProduct = await InventoryPage.getLastProductName();
        expect(firstProduct).toBe('Sauce Labs Backpack');
        expect(lastProduct).toBe('Test.allTheThings() T-Shirt (Red)');
    });

    it('should sort products by price (low to high)', async () => {
        await InventoryPage.selectSorting('lohi');  // Вибір сортування ціни (низька до високої)
        const prices = await InventoryPage.getProductPrices();
        expect(prices).toEqual([...prices].sort((a, b) => a - b));  
    });

    it('should sort products by price (high to low)', async () => {
        await InventoryPage.selectSorting('hilo');  // Вибір сортування ціни (висока до низької)
        const prices = await InventoryPage.getProductPrices();
        expect(prices).toEqual([...prices].sort((a, b) => b - a));
    });
});
