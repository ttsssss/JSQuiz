const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions = [
    {
        question: 'What color is an apple?',
        choice1: 'red',
        choice2: 'purple',
        choice3: 'black',
        choice4: 'yellow',
        choice5: 'none',
        answer: 'red'
    },
    {
        question: 'What color is an orange?',
        choice1: 'black',
        choice2: 'yellow',
        choice3: 'red',
        choice4: 'orange',
        choice5: 'purple',
        answer: 'orange'
    },
    {
        question: 'What color is the sky?',
        choice1: 'blue',
        choice2: 'pink',
        choice3: 'red',
        choice4: 'black',
        choice5: 'green',
        answer: 'blue'
    },
    {
        question: 'What color is dirt?',
        choice1: 'brown',
        choice2: 'black',
        choice3: 'pink',
        choice4: 'orange',
        choice5: 'purple',
        answer: 'brown'
    },
    {
        question: 'What color is grass?',
        choice1: 'green',
        choice2: 'black',
        choice3: 'brown',
        choice4: 'yellow',
        choice5: 'white',
        answer: 'green'
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 5

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()