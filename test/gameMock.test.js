import gameConfig from './mockTest/gameMock';

test('Receive an object in return when call gameConfig', () => {
  expect(typeof gameConfig()).toBe('object');
});