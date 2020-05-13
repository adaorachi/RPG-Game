import Phaser from 'phaser';
// import config from './config/config';
import BootScene from './scenes/BootScene';
import TitleScene from './scenes/TitleScene';
import GameScene from './scenes/GameScene';
import UiScene from './scenes/UiScene';
// import OptionsScene from './scenes/OptionsScene';
// import CreditsScene from './scenes/CreditsScene';
// import PreloaderScene from './scenes/PreloaderScene';

// class Game extends Phaser.Game {
//   constructor() {
//     super(config);
//     this.scene.add('Boot', BootScene);
//     this.scene.add('Preloader', PreloaderScene);
//     this.scene.add('Title', TitleScene);
//     this.scene.add('Options', OptionsScene);
//     this.scene.add('Credits', CreditsScene);
//     this.scene.add('Game', GameScene);
//     this.scene.start('Game');
//   }
// }

// window.game = new Game();

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [
    BootScene,
    TitleScene,
    GameScene,
    UiScene,
  ],
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

const game = new Phaser.Game(config);