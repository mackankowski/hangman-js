class View {

    constructor(id) {
        this.id = id;
        this.section = "section";
        this.content = ".content";
        this.loadTemplate();
    }

    loadTemplate() {

        this.ajaxRequest(this);
        this.toogleReturnBtn();

    }

    ajaxRequest(ref) {
        

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                switch (ref.id) {
                    case 'main':
                        ref.window = new Main(ref, this.responseText);
                        break;
                    case 'game':
                        ref.window = new Game(ref, this.responseText);
                        break;
                    case 'categories':
                        ref.window = new Categories(ref, this.responseText);
                        break;
                    case 'scoreboard':
                        ref.window = new Scoreboard(ref, this.responseText);
                        break;
                    default:
                        document.querySelector(this.content).innerHTML = "<p>Content not found!</p>";
                }

                

            }
        };
        xhttp.open("GET", "views/" + this.id + ".html", true);
        xhttp.send();

    }

    toogleReturnBtn() {

        if (this.id == 'main') {
            document.getElementById("returnBtn").style.display = 'none';
        } else {
            document.getElementById("returnBtn").style.display = 'inline-block';
        }

    }

    refreshView(id) {

        this.id = id;
        this.loadTemplate();

    }

}