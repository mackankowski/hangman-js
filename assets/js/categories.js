class Categories {
	constructor(ref, reponse) {
		this.render(ref, reponse);
	}
	render(ref, response) {
		var categories = [];
		document.querySelector(ref.section).innerHTML = response;
		for (let i in data.words) {
			categories.push(data.words[i].category);
		}
		categories = categories.filter((v, i, a) => a.indexOf(v) === i);
		for (let i in categories) {
			document.querySelector(ref.content).innerHTML += "<button class='category'>" + categories[i] + "</button>";
		}
	}
}