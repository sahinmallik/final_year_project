process.setMaxListeners(100);
const express = require("express");
const bodyParser = require("body-parser");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

const app = express();
const port = 8080;

// AWS credentials
const AWS_ACCESS_KEY = "AKIAY5LDB2BQH6YSUFUK";
const AWS_SECRET_KEY = "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";
const S3_BUCKET = "face-voter";

// Configure AWS SDK
AWS.config.update({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_KEY,
  region: "us-east-1", // Update with your region
});

// Create S3 instance
const s3 = new AWS.S3();

app.use(bodyParser.json());

app.post("/upload", async (req, res) => {
  try {
    // Get the base64 image data from the request
    const base64Data = req.body.base64_data;

    // Decode base64 data
    const imageBuffer = Buffer.from(base64Data, "base64");

    // Generate a unique key for the S3 object (you may want to use a more sophisticated approach)
    // const s3Key = `uploads/${uuidv4()}.jpg`;

    // Upload the image to S3
    const params = {
      Bucket: S3_BUCKET,
      Key: `${Date.now()}.png`,
      Body: imageBuffer,
      ContentType: "image/png", // Update with your image content type
      //   ACL: "public-read", // Make the uploaded file public
    };

    await s3.putObject(params).promise();

    // Generate a public URL for the uploaded image
    const imageUrl = `https://${S3_BUCKET}.s3.amazonaws.com/hell`;

    res.json({ success: true, image_url: imageUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
