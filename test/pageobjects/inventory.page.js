import Page from './page'
class InventoryPage extends Page {
    get pageTitle() {
        return $('#header_container .title');
    }

    get addToCartButton() { 
        return $('[data-test="add-to-cart-sauce-labs-backpack"]'); 
    }    

    get burgerButton() {
        return $('#react-burger-menu-btn');
    }

    get logoutButton() {
        return $('#logout_sidebar_link');
    }

    get cartButton() { 
        return $('#shopping_cart_container'); 
    }

    get twitterLink() {
        return $('[data-test="social-twitter"]');
    }

    get facebookLink() {
        return $('[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('[data-test="social-linkedin"]');
    }

    get sortDropdown() { 
        return $('[data-test="product-sort-container"]'); 
    } 

    async selectSortingByText(text) {
        await this.sortDropdown.waitForDisplayed();
        await this.sortDropdown.click();
        const option = await $(`option*=${text}`);
        await option.click();
    }

    async waitForSortingToApply(expectedFirstItem = null) {
        await browser.waitUntil(async () => {
            const firstProduct = await this.getFirstProductName();
            if (expectedFirstItem) {
                return firstProduct === expectedFirstItem;
            }
            return true; 
        }, { timeout: 5000, timeoutMsg: 'Sorting did not apply in time' });
    }
    
    async clickTwitter() {
        await this.twitterLink.click();
    }

    async clickFacebook() {
        await this.facebookLink.click();
    }

    async clickLinkedIn() {
        await this.linkedinLink.click();
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async openMenu() {
        await this.burgerButton.click();
    }

    async isLoaded() {
        try {
            return await this.pageTitle.waitForDisplayed({ timeout: 2000 });
        } catch (error) {
            return false;
        }
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async open() {
        return super.open('/inventory.html');
    }
}

export default new InventoryPage();
