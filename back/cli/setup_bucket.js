require('dotenv').config();
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ID,
  secretAccessKey: process.env.S3_TOKEN,
  endpoint: process.env.S3_DOMAIN,
  sslEnabled: false,
  s3ForcePathStyle: true,
});

const params = {
  Bucket: process.env.BUCKET_NAME,
};

s3.createBucket(params, function (err, data) {
  if (err) console.log(err, err.stack);
  else console.log('Bucket Created Successfully', data.Location);
});
