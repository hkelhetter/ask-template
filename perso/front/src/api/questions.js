import { host, checkStatus } from ".";

const questions = {
    addQuestion: (body) => {
        return fetch(`${host}/questions`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(checkStatus)
            .then((res) => res.json());
    },
    getAll: () => {
        return fetch(`${host}/questions`, {
            method: "GET"
        })
            .then(checkStatus)
            .then((res) => res.json());
    },
    getOne: (id) => {
        return fetch(`${host}/questions/${id}`, {
            method: "GET"
        })
            .then(checkStatus)
            .then((res) => res.json());
    },
    answer: ({ id, body }) => {
        return fetch(`${host}/questions/${id}/answer`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(checkStatus)
            .then((res) => res.json());
    }
};
export default questions;
