

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
                image_link: 'images/great_white_shark2.jpg',
                sharks_description: 'The largest predatory fish in the world – capable of eating marine mammals that weight several hundred pounds – is the great white shark. The only two fishes that grow larger than Great Whites are the whale shark and the basking shark, both filter feeders that eat plankton.',
            },
            'Great Hammerhead Shark': {
                image_link: 'images/hammerhead_shark2.jpg',
                sharks_description: 'Hammerheads are aggressive hunters, feeding on smaller fish, octopuses, squid, and crustaceans. They do not actively seek out human prey, but are very defensive and will attack when provoked.',
                source: '',
            },
            'Bull Shark': {
                image_link: 'images/bull_shark.jpg',
                sharks_description: 'The bull shark is a predatory species that lives in coastal seas and is the shark with the best ability to move into freshwaters – particularly large, coastal rivers and lakes. They are able to move back and forth between saltwater and freshwater with ease. This behavior brings them into more contact with humans than most species of sharks, and they are therefore responsible for fatally biting more people than any other species.',
            },
            'Tiger Shark': {
                image_link: 'images/tiger_shark2.jpg',
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
            'Goblin Shark': {
                image_link: 'images/goblin_shark2.jpg',
                sharks_description: 'The goblin shark is one of the creepier fish out there! It has a long, prominent snout covered with special sensing organs (ampullae of Lorenzini) that help it to sense electric fields in the deep, dark water it calls home.',
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
        // $('.play-button').on('click', this.displayGame);
        $('.btn-liquid').on('click', this.displayGame);
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

    liquidButton() {
        $(function () {
            // Vars
            var pointsA = [],
                pointsB = [],
                $canvas = null,
                canvas = null,
                context = null,
                vars = null,
                points = 8,
                viscosity = 20,
                mouseDist = 70,
                damping = 0.05,
                showIndicators = false;
            mouseX = 0,
                mouseY = 0,
                relMouseX = 0,
                relMouseY = 0,
                mouseLastX = 0,
                mouseLastY = 0,
                mouseDirectionX = 0,
                mouseDirectionY = 0,
                mouseSpeedX = 0,
                mouseSpeedY = 0;

            /**
             * Get mouse direction
             */
            function mouseDirection(e) {
                if (mouseX < e.pageX)
                    mouseDirectionX = 1;
                else if (mouseX > e.pageX)
                    mouseDirectionX = -1;
                else
                    mouseDirectionX = 0;

                if (mouseY < e.pageY)
                    mouseDirectionY = 1;
                else if (mouseY > e.pageY)
                    mouseDirectionY = -1;
                else
                    mouseDirectionY = 0;

                mouseX = e.pageX;
                mouseY = e.pageY;

                relMouseX = (mouseX - $canvas.offset().left);
                relMouseY = (mouseY - $canvas.offset().top);
            }
            $(document).on('mousemove', mouseDirection);

            /**
             * Get mouse speed
             */
            function mouseSpeed() {
                mouseSpeedX = mouseX - mouseLastX;
                mouseSpeedY = mouseY - mouseLastY;

                mouseLastX = mouseX;
                mouseLastY = mouseY;

                setTimeout(mouseSpeed, 50);
            }
            mouseSpeed();

            /**
             * Init button
             */
            function initButton() {
                // Get button
                var button = $('.btn-liquid');
                var buttonWidth = button.width();
                var buttonHeight = button.height();

                // Create canvas
                $canvas = $('<canvas></canvas>');
                button.append($canvas);

                canvas = $canvas.get(0);
                canvas.width = buttonWidth + 100;
                canvas.height = buttonHeight + 100;
                context = canvas.getContext('2d');

                // Add points

                var x = buttonHeight / 2;
                for (var j = 1; j < points; j++) {
                    addPoints((x + ((buttonWidth - buttonHeight) / points) * j), 0);
                }
                addPoints(buttonWidth - buttonHeight / 5, 0);
                addPoints(buttonWidth + buttonHeight / 10, buttonHeight / 2);
                addPoints(buttonWidth - buttonHeight / 5, buttonHeight);
                for (var j = points - 1; j > 0; j--) {
                    addPoints((x + ((buttonWidth - buttonHeight) / points) * j), buttonHeight);
                }
                addPoints(buttonHeight / 5, buttonHeight);

                addPoints(-buttonHeight / 10, buttonHeight / 2);
                addPoints(buttonHeight / 5, 0);
                // addPoints(x, 0);
                // addPoints(0, buttonHeight/2);

                // addPoints(0, buttonHeight/2);
                // addPoints(buttonHeight/4, 0);

                // Start render
                renderCanvas();
            }

            /**
             * Add points
             */
            function addPoints(x, y) {
                pointsA.push(new Point(x, y, 1));
                pointsB.push(new Point(x, y, 2));
            }

            /**
             * Point
             */
            function Point(x, y, level) {
                this.x = this.ix = 50 + x;
                this.y = this.iy = 50 + y;
                this.vx = 0;
                this.vy = 0;
                this.cx1 = 0;
                this.cy1 = 0;
                this.cx2 = 0;
                this.cy2 = 0;
                this.level = level;
            }

            Point.prototype.move = function () {
                this.vx += (this.ix - this.x) / (viscosity * this.level);
                this.vy += (this.iy - this.y) / (viscosity * this.level);

                var dx = this.ix - relMouseX,
                    dy = this.iy - relMouseY;
                var relDist = (1 - Math.sqrt((dx * dx) + (dy * dy)) / mouseDist);

                // Move x
                if ((mouseDirectionX > 0 && relMouseX > this.x) || (mouseDirectionX < 0 && relMouseX < this.x)) {
                    if (relDist > 0 && relDist < 1) {
                        this.vx = (mouseSpeedX / 4) * relDist;
                    }
                }
                this.vx *= (1 - damping);
                this.x += this.vx;

                // Move y
                if ((mouseDirectionY > 0 && relMouseY > this.y) || (mouseDirectionY < 0 && relMouseY < this.y)) {
                    if (relDist > 0 && relDist < 1) {
                        this.vy = (mouseSpeedY / 4) * relDist;
                    }
                }
                this.vy *= (1 - damping);
                this.y += this.vy;
            };


            /**
             * Render canvas
             */
            function renderCanvas() {
                // rAF
                rafID = requestAnimationFrame(renderCanvas);

                // Clear scene
                context.clearRect(0, 0, $canvas.width(), $canvas.height());
                context.fillStyle = '#fff';
                context.fillRect(0, 0, $canvas.width(), $canvas.height());

                // Move points
                for (var i = 0; i <= pointsA.length - 1; i++) {
                    pointsA[i].move();
                    pointsB[i].move();
                }

                // Create dynamic gradient
                var gradientX = Math.min(Math.max(mouseX - $canvas.offset().left, 0), $canvas.width());
                var gradientY = Math.min(Math.max(mouseY - $canvas.offset().top, 0), $canvas.height());
                var distance = Math.sqrt(Math.pow(gradientX - $canvas.width() / 2, 2) + Math.pow(gradientY - $canvas.height() / 2, 2)) / Math.sqrt(Math.pow($canvas.width() / 2, 2) + Math.pow($canvas.height() / 2, 2));

                var gradient = context.createRadialGradient(gradientX, gradientY, 300 + (300 * distance), gradientX, gradientY, 0);
                gradient.addColorStop(0, '#102ce5');
                gradient.addColorStop(1, '#E406D6');

                // Draw shapes
                var groups = [pointsA, pointsB]

                for (var j = 0; j <= 1; j++) {
                    var points = groups[j];

                    if (j == 0) {
                        // Background style
                        context.fillStyle = '#1CE2D8';
                    } else {
                        // Foreground style
                        context.fillStyle = gradient;
                    }

                    context.beginPath();
                    context.moveTo(points[0].x, points[0].y);

                    for (var i = 0; i < points.length; i++) {
                        var p = points[i];
                        var nextP = points[i + 1];
                        var val = 30 * 0.552284749831;

                        if (nextP != undefined) {
                            // if (nextP.ix > p.ix && nextP.iy < p.iy) {
                            // 	p.cx1 = p.x;
                            // 	p.cy1 = p.y-val;
                            // 	p.cx2 = nextP.x-val;
                            // 	p.cy2 = nextP.y;
                            // } else if (nextP.ix > p.ix && nextP.iy > p.iy) {
                            // 	p.cx1 = p.x+val;
                            // 	p.cy1 = p.y;
                            // 	p.cx2 = nextP.x;
                            // 	p.cy2 = nextP.y-val;
                            // }  else if (nextP.ix < p.ix && nextP.iy > p.iy) {
                            // 	p.cx1 = p.x;
                            // 	p.cy1 = p.y+val;
                            // 	p.cx2 = nextP.x+val;
                            // 	p.cy2 = nextP.y;
                            // } else if (nextP.ix < p.ix && nextP.iy < p.iy) {
                            // 	p.cx1 = p.x-val;
                            // 	p.cy1 = p.y;
                            // 	p.cx2 = nextP.x;
                            // 	p.cy2 = nextP.y+val;
                            // } else {

                            p.cx1 = (p.x + nextP.x) / 2;
                            p.cy1 = (p.y + nextP.y) / 2;
                            p.cx2 = (p.x + nextP.x) / 2;
                            p.cy2 = (p.y + nextP.y) / 2;

                            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                            // 	continue;
                            // }

                            // context.bezierCurveTo(p.cx1, p.cy1, p.cx2, p.cy2, nextP.x, nextP.y);
                        } else {
                            nextP = points[0];
                            p.cx1 = (p.x + nextP.x) / 2;
                            p.cy1 = (p.y + nextP.y) / 2;

                            context.bezierCurveTo(p.x, p.y, p.cx1, p.cy1, p.cx1, p.cy1);
                        }
                    }

                    // context.closePath();
                    context.fill();
                }

                if (showIndicators) {
                    // Draw points
                    context.fillStyle = '#000';
                    context.beginPath();
                    for (var i = 0; i < pointsA.length; i++) {
                        var p = pointsA[i];

                        context.rect(p.x - 1, p.y - 1, 2, 2);
                    }
                    context.fill();

                    // Draw controls
                    context.fillStyle = '#f00';
                    context.beginPath();
                    for (var i = 0; i < pointsA.length; i++) {
                        var p = pointsA[i];

                        context.rect(p.cx1 - 1, p.cy1 - 1, 2, 2);
                        context.rect(p.cx2 - 1, p.cy2 - 1, 2, 2);
                    }
                    context.fill();
                }
            }

            // Init
            initButton();
        });
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
        // $('.play-button').on('click', this.displayGame);
        $('.btn-liquid').on('click', this.displayGame); s
        $('.start-modal .fa-close').on('click', this.hideModal);
        $('.fa-question').on('click', this.openHelpModal);
    }

}
