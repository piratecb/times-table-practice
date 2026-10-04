const factorA = document.querySelector('#factorA');
const factorB = document.querySelector('#factorB');
const answerPlaceholder = document.querySelector('#answerPlaceholder');
const answerForm = document.querySelector('#answerForm');
const answerInput = document.querySelector('#answerInput');
const feedback = document.querySelector('#feedback');
const rangeInput = document.querySelector('#rangeInput');
const rangeValue = document.querySelector('#rangeValue');
const scoreElement = document.querySelector('#score');
const streakElement = document.querySelector('#streak');
const accuracyElement = document.querySelector('#accuracy');
const resetButton = document.querySelector('#resetButton');

let currentA = 7;
let currentB = 8;
let maximum = Number(rangeInput.value);
let score = 0;
let streak = 0;
let attempts = 0;
let hasAnswered = false;

function randomFactor() {
  return Math.floor(Math.random() * (maximum - 1)) + 2;
}

function updateStats() {
  scoreElement.textContent = score;
  streakElement.textContent = streak;
  accuracyElement.textContent = attempts ? `${Math.round((score / attempts) * 100)}%` : '100%';
}

function nextQuestion() {
  currentA = randomFactor();
  currentB = randomFactor();
  factorA.textContent = currentA;
  factorB.textContent = currentB;
  answerPlaceholder.textContent = '?';
  answerPlaceholder.className = 'answer-placeholder';
  answerInput.value = '';
  hasAnswered = false;
  answerInput.focus();
}

function showFeedback(message, type) {
  feedback.textContent = message;
  feedback.className = `feedback ${type}`;
}

answerForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (hasAnswered || answerInput.value === '') return;

  const answer = Number(answerInput.value);
  const correctAnswer = currentA * currentB;
  attempts += 1;
  hasAnswered = true;

  if (answer === correctAnswer) {
    score += 1;
    streak += 1;
    answerPlaceholder.textContent = correctAnswer;
    answerPlaceholder.classList.add('correct');
    showFeedback(streak > 1 ? `Correct. ${streak} in a row!` : 'Correct. Nice start!', 'success');
  } else {
    streak = 0;
    answerPlaceholder.textContent = correctAnswer;
    answerPlaceholder.classList.add('incorrect');
    showFeedback(`Not quite. The answer is ${correctAnswer}.`, 'error');
  }

  updateStats();
  window.setTimeout(nextQuestion, 850);
});

rangeInput.addEventListener('input', () => {
  maximum = Number(rangeInput.value);
  rangeValue.textContent = `2–${maximum}`;
});

resetButton.addEventListener('click', () => {
  score = 0;
  streak = 0;
  attempts = 0;
  updateStats();
  feedback.textContent = 'Score reset. Ready when you are.';
  feedback.className = 'feedback';
  nextQuestion();
});

updateStats();
