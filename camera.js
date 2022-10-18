const video = document.getElementById("camera");
const captureButton = document.getElementById("capture-image");
const imageTag = document.getElementById("image");
captureButton.addEventListener("click", () => {
  const canvas = document.createElement("canvas");
  canvas.width = video.clientWidth;
  canvas.height = video.clientHeight;

  canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataURL = canvas.toDataURL();
  imageTag.src = dataURL;
});

navigator.mediaDevices
  .getUserMedia({ video: { width: 500, height: 500 } })
  .then((stream) => {
    video.srcObject = stream;
  });
