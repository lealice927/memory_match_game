$(document).ready(startApp);

function startApp() {
  var game = new SharkMatchGame();
  game.createCards();
}   