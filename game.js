

class SharkMatchGame {
    constructor() {
        this.cards = [];
        this.totalPossibleMatches = 8;
        this.waitForTimeout = false;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.stats = new Stats();
        this.sharksObj = {
            'Great White Shark': {
                image_link: 'images/great_white_shark.png',
                sharks_description: 'The largest predatory fish in the world – capable of eating marine mammals that weight several hundred pounds – is the great white shark. The only two fishes that grow larger than Great Whites are the whale shark and the basking shark, both filter feeders that eat plankton.',
            },
            'Great Hammerhead Shark': {
                image_link: 'images/hammerhead_shark.png',
                sharks_description: 'Great hammerhead sharks are apex predators and can be found worldwide in coastal, warm waters that are 68 degrees (20 degrees Celsius) or higher. Unlike scalloped hammerhead sharks, great hammerhead sharks are solitary and migrate long distances upward of 756 miles (1,200 km) alone.',
                source: '',
            },
            'Bull Shark': {
                image_link: 'bull_shark.png',
                sharks_description: 'The bull shark is a predatory species that lives in coastal seas and is the shark with the best ability to move into freshwaters – particularly large, coastal rivers and lakes. They are able to move back and forth between saltwater and freshwater with ease. This behavior brings them into more contact with humans than most species of sharks, and they are therefore responsible for fatally biting more people than any other species.',
            },
            'Tiger Shark': {
                image_link: 'tiger_shark.png',
                sharks_description: 'The tiger shark gets its name from the characteristic vertical bars that cover the sides of its body. Though these bars fade slightly as individuals reach adulthood, they are very noticeable in juveniles and at least party visible throughout the lifetime. Reaching lengths of at least 18 feet (5.5 m) and 2000 pounds (nearly a metric tonne), the tiger shark is the fourth largest shark and second largest predatory shark, behind only the great white.',
            },
            'Blue Shark': {
                image_link: 'images/blue_shark.png',
                sharks_description: 'Blue sharks are curious, open-ocean predators that live throughout the global ocean, from the tropics to cold temperate waters. They spend most of their lives far from the coast and are truly a pelagic species. The common name comes from the blue color of the skin, unique among the sharks.',
            },
            'Mako Shark': {
                image_link: 'images/mako_shark.png',
                sharks_description: 'The shortfin mako shark is a large, predatory shark that lives in the open ocean and reaches lengths of 12 feet (3.8 m) and weights of at least 1200 pounds (545 kg). With top speeds of 45 miles per hour (74 kilometers per hour), the shortfin mako is the fastest shark and is one of the fastest fishes on the planet. This species’ athleticism is not restricted to its swimming speeds. It is known for its incredible leaping ability and can be observed jumping to extreme heights (out of the water) when hunting.',
            },
        }

        this.cardClicked = this.cardClicked.bind(this);
        this.resetButtonClicked = this.resetButtonClicked.bind(this);
        this.displayGame = this.displayGame.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.closeGameModal = this.closeGameModal.bind(this);
        this.openHelpModal = this.openHelpModal.bind(this);

        this.clickHandlers();
    }

    clickHandlers() {
        $('.reset-button').on('click', this.resetButtonClicked);
        $('.play-again-button').on('click', this.resetButtonClicked);
        $('.play-again-button').on('click', this.hideModal);
        $('.fa-close').on('click', this.hideModal);
        $('.play-button').on('click', this.displayGame);
        $('.start-modal .fa-close').on('click', this.hideModal);
        $('.fa-question').on('click', this.openHelpModal);
    }

    createCards() {
        var photoArray = [];
        for (var sharks in this.sharksObj) {
            photoArray.push(this.sharksObj[sharks], this.sharksObj[sharks]);
        }

        var photosLength = photoArray.length;
        for (var i = 0; i < photosLength; i++) {
            var randomPick = Math.floor(Math.random() * photoArray.length);

            var card = new SharkCard(photoArray[randomPick].image_link, this.cardClicked);
            this.cards.push(card);
            photoArray.splice(randomPick, 1);
            $('.game-area').append(card.render());
        }
    }

