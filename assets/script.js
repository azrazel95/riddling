//defining my questions at the beginning

const questions = [
  {
    question: "What does hoisting refer to?",
    choices: [
      "JavaScript pushing all variables to the top",
      "Javascript uplifting CSS",
      "Javascript being a primarily naval based language"
    ],
    answer: "JavaScript pushing all variables to the top"
  },
  {
    question: "What is css used for?",
    choices: [
      "Decorating!",
      "Making the code cascade",
      "Using style sheets to riverraft"
    ],
    answer: "Decorating!"
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hyped Tempurpedic Monkey Lions",
      "Hyper Text Markup Language",
      "High Tonic Music Listeners"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "What are for loops usually used for?",
    choices: [
      "to create ongoing css cascades",
      "they are javascripts answer to fruit loops",
      "selecting an integer to increase for use in a function"
    ],
    answer: "selecting an integer to increase for use in a function"
  }
];

// defining my document variables
const startButton = document.querySelector("#start-button");
const timerElement = document.querySelector("#timer");
const questionEl = document.querySelector("#card0");
const questionheader = document.querySelector('#questionheader')
const choicesElement = document.querySelector("#choices");
const scorebtn = document.querySelector("#scores");
const questionbtn = document.querySelector('#btn1')
let highScores = document.querySelector('#scoreCard')
let scoreEl = document.querySelector('#scoreEl')
let li = document.createElement("li");
let form = document.createElement('form');
let timebtn = document.querySelector('#timer')
//declaring function results and variables used amongst multiple functions
let currentQuestionIndex = 0;
let timeLeft = 30;
let score = 0;
let timerIntervalId;
//also an array
let scores = []
let userInits
let scoreNum
let scoreInput;
//setting up scores at beginning of pageload, in case you come back to the webpage later and want to view your old scores
//also setting up the localstorage entry in case it does not yet exist
function setUpScores(scores) {
  if (localStorage.getItem('scores') !== null) {
    scores = localStorage.getItem('scores');
  } else {
    localStorage.setItem("scores", JSON.stringify(scores));
  }
}

// executes on click of the start button
function initGame() {
  // Hides the starting card and shows the question card
  startcard.setAttribute('data-state', 'hidden');
  questionEl.setAttribute('data-state', 'visible');
  timebtn.setAttribute('data-state', 'visible');
  
  //populates the question card with the first question
  showQuestion();
  // Starts the timer
  timerIntervalId = setInterval(updateTimer, 1000);
}
function showQuestion() {
  // Displays the current question and choices
  const currentQuestion = questions[currentQuestionIndex];
  questionheader.textContent = currentQuestion.question;
  // Clears previous choices
  choicesElement.innerHTML = "";
  //iterates over the choices and displays them on the card
  currentQuestion.choices.forEach((choice) => {
    //i had to declare li individually for the functions because otherwise it didnt populate right
    let li = document.createElement("li");
    //makes it pretty
    li.classList.add("list-group-item", "px-4")
    //using radio ensures you can only choose one choice at a time
    const label = document.createElement("label");
    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    //checks whether your choice is right or wrong
    radio.value = choice;
    //appends
    label.appendChild(radio);
    label.appendChild(document.createTextNode(choice));
    li.appendChild(label);
    choicesElement.appendChild(li);
    //ensures that the score is added up
    questionbtn.addEventListener("click", checkAnswer);
  });
}

function updateTimer() {
  // Updates the timer and checks if time is up
  timeLeft--;
  timerElement.textContent = timeLeft;
  //if the time is up, executes gameoverfunction
  if (timeLeft <= 0) {
    gameOver();
  }
}

