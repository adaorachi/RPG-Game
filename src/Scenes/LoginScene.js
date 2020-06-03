import CredentialsBaseScene from './CredentialsBaseScene';

export default class LoginScene extends CredentialsBaseScene {
  constructor() {
    super('Login');
  }

  create() {
    this.createUi('Login', this.login.bind(this), 'Forgot Password', this.startScene.bind(this, 'ForgotPassword'), 'Back', this.startScene.bind(this, 'Title'));
  }

  login() {
    this.startScene('Option');
  }
}
