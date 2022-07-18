import { Message, User } from '../components';

export const getFetch = (url: string, params: {} = {}) => {
  const queryString = Object.entries(params)
    .map((param) => {
      return `${param[0]}=${param[1]}`;
    })
    .join('&');
  return fetch(`${url}?${queryString}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(async (res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  });
};

export const postFetch = (url: string, body: Message | User) => {
  return fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async (res) => {
    if (res.status !== 200) {
      throw new Error(res.statusText);
    }
    return await res.json();
  });
};
