

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
                source: '',
            },
            '': {
                image_link: '',
                sharks_description: '',
                source: '',
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

            var card = new SharkCard(photoArray[randomPick].link, this.cardClicked);
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

}
