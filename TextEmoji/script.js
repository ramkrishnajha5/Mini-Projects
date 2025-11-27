console.log("TextEmoji Converter Loaded");

// Character counters
const txtmsg = document.getElementById("txtmsg");
const emojimsg = document.getElementById("emojimsg");
const encCounter = document.getElementById("enc-counter");
const decCounter = document.getElementById("dec-counter");

// Update character counters
txtmsg.addEventListener("input", () => {
    encCounter.textContent = `${txtmsg.value.length} characters`;
});

emojimsg.addEventListener("input", () => {
    decCounter.textContent = `${emojimsg.value.length} characters`;
});

// Show toast notification
function showToast(message, success = true) {
    const toast = document.createElement("div");
    toast.classList.add("toast");
    toast.textContent = message;
    toast.style.background = success
        ? "rgba(0, 255, 136, 0.95)"
        : "rgba(255, 107, 107, 0.95)";
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = "slideInRight 0.3s ease-out reverse";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Toggle between encrypt and decrypt
function btnClicking() {
    document.querySelector("#dec-btn").addEventListener("click", function () {
        document.querySelector("#decryption").style.display = "flex";
        document.querySelector("#encryption").style.display = "none";
        document.querySelector("#enc-btn").style.background = "transparent";
        document.querySelector("#enc-btn").style.boxShadow = "none";
        document.querySelector("#dec-btn").style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        document.querySelector("#dec-btn").style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.4)";
        document.querySelector("#main>h1 span img").style.transform = "rotate(180deg)";
        document.querySelector("#result").style.display = "none";
    });

    document.querySelector("#enc-btn").addEventListener("click", function () {
        document.querySelector("#encryption").style.display = "flex";
        document.querySelector("#decryption").style.display = "none";
        document.querySelector("#dec-btn").style.background = "transparent";
        document.querySelector("#dec-btn").style.boxShadow = "none";
        document.querySelector("#enc-btn").style.background = "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
        document.querySelector("#enc-btn").style.boxShadow = "0 4px 15px rgba(118, 75, 162, 0.4)";
        document.querySelector("#main>h1 span img").style.transform = "rotate(0deg)";
        document.querySelector("#result").style.display = "none";
    });
}

btnClicking();

// Encryption function - Convert text to emojis
function encryption() {
    document.querySelector("#encrypt-btn").addEventListener("click", function () {
        const input = txtmsg.value.trim();

        if (!input) {
            showToast("Please enter some text to encrypt!", false);
            return;
        }

        // Convert each character to its corresponding emoji
        let emojiResult = "";
        for (let i = 0; i < input.length; i++) {
            const charCode = input.charCodeAt(i);
            // Convert to emoji by adding offset to emoji range (128000+)
            const emojiCode = 128000 + charCode;
            emojiResult += String.fromCodePoint(emojiCode) + " ";
        }

        const resultDiv = document.querySelector("#result");
        resultDiv.innerHTML = `<button class="copy-btn" id="copy-btn">📋 Copy</button><div id="result-content" style="padding-top: 40px; word-wrap: break-word; font-size: 24px;">${emojiResult.trim()}</div>`;
        resultDiv.style.display = "block";

        // Save to localStorage for decryption reference
        const data = {
            original: input,
            encrypted: emojiResult.trim(),
            timestamp: new Date().toISOString()
        };

        let history = JSON.parse(localStorage.getItem("textEmojiHistory")) || [];
        history.unshift(data);
        history = history.slice(0, 50); // Keep last 50 entries
        localStorage.setItem("textEmojiHistory", JSON.stringify(history));

        showToast("Text encrypted to emojis successfully! ✅");
        setupCopyButton();
    });
}

encryption();

// Decryption function - Convert emojis back to text
function decryption() {
    document.querySelector("#decrypt-btn").addEventListener("click", function () {
        const input = emojimsg.value.trim();

        if (!input) {
            showToast("Please paste encrypted emojis to decrypt!", false);
            return;
        }

        try {
            // Split by spaces to get individual emojis
            const emojis = input.split(" ").filter(e => e.length > 0);
            let decryptedText = "";

            // Convert each emoji back to its character
            for (let emoji of emojis) {
                const emojiCode = emoji.codePointAt(0);
                // Reverse the encryption: subtract the offset
                const originalCharCode = emojiCode - 128000;
                decryptedText += String.fromCharCode(originalCharCode);
            }

            const resultDiv = document.querySelector("#result");

            if (decryptedText && decryptedText.length > 0) {
                resultDiv.innerHTML = `<button class="copy-btn" id="copy-btn">📋 Copy</button><div id="result-content" style="padding-top: 40px; word-wrap: break-word;">${decryptedText}</div>`;
                resultDiv.style.color = "#333";
                resultDiv.style.display = "block";
                showToast("Emojis decrypted successfully! ✅");
            } else {
                resultDiv.innerHTML = `<button class="copy-btn" id="copy-btn">📋 Copy</button><div id="result-content" style="padding-top: 40px;">Unable to decrypt - invalid emoji format!</div>`;
                resultDiv.style.color = "#ff6b6b";
                resultDiv.style.display = "block";
                showToast("Decryption failed - invalid emoji format!", false);
            }

            setupCopyButton();

        } catch (error) {
            console.error("Decryption error:", error);
            const resultDiv = document.querySelector("#result");
            resultDiv.innerHTML = `<button class="copy-btn" id="copy-btn">📋 Copy</button><div id="result-content" style="padding-top: 40px;">Error: Unable to decrypt the emojis!</div>`;
            resultDiv.style.color = "#ff6b6b";
            resultDiv.style.display = "block";
            showToast("Decryption error occurred!", false);
            setupCopyButton();
        }
    });
}

decryption();

// Copy to clipboard function - Only copies the content, not the button
function setupCopyButton() {
    const copyBtn = document.getElementById("copy-btn");
    if (copyBtn) {
        // Remove existing listeners by cloning
        const newCopyBtn = copyBtn.cloneNode(true);
        copyBtn.parentNode.replaceChild(newCopyBtn, copyBtn);

        newCopyBtn.addEventListener("click", function () {
            // Get only the content div by ID
            const contentDiv = document.getElementById("result-content");
            const textToCopy = contentDiv ? contentDiv.textContent.trim() : "";

            if (textToCopy) {
                navigator.clipboard.writeText(textToCopy).then(() => {
                    newCopyBtn.textContent = "✓ Copied!";
                    showToast("Copied to clipboard! 📋");
                    setTimeout(() => {
                        newCopyBtn.textContent = "📋 Copy";
                    }, 2000);
                }).catch(err => {
                    console.error("Copy failed:", err);
                    showToast("Failed to copy!", false);
                });
            }
        });
    }
}

// Clear buttons
document.getElementById("clear-enc").addEventListener("click", () => {
    txtmsg.value = "";
    encCounter.textContent = "0 characters";
    document.querySelector("#result").style.display = "none";
});

document.getElementById("clear-dec").addEventListener("click", () => {
    emojimsg.value = "";
    decCounter.textContent = "0 characters";
    document.querySelector("#result").style.display = "none";
});
