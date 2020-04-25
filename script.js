const highscoreBtn = document.querySelector("#highscore-button");
const timerSpan = document.querySelector("#timer");
const mainText = document.querySelector("#main-text");
const subText = document.querySelector("#sub-text");
const btnForm = document.querySelector("#button-form");
const alertDiv = document.querySelector("#alert-div");
const responseDiv = document.querySelector("#response-div");
const navbar = document.querySelector(".navbar");

const page = {
    mainText: [
        "Coding Quiz Challenge",
        "Commonly used data types DO NOT include:",
        "The condition in an if/else statement is enclosed within ______.",
        "Arrays in JavaScript can be used to store ______.",
        "String values must be enclosed within ______ when being assigned to variables.",
        "A very useful tool used during development and debugging for printing content to the debugger is:",
        "All done!"],
    subText: [
        "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by ten seconds!",
        "",
        "",
        "",
        "",
        "",
        "Your final score is "],
    btnText: [
        ["Start Quiz"],
        ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        ["1. paratheses", "2. curly brackets", "3. quotes", "4. square brackets"],
        ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        ["1. commas", "2. quotes", "3. curly brackets", "paratheses"],
        ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        ["Submit"]
    ],
    btnId: [
        ["start"],
        ["Q1A1", "Q1A2", "Q1A3", "Q1A4"],
        ["Q2A1", "Q2A2", "Q2A3", "Q2A4"],
        ["Q3A1", "Q3A2", "Q3A3", "Q3A4"],
        ["Q4A1", "Q4A2", "Q4A3", "Q4A4"],
        ["Q5A1", "Q5A2", "Q5A3", "Q5A4"],
        ["submit"]
    ],
    btnResponse: [
        [""],
        ["Wrong!", "Wrong!", "Correct!", "Wrong!"],
        ["Correct!", "Wrong!", "Wrong!", "Wrong!"],
        ["Wrong!", "Wrong!", "Wrong!", "Correct!"],
        ["Wrong!", "Correct!", "Wrong!", "Wrong!"],
        ["Wrong!", "Wrong!", "Wrong!", "Correct!"],
        [""]
    ],
}

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
    let btnId = e.target.id;
    let response = e.target.dataset.response;
    let isAnswer = response === "Correct!" || response === "Wrong!";
    if (btnId === "start") {
        startQuiz();
    }
    if (response === "Wrong!") {
        seconds -= 10;
        renderTime();
    }
    if (isAnswer) {
        transitionTimer(response);
        nextPage();
    }
    if (btnId === "submit") {
        submitScore();
        renderHighScores();
    }
    if (btnId === "back") {
        init();
        render();
    }
    if (btnId === "clear") {
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

const transitionTimer = function (response) {
    responseDiv.textContent = response;
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
    mainText.textContent = page.mainText[pageNumber];
    subText.textContent = page.subText[pageNumber];
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
    for (let i = 0; i < page.btnText[pageNumber].length; i++) {
        let newBtn = document.createElement("button");
        newBtn.textContent = page.btnText[pageNumber][i];
        newBtn.setAttribute("type", "button");
        newBtn.setAttribute("class", "btn btn-success my-1 py-1");
        newBtn.setAttribute("id", page.btnId[pageNumber][i]);
        newBtn.setAttribute("data-response", page.btnResponse[pageNumber][i]);
        btnForm.append(newBtn);
        btnForm.append(document.createElement("br"));
    }
}

const renderResults = function () {
    clearInterval(timer);
    mainText.removeAttribute("class");
    subText.removeAttribute("class");
    subText.textContent = page.subText[pageNumber] + seconds + ".";
    mainText.setAttribute("style", "font-size: 30px; font-weight: bold;");

    let newLabel = document.createElement("label");
    let newInput = document.createElement("input");
    newLabel.setAttribute("for", "initials");
    newLabel.textContent = "Enter initials:";
    newInput.setAttribute("type", "text");
    newInput.setAttribute("id", "initials");
    newInput.setAttribute("name", "initials");
    newInput.setAttribute("class", "mx-1")

    newInput.addEventListener("keydown", function(e) {
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
    backBtn.setAttribute("id", "back");
    backBtn.setAttribute("type", "button");
    backBtn.setAttribute("class", "btn btn-success m-1 p-1");

    clearBtn.textContent = "Clear Highscores";
    clearBtn.setAttribute("id", "clear");
    clearBtn.setAttribute("type", "button");
    clearBtn.setAttribute("class", "btn btn-success m-1 p-1");


    btnForm.setAttribute("style", "margin-left: 20px;");
    btnForm.append(backBtn);
    btnForm.append(clearBtn);
}

init();
highscoreBtn.addEventListener("click", renderHighScores);
btnForm.addEventListener("click", clickHandler);