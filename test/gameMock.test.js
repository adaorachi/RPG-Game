import gameConfig from './mockTest/gameMock';

test('The method gameConfig should create an object', () => {
  expect(typeof gameConfig()).toBe('object');
});