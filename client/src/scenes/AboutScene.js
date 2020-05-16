import * as Phaser from 'phaser';
import UiButton from '../classes/UiButton';

export default class AboutScene extends Phaser.Scene {
  constructor() {
    super('About');
  }

  create() {
    // create a leaderboard button
    this.leaderboardButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.35,
      'button1',
      'button2',
      'Leaderboard',
      this.startScene.bind(this, 'LeaderBoard'),
    );

    // create a start button
    this.startGameButton = new UiButton(
      this,
      this.scale.width / 2,
      this.scale.height * 0.50,
      'button1',
      'button2',
      'Start',
      this.startScene.bind(this, 'Game'),
    );
  }
  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
