class AudioControler {
    constructor() {
        this.bgMusic = new Audio("./assets/audios/creepy.mp3");
        this.flipSound = new Audio("./assets/audios/flip.wav");
        this.matchSound = new Audio("./assets/audios/match.wav");
        this.victorySound = new Audio("./assets/audios/victory.wav");
        this.gameOverSound = new Audio("./assets/audios/gameOver.wav");
        
        this.bgMusic.volume = 0.3;
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
        this.busy = true;
    }

    canFlipCard(card) {
        return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
    }

    flipCard(card) {
        if (this.canFlipCard(card)) {            
            this.audioControler.flipSound();
            card.classList.add("visible");
        }
    }
}

window.onload = () =>{
    // loading the overlays, the cards and the audio controler
    let overlays = document.querySelectorAll(".overlay-text");
    let cards = document.querySelectorAll(".card");
    let audioControler = new AudioControler();
    let game = new MixOrMatch();

    // making the overlay go away when you click on it
    for (let i = 0; i < overlays.length; i++) {
        overlays[i].addEventListener("click", (e) => {
            overlays[i].classList.remove("visible");
            audioControler.startMusic();
            game.startGame(100, cards);
        });
    }

    //making the cards flip when clicked
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", (e) => {            
            //audioControler.flip();
            game.flipCard(cards[i]);
            //cards[i].classList.add("visible");

        })
    }

    
    


}