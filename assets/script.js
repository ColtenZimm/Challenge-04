console.log("fire")
var quizQuestions = [
  {
    question: "Which statement calls the class green?",
    choices: ["document.getElementbyld('green)", "document.querySelector('green')", "document.querySelector('#green')", "window.document.querySelector('.green')"],
    answer: "document.querySelector('green')"
  },
  {
    question: "Which comparitive operator means if a is true and b is true otherwise, false?",
    choices: ["&&", "!==", "==", "==="],
    answer: "&&"
  }
];

var currentQuestionIndex = 0;
var timeLeft = 50;
var timeEl = document.getElementById("timer");
var timer;
function startQuiz() {
  timer = setInterval(startTimer, 1000);
  timeEl.textContent = timeLeft
  showQuestion()
}
function startTimer() {
  timeLeft--;
  timeEl.textContent = timeLeft
  console.log(timeLeft);
}

function showQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex]
  var questionEl = document.getElementById('question');
  var choicesEl = document.getElementById('choices');
  questionEl.textContent = currentQuestion.question;
  choicesEl.innerHTML = '';
  for (var i = 0; i < currentQuestion.choices.length; i++) {
    var choice = currentQuestion.choices[i]
    var button = document.createElement('button');
    button.textContent = choice;
    button.classList.add('choice');
    button.addEventListener('click', checkAnswer);
    choicesEl.appendChild(button);
  };
}
function checkAnswer(event) {
  var selectedBtn = event.target;
  var selectedAnswer = selectedBtn.textContent;
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedAnswer === currentQuestion.answer) {

    currentQuestionIndex++;
    if (currentQuestionIndex >= quizQuestions.length) {
      endQuiz();
    } else {
      showQuestion(quizQuestions[currentQuestionIndex]);
    }
  } else {
    // answer is incorrect, subtract time from the clock
    timeLeft -= 10;
  }
}
function endQuiz() {
  clearInterval(timer);
  var score = timeLeft;
  var quizContainer = document.getElementById('quiz-container');
  quizContainer.innerHTML = `<h2>All done!</h2>
      <p>Your final score is ${score}</p>
      <label for="initials">Enter initials:</label>
      <input type="text" id="initials" />
      <button id="submit">Submit</button>`;
  var submitBtn = document.getElementById('submit');
  submitBtn.addEventListener('click', saveScore);
}

  var startbtn = document.querySelector('#start-btn');
  startbtn.addEventListener('click', function () {
    console.log("FIRE")
    startQuiz();
  });
var score = timeLeft;
 // Call this function when the game is over and the user wants to save their score
function saveScore() {
  // Get the user's initials from the input field
  let initialsInput = document.getElementById("initialsInput");
  let initials = initialsInput.value;

  // Get the existing high scores from localStorage, or create an empty array if none exist
  let highScores = JSON.parse(localStorage.getItem("highScores")) || [];

  // Add the current score and initials to the high scores array
  highScores.push({initials: initials, score: score});

  // Sort the high scores array by score (highest to lowest)
  highScores.sort((a, b) => b.score - a.score);

  // Save the high scores back to localStorage
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
