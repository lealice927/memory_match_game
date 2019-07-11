$(document).ready(startApp);

function startApp() {
  var game = new MatchGame();
  game.createCards();
}