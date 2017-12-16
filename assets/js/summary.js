class Summary {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
		document.querySelector(".timer").innerHTML = window.min + ' min ' + window.sec + ' sec';
	}
	save() {
		let userName = document.querySelector(".userName").value;
		if (userName == '') {
			alert("Provide user name!");
		} else {
			if (confirm("You've entered: " + userName + ". Confirm?") == true) {
				var data = {
					name: userName,
					score: window.min + ' min ' + window.sec + ' sec'
				};
				var userArr = [];
				if (localStorage.getItem('scoreboard') === null) {
					userArr.push(data);
				} else {
					userArr = JSON.parse(localStorage.getItem('scoreboard'));
					var idx = this.userExists(userArr, userName);
					if (idx >= 0) {
						userArr[idx] = data;
						alert("Your score's been updated!");
					} else {
						userArr.push(data);
						alert("Your score's been saved!");
					}
				}
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
}