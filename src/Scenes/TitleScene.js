// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super('Title');
  }

  create() {
    // create title text
    this.titleText = this.add.bitmapText(this.scale.width / 2, this.scale.height * 0.1, 'arcade', 'Final Fantasy RPG').setTint(0xffffff);
    this.titleText.setOrigin(0.5);
    this.titleText.setFontSize(32);


    // create a login button
    this.loginButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Login',
      this.startScene.bind(this, 'Login'),
    );

    // create a sign up button
    this.signUpButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.75,
      'button1',
      'button2',
      'Sign Up',
      this.startScene.bind(this, 'SignUp'),
    );

    this.scale.on('resize', this.resize, this);
    // resize our game
    this.resize({ height: this.scale.height, width: this.scale.width });
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }

  resize(gameSize) {
    const { width, height } = gameSize;

    this.cameras.resize(width, height);

    if (width < 1000) {
      this.titleText.setFontSize(32);
    } else {
      this.titleText.setFontSize(64);
    }

    if (height < 700) {
      this.titleText.setPosition(width / 2, height * 0.4);
      this.loginButton.setPosition(width / 2, height * 0.55);
      this.signUpButton.setPosition(width / 2, height * 0.7);
      this.loginButton.setScale(0.7);
      this.signUpButton.setScale(0.7);
    } else {
      this.titleText.setPosition(width / 2, height / 2);
      this.loginButton.setPosition(width / 2, height * 0.65);
      this.signUpButton.setPosition(width / 2, height * 0.75);
      this.loginButton.setScale(1);
      this.signUpButton.setScale(1);
    }
  }
}
