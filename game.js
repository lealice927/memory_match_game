

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
}
