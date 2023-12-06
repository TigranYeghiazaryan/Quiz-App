let questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Paris', correct: true },
            { text: 'Berlin', correct: false },
            { text: 'Rome', correct: false },
            { text: 'Madrid', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Mars', correct: true },
            { text: 'Venus', correct: false },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'What is the largest mammal?',
        answers: [
            { text: 'Blue Whale', correct: true },
            { text: 'Elephant', correct: false },
            { text: 'Giraffe', correct: false },
            { text: 'Hippopotamus', correct: false }
        ]
    },
    {
        question: 'Who wrote "Romeo and Juliet"?',
        answers: [
            { text: 'William Shakespeare', correct: true },
            { text: 'Jane Austen', correct: false },
            { text: 'Charles Dickens', correct: false },
            { text: 'Mark Twain', correct: false }
        ]
    },
    {
        question: 'What is the currency of Japan?',
        answers: [
            { text: 'Yen', correct: true },
            { text: 'Won', correct: false },
            { text: 'Euro', correct: false },
            { text: 'Dollar', correct: false }
        ]
    }
];


const elementQuestion = document.getElementById('question');
const answerButtons = document.getElementById('options');
const nextBtn = document.getElementById('submit');

let currentQuestionIdx = 0;
let score = 0;

function startQuiz() {
    resetState();
    nextBtn.innerHTML = 'Next';
    showQuestion();
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function showQuestion() {
    resetState();

    var currentQuestion = questions[currentQuestionIdx];
    var questionNo = currentQuestionIdx + 1;

    elementQuestion.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
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
    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
    nextBtn.addEventListener("click", nextQuestion);
}

function nextQuestion() {
    currentQuestionIdx++;
    if (currentQuestionIdx < questions.length) {
        showQuestion();
    } else {
        alert("Quiz finished! Your score: " + score);
        resetState();
    }
}

startQuiz();
