document.querySelector("#password").style.display = "none"
document.querySelector("#finalpassword").style.display = "none"
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
            value += `&#128${element.charCodeAt()} `
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

function decryption(){
    document.querySelector("#decrypt-btn").addEventListener("click", function(){
        var value1 = ""
        var input1 = document.querySelector("#emojimsg").value
        var pass1 = document.querySelector("#finalpassword").value
        var user = JSON.parse(localStorage.getItem('data1'))

        var str1 = input1.split(" ")
        str1.forEach(element => {
                value1 += `&#${(element.codePointAt(0))} `
        });
        console.log(value1)

        var found;
        for(let i of user){
            if(i.value == value1){
                found = i;
                console.log(i)
            }
        }

        if (found.value === value1) {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `#333`
            document.querySelector("#result").innerHTML = found.input
        } else if(user(user.length).pass === pass1){
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `red`
            document.querySelector("#result").innerHTML = "Wrong password!"
        } 
        else {
            document.querySelector("#result").style.display = `block`
            document.querySelector("#result").style.color = `red`
            document.querySelector("#result").innerHTML = "Input not matched!"
        }
    })
}

decryption()

