export default class GameMap {
  constructor(scene, key, titleSetName, bgLayerName, blockedLayerName) {
    this.scene = scene;
    this.key = key;
    this.titleSetName = titleSetName;
    this.bgLayerName = bgLayerName;
    this.blockedLayerName = blockedLayerName;

    this.createMap();
  }

  createMap() {
    this.map = this.scene.make.tilemap({ key: this.key });
    this.tiles = this.map.addTilesetImage(this.titleSetName, this.titleSetName, 32, 32, 1, 2);
    this.backgroundLayer = this.map.createStaticLayer(this.bgLayerName, this.tiles, 0, 0);
    this.backgroundLayer.setScale(2);

    this.blockedLayer = this.map.createStaticLayer(this.blockedLayerName, this.tiles, 0, 0);
    this.blockedLayer.setScale(2);
    this.blockedLayer.setCollisionByExclusion([-1]);

    const widthPixel = this.map.widthInPixels * 2;
    const heightPixel = this.map.widthInPixels * 2;

    this.scene.physics.world.bounds.width = widthPixel;
    this.scene.physics.world.bounds.height = heightPixel;

    this.scene.cameras.main.setBounds(0, 0, widthPixel, heightPixel);
  }
}
