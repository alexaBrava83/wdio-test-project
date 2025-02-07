import inventoryPage from '../pageobjects/inventory.page';
import loginPage from '../pageobjects/login.page';

describe('Products', () => {

    it('Sorting', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isLoaded();

        const sortingTests = [
            { option: 'Name (Z to A)', expectedFirst: 'Test.allTheThings() T-Shirt (Red)' },
            { option: 'Name (A to Z)', expectedFirst: 'Sauce Labs Backpack' },
            { option: 'Price (low to high)', expectedFirst: 'Sauce Labs Onesie' },
            { option: 'Price (high to low)', expectedFirst: 'Sauce Labs Fleece Jacket' }
        ];

        for (const testCase of sortingTests) {
            await inventoryPage.selectSortingByText(testCase.option);
            const firstItemName = await inventoryPage.getFirstItemName();
            expect(firstItemName).toBe(testCase.expectedFirst);
        }
    });
});
