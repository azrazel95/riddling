var card1 = document.getElementById("card0");
var card2 = document.getElementById("card1");
var card3 = document.getElementById("card2");
var card4 = document.getElementById("card3");
var answer1 = document.getElementById('correctanswer1');
var answer2 = document.getElementById('correctanswer2');
var answer3 = document.getElementById('correctanswer3');
var answer4 = document.getElementById('correctanswer4');
var wrong1 = document.getElementById('wrong1');
var wrong2 = document.getElementById('wrong2');
var wrong3 = document.getElementById('wrong3');
var wrong4 = document.getElementById('wrong4');
var wrongs1 = document.getElementById('wrongs1');
var wrongs2 = document.getElementById('wrongs2');
var wrongs3 = document.getElementById('wrongs3');
var wrongs4 = document.getElementById('wrongs4');
var wronganswers = [wrong1, wrongs1, wrong2, wrongs2, wrong3, wrongs3, wrong4, wrongs4]
var rightanswers = [answer1, answer2, answer3, answer4 ];
var finishcard = document.querySelector('#finishcard');
var startcard = document.querySelector('#startcard');
var Btn = document.querySelectorAll(`.btn`);
var cards = [card1, card2, card3, card4];
let i = 0;
let message;
let timeLeft = 30; 
var timePenalty = 10; 
var currentQuestion = 0;
let score = 0;
var timerIntervalId;

function initGame(){
    startcard.setAttribute('data-state', 'hidden');
    card1.setAttribute('data-state', 'visible');
    startTimer();
}



function showNextCard() {
    var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
    console.log(selectedAnswer)
    handleAnswer(selectedAnswer)
    if(i < 3){
        cards[i].setAttribute("data-state", "hidden");
        i++;
        cards[i].setAttribute('data-state', 'visible');
        // displayQuestion();
        console.log(i)
    } else {
        cards[i].setAttribute("data-state", "hidden");
        endGame();
        console.log(i)
    }
};

function endGame() {
    clearInterval(timerIntervalId);
    cards[i].setAttribute('data-state', 'hidden')
    finishcard.setAttribute('data-state', 'visible');
    var displaymessage = document.getElementById('message');
    displaymessage.innerHTML = `Good job! Your score is ${score}. Please enter your name so we may record your score!`;
}

function startTimer() {
    
    var timerDisplay = document.getElementById('timer');

    timerIntervalId = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleAnswer(selectedAnswer) {
    if (rightanswers.includes(selectedAnswer)) {
        score++;
        // Display message for correct answer
    } else if(wronganswers.includes(selectedAnswer)) {
        timeLeft - timePenalty;
        console.log(timeLeft, timePenalty)
        return timeLeft;

        // Display message for incorrect answer
    }
}



//everytime this element is hit, increment score by 1
//onclick='increment"
//onclick='punish
//its not an onclick, its a onselect

//you shouldnt have to do it all by itself, DONT REPEAT YOURSELF
//THEREFORE everytime that id is selected, increment by 1
//everytime the other is selected, punish
//if answerELId =1 score++
