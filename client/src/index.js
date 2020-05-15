import Phaser from 'phaser';
import scenes from './scenes/scene';
// import config from './config/config';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  // width: 1340,
  height: 630,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      gravity: {
        y: 0,
      },
    },
  },
  pixelArt: true,
  roundPixels: true,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    this.scene.start('Boot');
  }
}

window.onload = () => {
  window.game = new Game();
};