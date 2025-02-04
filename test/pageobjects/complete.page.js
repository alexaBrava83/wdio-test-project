class CompletePage {

    get pageTitle() {
        return $('#header_container .title');
    }

    get backHomeButton() {return $('[data-test="back-to-products"]')};


    async backHome() {
        await this.backHomeButton.click();
    }

    async isLoaded() {
        await this.pageTitle;
    }
    
}

export default new CompletePage();