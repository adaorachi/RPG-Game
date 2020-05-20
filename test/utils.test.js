import {
  spawnerType,
  randomNumber,
  playerDirection,
} from '../src/game_manager/utils';

describe('Tests on a PlayerDirection Utils method', () => {
  test('Return an object', () => {
    expect(typeof playerDirection()).toBe('object');
  });

  test('Expect the value of RIGHT to return RIGHT', () => {
    expect(playerDirection().RIGHT).toBe('RIGHT');
  });

  test('Expect the value of LEFT to return LEFT', () => {
    expect(playerDirection().LEFT).toBe('LEFT');
  });

  test('Expect the value of UP to return UP', () => {
    expect(playerDirection().UP).toBe('UP');
  });

  test('Expect the value of DOWN to return DOWN', () => {
    expect(playerDirection().DOWN).toBe('DOWN');
  });
});

describe('Tests on a randomNumber Utils method', () => {
  test('Expect the value of type of randomNumber method to be a number', () => {
    expect(typeof randomNumber(3, 7)).toBe('number');
  });
});

describe('Tests on a spawnerType Utils method', () => {
  test('Return an object', () => {
    expect(typeof spawnerType()).toBe('object');
  });

  test('Expect the value of CHEST to return CHEST', () => {
    expect(spawnerType().CHEST).toBe('CHEST');
  });

  test('Expect the value of MONSTER to return MONSTER', () => {
    expect(spawnerType().MONSTER).toBe('MONSTER');
  });
});