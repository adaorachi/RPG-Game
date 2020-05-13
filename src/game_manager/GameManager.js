import Spawner from './Spawner';
import Utils from './utils';

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};
    this.playerLocations = [];
    this.chestLocations = {};
    this.monsterLocations = {};
  }

  setup() {
    this.parseMapData();
    this.setupEventListener();
    this.setupSpawners();
    this.spawnPlayer();
  }

  parseMapData() {
    this.mapData.forEach((layer) => {
      if (layer.name === 'player_locations') {
        layer.objects.forEach((obj) => {
          this.playerLocations.push([obj.x, obj.y]);
        });
      } else if (layer.name === 'chest_locations') {
        Utils.extractLocation(layer, this.chestLocations);
      } else if (layer.name === 'monster_locations') {
        Utils.extractLocation(layer, this.monsterLocations);
      }
    });
  }

  setupEventListener() {
  }

  setupSpawners() {
    Object.keys(this.chestLocations).forEach((key) => {
      const config = {
        spawnInterval: 3000,
        limit: 3,
        spawnerType: Utils.spawnerType.CHEST,
        id: `chest-${key}`,
      };

      const spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this),
      );

      this.spawners[spawner.id] = spawner;
      // console.log(this.spawners)
    });
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    console.log(chest);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }

  spawnPlayer() {
    const location = this.playerLocations[Math.floor(Math.random() * this.playerLocations.length)];
    this.scene.events.emit('spawnPlayer', location);
  }
}