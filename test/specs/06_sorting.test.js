import InventoryPage from '../pageobjects/inventory.page';
import LoginPage from '../pageobjects/login.page';

describe('Sorting', () => {
    before(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });

    beforeEach(async () => {
        if (!(await InventoryPage.isLoaded())) { 
            await LoginPage.open();
            await LoginPage.login('standard_user', 'secret_sauce');
        }
        await browser.refresh(); // Перезавантажуємо сторінку перед кожним тестом
        await InventoryPage.isLoaded();
    });

    it('should verify the first item after sorting by different criteria', async () => {
    
        // za
        await InventoryPage.selectSortingByText('Name (Z to A)'); 
        let firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist();  
        let firstItemName = await firstItem.$('.inventory_item_name').getText();
        expect(firstItemName).toBe('Test.allTheThings() T-Shirt (Red)'); 
    
        // az
        await InventoryPage.selectSortingByText('Name (A to Z)'); 
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist();  
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        expect(firstItemName).toBe('Sauce Labs Backpack');
    
        // lohi
        await InventoryPage.selectSortingByText('Price (low to high)'); 
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist(); 
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        expect(firstItemName).toBe('Sauce Labs Onesie'); 
    
        // hilo
        await InventoryPage.selectSortingByText('Price (high to low)');
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist(); 
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        expect(firstItemName).toBe('Sauce Labs Fleece Jacket'); 
    });
});
