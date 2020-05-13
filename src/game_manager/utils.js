const Utils = (() => {
  const extractLocation = (layer, location) => {
    layer.objects.forEach((obj) => {
      if (location[obj.properties.spawner]) {
        location[obj.properties.spawner].push([obj.x, obj.y]);
      } else {
        location[obj.properties.spawner] = [[obj.x, obj.y]];
      }
    });
  };

  const spawnerType = () => ({
    MONSTER: 'MONSTER',
    CHEST: 'CHEST',
  });

  const randomNumber = (min, max) => Math.floor(Math.random() * max) + min;

  return { extractLocation, spawnerType, randomNumber };
})();

module.exports = Utils;