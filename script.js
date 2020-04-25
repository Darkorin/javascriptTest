const highscoreBtn = document.querySelector("#highscore-button");
const timerSpan = document.querySelector("#timer");
const mainText = document.querySelector("#main-text");
const subText = document.querySelector("#sub-text");
const btnForm = document.querySelector("#button-form");
const alertDiv = document.querySelector("#alert-div");
const responseDiv = document.querySelector("#response-div");
const navbar = document.querySelector(".navbar");

const page = [
    {
        mainText: "Coding Quiz Challenge",
        subText: "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by fifteen seconds!",
        btnText: ["Start Quiz"],
        btnResponse: "start"
    },
    {
        mainText: "Commonly used data types DO NOT include:",
        subText: "",
        btnText: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        btnResponse: "3. alerts"
    },
    {
        mainText: "The condition in an if/else statement is enclosed within ______.",
        subText: "",
        btnText: ["1. paratheses", "2. curly brackets", "3. quotes", "4. square brackets"],
        btnResponse: "1. paratheses"
    },
    {
        mainText: "Arrays in JavaScript can be used to store ______.",
        subText: "",
        btnText: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        btnResponse: "4. all of the above"
    },
    {
        mainText: "String values must be enclosed within ______ when being assigned to variables.",
        subText: "",
        btnText: ["1. commas", "2. quotes", "3. curly brackets", "paratheses"],
        btnResponse: "2. quotes"
    },
    {
        mainText: "A very useful tool used during development and debugging for printing content to the debugger is:",
        subText: "",
        btnText: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        btnResponse: "4. console.log"
    },
    {
        mainText: "All done!",
        subText: "Your final score is ",
        btnText: ["Submit"],
        btnResponse: "submit"
    }
]

let highScores = { names: [], scores: [] };
let storedHighScores = JSON.parse(localStorage.getItem("highscores"));

if (storedHighScores !== null) {
    highScores = storedHighScores;
}

let seconds;
let pageNumber = 0;
let timer;

const init = function () {
    seconds = 0;
    pageNumber = 0;
    mainText.removeAttribute("class");
    mainText.removeAttribute("style");
    subText.removeAttribute("class");
    subText.removeAttribute("style");
    btnForm.removeAttribute("class");
    btnForm.removeAttribute("style");
    navbar.removeAttribute("style");
    mainText.setAttribute("class", "text-center");
    mainText.setAttribute("style", "font-size: 40px; font-weight: bold;");
    subText.setAttribute("class", "text-center");
    mainText.setAttribute("style", "padding: 20px; font-weight: bold");
    alertDiv.setAttribute("style", "visibility: hidden");
    render();
    renderTime();
}
const clickHandler = function (e) {
    e.preventDefault();
    let response = e.target.dataset.response;
    let btnText = e.target.textContent;
    let isAnswer = response === btnText || (response != "start" && response != "submit" && response != "back" && response != "clear" && response != "");
    let answeredRight = false;
    if (isAnswer && response === btnText) {
        answeredRight = true;
    }
    if (response === "start") {
        startQuiz();
    }
    if (response != btnText && isAnswer) {
        seconds -= 15;
        renderTime();
    }
    if (isAnswer) {
        transitionTimer(answeredRight);
        nextPage();
    }
    if (response === "submit") {
        submitScore();
        renderHighScores();
    }
    if (response === "back") {
        init();
        render();
    }
    if (response === "clear") {
        highScores = { names: [], scores: [] };
        localStorage.setItem("highscores", JSON.stringify(highScores));
        renderHighScores();
    }

}

const startQuiz = function () {
    seconds = 75;
    timer = setInterval(startTimer, 1000);
    nextPage();
}

const startTimer = function () {
    seconds--;
    renderTime();
    if (seconds <= 0) {
        clearInterval(this);
    }
}

const renderTime = function () {
    if (seconds < 0) {
        seconds = 0;
    }
    timerSpan.textContent = seconds;
}

const nextPage = function () {
    pageNumber++;
    render();
    renderTime();
}

