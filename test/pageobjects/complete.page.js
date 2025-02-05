import Page from './page'
class CompletePage extends Page {

    get pageTitle() {
        return $('#header_container .title');
    }

    get backHomeButton() {
        return $('[data-test="back-to-products"]')
    };

    async backHome() {
        await this.backHomeButton.click();
    }

    async isLoaded() {
        await this.pageTitle;
    }

    async open() {
        return super.open('/checkout-complete.html');
    }
    
}

export default new CompletePage();