import Phaser from 'phaser';
import { getScore } from '../apicall/GameAPICall';
import 'regenerator-runtime';

export default class LeaderBoard extends Phaser.Scene {

  constructor() {
    super('LeaderBoard');
  }

  create() {
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
}
