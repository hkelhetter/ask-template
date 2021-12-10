import questions from './questions';

export const host = process.env.REACT_APP_HOST_API || 'http://localhost:3630';

export const checkStatus = (res) => {
  if (res.ok) {
    return res;
  } else {
    return res.text().then((msg) => {
      throw new Error(msg);
    });
  }
};

const api = {
  questions,
};

export default api;
