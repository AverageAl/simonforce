import { LightningElement, api } from 'lwc';

export default class simon extends LightningElement {
    // enum GAMETYPE {
    //     CUSTOM,
    //     STANDARD,
    // }
    @api gameType = false; //false=default true=custom
    userSequence;
    sequence = [];
    currentIndex;
    userSelection;
    score;
    gameStarted = false;
   // gameType = GAMETYPE.STANDARD;
    connectedCallback(){
        this.sequence.push(Math.floor(Math.random() * 4));
    }
    // Take in user entered sequence and parse into list
    handleUserSequence(event){
        this.userSequence = event.detail.value;
        this.userSequence = this.userSequence.split('').map(c => Number(c));
        this.gameType = true;//GAMETYPE.CUSTOM;
    }
    //Initialize Game
    startGame(){
        // ASK USER IF THEY WANT TO RESTART IF THEY ARE CURRENTLY IN GAME
         this.gameStarted = true;
         this.sequence = [];
         this.score = 0;
         this.currentIndex = 0;
         //getNext();
    }
    //End game
    endGame(){
        this.gameStarted = false;
    }
    getNext(){
        if(this.gameType){
            this.sequence.push(this.userSequence[this.currentIndex]);
        }
        else{
            this.sequence.push(Math.floor(Math.random() * 4));
        }
        this.currentIndex = 0;
    }
    checkUserSelection(){
        //Do nothing if the game is not started
        if (this.gameStarted) {
            //Correct answer
            if (this.userSelection == this.sequence[currentIndex]){
                this.currentIndex += 1;
            }
            //Incorrect answer. Showing final score and restarting game.
            else {
                //SHOW ALERT OF FINAL SCORE
                endGame();
                return;
            }
            if ((this.gameType) && (this.currentIndex == this.userSequence.length)){
                endGame();
            }
            //Finished sequence. Add next pattern to sequence.
            if (this.currentIndex == this.sequence.length){
                getNext();
            }
        }
    }
}
