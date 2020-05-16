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

  console.log(answer)
  return answer;
}

async function getScore() {
  const apiKey = '0L4QTVGS6HGPT7OMcNjp';
  const fetchingURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;
  try {
    const response = await fetch(fetchingURL, {
      mode: 'cors',
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse.result)
      return jsonResponse.result;
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return error;
  }
}

// "Game with ID: V03upjwlcL53iVAg8bRY added."

export { createAPI, getScore };