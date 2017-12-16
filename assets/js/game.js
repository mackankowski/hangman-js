class Game {
	constructor(ref, response) {
		this.word;
		this.tries = data.tries;
		this.alphabet = [];
		this.generateAlphabet();
		this.randomizeWord();
		this.render(ref, response);
		this.drawGuessArea();
		this.pressEnter();
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
		document.querySelector(".categoryRand").innerHTML = this.word.category;
		this.triesRefresh();
		this.renderAlphabet();
	}
	generateAlphabet() {
		for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
			this.alphabet.push(String.fromCharCode(i).toUpperCase());
		}
	}
	renderAlphabet() {
		for (var i = 0; i < this.alphabet.length; i++) {
			document.querySelector(".alphabet").innerHTML += "<button name='" + this.alphabet[i] + "' type='button' class='alphabetLetter' onclick='view.active.validate(this)'>" + this.alphabet[i] + "</button>";
		}
	}
	triesRefresh() {
		if (this.tries == 0) {
			this.isGameOver(false);
		} else {
			document.querySelector(".tries").innerHTML = this.tries;
		}
	}
	randomizeWord() {
		this.word = data.words[Math.floor(Math.random() * data.words.length)];
		this.word.title = this.word.title.toUpperCase();
	}
	drawGuessArea() {
		this.word.title = this.sanitize(this.word.title);
		for (var i = 0; i < this.word.title.length; i++) {
			if (this.word.title[i] == ' ') {
				document.querySelector(".guessArea").innerHTML += "<br/>";
			} else if (this.word.title[i] >= 'A' && this.word.title[i] <= 'Z') {
				document.querySelector(".guessArea").innerHTML += "<input index='" + i + "' type='text' class='uknownLetter'></input>";
			}
		}
	}
	sanitize(password) {
		var nonePunctuation = password.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		return nonePunctuation.replace(/\s{2,}/g, " ");
	}
	validate(ref) {
		let key = ref.name;
		var idx = [];
		if (confirm("You've selected: " + key + ". Confirm?") == true) {
			for (var i = 0; i < this.word.title.length; i++) {
				if (this.word.title[i].toUpperCase() === key) idx.push(i);
			}
			if (idx.length) {
				for (var i = 0; i < idx.length; i++) {
					this.fillGaps(idx[i]);
				}
				this.isCorrect(true);
				this.isFullPassword();
			} else {
				this.tries--;
				if (this.tries > 0) {
					this.isCorrect(false);
				}
				this.triesRefresh();
			}
			ref.disabled = true;
		}
	}
	isCorrect(correct) {
		if (correct) {
			alert("Success! You've guessed the letter.");
		} else {
			alert("Ups... You've missed. Try again!");
		}
	}
	isFullPassword() {
		let allLetters = document.querySelectorAll(".uknownLetter").length;
		let disabled = document.querySelectorAll(".uknownLetter:disabled").length;
		if (allLetters == disabled) {
			this.isGameOver(true);
		}
	}
	showHint() {
		document.querySelector(".hint").classList.remove('hide');
		document.querySelector(".hint").innerHTML = this.word.hint;
		document.querySelector(".hintBtn").classList.add('hide');
	}
	submitPassword() {
		let password = document.querySelector(".fullPass").value;
		password = this.sanitize(password);
		if (password == '') {
			alert("Provide the password!");
		} else {
			if (password.toUpperCase() == this.word.title) {
				this.fillGaps();
				this.isGameOver(true);
			} else {
				this.isGameOver(false);
			}
		}
	}
	fillGaps(idx = -1) {
		if (idx >= 0) {
			document.querySelector("input[index='" + idx + "']").value = this.word.title[idx];
			document.querySelector("input[index='" + idx + "']").disabled = true;
		} else {
			for (var i = 0; i < this.word.title.length; i++) {
				if (document.querySelector("input[index='" + i + "']") != null) {
					document.querySelector("input[index='" + i + "']").value = this.word.title[i];
					document.querySelector("input[index='" + i + "']").disabled = true;
				}
			}
		}
	}
	pressEnter() {
		document.querySelector(".fullPass").addEventListener("keyup", function (e) {
			if (e.keyCode === 13) document.querySelector(".submit").click();
		});
	}
	async isGameOver(win) {
		clearInterval(view.time);
		view.win = win;
		if (win) {
			await this.sleep(1000);
			view.refresh('summary');

		} else {
			view.refresh('summary');
		}
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}