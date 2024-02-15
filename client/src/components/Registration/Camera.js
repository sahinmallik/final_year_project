import React, { useEffect, useRef, useState } from "react";

import { Box, useTheme, useMediaQuery, Button } from "@mui/material";
import CameraIcon from "@mui/icons-material/Camera";
import Webcam from "react-webcam";
// import "./Camera.css";
const videoConstraints = {
  width: 540,
  facingMode: "environment",
};

const dataURItoBlob = (dataURI) => {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
};

const Camera = ({ voterData, setVoterData }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.down("md"));

  const webcamRef = useRef(null);
  const [url, setUrl] = useState("");
  const [openCamera, setOpenCamera] = useState(true);
  const [isImageCapture, setIsImageCapture] = useState(false);

  const capturePhoto = React.useCallback(
    async (e) => {
      e.preventDefault();
      const imageSrc = webcamRef.current.getScreenshot();

      voterData.current_picture = url;
      setUrl(imageSrc);
      // console.log(imageSrc);
      // Convert the base64 image to Blob
      const imageBlob = dataURItoBlob(imageSrc);

      // Use FileReader to read the Blob as Data URL
      const imageFile = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = (e) => reject(e);
        reader.readAsDataURL(imageBlob);
      });

      setVoterData({
        current_picture: imageFile,
      });
      console.log(imageFile);
      setIsImageCapture(false);
      setOpenCamera(false);
    },

    [webcamRef]
  );

  useEffect(() => {
    setVoterData({
      current_picture: url,
    });
  }, [url]);
  const onUserMedia = (e) => {
    // console.log(e);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing(isMobile ? 2 : 3),
        }}
      >
        <Webcam
          ref={webcamRef}
          audio={false}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
          onUserMedia={onUserMedia}
          mirrored={true}
          width={"100%"}
        />
        <Button
          variant="outlined"
          startIcon={<CameraIcon />}
          size="large"
          sx={{
            marginTop: "2rem",
          }}
        >
          Capture
        </Button>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: theme.spacing(isMobile ? 2 : 3),
        }}
      >
        <img
          src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fbuffer.com%2Flibrary%2Ffree-images%2F&psig=AOvVaw2qTo6cptan6Qjr8gLxLK93&ust=1708089479812000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCIjxjKe3rYQDFQAAAAAdAAAAABAJ"
          alt="hehe"
        />
        <Button
          variant="outlined"
          startIcon={<CameraIcon />}
          size="large"
          sx={{
            marginTop: "2rem",
          }}
        >
          Retake
        </Button>
      </Box>
    </>
  );
};

export default Camera;
