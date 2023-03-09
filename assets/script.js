var card1 = document.getElementById("card0");
var card2 = document.getElementById("card1");
var card3 = document.getElementById("card2");
var card4 = document.getElementById("card3");
var finishcard = document.querySelector('#finishcard')
var startcard = document.querySelector('#startcard')
var Btn = document.querySelectorAll(`.btn`);
var cards = [card0, card1, card2, card3];
let i = 1;
let message;
var quizDuration = 30; 
var timePenalty = 10; 
var currentQuestion = 0;
var score = 0;
var timerIntervalId;
console.log(finishcard)
function initGame(){
    startcard.setAttribute('data-state', 'hidden');
    card1.setAttribute('data-state', 'visible');
    startTimer();
    initButtons();
    // displayQuestion();
}

// function displayQuestion() {
//     // Display question based on currentQuestion index
// }

function showNextCard() {
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
    card4.setAttribute('data-state', 'hidden')
    finishcard.setAttribute('data-state', 'visible');
    var displaymessage = document.getElementById('message');
    displaymessage.innerHTML = `Good job! Your score is ${score}. Please enter your name so we may record your score!`;
}

function startTimer() {
    var timeLeft = quizDuration;
    var timerDisplay = document.getElementById('timer');

    timerIntervalId = setInterval(function() {
        timeLeft--;
        timerDisplay.textContent = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function handleAnswer(answer) {
    if (answer === currentQuestion.answer) {
        score++;
        // Display message for correct answer
    } else {
        quizDuration -= timePenalty;
        // Display message for incorrect answer
    }
    showNextCard();
}

function initButtons() {
    Btn.forEach(function(button) {
        button.addEventListener("click", function() {
            handleAnswer(answer);
        });
    });
}


