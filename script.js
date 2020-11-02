class AudioControler {
    constructor() {
        this.bgMusic = new Audio("./assets/audios/creepy.mp3");
        this.flipSound = new Audio("./assets/audios/flip.wav");
        this.matchSound = new Audio("./assets/audios/match.wav");
        this.victorySound = new Audio("./assets/audios/victory.wav");
        this.gameOverSound = new Audio("./assets/audios/gameOver.wav");
        
        this.bgMusic.volume = 0.2;
        this.bgMusic.loop = true;        
    }

    startMusic() {
        this.bgMusic.play();
    }

    pauseMusic() {
        this.bgMusic.pause();        
        this.bgMusic.currentTime = 0;
    }

    flip() {        
        this.flipSound.play();        
    }

    match() {
        this.matchSound.play();
    }

    victory() {
        this.pauseMusic();
        this.victorySound.play();
    }

    gameOver(){
        this.pauseMusic();
        this.gameOverSound.play();
    }
}

class MixOrMatch {
    constructor (totalTime, cards) {
        this.totalTime = totalTime;
        this.cards = cards;
        this.timeRemaining = this.totalTime;
        this.timer = document.querySelector("#time-remaining");
        this.flipCounter = document.querySelector("#flips-counter");
        this.audioControler = new AudioControler();
    }

    startGame() {
        this.cardToCheck = null;
        this.timeRemaining = this.totalTime;
        this.totalFlips = 0;
        this.matchedCards = [];
        this.hideCards();
        this.busy = true;        

        setTimeout(() => {
            this.audioControler.startMusic();
            this.timer.innerText = this.timeRemaining;
            this.flipCounter.innerText = this.totalFlips;
            this.shuffleCards();                        
            this.countdown = this.startCountdown();            
            this.busy = false;
            
        }, 500);        
    }

    startCountdown() {
        return setInterval(() => {
            this.timeRemaining--;
            this.timer.innerText = this.timeRemaining;
            if (this.timeRemaining === 0) this.gameOver();
        }, 1000);
    }

    canFlipCard(card) {        
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    getCardType(card) {
        return card.querySelector(".card-front .center-img-front").src;
    }

    doesItMatch(card1, card2) {
        return this.getCardType(card1) === this.getCardType(card2);
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {      
            this.totalFlips++;                  
            this.flipCounter.innerText = this.totalFlips;
            this.audioControler.flip();
            card.classList.add("visible");
                        
            if (this.cardToCheck !== null) {
                this.checkForMatch(this.cardToCheck, card);                
            }
            else this.cardToCheck = card;            
        }
    }

    checkForMatch(card1, card2) {               
        this.busy = true;
        if (this.getCardType(card1) === this.getCardType(card2)) {            
            this.cardMatch(card1, card2);            
            if (this.matchedCards.length === this.cards.length) this.victory();

        } else {
            this.cardMismatch(card1, card2);
        }

        setTimeout(() => {
            this.busy = false;
        }, 1000); 
        this.cardToCheck = null;        
        
    }

    hideCards () {
        this.cards.forEach((card) => {
            card.classList.remove("visible");
            card.classList.remove("matched");
        });
    }

    cardMatch(card1, card2) {
        this.audioControler.match();
        card1.classList.add("matched");
        card2.classList.add("matched");
        this.matchedCards.push(card1);
        this.matchedCards.push(card2);
        console.log(this.matchedCards)
    }

    cardMismatch(card1, card2) {
        this.busy = true;
        setTimeout(() => {
            card1.classList.remove("visible");
            card2.classList.remove("visible");   
            this.busy = false;         
        }, 1000);
        
    }
    // fisher-yates algorithm
    shuffleCards() {        
        let random;

        for (let i = this.cards.length - 1; i > 0; i--) {
            random = Math.floor((Math.random() * 100) % (i + 1));

            //we're actually shuffling the order property value of the element
            this.cards[i].style.order = random;
            this.cards[random].style.order = i;
        }
    }

    victory() {
        clearInterval(this.countdown);
        this.audioControler.victory();
        document.querySelector(".victory").classList.add("visible");
    }

    gameOver() {
        clearInterval(this.countdown);
        this.audioControler.gameOver();
        document.querySelector(".gameover").classList.add("visible");        
    }
}

window.onload = () =>{
    // loading the overlays, the cards and the audio controler
    let overlays = Array.from(document.querySelectorAll(".overlay-text"));
    let cards = Array.from(document.querySelectorAll(".card"));
    let audioControler = new AudioControler();
    let game = new MixOrMatch(100, cards);

    // making the overlay go away when you click on it
    for (let i = 0; i < overlays.length; i++) {
        overlays[i].addEventListener("click", (e) => {
            overlays[i].classList.remove("visible");            
            game.startGame();
        });
    }

    //making the cards flip when clicked
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", (e) => {                        
            game.flipCard(cards[i]);        
        })
    }
}