import { LightningElement, api } from 'lwc';
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
    curSquare;
    gameType = false; //false=default true=custom
    userSequence;
    sequence = [];
    currentIndex;
    userSelection;
    @api score = 0;
    gameStarted = false;
    @api gameButton = "Start Game";
    run; 
   // gameType = GAMETYPE.STANDARD;
    // connectedCallback(){
    //     this.sequence.push(Math.floor(Math.random() * 4));
    // }
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
         //this.score = 0;
         this.currentIndex = 0;
         this.gameButton = "End Game";
        //  while (this.gameStarted){
       // for(int=0; i<10000; i++){
            
                this.getNext();
            
            //this.revertColor(); 
            //if(this.gameStarted = false){
            //    this.endGame(); 
           // }
       // }
            
        // }
         
    }
    //End game
    endGame(){
        this.gameStarted = false;
        this.gameButton = "Start Game";
    }
    getNext(){
        // if(this.gameType){
        //     this.sequence.push(this.userSequence[this.currentIndex]);
        // }
        // else{
        //     this.sequence.push(Math.floor(Math.random() * 4));
        // }
        // this.currentIndex = 0;
        // do{
            // setTimeout(function(){
        
        this.run = setTimeout(() => {  
                if(this.gameStarted){
                this.curSquare = Math.floor(Math.random() * 4);
                let query = '[data-id='+ '"'+this.curSquare+'"'+']';
                this.template.querySelector(query).style="background-color:black";
                }
                setTimeout(() => { this.revertColor();}, 500);
            }, 2000);
        
    
    }
    revertColor(){
        //this.curSquare;
        let query = '[data-id='+ '"'+this.curSquare+'"'+']';
        let color="background-color:";
        switch(this.curSquare){
            case 0: color+"#21E935";
            case 1: color+"#EA2D2D";
            case 2: color+"#E9FA2A";
            case 3: color+"#0065FC";
        }
        this.template.querySelector(query).style=color;
    }
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
    //         if ((this.gameType) && (this.currentIndex == this.userSequence.length)){
    //             endGame();
    //         }
    //         //Finished sequence. Add next pattern to sequence.
    //         if (this.currentIndex == this.sequence.length){
    //             getNext();
    //         }
    //     }
    // }
    //audio handler
    clickHandler(event){
        console.log(event.target.dataset.id); // gets the id of the button clicked which should be the index of the audio file in the audio list
        this.audio[parseInt(event.target.dataset.id) ].play();
        let run2 = setTimeout(() => {this.getNext()}, 1000);
        if(event.target.dataset.id != this.curSquare){
            clearTimeout(this.run);
            clearTimeout(run2);
            this.endGame(); 
            
        }else{
            this.score++; 
             
            //this.revertColor();
            //this.getNext();
        }
        
    }
    toggleCreate(){
        this.template.querySelector('[data-id="toggle"]').style="visibility:visible";
    }
}
