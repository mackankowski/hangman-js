class Main {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector("section").innerHTML = response;
		this.buttonEvents(ref);
	}
	buttonEvents(ref) {
		let gameBtn = document.querySelector(".game");
		gameBtn.onclick = function () {
			view.refresh('game');
		};
		let categoriesBtn = document.querySelector(".categories");
		categoriesBtn.onclick = function () {
			view.refresh('categories');
		};
		let scoreboardBtn = document.querySelector(".scoreboard");
		scoreboardBtn.onclick = function () {
			view.refresh('scoreboard');
		};
		let mainBtn = document.querySelector(".main");
		mainBtn.onclick = function () {
			view.refresh('main');
		};
	}
}