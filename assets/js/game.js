class Game {

    constructor(ref, response) {

        this.word;
        this.tries = data.tries;
        this.alphabet = [];
        this.generateAlphabet();
        this.randomizeWord();
        this.render(ref, response);
        this.renderAlphabet();        
        this.drawGuessArea();
        this.pressEnter();
        

    }

    render(ref, response) {

        document.querySelector(ref.section).innerHTML = response;
        document.querySelector(".category").innerHTML = this.word.category;
        this.triesRefresh();        
        this.renderAlphabet();        

    }

    generateAlphabet() {
        
        for (var i = 'a'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {
            this.alphabet.push(String.fromCharCode(i).toUpperCase());            
        }
    }

    renderAlphabet() {
        for (var i = 0; i < this.alphabet.length; i++) {
            document.querySelector(".alphabet").innerHTML += "<button name='" + this.alphabet[i] + "' type='button' class='alphabetLetter' onclick='view.active.validate(this)'>" + this.alphabet[i] + "</button>";
        }
        
    }

    triesRefresh() {

        if (this.tries == 0) {
            this.isGameOver(false);
        } else {
            document.querySelector(".tries").innerHTML = this.tries;
        }

    }

    randomizeWord() {

        this.word = data.words[Math.floor(Math.random() * data.words.length)];
        this.word.title = this.word.title.toUpperCase();

    }

    drawGuessArea() {

        // add ignore: punctuation marks

        for (var i = 0; i < this.word.title.length; i++) {
            if (this.word.title[i] == ' ') {
                document.querySelector(".guessArea").innerHTML += "<br/>";                
            } else if (this.word.title[i] >= 'A' && this.word.title[i] <= 'Z') {
                document.querySelector(".guessArea").innerHTML += "<input index='" + i + "' type='text' class='uknownLetter'></input>";
            }
        }
        
    }

    validate(ref) {

        let key = ref.name;
        var idx = [];

        if (confirm("You've selected: " + key + ". Confirm?") == true) {

            for (var i = 0; i < this.word.title.length; i++) {
                if (this.word.title[i].toUpperCase() === key) idx.push(i);
            }
    
            if (idx.length) {
    
                for (var i = 0; i < idx.length; i++) {
                    document.querySelector("input[index='" + idx[i] + "']").value = this.word.title[idx[i]];
                    document.querySelector("input[index='" + idx[i] + "']").disabled = true;
                }
    
                this.isCorrect(true);
                this.isFullPassword();
    
            } else {
    
                this.tries--;
                if (this.tries > 0) {
                    this.isCorrect(false);   
                }                            
                this.triesRefresh();
                
    
            }
    
            ref.disabled = true;

        }

    }

    isCorrect(correct) {

        if (correct) {
            alert("Success! You've guessed the letter.");
        } else {
            alert("Ups... You've missed. Try again!");
        }

    }

    isFullPassword() {

        let allLetters = document.querySelectorAll(".uknownLetter").length;
        let disabled = document.querySelectorAll(".uknownLetter:disabled").length;

        if (allLetters == disabled) {
            this.isGameOver(true);
        }

    }

    showHint() {

        document.querySelector(".hint").style.display = 'inline-block';
        document.querySelector(".hint").innerHTML = this.word.hint;
        document.querySelector(".hintBtn").style.display = 'none';

    }

    submitPassword(ref) {

        let password = document.querySelector(".fullPass").value;

        if (password == '') {
            alert("Provide the password!");
        } else {
            if (password.toUpperCase() == this.word.title) {
                this.isGameOver(true);
            } else {
                this.isGameOver(false);
            }
        }

    }

    isGameOver(win) {

        if (win) {
            alert('Winner!');
        } else {
            alert('Loser!');
        }

        view.refresh('summary');

    }

    pressEnter() {

        document.querySelector(".fullPass").addEventListener("keyup", function(e) {
            if (e.keyCode === 13) document.querySelector(".submit").click();
        });

    }

}

