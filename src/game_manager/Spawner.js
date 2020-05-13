import ChestModel from './ChestModel';
import MonsterModel from './MonsterModel';
import Utils from './utils';

export default class Spawner {
  constructor(config, spawnLocations, addObject, deleteObject) {
    this.id = config.id;
    this.spawnInterval = config.spawnInterval;
    this.limit = config.limit;
    this.objectType = config.spawnerType;
    this.spawnLocations = spawnLocations;
    this.addObject = addObject;
    this.deleteObject = deleteObject;

    this.objectsCreated = [];

    this.start();
  }

  start() {
    this.interval = setInterval(() => {
      if (this.objectsCreated < this.limit) {
        this.spawnObject();
      }
    }, this.spawnInterval);
  }

  spawnObject() {
    if (this.objectType === Utils.spawnerType().CHEST) {
      this.spawnChest();
    } else if (this.objectType === Utils.spawnerType().MONSTER) {
      this.spawnMonster();
    }
  }

  spawnChest() {
    const location = this.pickRandomLocation();
    const chest = new ChestModel(location[0], location[1], Utils.randomNumber(10, 20), this.id);
    this.objectsCreated.push(chest);
    this.addObject(chest.id, chest);
  }

  spawnMonster() {
    const location = this.pickRandomLocation();
    const monster = new MonsterModel(
      location[0],
      location[1],
      Utils.randomNumber(10, 20),
      this.id,
      Utils.randomNumber(0, 20),
      Utils.randomNumber(3, 5),
      1,
    );
    this.objectsCreated.push(monster);
    this.addObject(monster.id, monster);
  }

  pickRandomLocation() {
    const location = this.spawnLocations[Math.floor(Math.random() * this.spawnLocations.length)];
    const invalidLocation = this.objectsCreated.some((obj) => {
      if (obj.x === location[0] && obj.y === location[1]) {
        return true;
      }
      return false;
    });
    if (invalidLocation) return this.pickRandomLocation();
    return location;
  }

  removeObject(id) {
    this.objectsCreated = this.objectsCreated.filter(obj => obj.id !== id);
    this.deleteObject(id);
  }
}