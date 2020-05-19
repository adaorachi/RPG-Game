// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';
import UiButton from '../classes/UiButton';
import { getScore } from '../apicall/GameAPICall';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import 'regenerator-runtime';

export default class LeaderBoard extends Phaser.Scene {
  constructor() {
    super('LeaderBoard');
  }

  create() {
    // create a back button
    this.backButton = new UiButton(
      this,
      this.scale.width / 6,
      this.scale.height * 0.1,
      'button1',
      'button2',
      'Back',
      this.startScene.bind(this, 'Option'),
    );
    this.backButton.setScale(0.8);

    const removeDuplicates = (array) => {
      const arr = {};
      const reverseArrFormat = [];
      array.forEach((a) => {
        const userSort = a.user;
        if (a.user in arr) {
          if (arr[userSort].score < a.score) {
            arr[userSort] = { score: a.score };
          }
        } else {
          arr[userSort] = { score: a.score };
        }
      });
      Object.entries(arr).forEach((item) => {
        reverseArrFormat.push({ user: item[0], score: item[1].score });
      });
      return reverseArrFormat;
    };


    this.add.bitmapText(100, 110, 'arcade', 'RANK  SCORE   NAME').setTint(0xffffff);
    const displayleaderBoard = (arr) => {
      const array = removeDuplicates(arr);
      for (let i = 0; i < array.length; i += 1) {
        if (array) {
          this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i + 1}      ${array[i].user}    ${array[i].score}`).setTint(0xffffff);
        } else {
          this.add.bitmapText(100, 160 + 50 * i, 'arcade', ` ${i}      0    ---`).setTint(0xffffff);
        }
      }
    };

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
