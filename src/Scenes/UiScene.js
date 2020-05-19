// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';

export default class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    this.scoreText = this.add.text(45, 8, 'Coins: 0', { fontSize: '36px', fill: '#fff' });
    // create coin icon
    this.coinIcon = this.add.image(15, 15, 'items', 3);
    this.coinIcon.setScale(1.2);
  }

  setupEvents() {
    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }
}