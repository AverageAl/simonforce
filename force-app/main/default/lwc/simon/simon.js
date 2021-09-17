import { LightningElement, api } from 'lwc';
import greensound from '@salesforce/resourceUrl/greensound';
import redsound from '@salesforce/resourceUrl/redsound';
import bluesound from '@salesforce/resourceUrl/bluesound';
import yellowsound from '@salesforce/resourceUrl/yellowsound';

export default class simon extends LightningElement {

    // list of source audio files
    audioSrc = [
        greensound,
        redsound,
        yellowsound,
        bluesound
    ]

    curSquare;
    gameType; //false=default true=custom
    userSequence;
    sequence = [];
    currentIndex;
    userSelection;
    @api score = 0;
    gameStarted = false;
    @api gameButton = "Start Game";
    run; 
    audio = new Audio();

    next = false;
    currentIndex = 0;
    sequenceIndex = 0;
    userSelection;
    score = 0;
    userInput=[]; 
    noClick = false; 
    
    // connectedCallback(){
    //     this.sequence.push(Math.floor(Math.random() * 4));

    //     //adds an event listener to when the audio stops playing, if this.next is true it loads the next song
    //     //if the end of the sequence is reached it sets next to false and resets the current index
    //     this.audio.addEventListener('ended', (event) => {

    //         this.indexOfAudio = 0;
    //         for(let x = 0; x < 4; x++){
    //             if (this.audio.src.includes(this.audioSrc[x])){
    //                 this.indexOfAudio = x;
    //             }
    //         }


    //         this.revertColor( this.indexOfAudio );

    //         this.sequenceIndex++;
    //         if (this.next && this.sequenceIndex < this.sequence.length){
    //             this.audio.src = this.audioSrc[this.sequence[this.sequenceIndex]];
    //             this.audio.play();
    //         }
    //         if (this.sequenceIndex >= this.sequence.length){
    //             this.sequenceIndex = 0;
    //             this.next = false;
    //         }
    //     });
    // }

    //sets next to true, sets the first audio source and then plays it
    // playSequence(){
    //     console.log('setting next');
    //     this.next = true;
    //     this.sequenceIndex = 0;
    //     console.log('setting source');
    //     this.audioPlay(this.sequence[this.sequenceIndex]); 
    // }

    // Take in user entered sequence and parse into list
    handleUserSequence(event){
        this.userSequence = event.detail.value;
        this.userSequence = this.userSequence.split('').map(c => Number(c));
        this.gameType = 'CUSTOM';//true;//GAMETYPE.CUSTOM;
    }

    //Initialize Game
    startGame(){
        
        if (this.gameButton == "End Game" && this.noClick){
            this.endGame(); 
        }else{
        // ASK USER IF THEY WANT TO RESTART IF THEY ARE CURRENTLY IN GAME
            this.noClick = true; 
            this.gameStarted = true;
            this.sequence = [];
            this.userInput=[]; 
            this.currentIndex = 0;
            this.gameButton = "End Game"; 
            this.getNext();    
        }      
    }

    //End game
    endGame(){
        alert("You messed up! Your score is: " + this.score);
        this.gameStarted = false;
        this.gameButton = "Start Game";
        this.sequence = [];
        this.userInput=[]; 
        this.score = 0; 
    }

    //gets next in sequence and plays
    async getNext(){
        this.curSquare = Math.floor(Math.random() * 4); 
        this.sequence.push(this.curSquare);
        this.noClick = false; 

        for (let i = 0; i < this.sequence.length; i++){            
            try{
                await this.wait(1000);
                this.audioPlay(this.sequence[i]);  
            }catch(e){}
        }
        this.noClick = true;
    }

    //reverts to original colors
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

    //waits for colors to show
    wait(ms)  {
        return new Promise( resolve => { setTimeout(resolve, ms); });
    }

    audioPlay(id){
        let query = '[data-id='+ '"'+id+'"'+']';
        
        if (this.gameStarted){
            this.template.querySelector(query).style="background-color:black";
            var song = this.audioSrc[id];
        }

        this.audio.src = song; 
        this.audio.play();
        setTimeout(() => { this.revertColor(id);}, 100);
    }
    //audio handler
    clickHandler(event){
        this.userInput.push(parseInt(event.target.dataset.id));
        this.audioPlay(event.target.dataset.id);

        if(JSON.stringify(this.userInput) === JSON.stringify(this.sequence)){
            this.userInput=[];
            this.score++; 
            this.getNext();
        }else if(JSON.stringify(this.userInput) != JSON.stringify(this.sequence) && this.userInput.length >= this.sequence.length){
            this.endGame(); 
        }
    }
}
