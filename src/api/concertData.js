const endpoint = 'http://127.0.0.1:8000';

// Get concerts for a specific user
const getConcerts = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/concerts?uid=${uid}`, {
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

const getSingleConcert = (ConcertId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/concerts/${ConcertId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const createConcert = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/concerts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const updateConcert = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/concerts/${payload.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

const deleteConcert = (ConcertId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/concerts/${ConcertId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { getConcerts, createConcert, updateConcert, deleteConcert, getSingleConcert };
