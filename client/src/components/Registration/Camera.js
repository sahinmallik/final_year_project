import React, { useEffect, useRef, useState } from "react";

import {
  Box,
  useTheme,
  useMediaQuery,
  Button,
  Typography,
} from "@mui/material";
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
        {openCamera ? (
          <>
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
              onClick={capturePhoto}
            >
              Capture
            </Button>
          </>
        ) : null}
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
        {url && !openCamera ? (
          <>
            <Typography variant="p" marginBottom="1rem">
              your picture is clicked now you can closed the camera interface by
              clicking anywhere in the screen and then click Register.
            </Typography>
            <img src={url} alt="Your Picture" />
            <Button
              variant="outlined"
              startIcon={<CameraIcon />}
              size="large"
              sx={{
                marginTop: "2rem",
              }}
              onClick={() => setOpenCamera(true)}
            >
              Retake
            </Button>
          </>
        ) : null}
      </Box>
    </>
  );
};

export default Camera;
