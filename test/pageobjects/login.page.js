import Page from './page'
class LoginPage extends Page {
    get usernameInput() { 
        return $('#user-name'); 
    }
    get passwordInput() { 
        return $('#password'); 
    }
    get loginButton() { 
        return $('#login-button'); 
    }
    get errorMessage() { 
        return $('[data-test="error"]'); 
    }  
    get usernameErrorIcon() { 
        return $('#user-name ~ svg'); 
    } 
    get passwordErrorIcon() { 
        return $('#password ~ svg'); 
    } 

   async open() {
        return super.open('');
    }

    async login(username, password) {
        await this.usernameInput.setValue(username);
        await this.passwordInput.setValue(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.getText();
    }

    async getInputBorderColor(inputField) {
        return await inputField.getCSSProperty('border-color');
    }

    async hasErrorIcon(inputField) {
        const errorIcon = await inputField.$('svg');  
        return await errorIcon.isDisplayed();
    }
}

export default new LoginPage();
