const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const faceapi = require("face-api.js");
const mongoose = require("mongoose");
const { Canvas, Image } = require("canvas");
const canvas = require("canvas");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const bodyParser = require("body-parser"); // Added for handling larger JSON payloads
faceapi.env.monkeyPatch({ Canvas, Image });
const fs = require("fs");
const path = require("path");
const app = express();

const client = require("twilio")(
  "AC6691fd43c178b4bfc775a225dc6c4fdb",
  "bb865c96ea1bb092cbd35f3f9236d909"
);

app.use(
  bodyParser.json({ limit: "50mb" }), // Limit increased to handle larger JSON payloads
  bodyParser.urlencoded({ limit: "50mb", extended: true })
);

app.use(fileUpload({ useTempFiles: true }));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

async function LoadModels() {
  await faceapi.nets.ssdMobilenetv1.loadFromDisk(__dirname + "/models/models");
  await faceapi.nets.faceLandmark68Net.loadFromDisk(
    __dirname + "/models/models"
  );
  await faceapi.nets.faceRecognitionNet.loadFromDisk(
    __dirname + "/models/models"
  );
}
LoadModels();

const faceSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  descriptions: {
    type: Array,
    required: true,
  },
});

const FaceModel = mongoose.model("Face", faceSchema);

async function uploadLabeledImages(images, label) {
  try {
    let counter = 0;
    const descriptions = [];
    for (let i = 0; i < images.length; i++) {
      const img = await canvas.loadImage(images[i]);
      counter = (i / images.length) * 100;
      console.log(`Progress = ${counter}%`);
      const detections = await faceapi
        .detectSingleFace(img)
        .withFaceLandmarks()
        .withFaceDescriptor();
      descriptions.push(detections.descriptor);
    }
    const createFace = new FaceModel({
      label: label,
      descriptions: descriptions,
    });
    await createFace.save();
    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
}

async function getDescriptorsFromDB(image) {
  let faces = await FaceModel.find();
  for (i = 0; i < faces.length; i++) {
    for (j = 0; j < faces[i].descriptions.length; j++) {
      faces[i].descriptions[j] = new Float32Array(
        Object.values(faces[i].descriptions[j])
      );
    }
    faces[i] = new faceapi.LabeledFaceDescriptors(
      faces[i].label,
      faces[i].descriptions
    );
  }

  const faceMatcher = new faceapi.FaceMatcher(faces, 0.6);
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi
    .detectAllFaces(img)
    .withFaceLandmarks()
    .withFaceDescriptors();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  const results = resizedDetections.map((d) =>
    faceMatcher.findBestMatch(d.descriptor)
  );
  return results;
}

const extractFaces = async (image) => {
  const img = await canvas.loadImage(image);
  let temp = faceapi.createCanvasFromMedia(img);
  const displaySize = { width: img.width, height: img.height };
  faceapi.matchDimensions(temp, displaySize);
  const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
  const resizedDetections = faceapi.resizeResults(detections, displaySize);
  // Cut out the face and save it to a new file
  const out = faceapi.createCanvasFromMedia(img);
  faceapi.matchDimensions(out, displaySize);
  const ctx = out.getContext("2d");
  resizedDetections.forEach((detection) => {
    const box = detection.detection.box;
    ctx.drawImage(img, box.x, box.y, box.width, box.height, 0, 0, 200, 200);
  });
  return out.toBuffer("image/jpeg");
};

// Function to match face with stored face descriptors
// function matchFace(extractedFace, storedDescriptors) {
//   const faceMatcher = new faceapi.FaceMatcher(
//     [new faceapi.LabeledFaceDescriptors("", storedDescriptors)],
//     0.6
//   );
//   const img = faceapi.createCanvasFromMedia(
//     faceapi.createImageData(extractedFace)
//   );
//   const displaySize = { width: img.width, height: img.height };
//   faceapi.matchDimensions(img, displaySize);
//   const detections = faceapi
//     .detectAllFaces(img)
//     .withFaceLandmarks()
//     .withFaceDescriptors();
//   const resizedDetections = faceapi.resizeResults(detections, displaySize);
//   const results = resizedDetections.map((d) =>
//     faceMatcher.findBestMatch(d.descriptor)
//   );
//   return results;
// }

app.get("/", (req, res) => {
  res.status(200).json({ status: "online" });
});

app.post("/send", (req, res) => {
  const { number, message } = req.body;
  client.messages
    .create({
      body: message,
      from: "+12762778269",
      to: number,
    })
    .then((message) => {
      res.status(200).json({ message: "Message sent successfully" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Message not sent" });
    });
});

app.post("/post-face", async (req, res) => {
  // Add this at the beginning of the route
  const imgDirectory = __dirname + "/img";
  if (!fs.existsSync(imgDirectory)) {
    fs.mkdirSync(imgDirectory);
  }

  const base64Image = req.body.image; // Assuming the base64 image is sent in the 'image' field
  const label = req.body.label;

  try {
    let faces = await extractFaces(base64Image);
    fs.writeFileSync(imgDirectory + "/face.jpg", faces);

    let result = await uploadLabeledImages(
      [
        imgDirectory + "/face.jpg",
        imgDirectory + "/face.jpg",
        imgDirectory + "/face.jpg",
        imgDirectory + "/face.jpg",
      ],
      label
    );

    fs.readdir(__dirname + "/tmp", (err, files) => {
      if (err) throw err;

      for (const file of files) {
        fs.unlink(path.join(__dirname + "/tmp", file), (err) => {
          if (err) throw err;
        });
      }
    });

    fs.unlink(__dirname + "/img/face.jpg", (err) => {
      if (err) throw err;
    });

    if (result) {
      res.json({ message: "Face data stored successfully" });
    } else {
      res.json({ message: "Something went wrong, please try again." });
    }
  } catch (error) {
    console.log("Error in /post-face:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// app.post("/check-face", async (req, res) => {
//   try {
//     const base64Image = req.body.image; // Assuming the base64 image is sent in the request body
//     const label = req.body.label;

// Extract face from the image
//     const extractedFace = await extractFaces(base64Image);

//     // Get face descriptors from the database based on the label
//     const storedFace = await getDescriptorsFromDB(label);

//     // Match the extracted face with the stored face descriptors
//     const results = matchFace(extractedFace, storedFace.descriptions);

//     res.json({ results });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error processing the request" });
//   }
// });

app.post("/check-face", async (req, res) => {
  const { image } = req.body;
  let result = await getDescriptorsFromDB(image);

  res.json({ result });
});
mongoose.set("strictQuery", true);
mongoose
  .connect(
    "mongodb+srv://amlansonudas:A1b2c3d4@cluster0.mdlxb7l.mongodb.net/EVM?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
