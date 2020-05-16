import * as Phaser from 'phaser';

export default class UiScene extends Phaser.Scene {
  constructor() {
    super('Ui');
  }

  init() {
    // grab a reference to the game scene
    this.gameScene = this.scene.get('Game');
  }

  create() {
    this.setupUiElements();
    this.setupEvents();
  }

  setupUiElements() {
    // create the score text game object
    this.scoreText = this.add.text(35, 8, 'Coins: 0', { fontSize: '16px', fill: '#fff' });
    // create coin icon
    this.coinIcon = this.add.image(15, 15, 'items', 3);

    // create inventory modal
    this.inventoryWindow = new InventoryWindow(this, {
      windowWidth: this.scale.width / 2,
      windowHeight: this.scale.height * 0.8,
      borderAlpha: 1,
      windowAlpha: 0.9,
      debug: false,
      textAlpha: 1,
      windowColor: 0X000000,
    });

    // create inventory button
    this.inventoryButton = this.add.image(50, this.scale.height - 50, 'inventoryButton').setInteractive();
    this.inventoryButton.setScale(2);
    this.inventoryButton.on('pointerdown', () => {
      this.toggleInventory(this.gameScene.player, true);
    });

  }

  setupEvents() {
    // listen for the updateScore event from the game scene
    this.gameScene.events.on('updateScore', (score) => {
      this.scoreText.setText(`Coins: ${score}`);
    });
  }
}
