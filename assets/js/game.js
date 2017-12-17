class Game {
	constructor(ref, response) {
		this.word;
		this.tries = data.tries;
		this.alphabet = [];
		this.generateAlphabet();
		this.randomizeWord();
		this.render(ref, response);
		this.buttonEvents();
	}
	render(ref, response) {
		document.querySelector("section").innerHTML = response;
		document.querySelector(".category-rand").innerHTML = this.word.category;
		this.triesRefresh();
		this.renderAlphabet();
		this.drawGuessArea();
	}
	generateAlphabet() {
		for (let i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
			this.alphabet.push(String.fromCharCode(i).toUpperCase());
		}
	}
	renderAlphabet() {
		this.alphabet.forEach(letter => {
			document.querySelector(".alphabet").innerHTML += "<button name='" + letter + "' type='button' class='alphabetLetter'>" + letter + "</button>";
		});
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
		for (let i = 0; i < this.word.title.length; i++) {
			if (this.word.title[i] == ' ') {
				document.querySelector(".guess-area").innerHTML += "<br/>";
			} else if (this.word.title[i] >= 'A' && this.word.title[i] <= 'Z') {
				document.querySelector(".guess-area").innerHTML += "<input index='" + i + "' type='text' class='guess-letter-input'></input>";
			}
		}
	}
	sanitize(password) {
		let nonePunctuation = password.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
		return nonePunctuation.replace(/\s{2,}/g, " ");
	}
	validate(ref) {
		let key = ref.name;
		let index = [];
		// if (confirm("You've selected: " + key + ". Confirm?") == true) {
		for (let i = 0; i < this.word.title.length; i++) {
			if (this.word.title[i].toUpperCase() === key) index.push(i);
		}
		if (index.length) {
			for (let i = 0; i < index.length; i++) {
				this.fillGaps(index[i]);
			}
			this.highlightGuessArea("success");
			this.isFullPassword();
		} else {
			this.tries--;
			if (this.tries > 0) {
				this.highlightGuessArea("failure");
			}
			this.triesRefresh();
		}
		ref.disabled = true;
		// }
	}
	async highlightGuessArea(state) {
		document.querySelector(".guess-area").classList.add(state + "-highlight-in");
		await this.sleep(250);
		document.querySelector(".guess-area").classList.add(state + "-highlight-out");
		await this.sleep(250);
		document.querySelector(".guess-area").classList.remove(state + "-highlight-in");
		document.querySelector(".guess-area").classList.remove(state + "-highlight-out");
	}
	isFullPassword() {
		let allLetters = document.querySelectorAll(".guess-letter-input").length;
		let disabled = document.querySelectorAll(".guess-letter-input:disabled").length;
		if (allLetters == disabled) {
			this.isGameOver(true);
		}
	}
	showHint() {
		document.querySelector(".hint").classList.remove('hide');
		document.querySelector(".hint").innerHTML = this.word.hint;
		document.querySelector(".hint-btn").classList.add('hide');
	}
	submitPassword() {
		let password = document.querySelector(".full-pass-input").value;
		password = this.sanitize(password);
		if (password == '') {
			alert("Provide the password!");
		} else {
			if (password.toUpperCase() == this.word.title) {
				this.isGameOver(true);
			} else {
				this.isGameOver(false);
			}
			this.fillGaps();
		}
	}
	fillGaps(index = -1) {
		if (index >= 0) {
			document.querySelector("input[index='" + index + "']").value = this.word.title[index];
			document.querySelector("input[index='" + index + "']").disabled = true;
		} else {
			for (let i = 0; i < this.word.title.length; i++) {
				if (document.querySelector("input[index='" + i + "']") != null) {
					document.querySelector("input[index='" + i + "']").value = this.word.title[i];
					document.querySelector("input[index='" + i + "']").disabled = true;
				}
			}
		}
	}
	async isGameOver(win) {
		clearInterval(view.time);
		view.win = win;
		if (win) {
			this.highlightGuessArea("success");
			await this.sleep(1000);
			view.refresh('summary');
		} else {
			this.highlightGuessArea("failure");
			await this.sleep(1000);
			view.refresh('summary');
		}
	}
	sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	buttonEvents() {
		let hintBtn = document.querySelector(".hint-btn");
		hintBtn.onclick = function () {
			view.active.showHint();
		};
		let submitBtn = document.querySelector(".submit");
		submitBtn.onclick = function () {
			view.active.submitPassword();
		};
		let alphabetLetterBtn = document.querySelectorAll(".alphabetLetter");
		for (let i = 0; i < alphabetLetterBtn.length; i++) {
			alphabetLetterBtn[i].onclick = function () {
				view.active.validate(this);
			};
		}
		this.pressEnter();
	}
	pressEnter() {
		document.querySelector(".full-pass-input").addEventListener("keyup", function (e) {
			if (e.keyCode === 13) document.querySelector(".submit").click();
		});
	}
}