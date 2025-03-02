import data from "./data.json" with {type: "json"}
const length = data.length;

function GenerateRandomQuestion() {
    const question = {
        clues: [],
        options: [],
        id: 0,
    }

    const random = GenerateRandomNumber();
    const randomQuestion = data[random];
    question.clues = randomQuestion.clues;
    question.id = randomQuestion.id;

    const options = [randomQuestion.city];
    for (let i = 0; options.length < 4; i++) {
        const randomOption = GenerateRandomNumber();
        if (options.includes(data[randomOption].city)) {
            continue;
        }
        options.push(data[randomOption].city);
    }
    question.options = FisherYatesShuffle(options);
    return question;
}

function GenerateRandomNumber() {
    return Math.floor(Math.random() * length);
}

function FisherYatesShuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
        [arr[i], arr[j]] = [arr[j], arr[i]]; // Swap elements
    }
    return arr;
}

// ----------------------------------------------------------
function ValidateAnswer(id, userAnswer) {
    const correctAnswer = data.find((question) => question.id === id);
    const res = {
        isCorrect: correctAnswer.city === userAnswer,
        city: correctAnswer.city,
        funfact: correctAnswer.fun_fact,
        trivia: correctAnswer.trivia
    }
    return res
}

export { GenerateRandomQuestion, ValidateAnswer }