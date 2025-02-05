import Page from './page'
class OverviewPage extends Page{

    get pageTitle() {
        return $('#header_container .title');
    }

    get finishButton() {
        return $('[data-test="finish"]')
    };

    async finish() {
        await this.finishButton.click();
    }

    async isLoaded() {
        await this.pageTitle.waitForDisplayed();
    }

    async open() {
        return super.open('/checkout-step-two.html');
    }
    
}

export default new OverviewPage();