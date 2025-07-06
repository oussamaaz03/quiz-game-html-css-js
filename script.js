// DOM Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const startButton = document.getElementById("start-btn");
const questionText = document.getElementById("question-text");
const answersContainer = document.getElementById("answers-container");
const currentQuestionSpan = document.getElementById("current-question");
const totalQuestionsSpan = document.getElementById("total-questions");
const scoreSpan = document.getElementById("score");
const finalScoreSpan = document.getElementById("final-score");
const maxScoreSpan = document.getElementById("max-score");
const resultMessage = document.getElementById("result-message");
const restartButton = document.getElementById("restart-btn");
const progressBar = document.getElementById("progress");
//quez quqestions
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];

//quiz state variables
let currentquestionindex=0;
let score=0;
let answerdisabled=false;

totalQuestionsSpan.textContent=quizQuestions.length;
maxScoreSpan.textContent=quizQuestions.length;
//event listener

startButton.addEventListener('click', startQuiz);
restartButton.addEventListener('click', restartQuiz);

function startQuiz(){
    console.log('quiz started');
    currentquestionindex=0;
    scoreSpan.textContent=0;

    startScreen.classList.remove('active');
    quizScreen.classList.add("active");
    showQuestion()
}
function showQuestion(){
    answerdisabled=false

    const currentquestion = quizQuestions[currentquestionindex]
    currentQuestionSpan.textContent=currentquestionindex + 1
    const progresspercent=(currentquestionindex/quizQuestions.length)*100;
    progressBar.style.width=progresspercent + "%" 
    questionText.textContent = currentquestion.question;
    //todo: esplain in a secoond
    answersContainer.innerHTML="";
    currentquestion.answers.forEach((answer)=> {
        const button=document.createElement("button");
        button.textContent=answer.text;
        button.classList.add("answer-btn");

        button.dataset.correct=answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    })
}
function selectAnswer(event){
    if (answerdisabled) return;
    answerdisabled=true;
    const selectedbutton=event.target;
    const iscorrect= selectedbutton.dataset.correct==="true";

    Array.from(answersContainer.children).forEach((button)=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }else{
            button.classList.add("incorrect");
        }
    });
    if(iscorrect){
        score++;
        scoreSpan.textContent=score
    }
    setTimeout(() => {
        currentquestionindex++ ;

        if(currentquestionindex < quizQuestions.length){
            showQuestion()
        }else{
            showresults()
        }
    }, 1000)
}

function showresults(){
    quizScreen.classList.remove("active")
    resultScreen.classList.add("active")

    finalScoreSpan.textContent=score;
    const percentage=(score/quizQuestions.length)*100
    if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";
} else if (percentage >= 80) {
    resultMessage.textContent = "Great job! You know your stuff!";
} else if (percentage >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
} else if (percentage >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
} else {
    resultMessage.textContent = "Keep studying! You'll get better!";
}

}

function restartQuiz(){
    resultScreen.classList.remove("active");
    startQuiz();
}

