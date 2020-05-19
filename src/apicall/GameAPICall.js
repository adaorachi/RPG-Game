async function createAPI() {
  const game = {
    name: 'Final Fantasy - Phaser Role Playing Game',
  };
  const post = JSON.stringify(game);
  const address = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
  const settings = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: post,
  };
  const response = await fetch(address, settings);
  const answer = await response.json();
  return answer;
}

async function getScore() {
  const apiKey = 'V03upjwlcL53iVAg8bRY';
  const fetchingURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;
  try {
    const response = await fetch(fetchingURL, {
      mode: 'cors',
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse.result;
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return error;
  }
}

async function postScore(userName, userScore) {
  const apiKey = 'V03upjwlcL53iVAg8bRY';
  const fetchingURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

  const data = {
    user: userName,
    score: userScore,
  };
  try {
    const response = await fetch(fetchingURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return jsonResponse;
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return error;
  }
}

export { createAPI, getScore, postScore };