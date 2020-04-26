const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const busboy = require("connect-busboy");
const busboyBodyParser = require("busboy-body-parser");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const Busboy = require("busboy");
const config = require("./config");

app.use(cors());
app.use(express.json());
app.use(busboy());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(busboyBodyParser());

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
      Key: `airbnbfolder/${file.name}`,
      Body: file.data,
      ACL: "public-read",
      ContentType: file.mimetype,
    };
    console.log("this is the image metadeta", params);
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

app.get("/houses", async (req, res) => {
  try {
    const getHouses = await pool.query("SELECT * FROM house");
    res.json(getHouses.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/houses", async (req, res) => {
  try {
    const { owner } = req.body;
    const { location } = req.body;
    const { beds } = req.body;
    const { baths } = req.body;
    const { price } = req.body;

    var busboy = new Busboy({ headers: req.headers });
    const file = req.files.img;

    busboy.on("finish", function () {
      console.log("Upload finished");

      console.log(file);
      uploadToS3(file);
    });
    req.pipe(busboy);

    const newHouse = await pool.query(
      "INSERT INTO house (owner,location,beds,baths,price,img) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",
      [
        owner,
        location,
        beds,
        baths,
        price,
        `https://airbnbbucket.s3.us-east-2.amazonaws.com/airbnbfolder/${file.name}`,
      ]
    );

    res.json(newHouse.rows);
    console.log("posted to database");
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log("server started on port 5000");
});
