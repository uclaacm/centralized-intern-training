function incrementClicks() {
  const clicked = document.getElementById("clickCounter");
  const timesClicked = Number(clicked.innerHTML);
  clicked.innerHTML = timesClicked + 1;
}
const button = document.getElementById("clicker-button");
button.addEventListener("click", incrementClicks);
