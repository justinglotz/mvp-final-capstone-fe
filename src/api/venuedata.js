const endpoint = 'http://127.0.0.1:8000';

const getVenues = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/venues`, {
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

export default getVenues;
