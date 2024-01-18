const questions = [
  {
    question: "Which planet is known as the Red Planet ?",
    answer: [
      { text: "Venus", correct: "false" },
      { text: "Mars", correct: "true" },
      { text: "Jupiter", correct: "false" },
      { text: "Saturn", correct: "false" },
    ]
  },
  {
    question: "What is the capital city of France?",
    answer: [
      { text: "Paris", correct: "true" },
      { text: "London", correct: "false" },
      { text: "Berlin", correct: "false" },
      { text: "Rome", correct: "false" },
    ]
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answer: [
      { text: "Charles Dickens", correct: "false" },
      { text: "William Shakespeare", correct: "true" },
      { text: "Jane Austen", correct: "false" },
      { text: "Mark Twain", correct: "false" },
    ]
  },
  {
    question: "What is the largest mammal in the world?",
    answer: [
      { text: "Elephant", correct: "false" },
      { text: "Blue Whale", correct: "true" },
      { text: "Giraffe", correct: "false" },
      { text: "Hippopotamus", correct: "false" },
    ]
  }
];

const questionElement = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
let currentQuestionIndex = 0 ;
let score = 0;
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + "." + currentQuestion.question;

  currentQuestion.answer.forEach((answers) => {
    const button = document.createElement("button");
    button.innerHTML = answers.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if(answers.correct){
        button.dataset.correct = answers.correct
    }
    button.addEventListener("click",selectAnswer)
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
    selectedBtn.classList.add('correct')
    score++;
}else{selectedBtn.classList.add('incorrect')}

Array.from(answerBtn.children).forEach(button=>{
    if(button.dataset.correct === "true"){
        button.classList.add("correct");
    }
    button.disabled = true;
})
nextBtn.style.display = "block"
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play again"
    nextBtn.style.display = "block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion()
}else{
    showScore();
}}



nextBtn.addEventListener("click",()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
    
})

startQuiz();
