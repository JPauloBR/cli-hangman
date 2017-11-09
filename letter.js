var Letter = function(letter) {
	this.show = false;
	this.self = letter;
	this.hide = "_";
	this.display = function() { 
		if(this.show === true || this.self === " ") 
			return this.self;
		else return this.hide;
		};

};

module.exports = Letter;