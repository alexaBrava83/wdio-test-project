class LoginPage {
    get usernameInput() { return $('#user-name'); }
    get passwordInput() { return $('#password'); }
    get loginButton() { return $('#login-button'); }
    // Селектори для елементів помилки
    get errorMessage() { return $('[data-test="error"]'); }  // Повідомлення про помилку
    get usernameErrorIcon() { return $('#user-name ~ svg'); } // Іконка "X" для логіну
    get passwordErrorIcon() { return $('#password ~ svg'); } // Іконка "X" для паролю

    

    // Метод для відкриття сторінки
    async open() {
        await browser.url('https://www.saucedemo.com');
    }

    // Метод для логіну
    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    // Метод для отримання тексту повідомлення про помилку
    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    // Метод для отримання кольору кордону полів
    async getInputBorderColor(inputField) {
        return await inputField.getCSSProperty('border-color');
    }

    // Метод для перевірки наявності значка "X" на полях
    async hasErrorIcon(inputField) {
        const errorIcon = await inputField.$('svg');  // припустимо, що іконка "X" є svg елементом
        return await errorIcon.isDisplayed();
    }
}

export default new LoginPage();
