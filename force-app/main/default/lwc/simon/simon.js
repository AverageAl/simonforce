import { LightningElement, api } from 'lwc';
import greensound from '@salesforce/resourceUrl/greensound';
import redsound from '@salesforce/resourceUrl/redsound';
import bluesound from '@salesforce/resourceUrl/bluesound';
import yellowsound from '@salesforce/resourceUrl/yellowsound';

export default class simon extends LightningElement {
   // sequence=[0,1,2,3,1,2,1,0];
    // list of source audio files
    audioSrc = [
        greensound,
        redsound,
        yellowsound,
        bluesound
    ]
    gameType; //false=default true=custom
    userSequence;
    sequence = [];
    currentIndex;
    userSelection;
    @api score = 0;
    gameStarted = false;
    @api gameButton = "Start Game";
    run; 
   // gameType = GAMETYPE.STANDARD;
    audio = new Audio();

    next = false;
    currentIndex = 0;
    sequenceIndex = 0;
    userSelection;
    score = 0;

    indexOfAudio = 0;
    
    connectedCallback(){
        this.sequence.push(Math.floor(Math.random() * 4));

        //adds an event listener to when the audio stops playing, if this.next is true it loads the next song
        //if the end of the sequence is reached it sets next to false and resets the current index
        this.audio.addEventListener('ended', (event) => {

            this.indexOfAudio = 0;
            for(let x = 0; x < 4; x++){
                if (this.audio.src.includes(this.audioSrc[x])){
                    this.indexOfAudio = x;
                }
            }


            this.revertColor( this.indexOfAudio );

            this.sequenceIndex++;
            if (this.next && this.sequenceIndex < this.sequence.length){
                this.audio.src = this.audioSrc[this.sequence[this.sequenceIndex]];
                this.audio.play();
            }
            if (this.sequenceIndex >= this.sequence.length){
                this.sequenceIndex = 0;
                this.next = false;
            }
        });
    
    }

    //sets next to true, sets the first audio source and then plays it
    playSequence(){
        console.log('setting next');
        this.next = true;
        this.sequenceIndex = 0;
        console.log('setting source');
        this.audioPlay(this.sequence[this.sequenceIndex]); 
    }

    // Take in user entered sequence and parse into list
    handleUserSequence(event){
        this.userSequence = event.detail.value;
        this.userSequence = this.userSequence.split('').map(c => Number(c));
        this.gameType = 'CUSTOM';//true;//GAMETYPE.CUSTOM;
    }
    //Initialize Game
    startGame(){
        // ASK USER IF THEY WANT TO RESTART IF THEY ARE CURRENTLY IN GAME
        this.gameStarted = true;
        this.sequence = [];
        this.currentIndex = 0;
        this.gameButton = "End Game"; 
        this.getNext();    
    }
    //End game
    endGame(){
        this.gameStarted = false;
        this.gameButton = "Start Game";
    }
    getNext(){
        if(this.gameType == 'CUSTOM'){
            this.sequence.push(this.userSequence[this.currentIndex]);
        }else{
            this.sequence.push(Math.floor(Math.random() * 4));
        }
        this.currentIndex = 0; 
        this.playSequence();

    }
    revertColor(id){
        let query = '[data-id='+ '"'+id+'"'+']';
        let color="background-color:";
        switch(id){
            case 0: color+"#21E935";
            case 1: color+"#EA2D2D";
            case 2: color+"#E9FA2A";
            case 3: color+"#0065FC";
        }
        this.template.querySelector(query).style=color;
    }
    checkUserSelection(){
        //Do nothing if the game is not started
        if (this.gameStarted) {
            //Correct answer
            if (this.userSelection == this.sequence[this.currentIndex]){
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
                this.score++; 
                
                getNext();
            }
        }
    }
    audioPlay(id){
        let query = '[data-id='+ '"'+id+'"'+']';
        this.template.querySelector(query).style="background-color:black";
        console.log('setting ' + id + 'to black');
        let song = this.audioSrc[id];

        this.audio.src = song; 
        this.audio.play();
    }
    //audio handler
    clickHandler(event){

        this.audioPlay(parseInt(event.target.dataset.id));
        //let run2 = setTimeout(() => {this.getNext()}, 1000);
        
        if(event.target.dataset.id != this.sequence[this.currentIndex]){
            clearTimeout(this.run);
            clearTimeout(run2);
            this.endGame();      
        }  else {
            this.currentIndex++;

        }
        if(this.currentIndex >= this.sequence.length){
            this.getNext();
        }
    }
    toggleCreate(){
        this.template.querySelector('[data-id="toggle"]').style="visibility:visible";
    }
}
