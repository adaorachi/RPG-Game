import * as Phaser from 'phaser';
import scenes from './scenes/scenes';

const config = {
  type: Phaser.AUTO,
  scene: scenes,
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      gravity: {
        y: 0,
      },
    },
  },
  scale: {
    width: '100%',
    height: '100%',
    mode: Phaser.Scale.RESIZE,
    parent: 'phaser-game',
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
