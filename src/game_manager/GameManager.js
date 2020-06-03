import Spawner from './Spawner';
import Utils from './utils';
import PlayerModel from './PlayerModel';

export default class GameManager {
  constructor(scene, mapData) {
    this.scene = scene;
    this.mapData = mapData;

    this.spawners = {};
    this.chests = {};
    this.monsters = {};
    this.players = {};
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
    this.scene.events.on('pickUpChest', (chestId, playerId) => {
      if (this.chests[chestId]) {
        const { gold } = this.chests[chestId];
        this.players[playerId].updateGold(gold);
        this.scene.events.emit('updateScore', this.players[playerId].gold);

        this.spawners[this.chests[chestId].spawnerId].removeObject(chestId);
        this.scene.events.emit('chestRemoved', chestId);
      }
    });

    this.scene.events.on('monsterAttacked', (monsterId, playerId) => {
      if (this.monsters[monsterId]) {
        const { gold, attack } = this.monsters[monsterId];
        this.monsters[monsterId].loseHealth();
        if (this.monsters[monsterId].health <= 0) {
          this.players[playerId].updateGold(gold);
          this.scene.events.emit('updateScore', this.players[playerId].gold);

          this.spawners[this.monsters[monsterId].spawnerId].removeObject(monsterId);
          this.scene.events.emit('monsterRemoved', monsterId);

          this.players[playerId].updateHealth(2);
          this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);
        } else {
          this.players[playerId].updateHealth(-attack);

          this.scene.events.emit('updatePlayerHealth', playerId, this.players[playerId].health);

          this.scene.events.emit('updateMonsterHealth', monsterId, this.monsters[monsterId].health);

          if (this.players[playerId].health <= 0) {
            this.players[playerId].updateGold(parseInt(-this.players[playerId].gold / 2, 10), 10);
            this.scene.events.emit('updateScore', this.players[playerId].gold);

            this.players[playerId].respawn();
            this.scene.events.emit('respawnPlayer', this.players[playerId]);
          }
        }
      }
    });
  }

  setupSpawners() {
    const config = {
      spawnInterval: 3000,
      limit: 3,
      spawnerType: '',
      id: '',
    };

    let spawner;

    Object.keys(this.chestLocations).forEach((key) => {
      config.id = `chest-${key}`;
      config.spawnerType = Utils.spawnerType().CHEST;
      spawner = new Spawner(
        config,
        this.chestLocations[key],
        this.addChest.bind(this),
        this.deleteChest.bind(this),
      );

      this.spawners[spawner.id] = spawner;
    });

    Object.keys(this.monsterLocations).forEach((key) => {
      config.id = `monster-${key}`;
      config.spawnerType = Utils.spawnerType().MONSTER;
      spawner = new Spawner(
        config,
        this.monsterLocations[key],
        this.addMonster.bind(this),
        this.deleteMonster.bind(this),
        this.moveMonsters.bind(this),
      );

      this.spawners[spawner.id] = spawner;
    });
  }

  addChest(chestId, chest) {
    this.chests[chestId] = chest;
    this.scene.events.emit('chestSpawned', chest);
  }

  deleteChest(chestId) {
    delete this.chests[chestId];
  }

  addMonster(monsterId, monster) {
    this.monsters[monsterId] = monster;
    this.scene.events.emit('monsterSpawned', monster);
  }

  deleteMonster(monsterId) {
    delete this.monsters[monsterId];
  }

  spawnPlayer() {
    const player = new PlayerModel(this.playerLocations);
    this.players[player.id] = player;
    this.scene.events.emit('spawnPlayer', player);
  }

  moveMonsters() {
    this.scene.events.emit('monsterMovement', this.monsters);
  }
}