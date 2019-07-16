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

}