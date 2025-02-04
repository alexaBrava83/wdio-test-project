class InventoryPage {
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

       // Селектори кнопок соцмереж у футері
       get twitterLink() {
        return $('[data-test="social-twitter"]');
    }

    get facebookLink() {
        return $('[data-test="social-facebook"]');
    }

    get linkedinLink() {
        return $('[data-test="social-linkedin"]');
    }

    get productNames() { 
        return $$('[data-test="inventory-item-name"]'); 
    }   
    get productPrices() { 
        return $$('[data-test="inventory-item-price"]'); 
    } 
    
    get sortDropdown() { 
        return $('[data-test="product-sort-container"]'); 
    } 

    get optionAZ() {
        return $('option[value="az"]');  
    }

    get optionZA() {
        return $('option[value="za"]'); 
    }

    get optionLowToHigh() {
        return $('option[value="lohi"]');  
    }

    get optionHighToLow() {
        return $('option[value="hilo"]');  
    }

    async selectSorting(option) {
        await this.sortDropdown.selectByAttribute('value', option);

        if (option === 'az') {
            await this.optionAZ.click();  
        } else if (option === 'za') {
            await this.optionZA.click();  
        } else if (option === 'lohi') {
            await this.optionLowToHigh.click();  
        } else if (option === 'hilo') {
            await this.optionHighToLow.click();  
        } else {
            throw new Error('Unknown sorting option: ' + option);
        }
    }
    
    async getProductNames() {
        await this.productNames[0].waitForDisplayed();
        return await Promise.all(this.productNames.map(async item => await item.getText()));
    }

    async getProductPrices() {
        return await Promise.all(this.productPrices.map(async item => {
            let priceText = await item.getText();
            return parseFloat(priceText.replace('$', ''));
        }));
    }
    
    async getFirstProductName() {
        const names = await this.getProductNames();
        return names[0];  // Отримуємо перший елемент списку
    }
    
    async getLastProductName() {
        const names = await this.getProductNames();
        return names[names.length - 1];  // Отримуємо останній елемент списку
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
        await this.pageTitle;
    }
    

    async clickLogout() {
        await this.logoutButton.click();
    }
}

export default new InventoryPage();
