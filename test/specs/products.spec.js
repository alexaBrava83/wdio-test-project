import InventoryPage from '../pageobjects/inventory.page';
import LoginPage from '../pageobjects/login.page';

describe('Products', () => {

    it('Sorting', async () => {
        
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();

        await InventoryPage.selectSortingByText('Name (Z to A)'); 
        let firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist();  
        let firstItemName = await firstItem.$('.inventory_item_name').getText();
        await expect(firstItemName).toBe('Test.allTheThings() T-Shirt (Red)'); 
    
        await InventoryPage.selectSortingByText('Name (A to Z)'); 
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist();  
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        await expect(firstItemName).toBe('Sauce Labs Backpack');
    
        await InventoryPage.selectSortingByText('Price (low to high)'); 
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist(); 
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        await expect(firstItemName).toBe('Sauce Labs Onesie'); 
    
        await InventoryPage.selectSortingByText('Price (high to low)');
        firstItem = await $('.inventory_list .inventory_item');
        await firstItem.waitForExist(); 
        firstItemName = await firstItem.$('.inventory_item_name').getText();
        await expect(firstItemName).toBe('Sauce Labs Fleece Jacket'); 
    });
});
