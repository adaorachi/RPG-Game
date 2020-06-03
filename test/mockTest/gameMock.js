// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';

const gameConfig = () => {
  const config = {
    type: Phaser.AUTO,
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
    scene: [
      'BootScene',
      'TitleScene',
      'OptionScene',
      'HowToPlayScene',
      'LeaderBoardScene',
      'GameScene',
      'UiScene',
      'LoginScene',
      'SignUpScene',
      'ForgotPasswordScene',
      'ResetPasswordScene',
      'CharacterSelectionScene',
    ],
    pixelArt: true,
    roundPixels: true,
  };

  const game = new Phaser.Game(config);
  return game;
};

export default gameConfig;
