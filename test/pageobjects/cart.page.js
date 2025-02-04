class CartPage {
    get pageTitle() {
        return $('#header_container .title');
    }
    // Елементи картки
    get cartItems() { return $$('.cart_item'); }
    get cartBadge() { return $('.shopping_cart_badge'); } // Індикація кількості товарів в кошику
    get continueShoppingButton() { return $('#continue-shopping'); };

    get cartItemName() { return $('[data-test="inventory-item-name"]')};
    get checkoutButton() { return $('[data-test="checkout"]')};
    get checkoutForm() {return $('.checkout_info')}; 

    get firstNameInput() { return $('#first-name'); }
    get lastNameInput() { return $('#last-name'); }
    get postalCodeInput() { return $('#postal-code'); }
    get continueButton() {return $('[data-test="continue"]')};



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
    

    // Перевірка кількості товарів в кошику
    async getCartItemCount() {
        const items = await this.cartItems;
        return items.length;
    }

    // Перехід до покупки інших товарів
    async continueShopping() {
        await this.continueShoppingButton.click();
    }
}

export default new CartPage();
