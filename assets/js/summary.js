class Summary {
	constructor(ref, response, win) {
		this.win = win;
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
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
		let userName = document.querySelector(".userName").value;
		if (userName == '') {
			alert("Provide user name!");
		} else {
			if (confirm("You've entered: " + userName + ". Confirm?") == true) {
				var data = {
					name: userName,
					score: window.min + '.' + window.sec
				};
				var userArr = [];
				if (localStorage.getItem('scoreboard') === null) {
					userArr.push(data);
				} else {
					userArr = JSON.parse(localStorage.getItem('scoreboard'));
					var idx = this.userExists(userArr, userName);
					if (idx >= 0) {
						userArr[idx] = data;
						alert("User name exists! New score will be overwritten.");
					} else {
						userArr.push(data);
					}
				}
				alert("Your score's been saved!");
				localStorage.setItem('scoreboard', JSON.stringify(userArr));
				view.refresh('main');
			}
		}
	}
	userExists(userArr, userName) {
		for (var i = 0; i < userArr.length; i++) {
			if (userArr[i].name.toUpperCase() === userName.toUpperCase()) {
				return i;
			}
		}
		return -1;
	}
	buttonEvents(ref) {
		var saveBtn = document.querySelector(".save");
		saveBtn.onclick = function () {
			view.active.save();
		};
		var gameBtn = document.querySelector(".game");
		gameBtn.onclick = function () {
			view.refresh("game")
		};

	}
}