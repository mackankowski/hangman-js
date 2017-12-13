class View {

    constructor(id) {
        this.id = id;
        this.dest = "content";
        this.loadTemplate();
    }

    loadTemplate() {

        this.ajaxRequest(this);
        this.backButtonDisplay();

    }

    ajaxRequest(ref) {

        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {

                switch (ref.id) {
                    case 'main':
                        document.getElementById(ref.dest).innerHTML = this.responseText;
                        break;
                    case 'categories':
                        ref.loadCategories(ref, this.responseText);
                        break;
                    case 'scoreboard':
                        //ref.loadScoreboard(ref, this.responseText);
                        break;
                    default:
                        document.getElementById(ref.dest).innerHTML = "Content not found!";
                }

            }
        };
        xhttp.open("GET", "views/" + this.id + ".html", true);
        xhttp.send();

    }

    loadCategories(ref, response) {

        var categories = [];

        document.getElementById(ref.dest).innerHTML = response;

        for (let i in data.words) {
            categories.push(data.words[i].category);            
        }

        categories = categories.filter((v, i, a) => a.indexOf(v) === i); 

        for (let i in categories) {
            document.getElementById(ref.dest).innerHTML += "<button class='categories'>" + categories[i] + "</button>";
        }
    }


    backButtonDisplay() {

        if (this.id == 'main') {
            document.getElementById("backBtn").style.display = 'none';
        } else {
            document.getElementById("backBtn").style.display = 'inline-block';
        }

    }

    refreshView(id) {
        
        this.id = id;
        this.loadTemplate();

    }

}

(function(){
    
    this.view = new View('main');

})();