const imageTag = document.getElementById("imageTag");

window.versions.getImage((event, data) => {
  imageTag.src = data;
  window.versions.closeWindow2();
});
