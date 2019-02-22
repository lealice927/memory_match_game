$(document).ready(initializeGame);

function initializeGame() {
    console.log('Initializing Game...');

    $('.card').on('click', card_clicked);
}

var first_card_clicked = null;
var second_card_clicked = null;
var total_possible_matches = 2;
var match_counter = 0;
var front_card = [];
var winner = console.log("Winner!")



function card_clicked() {
    $(this).find('.back').hide();

    if (first_card_clicked === null) {
        first_card_clicked = $(this).html();
        first_card_back = $(this).find('.back');
        return;
    } else {
        second_card_clicked = $(this).html();
        second_card_back = $(this).find('.back');
        //  debugger;
        if (first_card_clicked === second_card_clicked) {
            match_counter++;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches) {
                return winner;
            } else {
                return;
            }
        } else {
            // debugger;
            setTimeout(function() {
               first_card_back.show();
               second_card_back.show();
            }, 2000);
            first_card_clicked = null;
            second_card_clicked = null;
            return;
            
        }
    } 
    
}
    
