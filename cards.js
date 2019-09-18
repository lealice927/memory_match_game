
class SharkCard {
    constructor(randomImageLink, cardClickedCallback) {
        this.randomImageLink = randomImageLink;
        this.domElement = null;
        this.cardContainer = null;
        this.cardBack = null;   
        this.cardFront = null;
        this.cardClickedCallback = cardClickedCallback;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.cardClickedCallback(this);
    }


    render() {
        var cardDiv = $('<div>').addClass('card');
        this.cardContainer = $('<div>').addClass('cardContainer');
        this.cardBack = $('<div>').addClass('back');
        this.cardFront = $('<div>', {
            'class': 'front',
            'css': {
                'background-image': 'url(' + this.randomImageLink + ')',
            },
        })


        $(cardDiv).append(this.cardContainer);
        $(this.cardContainer).append(this.cardFront);
        $(this.cardContainer).append(this.cardBack);

        this.domElement = cardDiv;
        return this.domElement.on('click', this.handleClick);
    }
}
