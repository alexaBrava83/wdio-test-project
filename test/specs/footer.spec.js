import loginPage from '../pageobjects/login.page.js';
import inventoryPage from '../pageobjects/inventory.page.js';

describe('Footer', () => {
    it('Footer Links', async () => {
        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
        await inventoryPage.isLoaded();

        const footerLinks = [
            { platform: 'twitter', expectedUrl: 'https://x.com/saucelabs?mx=2' },
            { platform: 'facebook', expectedUrl: 'https://www.facebook.com/saucelabs' },
            { platform: 'linkedin', expectedUrl: 'https://www.linkedin.com/company/sauce-labs/' }
        ];

        for (const link of footerLinks) {
            await inventoryPage.openSocialLink(link.platform);
            const handles = await browser.getWindowHandles();

            await expect(handles.length).toBeGreaterThan(1);

            await browser.switchToWindow(handles[1]);
            const url = await browser.getUrl();
            await expect(url).toContain(link.expectedUrl);

            await browser.closeWindow();
            await browser.switchToWindow(handles[0]);
        }
    });
});
