const showButtons = document.querySelectorAll(".asks");
const responses = document.querySelectorAll(".asks p");

showButtons.forEach( showButton => {
    showButton.addEventListener("click",()=>{
        if(showButton.querySelector("p").style.display === "block"){
            showButton.querySelector("h2").querySelector("span").innerText = "keyboard_arrow_down";
            showButton.querySelector("p").style.display = "none";
        }else {
            showButton.querySelector("h2").querySelector("span").innerText = "keyboard_arrow_up";
            showButton.querySelector("p").style.display = "block"
        }
    })
});
