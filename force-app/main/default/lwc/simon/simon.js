import { LightningElement } from 'lwc';
import greensound from '@salesforce/resourceUrl/greensound';
import redsound from '@salesforce/resourceUrl/redsound';
import bluesound from '@salesforce/resourceUrl/bluesound';
import yellowsound from '@salesforce/resourceUrl/yellowsound';

export default class simon extends LightningElement {
    sequence=[0,1,2,3,1,2,1,0];
    // list of source audio files
    audioSrc = [
        redsound,
        bluesound,
        greensound,
        yellowsound
    ]
    audio = new Audio();

    next = false;
    currentIndex = 0;
    userSelection;
    score = 0;
    
    connectedCallback(){
        this.sequence.push(Math.floor(Math.random() * 4));

        //adds an event listener to when the audio stops playing, if this.next is true it loads the next song
        //if the end of the sequence is reached it sets next to false and resets the current index
        this.audio.addEventListener('ended', (event) => {
            if (this.next && this.currentIndex < this.sequence.length){
                this.audio.src = this.audioSrc[this.sequence[this.currentIndex]];
                this.audio.play();
                this.currentIndex++;
            }
            if (this.currentIndex >= this.sequence.length){
                this.currentIndex = 0;
                this.next = false;
            }
        });
    
    }
    clickHandler(event){
        console.log('playing sequence');
        this.playSequence();
        //console.log(event.target.dataset.id);
        //this.audio.src = this.audioSrc[parseInt(event.target.dataset.id) ];
        //this.audio.play();
    }

    //sets next to true, sets the first audio source and then plays it
    playSequence(){
        console.log('setting next');
        this.next = true;
        console.log('setting source');
        this.audio.src = this.audioSrc[this.sequence[this.currentIndex]];
        console.log('playing audio');
        this.audio.play();
    }
    
    // // enum GAMETYPE {
    // //     CUSTOM,
    // //     STANDARD,
    // // }
    // userSequence;
    // sequence = [];
    // currentIndex;
    // userSelection;
    // score;
    // gameStarted = false;
    // gameType = GAMETYPE.STANDARD;
    // connectedCallback(){
    //     this.sequence.push(Math.floor(Math.random() * 4));
    // }
    // // Take in user entered sequence and parse into list
    // handleUserSequence(event){
    //     this.userSequence = event.detail.value;
    //     this.userSequence = this.userSequence.split('').map(c => Number(c));
    //     this.gameType = GAMETYPE.CUSTOM;
    // }
    // //Initialize Game
    // startGame(){
    //     // ASK USER IF THEY WANT TO RESTART IF THEY ARE CURRENTLY IN GAME
    //     this.gameStarted = true;
    //     this.sequence = [];
    //     score = 0;
    //     this.currentIndex = 0;
    //     getNext();
    // }
    // //End game
    // endGame(){
    //     this.gameStarted = false;
    // }
    // getNext(){
    //     if(this.gameType = GAMETYPE.CUSTOM){
    //         this.sequence.push(this.userSequence[this.currentIndex]);
    //     }
    //     else{
    //         this.sequence.push(Math.floor(Math.random() * 4));
    //     }
    //     this.currentIndex = 0;
    // }
    // checkUserSelection(){
    //     //Do nothing if the game is not started
    //     if (this.gameStarted) {
    //         //Correct answer
    //         if (this.userSelection == this.sequence[currentIndex]){
    //             this.currentIndex += 1;
    //         }
    //         //Incorrect answer. Showing final score and restarting game.
    //         else {
    //             //SHOW ALERT OF FINAL SCORE
    //             endGame();
    //             return;
    //         }
    //         if ((this.gameType == GAMETYPE.CUSTOM) && (this.currentIndex == this.userSequence.length)){
    //             endGame();
    //         }
    //         //Finished sequence. Add next pattern to sequence.
    //         if (this.currentIndex == this.sequence.length){
    //             getNext();
    //         }
    //     }
    // }
}
