const rps = ["Rock", "Paper", "Scissor"];
const yourChoose = document.querySelector(".yourChoose");
const computerChoose = document.querySelector(".computerChoose");
let yourWinCounter = 0;
let computerWinCounter = 0;
const yourWinResult = document.querySelector(".you");
const computerWinResult = document.querySelector(".computer");

// Confetti effect for wins
function createConfetti() {
    const colors = ['#f093fb', '#f5576c', '#ffd89b', '#667eea', '#4facfe'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
            document.body.appendChild(confetti);

            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

// Vibrate on mobile
function vibrateOnMobile(duration = 50) {
    if ('vibrate' in navigator) {
        navigator.vibrate(duration);
    }
}

function rpsfunc(value) {
    let computeRPS = rps[Math.floor(Math.random() * rps.length)];
    let result = document.querySelector(".result");

    vibrateOnMobile();

    if (value === computeRPS) {
        result.textContent = "It's a Tie! 🤝";
        result.style.color = "#ffd89b";
    } else {
        switch (value) {
            case "Rock":
                if (computeRPS === "Scissor") {
                    result.textContent = "You Win! 🎉";
                    result.style.color = "#00ff88";
                    yourWinCounter++;
                    createConfetti();
                    vibrateOnMobile(100);
                } else {
                    result.textContent = "You Lose! 💔";
                    result.style.color = "#ff6b6b";
                    computerWinCounter++;
                }
                break;
            case "Paper":
                if (computeRPS === "Rock") {
                    result.textContent = "You Win! 🎉";
                    result.style.color = "#00ff88";
                    yourWinCounter++;
                    createConfetti();
                    vibrateOnMobile(100);
                } else {
                    result.textContent = "You Lose! 💔";
                    result.style.color = "#ff6b6b";
                    computerWinCounter++;
                }
                break;
            case "Scissor":
                if (computeRPS === "Paper") {
                    result.textContent = "You Win! 🎉";
                    result.style.color = "#00ff88";
                    yourWinCounter++;
                    createConfetti();
                    vibrateOnMobile(100);
                } else {
                    result.textContent = "You Lose! 💔";
                    result.style.color = "#ff6b6b";
                    computerWinCounter++;
                }
                break;
            default:
                result.textContent = "Something Went Wrong!";
                result.style.color = "#ffffff";
                break;
        }
    }

    result.style.display = "block";
    yourChoose.textContent = `Your Choice: ${value}`;
    computerChoose.textContent = `Computer: ${computeRPS}`;
    yourWinResult.textContent = `You: ${yourWinCounter} 🏆`;
    computerWinResult.textContent = `Computer: ${computerWinCounter} 🤖`;

    // Save to localStorage
    saveGameStats();
}

// Save game statistics
function saveGameStats() {
    const stats = {
        yourWins: yourWinCounter,
        computerWins: computerWinCounter,
        totalGames: yourWinCounter + computerWinCounter
    };
    localStorage.setItem('rpsGameStats', JSON.stringify(stats));
}

// Load game statistics
function loadGameStats() {
    const saved = localStorage.getItem('rpsGameStats');
    if (saved) {
        const stats = JSON.parse(saved);
        yourWinCounter = stats.yourWins || 0;
        computerWinCounter = stats.computerWins || 0;
        yourWinResult.textContent = `You: ${yourWinCounter} 🏆`;
        computerWinResult.textContent = `Computer: ${computerWinCounter} 🤖`;
    } else {
        yourWinResult.textContent = `You: 0 🏆`;
        computerWinResult.textContent = `Computer: 0 🤖`;
    }
}

// Event listeners
document.getElementById("rock").addEventListener("click", () => {
    rpsfunc("Rock");
});

document.getElementById("paper").addEventListener("click", () => {
    rpsfunc("Paper");
});

document.getElementById("scissor").addEventListener("click", () => {
    rpsfunc("Scissor");
});

document.getElementById("restart").addEventListener("click", () => {
    // Clear stats
    yourWinCounter = 0;
    computerWinCounter = 0;
    localStorage.removeItem('rpsGameStats');

    // Fade out and reload
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    setTimeout(() => {
        window.location.reload();
    }, 300);
});

// Load stats on page load
window.addEventListener('load', loadGameStats);