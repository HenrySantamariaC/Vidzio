let mediaRecorder = null;
let recordedBlobs = [];

const getMediaDevices = async () => {
  const constraints = {
    audio: {
      echoCancellation: { exact: false },
    },
    video: {
      width: 1280,
      height: 720,
    },
  };
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    window.stream = stream;
    return stream;
  } catch (e) {
    console.error("navigator.getUserMedia error:", e);
  }
};

const startRecording = () => {
  recordedBlobs = [];

  mediaRecorder = createMediaRecorder();
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.start();
};

const stopRecording = () => {
  mediaRecorder.stop();
  mediaRecorder.stream.getTracks().forEach((track) => track.stop());
};

const getUrlVideo = () => {
  const superBuffer = new Blob(recordedBlobs, { type: "video/webm" });
  return window.URL.createObjectURL(superBuffer);
};

const getSupportedMimeTypes = () => {
  const possibleTypes = [
    "video/webm;codecs=av1,opus",
    "video/webm;codecs=vp9,opus",
    "video/webm;codecs=vp8,opus",
    "video/webm;codecs=h264,opus",
  ];
  return possibleTypes.filter((mimeType) => {
    return MediaRecorder.isTypeSupported(mimeType);
  });
};

const handleDataAvailable = (event) => {
  if (event.data && event.data.size > 0) {
    recordedBlobs.push(event.data);
  }
};

const createMediaRecorder = () => {
  try {
    const mimeType = getSupportedMimeTypes()[0];
    const options = { mimeType };
    return new MediaRecorder(window.stream, options);
  } catch (e) {
    console.error("Exception while creating MediaRecorder:", e);
    return null;
  }
};

export default {
  getMediaDevices,
  startRecording,
  stopRecording,
  getUrlVideo,
};
