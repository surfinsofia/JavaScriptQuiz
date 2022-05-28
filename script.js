var questionsel = document.getElementById("questions");
var timeel = document.getElementById("timer");
var startbutton = document.getElementById("start");
var choices = document.getElementById("choices");
var time = 45;
var timerid;
var currentquestionindex = 0;


var questions = [
  {
    question: "why did the chicken cross road",
    choices: ["just because", "he was lost", "because free will"],
    answer: "just because",
  },

  {
    question: "how are you",
    choices: ["good", "bad", "meh"],
    answer: "good",
  },


]

function gameover() {
  clearInterval(timerid);

}

function timer() {
  time--;
  timeel.textContent = time;
  if (time <= 0) {
    gameover();
  }
}

function checkanswer() {
  console.log(this.value)
  if (this.value !== questions[currentquestionindex].answer) {
    time -= 10
    if (time < 0) {
      time = 0
    }
    timeel.textContent=time;
  }
  else{
    currentquestionindex++
    showquestions();
  }
  //currentquestionindex++ 
  //showquestions();
}

function showquestions() {
  var currentquestion = questions[currentquestionindex]
  var title = document.getElementById("qtitle");
  choices.innerHTML="";
  console.log(currentquestion.question)
  title.textContent = currentquestion.question;
  currentquestion.choices.forEach(function (choice) {
    var choicebutton = document.createElement("button");
    choicebutton.setAttribute("value", choice)
    choicebutton.textContent = choice;
    choicebutton.onclick = checkanswer;
    choices.appendChild(choicebutton);
  })

}

function start() {
  var startscreen = document.getElementById("startscreen");
  startscreen.setAttribute("class", "hide")
  questionsel.removeAttribute("class")

  timerid = setInterval(timer, 1000)
  timeel.textContent = time;
  showquestions();
}
startbutton.onclick = start;



// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and my score