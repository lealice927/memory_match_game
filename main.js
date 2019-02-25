$(document).ready(initializeGame);

function initializeGame() {
    //console.log('Initializing Game...');
    $('.card').on('click', card_clicked);
    games_played++;
}


// function addEventHandlers() {
//     console.log('event listener')
//     $('.card').click(handleClick);
// }
// //     $('.card').on('click', card_clicked);
// //  when we have a lot of event handlers like clicks/reset buttons


var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 9;
var matches = 0;
var attempts = 0;
var accuracy = 0;
var games_played = 0;
// var canbeclicked = true;

function handleClick(){
    if(!canbeclicked || $(this).show();
    return;
}

function card_clicked() {
    $(this).find('.back').hide();

    if (first_card_clicked === null) {
        first_card_clicked = $(this).html();
        first_card_back = $(this).find('.back');
        return;
    } else if (second_card_clicked === null) {
        second_card_clicked = $(this).html();
        second_card_back = $(this).find('.back');
        // console.log('# of Attempts:', attempts);
        attempts++;

        //  debugger;
        if (first_card_clicked === second_card_clicked) {
            // console.log('# of matches:', matches);
            matches++;
            first_card_clicked = null;
            second_card_clicked = null;

            if (matches === total_possible_matches) {
                display_stats();
                alert("YOU MATCHED ALL THE CARDS!!!");
            } else {
                display_stats();
                return;
            }
        } else {
            // canbeclicked = false;
            display_stats();
            setTimeout(function () {
            $('.card').off('click', card_clicked);
                first_card_back.show();
                second_card_back.show();
             $('.card').on('click', card_clicked);
            }, 1000);
            first_card_clicked = null;
            second_card_clicked = null;
            return;
        }
    }
}
// debugger;
// STATS PORTION //
function display_stats() {
    //console.log('Display Stats:', display_stats);
    $('.games_played .value').text(games_played);
    $('.attempts .value').text(attempts);
    $('.matches .value').text(matches);
    if (attempts === 0) {
        accuracy = 0 + '%';
    } else {
        accuracy = (Math.floor((matches / attempts) * 100)) + '%';
        accuracy;
    } 
    $('.accuracy .value').text(accuracy);
}

function reset_stats() {
    accuracy = 0;
    matches = 0;
    attempts = 0;
    display_stats();
    // canbeclicked = true;
}

function resetButton() {
    games_played++;
    reset_stats();
    display_stats();
    $('.card').find('.back').show();
}
