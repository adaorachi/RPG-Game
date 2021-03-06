// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import { uuid } from 'uuidv4';

export default class PlayerModel {
  constructor(spawnLocations) {
    this.health = 10;
    this.maxHealth = 10;
    this.gold = 0;
    this.id = `player-${uuid()}`;

    this.spawnLocations = spawnLocations;
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    [this.x, this.y] = location;
  }

  updateGold(gold) {
    this.gold += gold;
  }

  updateHealth(health) {
    this.health += health;
    if (this.health > 10) this.health = 10;
  }

  respawn() {
    this.health = this.maxHealth;
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    [this.x, this.y] = location;
  }
}