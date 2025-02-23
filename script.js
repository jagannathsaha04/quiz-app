const questions = [
    {
        question: "Who invented the Rubik’s Cube?",
        answers: [
            { text: "Ernő Rubik", correct: true },
            { text: "Feliks Zemdegs", correct: false },
            { text: "Max Park", correct: false },
            { text: "Will Smith", correct: false },
        ]
    },
    {
        question: "What is the world record for the fastest 3x3 solve (as of February 2025)?",
        answers: [
            { text: "3.47 seconds", correct: false },
            { text: "3.13 seconds", correct: true },
            { text: "4.22 seconds", correct: false },
            { text: "3.99 seconds", correct: false },
        ]
    },
    {
        question: "Which of these is NOT a WCA-recognized event?",
        answers: [
            { text: "3x3x3 One-Handed", correct: false },
            { text: "4x4x4 Blindfolded", correct: false },
            { text: "2x2x2 Speedsolve", correct: false },
            { text: "Mirror Cube Solve", correct: true },
        ]
    },
    {
        question: "What is the official name of the method most beginners use to solve a 3x3?",
        answers: [
            { text: "CFOP", correct: false },
            { text: "Roux", correct: false },
            { text: "Layer-by-Layer", correct: true },
            { text: "ZZ", correct: false },
        ]
    },
    {
        question: "In cubing notation, what does 'R2' mean?",
        answers: [
            { text: "Rotate the right face 180 degrees", correct: true },
            { text: "Rotate the right face clockwise 90 degrees", correct: false },
            { text: "Rotate the right face counterclockwise 90 degrees", correct: false },
            { text: "Rotate the right face and then the left face", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    nextBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        button.dataset.correct = answer.correct ? "true" : "false";
        button.addEventListener("click", selectAnswer);
        answerBtn.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = "none";
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerBtn.children).forEach(button => {
        button.disabled = true;
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
    });

    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener("click", () => {
    resetState();
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();
