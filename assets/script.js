var score = 0;
var questionIndex = 0;
var currentTime = document.querySelector("#currentTime");
var timer = document.querySelector("#startTime");
var questionsDiv = document.querySelector("#questionsDiv");
var box = document.querySelector("#box");


var questions = [
    {
        title: "What does an array do?",
        choices: ["it plays the banjo", "it stores multiple values for a single variable", "it cheers hip hip array", "it prints to console"],
        answer: "it stores multiple values for a single variable"
    },
    {
        title: "What is the main concept of JavaScript objects?",
        choices: ["they hold values that can be retrieved", "key-value pairs", "they hold arrays", "all the above"],
        answer: "all the above"
    },
    {
        title: "What does SQL stand for?",
        choices: ["Select Queen Lizzy", "Secret Queer Love", "Structured Query Language", "Sofia Questioned Life"],
        answer: "Structured Query Language"
    },
    {
        title: "What is a conditional?",
        choices: ["fake love", "IF, ELSE statement", "it moisturizes hair", "a place for young delinquents"],
        answer: "IF, ELSE statement"
    },
    {
        title: "Which of the following is NOT a loop used in JavaScript",
        choices: ["for loop", "while loop", "do-while loop", "froot loop"],
        answer: "froot loop"
    },

];

// 60 seconds on the clock
var secondsLeft = 60;
// interval time
var holdInterval = 0;
// penalty time
var penalty = 10;
// creates new element
var ulCreate = document.createElement("ul");

// start timer when button is clicked, show user timer 
timer.addEventListener("click", function () {
    if (holdInterval === 0) {
        holdInterval = setInterval(function () {
            secondsLeft--;
            currentTime.textContent = "Time: " + secondsLeft;
            if (secondsLeft <= 0) {
                clearInterval(holdInterval);
                Done();
                currentTime.textContent = "Time's up!";
            }
        }, 1000);
    }
    render(questionIndex);
});

// renders questions and choices to page: 
function render(questionIndex) {
    // clears existing data 
    questionsDiv.innerHTML = "";
    ulCreate.innerHTML = "";
    // loop through all info in array
    for (var i = 0; i < questions.length; i++) {
        // uses question title only
        var userQuestion = questions[questionIndex].title;
        var userChoices = questions[questionIndex].choices;
        questionsDiv.textContent = userQuestion;
    }
    // question choices
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("li");
        listItem.textContent = newItem;
        questionsDiv.appendChild(ulCreate);
        ulCreate.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
// compare choices with answer using event
function compare(event) {
    var element = event.target;

    if (element.matches("li")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct answer feedback
        if (element.textContent == questions[questionIndex].answer) {
            score++;
            createDiv.textContent = "Correct! The answer is:  " + questions[questionIndex].answer;
        } else {
            // wrong answer feedback, time penalty
            secondsLeft = secondsLeft - penalty;
            createDiv.textContent = "Wrong! The correct answer is:  " + questions[questionIndex].answer;
        }

    }
    // Question Index determines which number question user is on
    questionIndex++;

    if (questionIndex >= questions.length) {
        // All done will end quiz and show user stats
        Done();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        render(questionIndex);
    }
    questionsDiv.appendChild(createDiv);

}
// Done will append last page
function Done() {
    questionsDiv.innerHTML = "";
    currentTime.innerHTML = "";

    // html for when quiz is Done
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "All Done!"

    questionsDiv.appendChild(createH1);

    // paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsDiv.appendChild(createP);

    // calculates time remaining, score
    if (secondsLeft >= 0) {
        var timeRemaining = secondsLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInterval);
        createP.textContent = "Your final score is: " + timeRemaining;

        questionsDiv.appendChild(createP2);
    }

    // save initials
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsDiv.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsDiv.appendChild(createInput);

    // submit initials button
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "Submit");
    createSubmit.textContent = "Submit";

    questionsDiv.appendChild(createSubmit);

    // event listener to save initials in local storage 
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // Travels to final page
            window.location.replace("./HighScores.html");
        }
    });

}