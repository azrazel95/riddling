var q0 = document.getElementById('q0');
var q1 = document.getElementById('q1');
var q2 = document.getElementById('q2');
var q3 = document.getElementById('q3');
var questionCards = [q0, q1, q2, q3];
quest = questionCards[0];
//i used this to check
console.log(questionCards.length)
for (i = 0; i < questionCards.length; i++){
    console.log(questionCards[i])
}


  function nextQuestion() {
    if (quest.data-state ==='visible') {
        quest.data-state === 'hidden';
    }
    else
    quest.data-state === 'visible'
}

