class Categories {
	constructor(ref, reponse) {
		this.render(ref, reponse);
	}
	render(ref, response) {
		let categories = [];
		document.querySelector("section").innerHTML = response;
		for (let i in data.words) {
			categories.push(data.words[i].category);
		}
		categories = categories.filter((v, i, a) => a.indexOf(v) === i);
		categories.sort();
		for (let i in categories) {
			document.querySelector(".content").innerHTML += "<button class='category'>" + categories[i] + "</button>";
		}
	}
}