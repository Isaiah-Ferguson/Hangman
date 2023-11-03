//   **-Methods needed to know-**
// .Includes
// .Map
// .Split
// .Join


//   **-Things We need for Hang man-**
//An input to guess the Letters
//A Place to display Correct Guessed letters
//A Place to Display InCorrect Guessed Letters
//A Place to Display our Hang man (how many guesses we have left)
//A Play Button
//A Restart button?


//  **-Properties needed to know-**
//.textContent
//.Value



//   **-Async Function-**
// const FunctionName = async () => {}
// const promise = await Fetch()
// const data = await promise.json()


// Id's
const wrongGuessDiv = document.getElementById('wrongGuessDiv')
const playBtn = document.getElementById('playBtn');
const answerDiv = document.getElementById('answerDiv');
const hangMan = document.getElementById('hangMan');
const guessDiv = document.getElementById('guessDiv');
const restartBtn = document.getElementById('restartBtn');
const inputGuess = document.getElementById("inputGuess");

// Global Variables
let wrongGuessChar = [];
let wordToGuess = [];
let displayedWord = [];
let incorrectGuesses = 0;
const maxIncorrectGuesses = 5;

// Button Functions

playBtn.addEventListener('click', function() {
    ApiCall();
});

restartBtn.addEventListener('click', function() {
    resetGame();
});


//Api Function

const ApiCall = async () => {
    const promise = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await promise.json();

    startGame(data[0]);
};

// Game Functions

const startGame = (word) => {
    wordToGuess = word.split("");
    displayedWord = wordToGuess.map(() => "_");
    updateGuessDisplay();
};

const resetGame = () => {
    wrongGuessChar = [];
    wordToGuess = [];
    displayedWord = [];
    incorrectGuesses = 0;
    inputGuess.value = "";
    answerDiv.textContent = "";
    guessDiv.textContent = "";
    hangMan.textContent = "";
    wrongGuessDiv.textContent = "";
    startGame("");
};

const updateGuessDisplay = () => {

    answerDiv.textContent = wordToGuess.join(" ");
    guessDiv.textContent = displayedWord.join(" ");
    hangMan.textContent = `Incorrect Guesses: ${incorrectGuesses}/${maxIncorrectGuesses}`;

};

inputGuess.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const guess = inputGuess.value.toLowerCase();

        if (wordToGuess.includes(guess)) {
            for (let i = 0; i < wordToGuess.length; i++) {
                if (wordToGuess[i] === guess) {
                    displayedWord[i] = guess;
                }
            }
        } else {
            wrongGuessChar.push(guess);
            wrongGuessDiv.textContent = wrongGuessChar.join("");
            incorrectGuesses++;
        }

        updateGuessDisplay();
        gameEnd();

        inputGuess.value = "";
    }
});

const gameEnd = () => {

    if (incorrectGuesses === maxIncorrectGuesses) {
        alert("You lose! The word was: " + wordToGuess.join(""));
        resetGame();
    } else if (displayedWord.join("") === wordToGuess.join("")) {
        alert("You win! You guessed the word: " + wordToGuess.join(""));
        resetGame();
    }

}