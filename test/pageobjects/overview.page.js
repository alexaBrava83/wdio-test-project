class OverviewPage {

    get pageTitle() {
        return $('#header_container .title');
    }

    get finishButton() {return $('[data-test="finish"]')};


    async finish() {
        await this.finishButton.click();
    }

    async isLoaded() {
        await this.pageTitle.waitForDisplayed();
    }
    
}

export default new OverviewPage();