import Phaser from 'phaser';
import Player from '../classes/Player';
import Chest from '../classes/Chest';
import Map from '../classes/Map';
import GameManager from '../game_manager/GameManager';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  init() {
    this.scene.launch('Ui');
    this.score = 0;
  }

  create() {
    this.createMap();
    this.createAudio();
    this.createGroups();
    this.createInput();

    this.createGameManager();
  }

  update() {
    if (this.player) {
      this.player.update(this.cursors);
    }
  }

  createMap() {
    this.map = new Map(this, 'map', 'background', 'background', 'blocked');
  }

  createAudio() {
    this.goldPickUpAudio = this.sound.add('goldSound');
  }

  createPlayer(location) {
    this.player = new Player(this, location[0] * 2, location[1] * 2, 'characters', 0);
  }

  createGroups() {
    this.chests = this.physics.add.group();
  }

  spawnChest(chestObject) {
    const chestDead = this.chests.getFirstDead();
    if (!chestDead) {
      const chest = new Chest(this, chestObject.x * 2, chestObject.y * 2, 'items', 0, chestObject.gold, chestObject.id);
      this.chests.add(chest);
    } else {
      chestDead.coins = chestObject.gold;
      chestDead.id = chestObject.id;
      chestDead.setPosition(chestObject.x * 2, chestObject.y * 2);
      chestDead.makeActive();
    }
  }

  createInput() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  addCollisions() {
    this.physics.add.collider(this.player, this.map.blockedLayer);
    this.physics.add.overlap(this.player, this.chests, this.collectChest, null, this);
  }

  collectChest(player, chest) {
    this.goldPickUpAudio.play();
    this.score += chest.coins;
    this.events.emit('updateScore', this.score);
    chest.makeInactive();
    this.events.emit('pickUpChest', chest.id);
  }

  createGameManager() {
    this.events.on('spawnPlayer', (location) => {
      this.createPlayer(location);
      this.addCollisions();
    });

    this.events.on('chestSpawned', (chest) => {
      this.spawnChest(chest);
    });

    this.gameManager = new GameManager(this, this.map.map.objects);
    this.gameManager.setup();
  }
}