const transitionTimer = function (answeredRight) {
    if (answeredRight) {
        responseDiv.textContent = "Correct!";
    } else {
        responseDiv.textContent = "Wrong!";
    }
    alertDiv.removeAttribute("style");
    setTimeout(function () {
        responseDiv.textContent = "";
        alertDiv.setAttribute("style", "visibility: hidden");
    }, 1500);
}

const submitScore = function () {
    let player = document.querySelector("#initials").value;
    if (highScores.names.length === 0) {
        highScores.names.push(player);
        highScores.scores.push(seconds);
    } else {
        for (let i = 0; i < highScores.names.length; i++) {
            if (seconds > highScores.scores[i]) {
                highScores.names.splice(i, 0, (player));
                highScores.scores.splice(i, 0, (seconds));
                if (highScores.scores.length > 10) {
                    highScores.scores.splice(-1, 1);
                }
                i = 10;
            } else if (highScores.names.length < 10) {
                highScores.names.push(player);
                highScores.scores.push(seconds);
                i = 10;
            }
        }
    }
    localStorage.setItem("highscores", JSON.stringify(highScores));
}

const render = function () {
    mainText.textContent = page[pageNumber].mainText;
    subText.textContent = page[pageNumber].subText;
    mainText.setAttribute("style", "font-size: 35px; font-weight: bold")
    btnForm.innerHTML = "";
    if (pageNumber === 0) {
        btnForm.setAttribute("class", "text-center");
    } else {
        btnForm.removeAttribute("class");
    }
    if (pageNumber === 6) {
        renderResults();
    }
    for (let i = 0; i < page[pageNumber].btnText.length; i++) {
        let newBtn = document.createElement("button");
        newBtn.textContent = page[pageNumber].btnText[i];
        newBtn.setAttribute("type", "button");
        newBtn.setAttribute("class", "btn btn-success my-1 py-1");
        newBtn.setAttribute("data-response", page[pageNumber].btnResponse);
        btnForm.append(newBtn);
        btnForm.append(document.createElement("br"));
    }
}

const renderResults = function () {
    clearInterval(timer);
    mainText.removeAttribute("class");
    subText.removeAttribute("class");
    subText.textContent = page[pageNumber].subText + seconds + ".";
    mainText.setAttribute("style", "font-size: 30px; font-weight: bold;");

    let newLabel = document.createElement("label");
    let newInput = document.createElement("input");
    newLabel.setAttribute("for", "initials");
    newLabel.textContent = "Enter initials:";
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.setAttribute("name", "initials");
    newInput.setAttribute("class", "mx-1")

    newInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
    });

    btnForm.prepend(newInput);
    btnForm.prepend(newLabel);
}

const renderHighScores = function () {
    mainText.removeAttribute("class");
    subText.removeAttribute("class");
    btnForm.removeAttribute("class");
    btnForm.innerHTML = "";
    mainText.textContent = "Highscores";
    mainText.setAttribute("style", "font-size: 30px; font-weight: bold; margin-left: 20px;");
    subText.textContent = "";

    navbar.setAttribute("style", "visibility: hidden");

    for (let i = 0; i < highScores.scores.length; i++) {
        let newScore = document.createElement("div");
        newScore.setAttribute("class", "alert alert-success");
        newScore.setAttribute("role", "alert");
        newScore.textContent = `${i + 1}.${highScores.names[i]}-${highScores.scores[i]}`;
        btnForm.append(newScore);
    }

    let backBtn = document.createElement("button");
    let clearBtn = document.createElement("button");

    backBtn.textContent = "Go Back";
    backBtn.setAttribute("data-response", "back");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("class", "btn btn-success m-1 p-1");

    clearBtn.textContent = "Clear Highscores";
    clearBtn.setAttribute("data-response", "clear");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("class", "btn btn-success m-1 p-1");


    btnForm.setAttribute("style", "margin-left: 20px;");
    btnForm.append(backBtn);
    btnForm.append(clearBtn);
}

init();
highscoreBtn.addEventListener("click", renderHighScores);
btnForm.addEventListener("click", clickHandler);