export default class Api {
  constructor(data) {
    this._baseUrl = data.baseUrl;
    this._headers = data.headers;

  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'GET',
        headers: this._headers
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      })
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err); 
      });
  }

  // другие методы работы с API
}
