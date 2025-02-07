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

    get socialLinks() {
        return {
            twitter: $('[data-test="social-twitter"]'),
            facebook: $('[data-test="social-facebook"]'),
            linkedin: $('[data-test="social-linkedin"]')
        };
    }

    get sortDropdown() { 
        return $('[data-test="product-sort-container"]'); 
    } 

    async selectSortingByText(text) {
        await this.sortDropdown.click();
        await this.sortDropdown.selectByVisibleText(text);
    }
       
    async getFirstItemName() {
        const firstItem = await $('.inventory_list .inventory_item');
        return await firstItem.$('.inventory_item_name').getText();
    }
    
    async openSocialLink(platform) {
        await this.socialLinks[platform].click();
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

    async clickCartButton() {
        await this.cartButton.click();
    }

    async clickLogout() {
        await this.logoutButton.click();
    }

    async open() {
        return super.open('/inventory.html');
    }
}

export default new InventoryPage();
