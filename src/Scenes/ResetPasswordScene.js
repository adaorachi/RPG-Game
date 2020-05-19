import CredentialsBaseScene from './CredentialsBaseScene';
import {
  createLabel, createInputField, createBrElement,
} from '../utils/utils';

export default class ResetPasswordScene extends CredentialsBaseScene {
  constructor() {
    super('ResetPassword');
  }

  create() {
    this.createUi('Update Password', this.updatePassword.bind(this), 'Back', this.startScene.bind(this, 'Title'));
  }

  createVerifyPasswordInput() {
    this.verifyPasswordLabel = createLabel('verifiedPassword', 'Verify Password:', 'form-label');
    this.verifyPasswordInput = createInputField('password', 'verifiedPassword', 'verifiedPassword', 'login-input');

    this.div.append(createBrElement());
    this.div.append(createBrElement());
    this.div.append(this.verifyPasswordLabel);
    this.div.append(createBrElement());
    this.div.append(this.verifyPasswordInput);
  }

  updatePassword() {
    this.startScene('Title');
  }
}
