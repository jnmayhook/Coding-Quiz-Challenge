var score = 0;
var timeLeft = 75;
var timer = document.getElementById("timer");
var startBtn = document.getElementById("startBtn");
var introduction = document.getElementById("introduction");
var title = document.getElementById("title");
var questions = document.getElementById("questions");
var choices = document.querySelectorAll(".choices");
var answerBtn1 = document.getElementById("0");
var answerBtn2 = document.getElementById("1");
var answerBtn3 = document.getElementById("2");
var answerBtn4 = document.getElementById("3");
var result = document.getElementById("result");

var index = 0;
var myTimeInterval;
var questionsArr = [
  {
    title: "Commonly used data types DO NOT include:",
    choices: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
    answer: "alerts",
  },
  {
    title: "The condition in an if / else statement enclosed within _______.",
    choices: [
      "1. quotes",
      "2. curly brackets",
      "3. parenthesis",
      "4. square brackets",
    ],
    answer: "parenthesis",
  },
  {
    title: "Arrays in JavaScript can be used to store _______.",
    choices: [
      "1. numbers and strings",
      "2. other arrays",
      "3. booleans",
      "4. all of the above",
    ],
    answer: "all of the above",
  },
  {
    title:
      "String values must be enclosed within _______ when being assigned to variables.",
    choices: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
    answer: "quotes",
  },
  {
    title:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choices: [
      "1. javascript",
      "2. terminal / bash",
      "3. for loops",
      "4. console log",
    ],
    answer: "console log",
  },
];

startBtn.addEventListener("click", quizStart);
answerBtn1.addEventListener("click", nextQuestion);
answerBtn2.addEventListener("click", nextQuestion);
answerBtn3.addEventListener("click", nextQuestion);
answerBtn4.addEventListener("click", nextQuestion);

// set initial timer value and fire off two functions
function quizStart() {
  myTimeInterval = setInterval(startTimer, 1000);
  timer.textContent = "Time: " + timeLeft;
  introduction.style.display = "none";
  displayQuestion();
  questions.style.display = "block";
}

function startTimer() {
  timeLeft--;
  timer.textContent = "Time: " + timeLeft;
  if (timeLeft <= 0) {
    endTime();
  }
}

function displayQuestion() {
  if (index < questionsArr.length) {
    title.textContent = questionsArr[index].title;
    answerBtn1.textContent = questionsArr[index].choices[0];
    answerBtn2.textContent = questionsArr[index].choices[1];
    answerBtn3.textContent = questionsArr[index].choices[2];
    answerBtn4.textContent = questionsArr[index].choices[3];
  }
}

function nextQuestion(event) {
  var currentButton = Number(event.target.id);
  var correctAnswer = questionsArr[index].answer;
  var currentChoice = questionsArr[index].choices[currentButton];
  var choiceArr = currentChoice.split(".");
  currentChoice = choiceArr[1].trim();
  if (correctAnswer === currentChoice) {
    score++;
    result.textContent = "Correct";
    setTimeout(function () {
      result.innerHTML = "";
    }, 800);
  } else {
    timeLeft = timeLeft - 15;
    result.textContent = "Wrong";
    setTimeout(function () {
      result.innerHTML = "";
    }, 800);
  }
  index++;
  if (index < questionsArr.length) {
    displayQuestion();
  } else {
    setTimeout(function () {
      endTime();
      if (endTime) {
        finalScore.textContent = "Your final score is " + score + ".";
      }
    }, 1000);
  }
}

function endTime() {
  console.log(timeLeft);
  timer.textContent = "Time: " + timeLeft;
  clearInterval(myTimeInterval);
  questions.style.display = "none";
  enterIntials.style.display = "block";
  highscoreBoard.style.display = "none";
}

var enterIntials = document.getElementById("enterInitials");
var initialsInput = document.getElementById("initialsInput");
var initialsInputBtn = document.getElementById("initialsInputBtn");
var finalScore = document.getElementById("finalScore");
var highscoreBoard = document.getElementById("highscoreBoard");
var highscoreList = document.getElementById("highscore-list");
var clearBtn = document.getElementById("clear-btn")
var highscore = JSON.parse(localStorage.getItem("highscore"));
var goBackBtn = document.getElementById("goBackBtn");
var viewHighscores = document.getElementById("view-highscores")
initialsInputBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var initial = document.querySelector("#initialsInput").value;
  if (initial === "") {
    alert("Initials cannot be blank");
  } else {
    console.log(highscore, "i'm highscore");
    if (highscore === null) {
      highscore = [];
    };
    var user = {
      name: initial,
      score: score,
    };
    console.log(user);
    highscore.push(user)
    localStorage.setItem("highscore", JSON.stringify(highscore)); 
    displayScores();
  }
  enterIntials.style.display = "none";
  highscoreBoard.style.display = "block";
});

function displayScores() {
  for (var i = 0; i < highscore.length; i++) {
    highscoreList.innerHTML +='<li>' + highscore[i].name +'<span>' + highscore[i].score +'</span>' + '</li>';
  }
};

function clearScores() {
  localStorage.clear();
  highscoreList.innerHTML = "";
}
clearBtn.addEventListener("click", function() {
  clearScores();
});
goBackBtn.addEventListener("click", function() {
  location.reload();
})
viewHighscores.addEventListener("click", function () {
  highscoreBoard.style.display = "block";
  introduction.style.display = "none";
  timer.style.display = "none";
  displayScores();
})

// After game is over user enters highscore and clicks submit; 
// if highscore is higher than existing score in local storage, score is not logged
// updated highscore board appears with two buttons, "clear highscores" and "go back"