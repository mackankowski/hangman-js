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
                    case 'game':
                        document.getElementById(ref.dest).innerHTML = this.responseText;
                        break;
                    case 'categories':
                        ref.loadCategories(ref, this.responseText);
                        break;
                    case 'scoreboard':
                        ref.loadScoreboard(ref, this.responseText);
                        break;
                    default:
                        document.getElementById(ref.dest).innerHTML = "<h2>Content not found!</h2>";
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
            document.getElementById(ref.dest).innerHTML += "<button class='category'>" + categories[i] + "</button>";
        }
    }

    loadScoreboard(ref, response) {

        //this.saveScoreboard(); // test data

        document.getElementById(ref.dest).innerHTML = response;

        var obj = JSON.parse(localStorage.getItem('scoreboard'));

        obj.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));

        if (obj !== "undefined") {
            for (let i in obj) {
                
                document.getElementById(ref.dest).innerHTML += "<button class='score'>" + obj[i].name + ' (' + obj[i].score + ')</button>';
    
            }
        } else {

            document.getElementById(ref.dest).innerHTML += "<p>No scores</p>";

        }

    }

    saveScoreboard() {

        // test data

        // add first user

        var arr = [];
        var u1 = {name: 'Maciej', score: 19.40};
        arr.push(u1);
        localStorage.setItem('scoreboard', JSON.stringify(arr));

        // add second user
     
        var u2 = {name: "Jan", score: 15.20};
        arr = JSON.parse(localStorage.getItem('scoreboard'));
        arr.push(u2);
        localStorage.setItem('scoreboard', JSON.stringify(arr));

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