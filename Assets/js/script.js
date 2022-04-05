// 1)WHEN I click the start button THEN a timer starts and I am presented with a question
//
// 2)WHEN I answer a question THEN I am presented with another question
// 3) WHEN I answer a question incorrectly THEN time is subtracted from the clock
// 4)WHEN all questions are answered or the timer reaches 0 THEN the game is over
// 5)WHEN the game is over THEN I can save my initials and my score

// Variables
let startingContainer = document.getElementById('starting-container');
let startBtn = document.getElementById('start-button');
let qContainer = document.getElementById('q-container');
let wrongPrompt = document.getElementById('wrong');
let timeEl = document.getElementById('timeEl');
let allEl = document.body.children;
let submit = document.getElementById('submit');
let initialsInp = document.getElementById('initials-inp');
let finalScore = document.getElementById('score');
let timer = document.getElementById('time');
// variables for question container
let qWrong = document.querySelectorAll('.wrongAnswerChoices');
// q1
let q1 = document.getElementById('q1');
let q1AnswerBtn = document.getElementById('q1-3');
//q2
let q2 = document.getElementById('q2');
let q2AnswerBtn = document.getElementById('q2-4');
let gameOverPage = document.getElementById('game-over');
// q3
let q3AnswerBtn = document.getElementById('q3-2');
// q4
let q4 = document.getElementById('q4');
let q4AnswerBtn = document.getElementById('q4-3');

var secondsLeft = 60;
let score = 0;

// function declarations

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft + ' seconds left till colorsplosion.';

    if (secondsLeft === 0 || secondsLeft < 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      gameOver();
    }
  }, 1000);
}

function clickToStart(e) {
  // let state = element.getAttribute('data-state');
  startingContainer.dataset.state = 'hidden';
  startingContainer.setAttribute('class', 'hidden');

  qContainer.dataset.state = 'visible';
  qContainer.setAttribute('class', 'visible');
  setTime();
  console.log('done');
}

function correctAnswer(e) {
  let currentQuestionSection =
    e.target.parentElement.parentElement.parentElement.parentElement;
  let nextQuestionSection = currentQuestionSection.nextElementSibling;
  // if (wrongPrompt.getAttribute('visible')) {
  //   wrongPrompt.removeAttribute('class', 'visible');
  //   wrongPrompt.setAttribute('class', 'hidden');
  // }
  // console.log(currentQuestionSection);
  if (currentQuestionSection == q4) {
    score += 25;

    qContainer.removeAttribute('class', 'visible');
    qContainer.setAttribute('class', 'hidden');

    finalScore.textContent = score;

    timer.removeAttribute('class', 'visible');
    timer.setAttribute('class', 'hidden');

    gameOverPage.removeAttribute('class', 'hidden');
    gameOverPage.setAttribute('class', 'visible');
  } else {
    currentQuestionSection.removeAttribute('class', 'visible');
    currentQuestionSection.setAttribute('class', 'hidden');

    nextQuestionSection.removeAttribute('class', 'hidden');
    nextQuestionSection.removeAttribute('class', 'visible');

    score += 25;
  }
}

function wrongAnswer(e) {
  wrongPrompt.removeAttribute('class', 'hidden');
  wrongPrompt.setAttribute('class', 'visible');
  secondsLeft -= 10;
}

function gameOver() {
  qContainer.removeAttribute('class', 'visible');
  qContainer.setAttribute('class', 'hidden');

  finalScore.textContent = score;

  timer.removeAttribute('class', 'visible');
  timer.setAttribute('class', 'hidden');

  gameOverPage.removeAttribute('class', 'hidden');
  gameOverPage.setAttribute('class', 'visible');
}
// Logic
// start
startBtn.addEventListener('click', function () {
  clickToStart();
  console.log('hi');
  console.log(qContainer.dataset.state);
});

for (let i = 0; i < qWrong.length; i++) {
  qWrong[i].addEventListener('click', function () {
    wrongAnswer();
  });
}

q1AnswerBtn.addEventListener('click', function (e) {
  correctAnswer(e);
});

q2AnswerBtn.addEventListener('click', function (e) {
  correctAnswer(e);
});

q3AnswerBtn.addEventListener('click', function (e) {
  correctAnswer(e);
});

q4AnswerBtn.addEventListener('click', function (e) {
  correctAnswer(e);
});

// game over
submit.addEventListener('click', function (event) {
  event.preventDefault();

  let user = {
    initials: initialsInp.value.trim(),
    score: finalScore.textContent,
  };

  localStorage.setItem('user', JSON.stringify(user));

  initialsInp.value = '';
});
