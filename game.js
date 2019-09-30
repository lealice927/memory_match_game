

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
                image_link: 'images/great_white_shark.jpg',
                sharks_description: 'The largest predatory fish in the world – capable of eating marine mammals that weight several hundred pounds – is the great white shark. The only two fishes that grow larger than Great Whites are the whale shark and the basking shark, both filter feeders that eat plankton.',
            },
            'Great Hammerhead Shark': {
                image_link: 'images/hammerhead_shark.jpg',
                sharks_description: 'Hammerheads are aggressive hunters, feeding on smaller fish, octopuses, squid, and crustaceans. They do not actively seek out human prey, but are very defensive and will attack when provoked.',
                source: '',
            },
            'Bull Shark': {
                image_link: 'images/bull_shark.jpg',
                sharks_description: 'The bull shark is a predatory species that lives in coastal seas and is the shark with the best ability to move into freshwaters – particularly large, coastal rivers and lakes. They are able to move back and forth between saltwater and freshwater with ease. This behavior brings them into more contact with humans than most species of sharks, and they are therefore responsible for fatally biting more people than any other species.',
            },
            'Tiger Shark': {
                image_link: 'images/tiger_shark.jpg',
                sharks_description: 'So called because of the tiger-like stripes on juveniles, the tiger shark is, like its terrestrial namesake, a voracious hunter.',
            },
            'Blue Shark': {
                image_link: 'images/blue_shark.jpg',
                sharks_description: 'Blue sharks are curious, open-ocean predators that live throughout the global ocean, from the tropics to cold temperate waters. They spend most of their lives far from the coast and are truly a pelagic species. The common name comes from the blue color of the skin, unique among the sharks.',
            },
            'Shortfin Mako Shark': {
                image_link: 'images/shortfin_mako_shark.jpg',
                sharks_description: 'The shortfin mako shark, also known as the blue pointer or bonito shark, is a large mackerel shark. It is commonly referred to as the mako shark, as is the longfin mako shark. The shortfin mako is on record as the fastest-swimming shark, capable of bursts of speed up to 18.8 metres per second.',
            },
            'Thresher Shark': {
                image_link: 'images/thresher_shark.jpg',
                sharks_description: 'For most sharks, the front end is the dangerous bit. Thresher sharks are the exception. They’re deadly at both ends, because they’ve managed to weaponise their tails.',
            },
            'Whale Shark': {
                image_link: 'images/whale_shark.jpg',
                sharks_description: 'As the largest fish in the sea, reaching lengths of 40 feet or more, whale sharks have an enormous menu from which to choose. Fortunately for most sea-dwellers—and us!—their favorite meal is plankton.',
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
        $('.play-game-button').on('click', this.displayGame);
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
        if (!this.waitForTimeout && $(card.cardContainer).children().length === 2) {
            $(card.cardContainer).addClass('card-flip');
            if (this.firstCardClicked === null) {
                this.firstCardClicked = card;
            }

            else if ($(this.firstCardClicked.domElement).index() !== $(card.domElement).index()) {
                this.secondCardClicked = card;
                this.stats.attempts++;

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

        this.stats.addDescription(this.sharksObj, this.secondCardClicked);

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

    cardsDoNotMatch() {
        this.stats.accuracy = (this.stats.matches / this.stats.attempts * 100).toFixed(2) + '%';
        this.waitForTimeout = true;
        setTimeout(function () {
            $(this.firstCardClicked.cardContainer).removeClass('card-flip');
            $(this.secondCardClicked.cardContainer).removeClass('card-flip');
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

    displayGame() {
        $('.start-modal').fadeIn(2000);
    }

    closeGameModal() {
        $('.start-modal').css('display', 'none');
        this.resetButtonClicked();
    }


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

    openHelpModal() {
        $('.help-modal').fadeIn();
    }

}
