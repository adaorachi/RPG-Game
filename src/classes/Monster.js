// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';

export default class Monster extends Phaser.Physics.Arcade.Image {
  constructor(scene, x, y, key, frame, id, health, maxHealth) {
    super(scene, x, y, key, frame);

    this.scene = scene;
    this.id = id;
    this.health = health;
    this.maxHealth = maxHealth;

    this.scene.physics.world.enable(this);
    this.setImmovable(false);
    this.setScale(2);
    this.setCollideWorldBounds(true);
    this.scene.add.existing(this);

    this.setOrigin(0);

    this.createHealthBar();
  }

  createHealthBar() {
    this.healthBar = this.scene.add.graphics();
    this.updateHealthBar();
  }

  updateHealthBar() {
    this.healthBar.clear();
    this.healthBar.fillStyle(0xffffff, 1);
    this.healthBar.fillRect(this.x, this.y - 8, 64, 10);
    const remainingHealth = 64 * (this.health / this.maxHealth);

    if (this.health <= 1) {
      this.healthBar.fillGradientStyle(0xff0000, 0xffffff, 4);
    } else {
      this.healthBar.fillGradientStyle(0x37823c, 0xffffff, 4);
    }
    this.healthBar.fillRect(this.x, this.y - 8, remainingHealth, 10);
  }

  updateHealth(health) {
    this.health = health;
    this.updateHealthBar();
  }

  makeActive() {
    this.setActive(true);
    this.setVisible(true);
    this.body.checkCollision.none = false;
    this.updateHealthBar();
  }

  makeInactive() {
    this.setActive(false);
    this.setVisible(false);
    this.body.checkCollision.none = true;
    this.healthBar.clear();
  }

  update() {
    this.updateHealthBar();
  }
}
