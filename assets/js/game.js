class Game {

    constructor(ref, response) {
        
        this.tries = data.tries;        
        this.randomizeWord();
        this.render(ref, response);
        
    }

    render(ref, response) {

        document.querySelector(ref.section).innerHTML = response;
        document.querySelector(ref.content).innerHTML += '<p>Category: ' + this.word.category + '</p>'; 
        document.querySelector(ref.content).innerHTML += '<p class="tries">Tries: ' + this.tries + '</p>'; 
        

    }

    randomizeWord() {

        this.word = data.words[Math.floor(Math.random() * data.words.length)];

    }

}

