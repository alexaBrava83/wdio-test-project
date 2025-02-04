import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Footer Links Tests', () => {
    beforeEach(async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();
    });

    it('should open Twitter in a new tab', async () => {
        await InventoryPage.clickTwitter();
        await browser.pause(2000); // Перевіряємо відкриття нового вікна
        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]); // Переходимо у нову вкладку

        const url = await browser.getUrl(); // Отримуємо поточний URL
        expect(url).toContain('https://x.com/saucelabs?mx=2'); // Перевіряємо URL

        await browser.closeWindow(); // Закриваємо вкладку
        await browser.switchToWindow(handles[0]); // Повертаємось на головну
    });

    it('should open Facebook in a new tab', async () => {
        await InventoryPage.clickFacebook();
        await browser.pause(2000);
        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);

        await browser.switchToWindow(handles[1]);

        const url = await browser.getUrl();
        expect(url).toContain('https://www.facebook.com/saucelabs');
    
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });

    it('should open LinkedIn in a new tab', async () => {
        await InventoryPage.clickLinkedIn();
        await browser.pause(2000);
        const handles = await browser.getWindowHandles();
        expect(handles.length).toBeGreaterThan(1);
        
        await browser.switchToWindow(handles[1]);

        const url = await browser.getUrl();
        expect(url).toContain('https://www.linkedin.com/company/sauce-labs/');
    
        await browser.closeWindow();
        await browser.switchToWindow(handles[0]);
    });
});
