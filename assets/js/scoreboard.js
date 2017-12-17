class Scoreboard {
	constructor(ref, response) {
		this.render(ref, response);
	}
	render(ref, response) {
		document.querySelector("section").innerHTML = response;
		let obj = null ? null : JSON.parse(localStorage.getItem('scoreboard'));
		if (obj) {
			obj.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
			for (let i in obj) {
				let min = Math.floor(obj[i].score / 60);
				let sec = obj[i].score - min * 60;
				if (i == 10) break;
				document.querySelector("ol").innerHTML += "<li class='score'>" + obj[i].name + ' (' + min + ' min ' + sec + ' sec)</li>';
			}
		} else {
			document.querySelector(".content").innerHTML += "<p>No scores available</p>";
		}
	}
}