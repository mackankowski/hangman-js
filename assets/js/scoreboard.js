class Scoreboard {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector(ref.section).innerHTML = response;
		var obj = null ? null : JSON.parse(localStorage.getItem('scoreboard'));
		if (obj) {
			for (let i in obj) {
				obj.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
				if (i == 10) break;
				var min = obj[i].score.split(".")[0];
				var sec = obj[i].score.split(".")[1];
				document.querySelector("ol").innerHTML += "<li class='score'>" + obj[i].name + ' (' + min + ' min ' + sec + ' sec)</li>';
			}
		} else {
			document.querySelector(ref.content).innerHTML += "<p>No scores available</p>";
		}
	}
}