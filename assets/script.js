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
        "JavaScript pushing all variables to the top",
        "they are javascripts answer to fruit loops",
        "selecting an integer to increase for use in a function"
      ],
      answer: "selecting an integer to increase for use in a function"
    }
  ];
  
  // Define other constants and variables you need
  const startButton = document.querySelector("#start-button");
  const timerElement = document.querySelector("#timer");
  const questionEl = document.querySelector("#card0");
  const questionheader = document.querySelector('#questionheader')
  const choicesElement = document.querySelector("#choices");
  const scorebtn = document.querySelector("#scores");
  const questionbtn = document.querySelector('#btn1')
  let currentQuestionIndex = 0;
  let timeLeft = 30;
  let score = 0;
  let timerIntervalId;
  let scores = []
  function setUpScores(scores){
    // localStorage.setitem(('scores', JSON.stringify(scores))
    if (localStorage.getItem('scores') !== null) {
        scores = JSON.parse(localStorage.getItem('scores'));
    } else {
        localStorage.setItem("scores", JSON.stringify(scores));
    }
  }
  
  // Define functions you need
  function initGame() {
    // Hide the start button and show the first question
    startcard.setAttribute('data-state', 'hidden');
    questionEl.setAttribute('data-state', 'visible');
    showQuestion();
    // Start the timer
    timerIntervalId = setInterval(updateTimer, 1000);
  }
  
  function showQuestion() {
    // Display the current question and choices
    const currentQuestion = questions[currentQuestionIndex];
    questionheader.textContent = currentQuestion.question;
    choicesElement.innerHTML = ""; // Clear previous choices
    currentQuestion.choices.forEach((choice) => {
        const li = document.createElement("li");
        li.classList.add("list-group-item", "px-4")
      const label = document.createElement("label");
      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";
      radio.value = choice;
      label.appendChild(radio);
      label.appendChild(document.createTextNode(choice));
      li.appendChild(label);
      choicesElement.appendChild(li);
      questionbtn.addEventListener("click", checkAnswer);
    });
  }
  
  function updateTimer() {
    // Update the timer and check if time is up
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      gameOver();
    }
  }
  
  function checkAnswer() {
    // Check if the selected answer is correct
    const selectedAnswer = document.querySelector("input[name='answer']:checked");
    if (!selectedAnswer) {
      return; // No answer selected
    }
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedAnswer.value === currentQuestion.answer) {
      score++;
    } else {
      timeLeft -= 10; // Subtract 10 seconds for wrong answer
      if (timeLeft < 0) {
        timeLeft = 0;
      }
      timerElement.textContent = timeLeft;
    }
    // Move on to the next question or end the game
    currentQuestionIndex++;
    console.log(score)
    if (currentQuestionIndex >= questions.length) {
      gameOver();
    } else {
      showQuestion();
    }
  }
  
  
  function gameOver() {
    // Stop the timer and display the final score
    clearInterval(timerIntervalId);
    questionheader.textContent = "Game Over";
    choicesElement.textContent = "Your score: " + score;
    // TODO: Allow user to save initials and score
    saveScore();
  }
  function scoreCard(){
    questionheader.textContent = "high scores!";
    scores.forEach(() =>{
    const li = document.createElement("li");
    choicesElement.append(li)})
    
    
  }
  function saveScore(){
    userScore = scoreInput.val()
    scores.push(userScore);
    localStorage.setItem((scores).JSON.stringify(scores))
  }
  setUpScores();
  // Attach event listeners
// var card1 = document.getElementById("card0");
// var card2 = document.getElementById("card1");
// var card3 = document.getElementById("card2");
// var card4 = document.getElementById("card3");
// var answer1 = document.getElementById('correctanswer1');
// var answer2 = document.getElementById('correctanswer2');
// var answer3 = document.getElementById('correctanswer3');
// var answer4 = document.getElementById('correctanswer4');
// var wrong1 = document.getElementById('wrong1');
// var wrong2 = document.getElementById('wrong2');
// var wrong3 = document.getElementById('wrong3');
// var wrong4 = document.getElementById('wrong4');
// var wrongs1 = document.getElementById('wrongs1');
// var wrongs2 = document.getElementById('wrongs2');
// var wrongs3 = document.getElementById('wrongs3');
// var wrongs4 = document.getElementById('wrongs4');
// var wronganswers = [wrong1, wrongs1, wrong2, wrongs2, wrong3, wrongs3, wrong4, wrongs4]
// var rightanswers = [answer1, answer2, answer3, answer4 ];
// var finishcard = document.querySelector('#finishcard');
// var startcard = document.querySelector('#startcard');
// var Btn = document.querySelectorAll(`.btn`);
// var cards = [card1, card2, card3, card4];
// let i = 0;
// let message;
// let timeLeft = 30; 
// var timePenalty = 10; 
// var currentQuestion = 0;
// let score = 0;
// var timerIntervalId;

// function initGame(){
//     startcard.setAttribute('data-state', 'hidden');
//     card1.setAttribute('data-state', 'visible');
//     startTimer();
// }


// // function generateCards{
// //
// //}

// function showNextCard() {
//     var selectedAnswer = document.querySelector('input[name="answer"]:checked');
    
//     console.log(selectedAnswer)
//     handleAnswer(selectedAnswer)
//     if(i < 3){
//         cards[i].setAttribute("data-state", "hidden");
//         i++;
//         cards[i].setAttribute('data-state', 'visible');
//         // displayQuestion();
//         console.log(i)
//     } else {
//         cards[i].setAttribute("data-state", "hidden");
//         endGame();
//         console.log(i)
//     }
// };

// function endGame() {
//     clearInterval(timerIntervalId);
//     cards[i].setAttribute('data-state', 'hidden')
//     finishcard.setAttribute('data-state', 'visible');
//     var displaymessage = document.getElementById('message');
//     displaymessage.innerHTML = `Good job! Your score is ${score}. Please enter your name so we may record your score!`;
// }

// function startTimer() {
    
//     var timerDisplay = document.getElementById('timer');

//     timerIntervalId = setInterval(function() {
//         timeLeft--;
//         timerDisplay.textContent = timeLeft;

//         if (timeLeft <= 0) {
//             endGame();
//         }
//     }, 1000);
// }

// function handleAnswer(selectedAnswer) {
//     if (rightanswers.includes(selectedAnswer)) {
//         score++;
//         // Display message for correct answer
//     } else if(wronganswers.includes(selectedAnswer)) {
//         timeLeft - timePenalty;
//         console.log(timeLeft, timePenalty)
//         // Display message for incorrect answer
//     }
//     console.log(timeLeft, timePenalty, score)
// }



// //everytime this element is hit, increment score by 1
// //onclick='increment"
// //onclick='punish
// //its not an onclick, its a onselect

// //you shouldnt have to do it all by itself, DONT REPEAT YOURSELF
// //THEREFORE everytime that id is selected, increment by 1
// //everytime the other is selected, punish
// //if answerELId =1 score++
