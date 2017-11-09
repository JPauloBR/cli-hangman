var inquirerUserPrompt = require("inquirer");
var Word = require("./word.js");

var tries = 0;
var lettersArray = [];
var currentString = '';
var currentWord;

startGame = function() {
	tries = 10;
	currentWord = new Word();
	lettersArray = currentWord.self();
	for (var i = 0; i < lettersArray.length; i++) {
		currentString += " " + lettersArray[i].display();
	}
	userGuess();
}

userGuess = function() {
	console.log("Remaining Tries: "+ tries);
	printLetterArray(lettersArray);
	console.log(currentWord);
	inquirerUserPrompt
	.prompt ([
		{
			name: "guess",
			message: "Guess a Letter!"
		}
	])
	.then(function(answers) {
		console.log(lettersArray);
		var found = false;
		for (var i = 0; i < lettersArray.length; i++) {
			if(lettersArray[i].self==answers.guess) {
				lettersArray[i].show = true;
				currentWord.rightGuesses++;
				found = true;
				console.log("CORRECT!");
			}
			else if ((i == lettersArray.length -1) && !found ) {
				tries--;
				console.log("INCORRECT");
			}

		}
		if(tries==0) {
			console.log("You Lose!");
			playAgain();
		}
		else if(currentWord.rightGuesses == currentWord.size) {
			console.log("You Win!");
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


