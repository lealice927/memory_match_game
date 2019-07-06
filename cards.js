
class SharkCard {
    constructor(randomImageLink, cardClicked_callback) {
        this.randomImageLink = randomImageLink;
        this.domElement = null;
        this.cardBack = null;   
        this.cardInner = null;
        this.cardFront = null;
        this.cardClicked_callback = cardClicked_callback;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.cardClicked_callback(this);
    }


    render() {
        var card_div = $('<div>').addClass('card');
        this.cardInner = $('<div>').addClass('card-inner');
        this.cardBack = $('<div>').addClass('back');
        this.cardFront = $('<div>', {
            'class': 'front',
            'css': {
                'background-image': 'url(' + this.randomImageLink + '),  linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
            },
        })


        $(card_div).append(this.cardInner);
        $(this.cardInner).append(this.cardFront);
        $(this.cardInner).append(this.cardBack);

        this.domElement = card_div;
        return this.domElement.on('click', this.handleClick);
    }
}