    cardClicked(card) {
        if (!this.waitForTimeout && $(card.cardInner).children().length === 2) {
            $(card.cardInner).addClass('card-flip');
            //////////SELECT FIRST CARD CLICKED//////////
            if (this.firstCardClicked === null) {
                this.firstCardClicked = card;
            }

            //////////SELECT SECOND CARD CLICKED//////////
            else if ($(this.firstCardClicked.domElement).index() !== $(card.domElement).index()) {
                this.secondCardClicked = card;
                this.stats.attempts++;

                //////////CHECK MATCHED CARDS//////////
                if (this.firstCardClicked.randomImageLink === this.secondCardClicked.randomImageLink) {
                    this.cardsMatch();
                } else {
                    this.cardsDoNotMatch();
                }
            }
            this.stats.displayStats();
        }
    }


    cardsMatch() {
        this.stats.matches++;
        this.stats.accuracy = (this.stats.matches / this.stats.attempts * 100).toFixed(2) + '%';

        $(this.firstCardClicked.cardBack).remove();
        $(this.secondCardClicked.cardBack).remove();

        this.stats.addDescription(this.sharkObj, this.secondCardClicked);

        this.firstCardClicked = null;
        this.secondCardClicked = null;

        this.winConditionCheck();
    }

    winConditionCheck() {

        if (this.stats.matches === this.totalPossibleMatches) {

            if (this.stats.accuracy > this.stats.highestAccuracy || this.stats.highestAccuracy === 0) {
                localStorage.highestAccuracy = JSON.stringify(this.stats.accuracy)
            }
            this.showModal();
        }
    }

    cardsNotAMatch() {
        this.stats.accuracy = (this.stats.matches / this.stats.attempts * 100).toFixed(2) + '%';
        this.waitForTimeout = true;
        setTimeout(function () {
            $(this.firstCardClicked.cardInner).removeClass('card-flip');
            $(this.secondCardClicked.cardInner).removeClass('card-flip');
            this.firstCardClicked = null;
            this.secondCardClicked = null;
            this.waitForTimeout = false;
        }
            .bind(this), 1000);
    }

    resetButtonClicked() {
        this.waitForTimeout = false;
        this.firstCardClicked = null;
        this.stats.resetDescriptionBox();
        this.stats.resetStats();
        for (var i = 0; i < this.cards.length; i++) {
            $(this.cards[i].domElement).remove();
        }
        this.cards = [];
        this.createCards();
    }

    //////////DISPLAY GAME//////////
    displayGame() {
        $('.start-modal').fadeIn();
    }

    closeGameModal() {
        $('.start-modal').css('display', 'none');
        this.resetButtonClicked();
    }


    //////////DISPLAY AND HIDE GAME OVER MODAL///////////
    showModal() {
        this.stats.setNewHighScore();
        $('.attempts-after-win').text('You had ' + this.stats.attempts + ' attempts');
        $('.accuracy-after-win').text('Your accuracy was ' + this.stats.accuracy);

        if (this.stats.accuracy < this.stats.highestAccuracy) {
            $('.highest-accuracy-after-win').text('Your highest accuracy in a win is ' + this.stats.highestAccuracy);
        } else {
            $('.highest-accuracy-after-win').text('Your accuracy of ' + this.stats.accuracy + ' is a new personal best! Good job!')
        }
        setTimeout(function () {
            $('.win-modal').show()
        }, 1200);
    }

    hideModal() {
        if ($('.win-modal').css('display') !== 'none') {
            $('.win-modal').hide();
        } else if ($('.help-modal').css('display') !== 'none') {
            $('.help-modal').hide();
        } else {
            this.closeGameModal();
        }
    }

    //////////DISPLAY HELP MODAL//////////
    openHelpModal() {
        $('.help-modal').fadeIn();
    }

    clickHandlers() {
        $('.reset-button').on('click', this.resetButtonClicked);
        $('.play-again-button').on('click', this.resetButtonClicked);
        $('.play-again-button').on('click', this.hideModal);
        $('.fa-close').on('click', this.hideModal);
        $('.play-button').on('click', this.displayGame);
        $('.start-modal .fa-close').on('click', this.hideModal);
        $('.fa-question').on('click', this.openHelpModal);
      }

}
