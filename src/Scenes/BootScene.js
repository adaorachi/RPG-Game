// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import * as Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  preload() {
    this.loadImages();
    this.loadSpriteSheets();
    this.loadAudio();
    this.loadTileMap();
  }

  loadImages() {
    this.load.image('button1', 'assets/images/ui/blue_button01.png');
    this.load.image('button2', 'assets/images/ui/blue_button02.png');
    this.load.image('background', 'assets/level/background-extruded.png');
    this.load.bitmapFont('arcade', 'assets/images/arcade.png', 'assets/images/arcade.xml');

    this.load.image('inventoryShield', 'assets/images/condensation_shield_new.png');
    this.load.image('inventoryGold', 'assets/images/gold_pile_16.png');
    this.load.image('inventoryButton', 'assets/images/instructions.png');
    this.load.image('inventorySword', 'assets/images/infusion.png');
    this.load.image('inventoryRemove', 'assets/images/prompt_no.png');
    this.load.image('inventoryHeart', 'assets/images/regeneration_new.png');
  }

  loadSpriteSheets() {
    this.load.spritesheet('items', 'assets/images/items.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('characters', 'assets/images/characters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('monsters', 'assets/images/monsters.png', { frameWidth: 32, frameHeight: 32 });
    this.load.spritesheet('tools', 'assets/images/tools.png', { frameWidth: 32, frameHeight: 32 });
  }

  loadAudio() {
    this.load.audio('goldSound', ['assets/audio/Pickup.wav']);
    this.load.audio('enemyDeath', ['assets/audio/EnemyDeath.wav']);
    this.load.audio('playerAttack', ['assets/audio/PlayerAttack.wav']);
    this.load.audio('playerDamage', ['assets/audio/PlayerDamage.wav']);
    this.load.audio('playerDeath', ['assets/audio/PlayerDeath.wav']);
    this.load.audio('background', ['assets/audio/Background.mp3']);
  }

  loadTileMap() {
    this.load.tilemapTiledJSON('map', 'assets/level/large_level.json');
  }

  create() {
    this.scene.start('Title');
    this.backgroundAudio = this.sound.add('background', { loop: true, volume: 0.1 });
    this.backgroundAudio.play();
  }
}
