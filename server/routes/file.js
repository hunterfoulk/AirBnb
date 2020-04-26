const AWS = require("aws-sdk");
const Busboy = require("busboy");
const config = require("../config");

const BUCKET_NAME = "airbnbbucket";
const IAM_USER_KEY = config.iamUser;
const IAM_USER_SECRET = config.iamSecret;

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME,
  });
  s3bucket.createBucket(function () {
    var params = {
      Bucket: BUCKET_NAME,
      Key: `foldername1/${file.name}`,
      Body: file.data,
    };
    s3bucket.upload(params, function (err, data) {
      if (err) {
        console.log("error in callback");
        console.log(err);
      }
      console.log("success");
      console.log(data);
    });
  });
}

module.exports = (app) => {
  // The following is an example of making file upload with
  // additional body parameters.
  // To make a call with PostMan
  // Don't put any headers (content-type)
  // Under body:
  // check form-data
  // Put the body with "element1": "test", "element2": image file
  app.post("/api/upload", function (req, res, next) {
    // This grabs the additional parameters so in this case passing
    // in "element1" with a value.
    const element1 = req.body.element1;
    var busboy = new Busboy({ headers: req.headers });
    // The file upload has completed
    busboy.on("finish", function () {
      console.log("Upload finished");
      // Your files are stored in req.files. In this case,
      // you only have one and it's req.files.element2:
      // This returns:
      // {
      //    element2: {
      //      data: ...contents of the file...,
      //      name: 'Example.jpg',
      //      encoding: '7bit',
      //      mimetype: 'image/png',
      //      truncated: false,
      //      size: 959480
      //    }
      // }
      // Grabs your file object from the request.
      const file = req.files.element2;
      console.log(file);
      uploadToS3(file);
    });
    req.pipe(busboy);
  });
};
