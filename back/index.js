require("dotenv").config();

const express = require("express");
const cors = require("cors");

const bdd = require("./models");

const app = express();

const questionType = ["question", "action"];

app.use(cors());
app.use(express.json());

app.post("/questions", (req, res) => {
  if (
    !!req.body.question &&
    !!req.body.type &&
    questionType.includes(req.body.type)
  ) {
    bdd.Question.create({
      question: req.body.question,
      type: req.body.type,
      author: !!req.body.author ? req.body.author : null,
    }).then((question) => {
      res.json(question);
    });
  } else {
    res.status(400).send("Bad request");
  }
});

app.get("/questions", (req, res) => {
  bdd.Question.findAll({ include: bdd.Answer }).then((questions) => {
    res.json(questions);
  });
});

app.get("/questions/:id", (req, res) => {
  bdd.Question.findOne({
    where: { id: req.params.id },
    include: bdd.Answer,
  }).then((question) => {
    res.json(question);
  });
});

app.post("/questions/:id/answer", (req, res) => {
  if (!!req.body.answer) {
    bdd.Question.findOne({ id: req.params.id, include: bdd.Answer }).then(
      (question) => {
        if (question != null) {
          if (question.Answer === null) {
            bdd.Answer.create({
              answer: req.body.answer,
              QuestionId: req.params.id,
            }).then((answer) => {
              res.json(answer);
            });
          } else {
            res.status(400).send("Already Have Answer");
          }
        } else {
          res.status(404).send("Question " + req.params.id + " not exist");
        }
      }
    );
  } else {
    res.status(400).send("Bad requestion");
  }
});

app.listen(process.env.PORT || 3630, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT || 3630}`);
});
