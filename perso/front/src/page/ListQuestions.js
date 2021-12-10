import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import { useQuery } from "react-query";
import api from "../api";
import { dateToString } from "../utils";
import { useHistory } from "react-router";

export default function ListQuestions() {
  const history = useHistory();

  const { data: questions, isLoading } = useQuery(
    "questions",
    api.questions.getAll
  );

  console.log(questions);

  return (
    <Container>
      <h1>Toutes les questions</h1>
      {isLoading ? (
        <Spinner animation="border" />
      ) : (
        questions.map((q) => (
          <Card key={q.id}>
            <Card.Body>
              <p>{q.question}</p>
              <p>
                Posée par {q.author !== null ? q.author : "Anonyme"} le{" "}
                {dateToString(q.createdAt)}
              </p>
              {q.Answer === null ? (
                <Button onClick={() => history.push("/answer/" + q.id)}>
                  Répondre
                </Button>
              ) : (
                <>
                  <p>Réponse:</p>
                  <p>{q.Answer.answer}</p>
                  <p>Répondu le: {dateToString(q.Answer.createdAt)}</p>
                </>
              )}
            </Card.Body>
          </Card>
        ))
      )}
    </Container>
  );
}
