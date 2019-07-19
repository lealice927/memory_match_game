class Stats {
    constructor() {
        this.matches = 0;
        this.attempts = 0;
        this.accuracy = 0;
        this.highestAccuracy = 0;

        this.displayStats();
        this.setNewHighScore();
    }

    resetDescriptionBox() {
        $('.description .label').text('Description of Shark:')
        $('.description .value').text(' ');
        $('.description .fun-fact').text(' ');
    }

    addDescription(sharksObj, secondCardClicked) {
        $('.description .label').text('')
        var currentImagePath = $(secondCardClicked.cardFront).css('background-image');
        var firstIndex = currentImagePath.indexOf('image');
        var lastIndex = currentImagePath.lastIndexOf('\")');
        var currentImage = currentImagePath.slice(firstIndex, lastIndex);

        for (var sharks in sharksObj) {
            if (currentImage === sharksObj[shark].link) {
                $('.description .fun-fact').text(sharksObj[sharks].sharks_description);
                $('.description .value').text(sharks);
            }
        }
    }

    displayStats() {
        $('.attempts .value').text(this.attempts);

        if (this.accuracy === 'NaN%') {
            this.accuracy = '0.00%';
        }
        $('.accuracy .value').text(this.accuracy);
    }

    resetStats() {
        this.accuracy = 0;
        this.attempts = 0;
        this.matches = 0;
        this.displayStats();
    }

    setNewHighScore() {
        if (localStorage.highestAccuracy !== undefined || this.highestAccuracy !== 0) {
            this.highestAccuracy = JSON.parse(localStorage.highestAccuracy);
        }
    }

}