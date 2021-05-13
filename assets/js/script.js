
const trivia = [
    {
        q: "Who is the greatest soccer player, also known as “The King of Soccer”?",
        a: ["Messi", "Pelé", "Diego Maradona", "Cristiano Ronaldo"],
        correctIndex: 1
    },
    {
        q: "How many players in total will be on the field in a typical soccer match?",
        a: ["22", "15", "18", "10"],
        correctIndex: 0
    },
    {
        q: "How long does a soccer game last?",
        a: ["45 minutes", "110 minutes", "120 minutes", "90 minutes"],
        correctIndex: 3
    },
    {
        q: "Which player scored the “Hand of God” goal in a match of the 1986 World Cup?",
        a: ["David Beckham", "Cristiano Ronaldo", "Diego Maradona", "Lionel Messi"],
        correctIndex: 2
    },
    {
        q: "Which position in soccer has to wear kits with different colours than the others?",
        a: ["Goalkeeper", "Midfielder", "Striker", "Full Back"],
        correctIndex: 0
    },
    {
        q: "How does a soccer match begin?",
        a: ["a tip-off", "a kick-off", "a toss-up", "a rock papper scissors game"],
        correctIndex: 1
    }
];

//settings
let initialTime = 60,
    timeCostForWrongAnswer = -10,
    delayAfterQuestion = 1000; //milliseconds

//app variables
var score,
    timeRemaining,
    currentQuestionIndex;

var gameInSession = false

//initialization & event listeners
init();
function init() {
    const highScoreButton = document.querySelector("header button:first-of-type");
    highScoreButton.addEventListener("click", viewHighScores);
    const startGameButton = document.querySelector("header button:last-of-type");
    startGameButton.addEventListener("click", setup);
}

//timer logic

const timer = (ms) => new Promise((res) => setTimeout(res, ms))

async function startTimer() {
    while (gameInSession) {
        await timer(1000)
        timeRemaining--
        if (timeRemaining <= 0) {
            // debugger
            timeRemaining = 0
            gameInSession = false
            return gameOver()
        }
        document.getElementById('time').innerText = timeRemaining

    }
}




//game logic
function setup() {
    document.getElementById('scores').style.display = 'none'
    score = 0;
    timeRemaining = initialTime;
    document.getElementById('time').innerText = timeRemaining
    currentQuestionIndex = 0;
    gameInSession = true
    startTimer();
    loadQuestion();
}
function loadQuestion() {
    //make sure there IS another question...
    const question = trivia[currentQuestionIndex];
    if (!question && gameInSession) { //existential check...does it exist?
        gameInSession = false
        // debugger
        return gameOver();
    }
    if (!gameInSession) {
        return
    }
    //create HTML from current question
    document.querySelector("main").innerHTML = getQuestionHtml(question);
    //add event listeners to answer buttons
    document.querySelectorAll("main button").forEach(button => button.addEventListener("click", questionAnswered));

}
function getQuestionHtml(question) {
    let html = `<h2>${question.q}</h2>`;
    for (let i = 0; i < question.a.length; i++) {
        html += `<button data-index="${i}">${question.a[i]}</button>`;
    }
    html += "<output></output>";
    return html;
}
function questionAnswered(event) {
    //when user clicks one of the answer buttons, this function runs
    //event is the event object
    //event.target is the <button> clicked
    //event.target.dataset.index is the value of the custom attribute data-index
    //this value comes as a string, so we convert it to a number
    const answerIndex = Number(event.target.dataset.index);
    //is this the correct answer?
    if (answerIndex === trivia[currentQuestionIndex].correctIndex) {
        //correct!
        score++;
        document.querySelector("output").textContent = "Correct!";
    }
    else {
        //incorrect...
        //TODO: change timer
        timeRemaining -= 10
        document.querySelector("output").textContent = "Nope, sorry...";
    }
    currentQuestionIndex++;
    setTimeout(loadQuestion, delayAfterQuestion); //load the next question after a delay
}
function gameOver() {
    alert(`Game over...your score is ${score}`);
    const name = prompt("Please enter your name")
    const scoreObject = { name, score }
    let arr = []
    if (localStorage.getItem('scores')) {
        arr = JSON.parse(localStorage.getItem('scores'))
    }

    localStorage.setItem("scores", JSON.stringify([...arr, scoreObject]))
}

document.getElementById('view-scores').addEventListener('click', () => viewHighScores())
document.getElementById('close').addEventListener('click', () => document.getElementById('scores').style.display = 'none')

//high scores logic
function viewHighScores() {
    const scores = JSON.parse(localStorage.getItem('scores'))
    scores.forEach(score => {
        const item = document.createElement('li')
        item.innerText = "name: " + score.name + " " + "score: " + score.score
        document.getElementById('scores').append(item)
    })
    document.getElementById('scores').style.display = 'block'
}

//localStorage
localStorage.setItem("currentQuestionIndex", JSON.stringify(currentQuestionIndex));











