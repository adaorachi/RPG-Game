import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class HowToPlayScene extends Phaser.Scene {
  constructor() {
    super('HowToPlay');
  }

  create() {
    this.backButton = new UiButton(
      this,
      this.scale.width / 6,
      this.scale.height * 0.1,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'Option'),
    );
    this.backButton.setScale(0.8);

    const instructions = [
      'Move player around the Fantasy Jungle with the keyboard buttons (UP, DOWN, RIGHT, LEFT).',
      'Fight enemies with the spacebar keyboard button',
      'Destroy enemies to gain points.',
      'Find and take chest to earn points.',
      'Take up inventory items to strenthen defense and resistant to attack.',
      'Remove inventory items that weakens defense and make player prone to attack.',
      'View your inventory stats and other players inventory stats.',
      'Chat with other online players.',
    ];

    this.titleText = this.add.bitmapText(this.scale.width / 2, this.scale.height * 0.1, 'arcade', 'How to Play').setTint(0xffffff);
    this.titleText.setOrigin(0.5);
    this.titleText.setFontSize(18);

    instructions.forEach((instruction, index) => {
      this.add.text(100, 160 + 50 * index, instruction, { fontSize: '20px', fill: '#fff' });
    });
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
