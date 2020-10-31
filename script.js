window.onload = () =>{
    let cards = document.querySelectorAll(".card");

    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener("click", (e) => {
            let children = cards[i].children;
 
            for (let i = 0; i < children.length; i++) {
                
                if (children[i].classList.contains("visible")) {                    
                    children[i].classList.remove("visible");

                } else {
                    children[i].classList.add("visible");                    
                }
            }
        })
    }
}