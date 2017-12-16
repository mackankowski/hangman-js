class Main {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
		this.buttonEvents(ref);
	}
	buttonEvents(ref) {
		var gameBtn = document.querySelector(".game");
		gameBtn.onclick = function () {
			view.refresh('game');
		};
		var categoriesBtn = document.querySelector(".categories");
		categoriesBtn.onclick = function () {
			view.refresh('categories');
		};
		var scoreboardBtn = document.querySelector(".scoreboard");
		scoreboardBtn.onclick = function () {
			view.refresh('scoreboard');
		};
		var mainBtn = document.querySelector(".main");
		mainBtn.onclick = function () {
			view.refresh('main');
		};
	}
}