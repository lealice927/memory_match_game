var firstCardClicked = null;
var secondCardClicked = null;
var totalPossibleMatches = 15;
var matchCounter =  0;
var attempts = 0;
var accuracy = 0;
var gamesPlayed = 0;
var lifepoints = 100;
var life = null;
var board = document.getElementById('gameArea');


var fighterArray = ['ryu',
    'ken',
    'akuma',
    'sakura',
    'bison',
    'morrigan',
    'guile',
    'chunli',
    'kyo',
    'iori',
    'terry',
    'geese',
    'hao',
    'leona',
    'ryo',
    'ryu',
    'ken',
    'akuma',
    'sakura',
    'bison',
    'morrigan',
    'guile',
    'chunli',
    'kyo',
    'iori',
    'terry',
    'geese',
    'ryo',
    'leona',
    'hao',];

$(document).ready(function () {
    randomBG();
    var header = document.getElementById('header');
    var footer = document.getElementById('footer');
    var modal = document.getElementById('aboutModal');
    var about = document.getElementById("about");
    var span = document.getElementsByClassName("close")[0];
    var start = document.getElementById('start');
    header.style.display = "none";
    footer.style.display = "none";
    
    about.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };

    start.onclick = function() {
        start.style.display = "none";
        startGame();
    };
});

function randomBG(){
    var random = Math.floor(Math.random() * 5);
    var background = [
        "url('Image/bg15.gif')",
        "url('Image/bg14.gif')",
        "url('Image/bg2.gif')",
        "url('Image/bg10.gif')",
        "url('Image/bg.gif')",
        "url('Image.bg11.gif)"];
    document.body.style.backgroundImage=background[random];
}

function startGame(){
    cleanSlate();
    createCards();
    clickHandlers();
    var header = document.getElementById('header');
    var footer = document.getElementById('footer');
    header.style.display = "flex";
    footer.style.display = "flex";
}

function clickHandlers(){
    $('.card').click(clickCard);
    $('.reset').click(resetGame);
    $('.bg-container > img').click(backGround);
}

function cleanSlate(){
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy+ '%');
}

function createCards(){
    for(cards = 0; cards < fighterArray.length; cards++ ){
        $('.cardSpace').append('<div class=cardContainer>')
    }
    $('.cardContainer').append('<div class=card>')
    $('.card').append('<div class=front>').append('<div class=cardBack>');
    randomShuffle(fighterArray);
    assignRandomClass();
    life = document.getElementById("life")
}

function randomShuffle(shuffleArray){
    var newPosition;
    var temp;
    for(i = shuffleArray.length - 1; i > 0; i--){
        newPosition = Math.floor(Math.random() * (i + 1));
        temp = shuffleArray[i];
        shuffleArray[i] = shuffleArray[newPosition];
        shuffleArray[newPosition] = temp;
    }
    return shuffleArray;
}

function assignRandomClass(){
    for(i = 0; i < fighterArray.length; i++){
        var randomClass = fighterArray[i];
        var cardPosition = i;
        $('.front').eq(cardPosition).addClass(randomClass);
    }
}

function clickCard(){
    $(this).find('.cardBack').addClass('cardFlip');
    $(this).addClass('cannotClick');
    if(firstCardClicked === null){
        firstCardClicked = this;
    }
    else{
        secondCardClicked = this;
    }
    if(secondCardClicked){
        attemptMatch();
        var firstCard = $(firstCardClicked).find('.front').css('background-image');
        var secondCard = $(secondCardClicked).find('.front').css('background-image');
        if(firstCard === secondCard){
            matchCounter++;
            lifepoints += 5;
            life.value = lifepoints;
            matchedCard();
            checkForWin();
        }else{
            lifepoints -= 10;
            life.value=lifepoints;
            checkForWin();
            $('.card').addClass('cannotClick');
            setTimeout(clickedIncorrectCards, 2000);
        }
        reportAccuracy();
    }
}

function clickedIncorrectCards(){
    $(firstCardClicked).find('.cardBack').removeClass('cardFlip');
    $(secondCardClicked).find('.cardBack').removeClass('cardFlip');
    secondCardClicked = null;
    firstCardClicked = null;
    $('.card').removeClass('cannotClick');
}

function matchedCard(){
    $(firstCardClicked).addClass('matchedCard').remove('div.back');
    $(secondCardClicked).addClass('matchedCard').remove('div.back');
    secondCardClicked = null;
    firstCardClicked = null;
}

function checkForWin(){
if(matchCounter === totalPossibleMatches){
    $('body').append('<div class=win>');
    setTimeout(function(){
        $('.win').remove();
    }, 3000);
    setTimeout(nextGame, 3000);
}else if(lifepoints <= 0){
    $('body').append('<div class=game-over>');
    setTimeout(function(){
        $('.game-over').remove();
    }, 3000);
    setTimeout(nextGame, 3000);
    }
}

function resetGame(){
    randomBG();
    nextGame();
}

function nextGame(){
    gamesPlayed ++;
    attempts = 0;
    accuracy = 0;
    lifepoints=100;
    life.value=lifepoints;
    matchCounter = 0;
    firstCardClicked = null;
    secondCardClicked = null;
    $('.card').removeClass('cannotClick matchedCard').empty();
    $('.card').append('<div class=front>').append('<div class=cardBack>');
    $('.games-played .value').text(gamesPlayed);
    $('.attempts .value').text(attempts);
    $('.accuracy .value').text(accuracy+ '%');
    randomShuffle(fighterArray);
    assignRandomClass();
}

function attemptMatch(){
    attempts ++;
    $('.attempts .value').text(attempts);
}

function reportAccuracy(){
    var matchPercentage = (matchCounter / attempts) * 100;
    $('.accuracy .value').text(matchPercentage.toFixed(0) + '%');
    if(isNaN(matchPercentage) === true){
        $('.accuracy .value').text(' ');
    }
}

 function pickBG(){
    $("#gameArea, #settings").toggle();
};

function backGround (image){
    var bgImage = image.currentTarget.attributes[1].value;
    $('body').css('background-image', 'url('+bgImage+')') 
    $("#gameArea").show();
    $("#settings").hide();
}


