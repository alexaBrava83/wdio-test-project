import Page from './page'
class CartPage extends Page {
    get pageTitle() {
        return $('#header_container .title');
    }
    get cartItems() { 
        return $$('.cart_item'); 
    }
    get cartBadge() { 
        return $('[data-test="shopping-cart-badge"]'); 
    } 
        
    get continueShoppingButton() { 
        return $('#continue-shopping'); 
    };

    get cartItemName() { 
        return $('[data-test="inventory-item-name"]')
    };

    get checkoutButton() { 
        return $('[data-test="checkout"]')
    };

    get checkoutForm() {
        return $('.checkout_info')
    }; 

    get firstNameInput() { 
        return $('#first-name'); 
    }

    get lastNameInput() { 
        return $('#last-name'); 
    }

    get postalCodeInput() { 
        return $('#postal-code'); 
    }

    get continueButton() {
        return $('[data-test="continue"]')
    };
    get completeMessage() {
        return $('h2');
    }
    get errorMessage() {
        return $('#checkout_info_container .error-message-container');
    }

    async getBadge() {
        return await this.cartBadge.getText();
    }

    async getCartItem() {
        return await this.cartItemName.getText();
    }

    async getCompleteMessage() {
        return await this.completeMessage.getText();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    async fillForm(firstName, lastName, postalCode) {
        await this.firstNameInput.setValue(firstName);
        await this.lastNameInput.setValue(lastName);
        await this.postalCodeInput.setValue(postalCode);
        await this.continueButton.click();
    }

    async isLoaded() {
        await this.pageTitle;
    }

    async checkout() {
        await this.checkoutButton.click();
    }
    
    async getCartItemCount() {
        const items = await this.cartItems;
        return items.length;
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    async open() {
        return super.open('/cart.html');
    }
}

export default new CartPage();
