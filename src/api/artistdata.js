const endpoint = 'http://127.0.0.1:8000';

const getArtists = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/artists`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

export default getArtists;
