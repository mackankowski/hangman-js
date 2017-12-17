class Summary {
	constructor(ref, response, win) {
		this.win = win;
		this.render(ref, response);
		this.pressEnter();
	}
	render(ref, response) {
		document.querySelector("section").innerHTML = response;
		if (this.win) {
			document.querySelector("h2").innerHTML = "Winner! Your time is:";
			document.querySelector(".timer").innerHTML = window.min + ' min ' + window.sec + ' sec';
		} else {
			document.querySelector(".content").style.display = 'none';
			document.querySelector("h2").innerHTML = "You lose!";
		}
		this.buttonEvents(ref);
	}
	save() {
		let userName = document.querySelector(".user-name").value;
		if (userName == '') {
			alert("Provide user name!");
		} else {
			// if (confirm("You've entered: " + userName + ". Confirm?") == true) {
			let data = {
				name: userName,
				score: window.sec
			};
			let userArr = [];
			if (localStorage.getItem('scoreboard') === null) {
				userArr.push(data);
			} else {
				userArr = JSON.parse(localStorage.getItem('scoreboard'));
				let userIndex = this.userExists(userArr, userName);
				if (userIndex >= 0) {
					if (userArr[userIndex].score > data.score) {
						userArr[userIndex] = data;
						// alert("User name exists! New score will be overwritten.");
					}
				} else {
					userArr.push(data);
				}
			}
			// alert("Your score's been saved!");
			localStorage.setItem('scoreboard', JSON.stringify(userArr));
			view.refresh('main');
			// }
		}
	}
	userExists(userArr, userName) {
		for (let i = 0; i < userArr.length; i++) {
			if (userArr[i].name.toUpperCase() === userName.toUpperCase()) {
				return i;
			}
		}
		return -1;
	}
	buttonEvents(ref) {
		let saveBtn = document.querySelector(".save");
		saveBtn.onclick = function () {
			view.active.save();
		};
		let gameBtn = document.querySelector(".game");
		gameBtn.onclick = function () {
			view.refresh("game")
		};
	}
	pressEnter() {
		document.querySelector(".user-name").addEventListener("keyup", function (e) {
			if (e.keyCode === 13) document.querySelector(".save").click();
		});
	}
}