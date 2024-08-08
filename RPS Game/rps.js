const rps = ["Rock", "Paper", "Scissor", "Rock", "Paper", "Scissor"];
const yourChoose = document.querySelector(".yourChoose");
const computerChoose = document.querySelector(".computerChoose");
let yourWinCounter = 0;
let computerWinCounter = 0;
const yourWinResult = document.querySelector(".you")
const computerWinResult = document.querySelector(".computer")

function rpsfunc(value){
    let computeRPS = rps[Math.floor(Math.random()*rps.length)]
    let result = document.querySelector(".result");
    if(value === computeRPS){
        result.textContent = "It's a Tie";
        result.style.color = "black";
    }
    else{
        switch (value) {
            case "Rock":
                if(computeRPS === "Scissor") {
                    result.textContent = "You Win🎉"
                    result.style.color = "green"
                    yourWinCounter++
                } else{ 
                    result.textContent = "You Loose💔"
                    result.style.color = "red";
                    computerWinCounter++
                }
            break;
            case "Paper":
                if(computeRPS === "Rock") {
                    result.textContent = "You Win🎉"
                    result.style.color = "green"
                    yourWinCounter++
                } else{ 
                    result.textContent = "You Loose💔"
                    result.style.color = "red";
                    computerWinCounter++
                }
            break;
            case "Scissor":
                if(computeRPS === "Paper") {
                    result.textContent = "You Win🎉"
                    result.style.color = "green"
                    yourWinCounter++
                } else{ 
                    result.textContent = "You Loose💔"
                    result.style.color = "red";
                    computerWinCounter++
                }
            break;
            default:
                result.textContent = "Something Went Wrong!"
            break;
        }
    }
    result.style.display = "block";
    yourChoose.textContent = `Your Choose: ${value}`
    computerChoose.textContent = `Computer Choose: ${computeRPS}`
    yourWinResult.textContent = `You Win: ${yourWinCounter}`
    computerWinResult.textContent = `Computer Win: ${computerWinCounter}`
}
document.getElementById("rock").addEventListener("click", ()=>{
    rpsfunc("Rock");
})
document.getElementById("paper").addEventListener("click", ()=>{
    rpsfunc("Paper");
})
document.getElementById("scissor").addEventListener("click", ()=>{
    rpsfunc("Scissor");
})
document.getElementById("restart").addEventListener("click",()=>{
    window.location.reload();
})