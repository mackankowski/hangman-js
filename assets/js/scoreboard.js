class Scoreboard {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
		var obj = null ? null : JSON.parse(localStorage.getItem('scoreboard'));
		if (obj) {
			obj.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
			for (let i in obj) {
				if (i == 10) break;
				document.querySelector("ol").innerHTML += "<li class='score'>" + obj[i].name + ' (' + obj[i].score + ')</li>';
			}
		} else {
			document.querySelector(ref.content).innerHTML += "<p>No scores available</p>";
		}
	}
}