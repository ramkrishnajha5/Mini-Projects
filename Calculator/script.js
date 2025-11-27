let input = document.getElementById('inputBox');
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);

// Button click handler
arr.forEach(button => {
    button.addEventListener('click', (e) => {
        handleInput(e.target.innerHTML);
        addClickAnimation(e.target);
        vibrateOnMobile();
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // Numbers and operators
    if (/^[0-9+\-*/.%]$/.test(key)) {
        e.preventDefault();
        handleInput(key);
    }
    // Enter key for equals
    else if (key === 'Enter') {
        e.preventDefault();
        handleInput('=');
    }
    // Backspace for delete
    else if (key === 'Backspace') {
        e.preventDefault();
        handleInput('DE');
    }
    // Escape for clear
    else if (key === 'Escape') {
        e.preventDefault();
        handleInput('AC');
    }
});

// Handle all input (from buttons or keyboard)
function handleInput(value) {
    try {
        if (value == '=') {
            if (string === "") {
                input.value = "0";
                return;
            }
            // Evaluate the expression
            string = eval(string).toString();
            input.value = string;

            // Success animation
            input.style.animation = 'none';
            setTimeout(() => {
                input.style.animation = '';
            }, 10);
        }
        else if (value == 'AC') {
            string = "";
            input.value = "0";
        }
        else if (value == 'DE') {
            string = string.substring(0, string.length - 1);
            input.value = string || "0";
        }
        else {
            // Prevent multiple operators in a row
            if (/[+\-*/.%]$/.test(string) && /[+\-*/.%]/.test(value)) {
                return;
            }

            string += value;
            input.value = string;
        }
    } catch (error) {
        // Error handling
        input.value = "Error";
        string = "";
        setTimeout(() => {
            input.value = "0";
        }, 1500);
    }
}

// Add click animation to button
function addClickAnimation(button) {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

// Vibrate on mobile devices
function vibrateOnMobile() {
    if ('vibrate' in navigator) {
        navigator.vibrate(10);
    }
}

// Initialize display
input.value = "0";