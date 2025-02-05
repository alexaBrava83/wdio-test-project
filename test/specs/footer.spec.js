import LoginPage from '../pageobjects/login.page.js';
import InventoryPage from '../pageobjects/inventory.page.js';

describe('Footer', () => {
    it('Footer Links', async () => {
        await LoginPage.open();
        await LoginPage.login('standard_user', 'secret_sauce');
        await InventoryPage.isLoaded();

        await InventoryPage.clickTwitter();
        const handlesTwitter = await browser.getWindowHandles();
        await expect(handlesTwitter.length).toBeGreaterThan(1);
        await browser.switchToWindow(handlesTwitter[1]);
        const twitterUrl = await browser.getUrl();
        await expect(twitterUrl).toContain('https://x.com/saucelabs?mx=2');
        await browser.closeWindow();
        await browser.switchToWindow(handlesTwitter[0]);

        await InventoryPage.clickFacebook();
        const handlesFacebook = await browser.getWindowHandles();
        await expect(handlesFacebook.length).toBeGreaterThan(1);
        await browser.switchToWindow(handlesFacebook[1]);
        const facebookUrl = await browser.getUrl();
        await expect(facebookUrl).toContain('https://www.facebook.com/saucelabs');
        await browser.closeWindow();
        await browser.switchToWindow(handlesFacebook[0]);

        await InventoryPage.clickLinkedIn();
        const handlesLinkedIn = await browser.getWindowHandles();
        await expect(handlesLinkedIn.length).toBeGreaterThan(1);
        await browser.switchToWindow(handlesLinkedIn[1]);
        const linkedInUrl = await browser.getUrl();
        await expect(linkedInUrl).toContain('https://www.linkedin.com/company/sauce-labs/');
        await browser.closeWindow();
        await browser.switchToWindow(handlesLinkedIn[0]);
    });
});
