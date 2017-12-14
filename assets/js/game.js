class Game {

    constructor(ref, response) {
        
        this.word;
        this.tries = data.tries;      
        this.randomizeWord();
        this.render(ref, response);
        this.drawGuessArea();
        
    }

    render(ref, response) {

        document.querySelector(ref.section).innerHTML = response;
        document.querySelector(".category").innerHTML += 'Category: ' + this.word.category; 
        document.querySelector(".tries").innerHTML += 'Tries: ' + this.tries ; 
        
        
    }

    randomizeWord() {

        this.word = data.words[Math.floor(Math.random() * data.words.length)];

    }

    drawGuessArea() {

        for (var i = 0; i < this.word.title.length; i++) {

            if (this.word.title[i] == ' ') {

                document.querySelector(".guessArea").innerHTML += "<br/>";

            } else {

                document.querySelector(".guessArea").innerHTML += "<input type='text' name='" + i + "'>";

            }

        }

    }

    showHint() {
        document.querySelector(".hint").style.display = 'inline-block';
        document.querySelector(".hint").innerHTML = "Hint: " + this.word.hint;
        document.querySelector(".hintBtn").style.display = 'none';
    }
    

    

}

