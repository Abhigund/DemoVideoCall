const greenButton = document.getElementById("callButton");
const threeButtonsContainer = document.getElementById("three-button-container");
const endCallButton = document.getElementById("end-call-button");

greenButton.addEventListener("click", () => {
  threeButtonsContainer.style.display = "flex";
  greenButton.style.display = "none";
});

endCallButton.addEventListener("click", () => {
  threeButtonsContainer.style.display = "none";
  greenButton.style.display = "flex";
});


