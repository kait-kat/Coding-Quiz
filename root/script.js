const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

const startingSeconds = 20;
let time = startingSeconds * 60;
  const timerEl = document.getElementById('timer');

setInterval(updateTimer, 1000);

function updateTimer() {
  const seconds = Math.floor(time % 60);

  timerEl.innerHTML = `${seconds}`;
  time--;
}
function setAlert() {
  alert("Times Up!");
}

startButton.addEventListener('click', startGame)
startButton.addEventListener('click', time)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})


function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}


function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is a Data Structure?',
    answers: [
      { text: 'Arrays', correct: true },
      { text: 'Empire State Building', correct: false },
      { text: 'Pentagon', correct: false },
      { text: 'My Nokia', correct: false }
    ]
  },
  {
    question: 'What is a queue?',
    answers: [
      { text: 'a linear data structure', correct: true },
      { text: 'a letter', correct: false },
      { text: 'a wait time in World of Warcraft', correct: false },
      { text: 'an O with a line', correct: false }
    ]
  },
  {
    question: 'Lorem ipsum',
    answers: [
      { text: 'fixum mixum', correct: false },
      { text: 'dolor sit amet', correct: true },
      { text: 'idk', correct: false },
      { text: 'abra cadabra', correct: false }
    ]
  },
  {
    question: 'What does HTML stand for?',
    answers: [
      { text: 'HamTomatoMayoLettuce', correct: false },
      { text: 'HyperText Markup Language', correct: false },
      { text: 'Hand The Mice Logs', correct: false },
      { text: 'HandyTandyMandyLandy', correct: true }
    ]
  }
]
 