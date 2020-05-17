import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class OptionScene extends Phaser.Scene {
  constructor() {
    super('Option');
  }

  create() {
    // create a leaderboard button
    this.leaderboardButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.25,
      'button1',
      'button2',
      'Leaderboard',
      this.startScene.bind(this, 'LeaderBoard'),
    );
    // create a leaderboard button
    this.leaderboardButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.40,
      'button1',
      'button2',
      'How To Play',
      this.startScene.bind(this, 'HowToPlay'),
    );

    // create a start button
    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.65,
      'button1',
      'button2',
      'Start',
      this.startScene.bind(this, 'CharacterSelection'),
    );
  }
  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
