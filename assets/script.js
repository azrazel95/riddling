var card1 = document.getElementById("card1");
var card2 = document.getElementById("card2");
var card3 = document.getElementById("card3");
var card4 = document.getElementById("card4");
var card5 = document.getElementById("card5");
var nextBtn = document.querySelector(".next-btn");
var cards = [card1, card2, card3, card4, card5];
let i = 0;
var quizDuration = 60; 
var timePenalty = 10; 
var currentQuestion = 0;
var score = 0;
var timerIntervalId;

function showNextCard() {
  cards[i].setAttribute("data-state", "hidden");
    i++;
  cards[i].setAttribute('data-state', 'visible');
  console.log(i, cards[i])
};
nextBtn.addEventListener('click', showNextCard());


//shownextcard
//every time the function starts, 


   