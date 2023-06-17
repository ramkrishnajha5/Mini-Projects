function btnClicking(){
    document.querySelector("#dec-btn").addEventListener("click", function(){
        document.querySelector("#decryption").style.display = "block"
        document.querySelector("#encryption").style.display = "none"
        document.querySelector("#enc-btn").style.backgroundColor = "#e3e6e7"
        document.querySelector("#dec-btn").style.backgroundColor = "#f8f8f2"
        document.querySelector("#main>h1 span img").style.rotate = "180deg"
    })
    document.querySelector("#enc-btn").addEventListener("click", function(){
        document.querySelector("#encryption").style.display = "block"
        document.querySelector("#decryption").style.display = "none"
        document.querySelector("#dec-btn").style.backgroundColor = "#e3e6e7"
        document.querySelector("#enc-btn").style.backgroundColor = "#f8f8f2"
        document.querySelector("#main>h1 span img").style.rotate = "0deg"

    })
}

btnClicking()