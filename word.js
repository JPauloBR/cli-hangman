var Letter = require("./letter.js");
var fs = require("fs");

var Word = function(){
	this.size = 0;
	this.self = function(){
	var data = fs.readFileSync("secret_words.txt", "utf8");
	  // Then split it by commas (to make it more readable)
	  var dataArr = data.replace(/\[|]|"/g, '').split(",");

	  // We will then re-display the content as an array for later use.
	  var wordList = dataArr;
	  var letters =  (wordList[(Math.floor(Math.random() * wordList.length))]).split('');
	  var tempSize= 0;
	  var separateLetters = [];
	  for (var i = 0; i < letters.length; i++) {
	  	if(letters[i] != " ")
	  		tempSize++;
	  	var newLetter = new Letter(letters[i]);
	  	separateLetters.push(newLetter);
	  }
	  this.size = tempSize;
	  return separateLetters;
	};
};
module.exports = Word;