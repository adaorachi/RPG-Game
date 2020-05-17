import gameConfig from './mockTest/gameMock';

test('Function init should create a object called name', () => {
  expect(typeof gameConfig()).toBe('object');
});