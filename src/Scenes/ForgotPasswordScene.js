import CredentialsBaseScene from './CredentialsBaseScene';

export default class ForgotPasswordScene extends CredentialsBaseScene {
  constructor() {
    super('ForgotPassword');
  }

  create() {
    this.createUi('Reset Password', this.resetPassword.bind(this), 'Back', this.startScene.bind(this, 'Login'));

    this.passwordInput.parentNode.removeChild(this.passwordInput);
    this.passwordLabel.parentNode.removeChild(this.passwordLabel);
  }

  resetPassword() {
    this.startScene('Title');
  }
}
