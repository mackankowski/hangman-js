class Game {

    constructor(ref, response) {
        
        this.word;
        this.tries = data.tries;
        this.usedLetters;      
        this.randomizeWord();
        this.render(ref, response);
        this.drawGuessArea();
        
    }

    render(ref, response) {

        document.querySelector(ref.section).innerHTML = response;
        document.querySelector(".category").innerHTML = 'Category: ' + this.word.category; 
        this.triesRefresh();
        
    }

    triesRefresh() {

        if (this.tries < 0) {
            this.isGameOver();
        } else {
            document.querySelector(".tries").innerHTML = 'Tries: ' + this.tries ; 
            
        }

        
        
    }

    isGameOver() {

        alert('Game Over!');
        view.refresh('summary');
        

    }

    randomizeWord() {

        this.word = data.words[Math.floor(Math.random() * data.words.length)];

    }

    drawGuessArea() {

        for (var i = 0; i < this.word.title.length; i++) {

            if (this.word.title[i] == ' ') {

                document.querySelector(".guessArea").innerHTML += "<br/>";

            } else {

                document.querySelector(".guessArea").innerHTML += "<input type='text' name='" + (i+1) + "' onkeyup='view.active.validate(this, "+ i+ ")' maxlength='1'>";

            }

        }

    }

    validate(ref, i) {

        this.triesRefresh();

        ref.value = ref.value.toUpperCase();

        if (this.word.title[i].toUpperCase() == ref.value) {
            ref.disabled = true;

        } else {
            ref.value = '';
            this.tries--;
            this.triesRefresh();
        }
        
    }

    isAvailable() {   

    }


    

    isLetter() {

    }




    showHint() {
        document.querySelector(".hint").style.display = 'inline-block';
        document.querySelector(".hint").innerHTML = "Hint: " + this.word.hint;
        document.querySelector(".hintBtn").style.display = 'none';
    }
    

    

}

