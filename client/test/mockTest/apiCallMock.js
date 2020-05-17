async function getScore() {
  const apiKey = 'V03upjwlcL53iVAg8bRY';
  const fetchingURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;
  try {
    const response = await fetch(fetchingURL, {
      mode: 'cors',
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return 'Users Stats was posted succesfully!';
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return 'Something went wrong with your post request!';
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
      return jsonResponse.result[0];
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return 'Something went wrong with your get request!';
  }
}

export { getScore, postScore };