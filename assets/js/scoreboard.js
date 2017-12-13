class Scoreboard {

    constructor(ref, response) {
        
        this.render(ref, response);

    }

    render(ref, response) {
        
        this.save(); // test data

        document.querySelector(ref.section).innerHTML = response;
        
        var obj = null ? null : JSON.parse(localStorage.getItem('scoreboard'));

        if (obj) {

            obj.sort((a, b) => parseFloat(a.score) - parseFloat(b.score));
            
            for (let i in obj) {
                
                if (i == 10) break;

                document.querySelector(ref.content).innerHTML += "<button class='score'>" + obj[i].name + ' (' + obj[i].score + ')</button>';
    
            }
        } else {

            document.querySelector(ref.content).innerHTML += "<p>No scores</p>";

        }

    }
        
    save() {

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

}