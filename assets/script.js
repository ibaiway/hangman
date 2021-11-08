const hangImg = document.getElementById("hangImg");
const hangmanImages = [
  "assets/img/hangman0.png",
  "assets/img/hangman1.png",
  "assets/img/hangman2.png",
  "assets/img/hangman3.png",
  "assets/img/hangman4.png",
  "assets/img/hangman5.png",
  "assets/img/hangman6.png",
];
function changeImage(error) {
  const imgElement = document.createElement("img");
  imgElement.src = hangmanImages[error];
  hangImg.innerHTML = imgElement;
}
