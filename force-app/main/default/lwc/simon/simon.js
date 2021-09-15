import { LightningElement } from 'lwc';
import greensound from '@salesforce/resourceUrl/greensound';
import redsound from '@salesforce/resourceUrl/redsound';
import bluesound from '@salesforce/resourceUrl/bluesound';
import yellowsound from '@salesforce/resourceUrl/yellowsound';

export default class simon extends LightningElement {
    audio = [
        new Audio(redsound),
        new Audio(bluesound),
        new Audio(greensound),
        new Audio(yellowsound)
    ]

    clickHandler(event){
        console.log(event.target.dataset.id); // gets the id of the button clicked which should be the index of the audio file in the audio list
        this.audio[parseInt(event.target.dataset.id) ].play();
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
