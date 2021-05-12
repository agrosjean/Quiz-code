
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
        a: ["a tip-off", "", "a kick-off", "a toss-up", "a rock papper scissors game"],
        correctIndex: 1
    }
];

//settings
const initialTime = 60,
    timeCostForWrongAnswer = -10,
    delayAfterQuestion = 1000; //milliseconds

//app variables
var score,
    timeRemaining,
    currentQuestionIndex;

//initialization & event listeners
init();
function init() {
    const highScoreButton = document.querySelector("header button:first-of-type");
    highScoreButton.addEventListener("click", viewHighScores);
    const startGameButton = document.querySelector("header button:last-of-type");
    startGameButton.addEventListener("click", setup);
}

//timer logic

//game logic
function setup() {
    score = 0;
    timeRemaining = initialTime;
    currentQuestionIndex = 0;
    loadQuestion();
}
function loadQuestion() {
    //make sure there IS another question...
    const question = trivia[currentQuestionIndex];
    if (!question) { //existential check...does it exist?
        return gameOver();
    }
    //create HTML from current question
    document.querySelector("article").innerHTML = getQuestionHtml(question);
    //add event listeners to answer buttons
    document.querySelectorAll("article button").forEach(button => button.addEventListener("click", questionAnswered));
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
        document.querySelector("output").textContent = "Nope, sorry...";
    }
    currentQuestionIndex++;
    setTimeout(loadQuestion, delayAfterQuestion); //load the next question after a delay
}
function gameOver() {
    alert(`Game over...your score is ${score}`);
}

//high scores logic
function viewHighScores() { }

  //localStorage