function checkAnswer() {
  // Checks if the selected answer is correct
  const selectedAnswer = document.querySelector("input[name='answer']:checked");
  //if no answer is selected, it will reject
  if (!selectedAnswer) {
    return;
  }
  //checks the selected answer against the correct answer to the current question. if not, detracts 10 seconds from the timer
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedAnswer.value === currentQuestion.answer) {
    score++;
  } else {
    timeLeft -= 10;
    //ensures the timer doesnt go below 0
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    //populates/updates the timer element
    timerElement.textContent = timeLeft;
  }
  // Moves on to the next question or ends the game
  currentQuestionIndex++;
  if (currentQuestionIndex >= questions.length) {
    gameOver();
  } else {
    showQuestion();
  }
}


function gameOver() {
  // Stops the timer
  clearInterval(timerIntervalId);


  //populates the card for the game over event
  questionheader.classList.add("text-center", "font-weight-bold")
  questionheader.textContent = "Game Over";
  choicesElement.classList.add("text-center")
  choicesElement.textContent = "Your score:";
  choicesElement.appendChild(li);
  // creates a form to enter your initials
  choicesElement.appendChild(form)
  li.classList.add("list-group-item", "px-4", "text-center")
  li.setAttribute("id", "userScore")
  //shows your score
  li.innerHTML = score;
  form.classList.add('form-inline', "m-2");
  const scoreInput = document.createElement('input');
  //clears the form so it doesnt show the input multiple times
  let remaininginput = form.querySelector("#scoreInput");
  if (remaininginput) {
    remaininginput.remove()
  }
  scoreInput.id = 'scoreInput';
  scoreInput.classList.add('form-control', 'mr-sm-2');
  scoreInput.type = "text"
  scoreInput.placeholder = "enter your Initals!";
  scoreInput.setAttribute("aria-label", "score");
  form.appendChild(scoreInput)
  // i had to remove it at first in case it was still there from the first time around so it doesnt execute twice(this was a nightmare to debug)
  questionbtn.removeEventListener('click', saveScore);
  questionbtn.addEventListener('click', saveScore);
}

function scoreCard() {
  //ensures that if pressed during the quiz you dont keep the timer running for quality of life
  clearInterval(timerIntervalId);
  //gets the scores from localstorage if not previously populated locally
  if (typeof localStorage !== 'undefined') {
    scores = JSON.parse(localStorage.getItem('scores')) || []
  } else {
    scores = []
  }
  //hides the other 2 cards in case the button is pressed at any moment
  startcard.setAttribute('data-state', 'hidden');
  questionEl.setAttribute('data-state', 'hidden');
  highScores.setAttribute('data-state', 'visible');
  //clears the score so it doesnt populate twice (again, nightmare to debug)
  let remainingscoreEl = scoreEl.querySelectorAll(".list-group-item")
  if (remainingscoreEl) {
    remainingscoreEl.forEach(element => element.remove())
  }
  //iterates over the scores array to create a list item for every score
  for (let i = 0; i < scores.length; i++) {
    const li = document.createElement('li');
    li.classList.add('list-group-item', 'px-4')
    li.innerText = `${scores[i].initials}: ${scores[i].score}`;
    scoreEl.append(li);
  }
}
function saveScore() {
  //pushes the scores and initials to scores, then puts them in localstorage
  userInits = document.getElementById('scoreInput').value
  scoreNum = document.getElementById("userScore").innerText
  let scoreObject = { initials: userInits, score: scoreNum }
  scores.push(scoreObject);
  localStorage.setItem("scores", JSON.stringify(scores))
  //removes savescore from the button.
  // in hindsight it would be much leaner to make javascript generate the cards individually,
  // but i really wanted to make use of the data-state hidden functionality to see if i could make it work.
  // unfortunately that led to the need for this.
  questionbtn.removeEventListener('click', saveScore);
  //displays all scores at the end of the game
  scoreCard()
}
function backtostart() {
  //on buttonpress of the button on highscores, it will return you to the starting card
  highScores.setAttribute('data-state', 'hidden');
  startcard.setAttribute('data-state', 'visible');
  scorebtn.setAttribute('data-state', 'visible');
  //resets to beginningquestion, resets the timer, and the score for a new game
  currentQuestionIndex = 0;
  timeLeft = 30
  score = 0
}
//grabs the scores array for page startup
setUpScores();