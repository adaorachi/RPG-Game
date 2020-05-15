import * as Phaser from 'phaser';
import io from 'socket.io-client';
import scenes from './scenes/scene';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  // width: 1340,
  height: 630,
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
  pixelArt: true,
  roundPixels: true,
};

class Game extends Phaser.Game {
  constructor() {
    super(config);
    const socket = io(SERVER_URL);
    this.globals = { socket };
    this.scene.start('Boot');
  }
}

window.onload = () => {
  window.game = new Game();
};
