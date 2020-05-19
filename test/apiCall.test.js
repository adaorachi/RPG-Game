import { getScore, postScore } from './mocks/apiDataMock';
import 'regenerator-runtime';

test('Simulate a post request to Game API', () => {
  const scorePosted = postScore('MaryAnn', 234);
  scorePosted.then(result => {
    expect(result).toBe('Users Stats was posted succesfully!');
  }).catch(() => 'Something went wrong with your post request!');
});

test('Simulate a get request from Game API', () => {
  const score = getScore();
  score.then(result => {
    expect(result[0].user).toBe('mcannie');
  }).catch(() => 'Something went wrong with your get request!');
});