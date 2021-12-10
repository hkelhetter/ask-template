require('dotenv').config();

const express = require('express');
const cors = require('cors');

const bdd = require('./models');
const app = express();

const upload = require('multer')();
const AWS = require('aws-sdk');
const nanoid = require('nanoid');

const questionType = ['question', 'action'];

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_TOKEN,
  endpoint: process.env.S3_DOMAIN,
  sslEnabled: false,
  s3ForcePathStyle: true,
});

app.use(cors());
app.use(express.json());

app.post('/questions', upload.single('file'), (req, res) => {
  if (
    !!req.body.question &&
    !!req.body.type &&
    questionType.includes(req.body.type)
  ) {
    console.log(req.file);

    if (req.file !== undefined) {
      let fileName = nanoid.nanoid();

      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: fileName, // File name you want to save as in S3
        Body: req.file.buffer,
      };

      // Uploading files to the bucket
      s3.upload(params, function (err, data) {
        if (err) {
          throw err;
        }
        console.log(`File uploaded successfully. ${data.Location}`);

        bdd.Question.create({
          question: req.body.question,
          type: req.body.type,
          author: req.body.author ? req.body.author : null,
          image: fileName,
          imageMime: req.file.mimetype,
        }).then((question) => {
          res.json(question);
        });
      });
    } else {
      bdd.Question.create({
        question: req.body.question,
        type: req.body.type,
        author: req.body.author ? req.body.author : null,
      }).then((question) => {
        res.json(question);
      });
    }
  } else {
    res.status(400).send('Bad request');
  }
});

app.get('/questions', (req, res) => {
  bdd.Question.findAll({ include: bdd.Answer }).then((questions) => {
    res.json(questions);
  });
});

app.get('/questions/:id', (req, res) => {
  bdd.Question.findOne({
    where: { id: req.params.id },
    include: bdd.Answer,
  }).then((question) => {
    res.json(question);
  });
});

app.get('/questions/:id/image', (req, res) => {
  bdd.Question.findOne({
    where: { id: req.params.id },
    include: bdd.Answer,
  }).then((question) => {
    if (question.image !== null) {
      const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: question.image,
      };

      s3.getObject(params, function (err, data) {
        if (err) {
          console.log(err, err.stack);
          res.status(500).send(err.stack);
        } else {
          res.setHeader('content-type', question.imageMime);
          res.send(data.Body);
        }
      });
    } else {
      res.status(404).send('Not found');
    }
  });
});

app.post('/questions/:id/answer', (req, res) => {
  if (req.body.answer) {
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
            res.status(400).send('Already Have Answer');
          }
        } else {
          res.status(404).send('Question ' + req.params.id + ' not exist');
        }
      }
    );
  } else {
    res.status(400).send('Bad requestion');
  }
});

app.listen(process.env.PORT || 3630, () => {
  console.log(`Serveur lancé sur le port ${process.env.PORT || 3630}`);
});
