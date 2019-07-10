

class SharkMatchGame {
    constructor() {
        this.cards = [];
        this.totalPossibleMatches = 8;
        this.waitForTimeout = false;
        this.firstCardClicked = null;
        this.secondCardClicked = null;
        this.stats = new Stats();
        this.sharkObj = {
            'Great White Shark': {
                image_link: 'images/great_white_shark.jpg',
                shark_description: '',
                source: '',
            },
            '': {
                image_link: '',
                shark_description: '',
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

            //ASSIGN FIRST CARD CLICKED
            if (this.firstCardClicked === null) {
                this.firstCardClicked = card;
            }

            //ASSIGN SECOND CARD CLICKED
            else if ($(this.firstCardClicked.domElement).index() !== $(card.domElement).index()) {
                this.secondCardClicked = card;
                this.stats.attempts++;

                //CHECK IF THE CARDS ARE THE SAME
                if (this.firstCardClicked.randomImageLink === this.secondCardClicked.randomImageLink) {
                    this.cardsMatch();
                } else {
                    this.notAMatch();
                }
            }
            this.stats.display_stats();
        }
    }
}
