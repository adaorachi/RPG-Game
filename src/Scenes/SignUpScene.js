import CredentialsBaseScene from './CredentialsBaseScene';
import {
  createLabel, createInputField, createBrElement,
} from '../utils/utils';

export default class SignUpScene extends CredentialsBaseScene {
  constructor() {
    super('SignUp');
  }

  create() {
    this.createUi('Sign Up', this.signUp.bind(this), 'Back', this.startScene.bind(this, 'Title'));
    this.createUserNameInput();
  }

  createUserNameInput() {
    this.userNameLabel = createLabel('username', 'Username:', 'form-label');
    this.userNameInput = createInputField('text', 'username', 'username', 'login-input', 'Username');

    this.div.append(createBrElement());
    this.div.append(createBrElement());
    this.div.append(this.userNameLabel);
    this.div.append(createBrElement());
    this.div.append(this.userNameInput);
  }

  signUp() {
    this.startScene('Login');
  }
}
