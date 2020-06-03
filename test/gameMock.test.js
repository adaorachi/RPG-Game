import gameConfig from './mockTest/gameMock';

describe('Simulate test on a mocked game', () => {
  test('Receive an object in return when gameConfig method is called', () => {
    expect(typeof gameConfig()).toBe('object');
  });

  test('Expect to see the object that contains all the games scenes', () => {
    expect(typeof gameConfig().scene.scenes).toBe('object');
  });
});