// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import { uuid } from 'uuidv4';

export default class ChestModel {
  constructor(x, y, gold, spawnerId) {
    this.id = `${spawnerId}-${uuid()}`;
    this.spawnerId = spawnerId;
    this.x = x;
    this.y = y;
    this.gold = gold;
  }
}