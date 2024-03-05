const EventEmitter = require("events");

// Increase the default maximum number of listeners for all EventEmitter instances
EventEmitter.defaultMaxListeners = 20;

const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const sharp = require("sharp");
const AWS = require("aws-sdk");
const uuid = require("uuid");

const { promisify } = require("util");

const app = express();
const port = 8080;

// AWS credentials
const S3_BUCKET = "face-voter";
app.use(bodyParser.json());

// Configure AWS SDK
AWS.config.update({
  accessKeyId: "AKIAY5LDB2BQH6YSUFUK",
  secretAccessKey: "m9AmntTD+Mbk3V11YgOeB0VrqZr6dYqd9hp+8pYV",
  region: "us-east-1", // Update with your region
});

// Create S3 instance
const s3 = new AWS.S3({
  accessKeyId: "AKIAY5LDB2BQH6YSUFUK",
  secretAccessKey: "m9AmntTD+Mbk3V11YgOeB0VrqZr6dYqd9hp+8pYV",
});

// Endpoint to upload a picture with label to S3
app.post("/post-face", async (req, res) => {
  try {
    const { image, name } = req.body;

    // Decode base64 image
    const imageData = Buffer.from(image, "base64");

    // Generate a unique filename

    // Define S3 upload parameters
    const params = {
      Bucket: S3_BUCKET,
      Key: `${name}.jpg`, // Key is the path where the image will be stored in S3
      Body: imageData,
      ACL: "public-read", // Set ACL to public-read for public access to the uploaded image
      ContentType: "image/jpeg", // Specify content type
    };

    // Upload image to S3
    const data = await promisify(s3.upload)(params);

    res.json({ success: true, imageUrl: data.Location });
  } catch (error) {
    console.error("Error uploading image:", error);
    res.status(500).json({ success: false, error: "Error uploading image" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
