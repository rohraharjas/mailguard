const API_URL = `http://${CONFIG.API_IP}:${CONFIG.API_PORT}/predict`;


function waitForEmailBody(selector, timeout = 5000) {
    return new Promise((resolve, reject) => {
        const interval = 100;
        let elapsed = 0;
        const checkExist = setInterval(() => {
            const element = document.querySelector(selector);
            if (element) {
                clearInterval(checkExist);
                resolve(element);
            }
            elapsed += interval;
            if (elapsed >= timeout) {
                clearInterval(checkExist);
                reject("Email body not found in time");
            }
        }, interval);
    });
}

async function analyzeEmail() {
    try {
        const emailBodyElement = await waitForEmailBody("div.a3s.aiL"); // Gmail email content selector
        const emailText = emailBodyElement.innerText.trim();

        if (!emailText || emailText.length < 15) return;

        const response = await fetch(API_URL, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "X-Email-Text": emailText
            }
        });
        const result = await response.json();

        if (result.label.toLowerCase().includes("phishing")) {
            const warningBanner = document.createElement("div");
            warningBanner.textContent = "⚠️ Caution: This email may be a phishing attempt.";
            warningBanner.className = "phishing-warning-banner";
            emailBodyElement.prepend(warningBanner);
        }
    } catch (error) {
        console.error("Phishing detection error:", error);
    }
}

const observer = new MutationObserver(() => {
    analyzeEmail();
});

observer.observe(document.body, { childList: true, subtree: true });
