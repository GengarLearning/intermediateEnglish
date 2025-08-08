const questions = [
    { q: "Choose the correct word: She ___ to the store yesterday.", options: ["go", "goes", "went", "gone", "going"], answer: 2 },
    { q: "Which sentence is correct?", options: ["He don't like coffee", "He doesn't likes coffee", "He doesn't like coffee", "He don't likes coffee", "He no like coffee"], answer: 2 },
    { q: "Find the synonym of 'happy'", options: ["sad", "angry", "joyful", "bored", "tired"], answer: 2 },
    { q: "Select the correct spelling:", options: ["accomodate", "accommodate", "acommodate", "accomadate", "accomudate"], answer: 1 },
    { q: "Which is a verb?", options: ["run", "blue", "quick", "happy", "table"], answer: 0 },
    { q: "She has been living here ___ 2015.", options: ["for", "since", "from", "in", "during"], answer: 1 },
    { q: "Which sentence is in past continuous?", options: ["I eat lunch", "I was eating lunch", "I will eat lunch", "I am eating lunch", "I eaten lunch"], answer: 1 },
    { q: "Opposite of 'difficult' is:", options: ["hard", "simple", "tough", "complicated", "challenging"], answer: 1 },
    { q: "He ___ breakfast every morning.", options: ["eat", "ate", "eats", "eaten", "eating"], answer: 2 },
    { q: "Choose the correct article: She bought ___ apple.", options: ["a", "an", "the", "some", "no article"], answer: 1 },
    { q: "Which is an adjective?", options: ["swim", "teacher", "blue", "quickly", "run"], answer: 2 },
    { q: "Past tense of 'teach' is:", options: ["teached", "taught", "teachen", "teach", "teacht"], answer: 1 },
    { q: "Which word is a preposition?", options: ["under", "running", "blue", "quick", "jump"], answer: 0 },
    { q: "They have lived here ___ three years.", options: ["since", "for", "from", "during", "in"], answer: 1 },
    { q: "Choose the correct sentence:", options: ["She can sings", "She can sing", "She can singing", "She sings can", "She can to sing"], answer: 1 },
    { q: "Plural of 'child' is:", options: ["childs", "childes", "children", "childrens", "child"], answer: 2 },
    { q: "Find the antonym of 'cold':", options: ["hot", "warm", "cool", "chilly", "icy"], answer: 0 },
    { q: "Which is a noun?", options: ["beautiful", "swim", "happiness", "quick", "run"], answer: 2 },
    { q: "We ___ TV when the phone rang.", options: ["watch", "watched", "were watching", "watching", "watches"], answer: 2 },
    { q: "Select the correct word: I have ___ friends in London.", options: ["many", "much", "lot", "lots", "more"], answer: 0 }
];

let currentQuestion = 0;
let score = 0;
let selectedOption = null;
let userAnswers = [];

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");
const reviewContainer = document.getElementById("review-container");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    let q = questions[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    questionText.textContent = q.q;
    optionsContainer.innerHTML = "";
    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        div.textContent = option;
        div.classList.add("option");
        div.addEventListener("click", () => selectOption(div, index));
        optionsContainer.appendChild(div);
    });
    selectedOption = null;
}

function selectOption(optionElement, index) {
    document.querySelectorAll(".option").forEach(opt => opt.classList.remove("selected"));
    optionElement.classList.add("selected");
    selectedOption = index;
}

nextBtn.addEventListener("click", () => {
    if (selectedOption === null) return;
    
    userAnswers.push(selectedOption);
    
    if (selectedOption === questions[currentQuestion].answer) {
        score++;
    }
    currentQuestion++;
    
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
});

function showResults() {
    document.getElementById("quiz-box").classList.add("hidden");
    resultBox.classList.remove("hidden");
    scoreText.textContent = `You got ${score} correct and ${questions.length - score} wrong.`;
    reviewContainer.innerHTML = "";

    questions.forEach((q, index) => {
        const reviewItem = document.createElement("div");
        reviewItem.classList.add("review-item");

        const questionEl = document.createElement("div");
        questionEl.classList.add("review-question");
        questionEl.textContent = `${index + 1}. ${q.q}`;

        const yourAnswer = document.createElement("div");
        yourAnswer.classList.add("review-your-answer");

        if (userAnswers[index] === q.answer) {
            yourAnswer.innerHTML = `✅ Your answer: <strong>${q.options[userAnswers[index]]}</strong>`;
        } else {
            yourAnswer.innerHTML = `❌ Your answer: <strong>${q.options[userAnswers[index]] || "No answer"}</strong>`;
        }

        const correctAnswer = document.createElement("div");
        correctAnswer.classList.add("review-correct-answer");
        correctAnswer.textContent = `Correct answer: ${q.options[q.answer]}`;

        reviewItem.appendChild(questionEl);
        reviewItem.appendChild(yourAnswer);
        reviewItem.appendChild(correctAnswer);
        reviewContainer.appendChild(reviewItem);
    });
}

restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    userAnswers = [];
    document.getElementById("quiz-box").classList.remove("hidden");
    resultBox.classList.add("hidden");
    loadQuestion();
});

loadQuestion();
