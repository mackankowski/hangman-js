class Summary {
    
    constructor(ref, response) {
        
        this.render(ref, response);
        
    }

    render(ref, response) {

        document.querySelector(ref.section).innerHTML = response;
        
    }

}
    
    