class View {
	constructor(id) {
		this.id = id;
		this.section = "section";
		this.content = ".content";
		this.time = 0;
		this.win = false;
		window.min = 0;
		window.sec = 0;
		this.loadTemplate();
	}

	loadTemplate() {
		this.ajaxRequest(this);
		this.toogleReturnBtn();
	}
	ajaxRequest(ref) {
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {
			if (this.readyState == 4 && this.status == 200) {
				clearInterval(ref.time);
				switch (ref.id) {
					case 'main':
						ref.active = new Main(ref, this.responseText);
						break;
					case 'game':
						ref.active = new Game(ref, this.responseText);
						window.min = 0;
						window.time = 0;
						ref.time = setInterval(ref.timer, 1000);
						break;
					case 'categories':
						ref.active = new Categories(ref, this.responseText);
						break;
					case 'scoreboard':
						ref.active = new Scoreboard(ref, this.responseText);
						break;
					case 'summary':
						ref.active = new Summary(ref, this.responseText, ref.win);
						break;
					default:
						document.querySelector(ref.section).innerHTML = "<p>Content not found!</p>";
				}
			}
		};
		xhttp.open("GET", "views/" + this.id + ".html", true);
		xhttp.send();
	}
	timer() {
		this.time++;
		window.min = Math.floor(window.time / 60);
		window.sec = window.time - window.min * 60;
		document.querySelector(".timer").innerHTML = window.min + ' min ' + window.sec + ' sec';
	}
	toogleReturnBtn() {
		if (this.id == 'main') {
			document.querySelector(".main").classList.add('hide');
		} else {
			document.querySelector(".main").classList.remove('hide');
		}
	}
	refresh(id) {
		this.id = id;
		this.loadTemplate();
	}
}