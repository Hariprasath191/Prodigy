const rNumber = Math.floor(Math.random()*10);
let limit=4;

function getNumber(){
const p1 = document.querySelector('.Answer');

p1.textContent = 'The Random Generated number is '+rNumber;

}

function checkNumber(){
    const inputElement = document.getElementById("input1");
    const eNumber = inputElement.value;
    // Check if the input is a valid number
    if (isNaN(eNumber) || eNumber < 1 || eNumber > 9) {
        alert("Please enter a valid number between 0 and 9.");
        return; // Exit if input is invalid
    }

    const p2 = document.querySelector('.output');
    const p3 = document.querySelector('.status');
    const p4 = document.querySelector('.attempt');

    limit-=1;
    if (limit <0){
        p2.textContent="";
        p3.textContent = 'You Loose Start again '
        return;
    }
    else if (rNumber==eNumber){
        p3.textContent = ' You win '
    }
    else if (rNumber<eNumber){
        p2.textContent = 'You Entered :  '+eNumber+" is greater";
    }
    else if (rNumber>eNumber){
        p2.textContent = 'You Entered :  '+eNumber+ " is smaller";
    }
    inputElement.value="";
    p4.textContent = 'Attempts left: ' + limit; 
    p2.textContent = 'You Entered :  '+eNumber;

    

    }
    