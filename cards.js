
class SharkCard {
    constructor(randomImageLink, cardClicked_callback) {
        this.randomImageLink = randomImageLink;
        this.domElement = null;
        this.cardBack = null;   
        this.cardInner = null;
        this.cardFront = null;
        this.cardClickedCallback = cardClickedCallback;

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.cardClickedCallback(this);
    }


    render() {
        var cardDiv = $('<div>').addClass('card');
        this.cardInner = $('<div>').addClass('cardInner');
        this.cardBack = $('<div>').addClass('back');
        this.cardFront = $('<div>', {
            'class': 'front',
            'css': {
                'background-image': 'url(' + this.randomImageLink + '),  linear-gradient(315deg, #b8c6db 0%, #f5f7fa 74%)',
            },
        })


        $(cardDiv).append(this.cardInner);
        $(this.cardInner).append(this.cardFront);
        $(this.cardInner).append(this.cardBack);

        this.domElement = cardDiv;
        return this.domElement.on('click', this.handleClick);
    }
}
