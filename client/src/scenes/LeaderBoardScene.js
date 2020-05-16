import Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import { getScore } from '../apicall/GameAPICall';
import 'regenerator-runtime';

export default class LeaderBoard extends Phaser.Scene {

  constructor() {
    super('LeaderBoard');
  }

  create() {
    // create a back button
    this.loginButton = new UiButton(
      this,
      this.scale.width / 6,
      this.scale.height * 0.1,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'About'),
    );

    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    const displayleaderBoard = (array) => {
      for (let i = 1; i < array.length; i++) {
        if (array) {
          this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      ${array[i].score}    ${array[i].user}`).setTint(0xffffff);
        } else {
          this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
        }
      }
    }

    const sortScore = (x) => {
      const newArray = x;
      const sliceArray = newArray.sort((x, y) => y.score - x.score).slice(0, 10);
      displayleaderBoard(sliceArray);
    };

    const apiScoreResponse = () => {
      getScore()
        .then(x => {
          sortScore(x);
        })
        .catch((err) => `${err}`);
    };
    apiScoreResponse();
  }

  startScene(targetScene) {
    this.scene.start(targetScene);
  }
}
