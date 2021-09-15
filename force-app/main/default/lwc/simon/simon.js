import SystemModstamp from '@salesforce/schema/Account.SystemModstamp';
import { lightning } from 'lwc';

export default class simon extends LightningElement {
    let sequence = [];
    let currentIndex = 0;
    let userSelection;
    let score = 0;
    //
    connectedCallback(){
        sequence.push(Math.floor(Math.random() * 4));
    }
    checkUserSelection(){
        //Correct answer
        if (userSelection && sequence[currentIndex]){
            currentIndex += 1;
        }
        //Incorrect answer. Showing final score and restarting game.
        else {
            //SHOW ALERT OF FINAL SCORE
            score = 0;
            sequence = [];
            sequence.push(Math.floor(Math.random() * 4));
            playSequence();
            return;
        }
        //Finished sequence. Add next pattern to sequence.
        if (currentIndex == sequence.length){
            currentIndex = 0;
            score += 1;
            sequence.push(Math.floor(Math.random() * 4));
        }
    }

    playSequence(){}
}
