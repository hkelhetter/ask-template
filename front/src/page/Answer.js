import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { useMutation, useQuery } from 'react-query';

import { useHistory, useParams } from 'react-router';
import api from '../api';
import { dateToString } from '../utils';

export default function Answer() {
  const { id } = useParams();
  const history = useHistory();

  const [answer, setAnswer] = useState('');

  const { data: question, isLoading } = useQuery(['questions', id], () =>
    api.questions.getOne(id)
  );
  const { mutate: addAnswer } = useMutation(api.questions.answer, {
    onSuccess: (data) => {
      history.push('/');
    },
  });

  function handleAnswer() {
    if (!!answer) {
      addAnswer({ id: id, body: { answer } });
    }
  }

  return (
    <Container>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        <>
          <p>{question.question}</p>
          <p>
            Posée par {question.author !== null ? question.author : 'Anonyme'}{' '}
            le {dateToString(question.createdAt)}
          </p>

          {question.Answer === null ? (
            <>
              <Form.Group>
                <Form.Label>Réponse</Form.Label>
                <Form.Control
                  as="textarea"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  isInvalid={answer === ''}
                  rows={5}
                />
              </Form.Group>

              <Button
                onClick={handleAnswer}
                disabled={!answer}
                style={{ marginTop: '10px' }}
              >
                Répondre
              </Button>
            </>
          ) : (
            <>
              <p>Réponse:</p>
              <p>{question.Answer.answer}</p>
              <p>Répondu le: {dateToString(question.Answer.createdAt)}</p>
            </>
          )}
        </>
      )}
    </Container>
  );
}
