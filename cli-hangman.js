var inquirerUserPrompt = require("inquirer");
var Word = require("./word.js");

var tries = 0;
var lettersArray = [];
var currentString = '';
var currentWord;
var lettersGuessed = [];

Word.prototype.rightGuesses = 0;

startGame = function() {
	tries = 10;
	lettersGuessed = [];
	currentWord = new Word();
	lettersArray = currentWord.self();
	userGuess();
}

userGuess = function() {
	console.log("Remaining Tries: "+ tries);
	printLetterArray(lettersArray);
	console.log("");
	console.log("Letters Guessed: " + lettersGuessed);
	inquirerUserPrompt
	.prompt ([
		{
			name: "guess",
			message: "Guess a Letter!"
		}
	])
	.then(function(answers) {
		if (lettersGuessed.indexOf(answers.guess) == -1) {
			lettersGuessed.push(answers.guess);
			var found = false;
			for (var i = 0; i < lettersArray.length; i++) {
				if((lettersArray[i].self==answers.guess) && (lettersArray[i].show == false)) {
					lettersArray[i].show = true;
					currentWord.rightGuesses++;
					found = true;
				}
				else if ((i == lettersArray.length -1) && (!found) ){
					tries--;
				}

			}
		}
		else console.log("You've already guessed this letter");
		if(tries==0) {
			console.log("You Lose!");
			currentString = '';
			for (var i = 0; i < lettersArray.length; i++) {
				currentString += " " + lettersArray[i].self;
			}
			console.log(currentString);
			playAgain();
		}
		else if(currentWord.rightGuesses == currentWord.size) {
			console.log("You Win!");
			printLetterArray(lettersArray);
			playAgain();
			}
			else {
			userGuess();
			}
	})
};

printLetterArray = function(lettersArray) {
	currentString = '';
	for (var i = 0; i < lettersArray.length; i++) {
		currentString += " " + lettersArray[i].display();
	};
	console.log(currentString);
}

playAgain = function() {
	inquirerUserPrompt
	.prompt ([
		{
		  type: "confirm",
		  message: "Do You Want to play again?",
		  name: "confirm",
		  default: true
		}
	])
	.then(function(response) {
		if(response.confirm)
			startGame();
	})
}


startGame();


