import { host, checkStatus } from '.';

const questions = {
  addQuestion: (body) => {
    let formData = new FormData();

    if (body.author !== undefined) {
      formData.append('author', body.author);
    }

    formData.append('type', body.type);
    formData.append('question', body.question);

    if (body.file !== null && body.file.length === 1) {
      formData.append('file', body.file[0]);
    }

    return fetch(`${host}/questions`, {
      method: 'POST',
      body: formData,
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  getAll: () => {
    return fetch(`${host}/questions`, {
      method: 'GET',
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  getOne: (id) => {
    return fetch(`${host}/questions/${id}`, {
      method: 'GET',
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
  answer: ({ id, body }) => {
    return fetch(`${host}/questions/${id}/answer`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(checkStatus)
      .then((res) => res.json());
  },
};

export default questions;
