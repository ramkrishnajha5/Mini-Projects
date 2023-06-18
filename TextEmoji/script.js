function btnClicking(){
    document.querySelector("#dec-btn").addEventListener("click", function(){
        document.querySelector("#decryption").style.display = "block"
        document.querySelector("#encryption").style.display = "none"
        document.querySelector("#enc-btn").style.backgroundColor = "#e3e6e7"
        document.querySelector("#dec-btn").style.backgroundColor = "#f8f8f2"
        document.querySelector("#main>h1 span img").style.rotate = "180deg"
        document.querySelector("#result").style.display = "none"
    })
    document.querySelector("#enc-btn").addEventListener("click", function(){
        document.querySelector("#encryption").style.display = "block"
        document.querySelector("#decryption").style.display = "none"
        document.querySelector("#dec-btn").style.backgroundColor = "#e3e6e7"
        document.querySelector("#enc-btn").style.backgroundColor = "#f8f8f2"
        document.querySelector("#main>h1 span img").style.rotate = "0deg"
        document.querySelector("#result").style.display = "none"

    })
    document.querySelector("#encrypt-btn").addEventListener("click", function(){
        document.querySelector("#result").style.display = "block"
    })
    document.querySelector("#decrypt-btn").addEventListener("click", function(){
        document.querySelector("#result").style.display = "block"
    })
}

btnClicking()
function encryption(){
    document.querySelector("#encrypt-btn").addEventListener("click", function(){
        var value = ""
        var input = document.getElementById("txtmsg").value
        var password = document.getElementById("password").value
        
        const str = input.split("")
        str.forEach(element => {
            value += `&#128${element.charCodeAt()}`
        });

        document.querySelector("#result").innerHTML = value

        var data = []
        if(JSON.parse(localStorage.getItem("data1"))){
            data = JSON.parse(localStorage.getItem("data1"))
            data.push({"pass": password, "input":input, "value": value})
        }else{
            data = [{"pass": password, "input":input, "value": value}]
        }
    
        localStorage.setItem("data1", JSON.stringify(data))

    })
}
encryption()

