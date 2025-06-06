document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".container");
    const userResult = document.querySelector(".user-result img");
    const cpuResult = document.querySelector(".cpu-result img");
    const result = document.querySelector(".result");
    const optionImages = document.querySelectorAll(".option-image");
    const ruleBox = document.getElementById("rule-explanation");
    const winnerImageElement = document.getElementById("winner-image");

    const rules = {
        RT: "Rock crushes Scissors",
        RL: "Rock crushes Lizard",
        PR: "Paper covers Rock",
        PS: "Paper disproves Spock",
        TP: "Scissors cuts Paper",
        TL: "Scissors decapitates Lizard",
        LP: "Lizard eats Paper",
        LS: "Lizard poisons Spock",
        SR: "Spock vaporizes Rock",
        ST: "Spock smashes Scissors"
    };

    const allRules = Object.values(rules);

    function displayRandomRule() {
        const ruleDisplay = document.getElementById('rules-box');
        if (ruleDisplay) {
            const randomIndex = Math.floor(Math.random() * allRules.length);
            ruleDisplay.textContent = allRules[randomIndex];
        }
    }

    // Show new rule every 5 seconds
    setInterval(displayRandomRule, 5000);
    displayRandomRule();

    optionImages.forEach((image, index) => {
        image.addEventListener("click", (e) => {
            image.classList.add("active");

            userResult.src = cpuResult.src = "images/Rock.png";
            result.textContent = "Wait...";
            ruleBox.textContent = "";
            winnerImageElement.classList.remove("show");
            winnerImageElement.src = "";

            optionImages.forEach((img, i) => {
                if (i !== index) img.classList.remove("active");
            });

            gameContainer.classList.add("start");

            setTimeout(() => {
                gameContainer.classList.remove("start");

                const userChoiceImg = e.target.querySelector("img").src;
                userResult.src = userChoiceImg;

                const randomNumber = Math.floor(Math.random() * 5);
                const cpuImages = [
                    "images/Rock.png",
                    "images/Paper.png",
                    "images/Scissors.png",
                    "images/Lizard.png",
                    "images/Spock.png"
                ];
                cpuResult.src = cpuImages[randomNumber];

                const values = ["R", "P", "T", "L", "S"];
                const userValue = values[index];
                const cpuValue = values[randomNumber];

                const outcomes = {
    RR: "DRAW", RP: "CPU", RT: "YOU", RL: "YOU", RS: "CPU",
    PR: "YOU", PP: "DRAW", PT: "CPU", PL: "CPU", PS: "YOU",
    TR: "CPU", TP: "YOU", TT: "DRAW", TL: "YOU", TS: "CPU",
    LR: "CPU", LP: "YOU", LT: "CPU", LL: "DRAW", LS: "YOU",
    SR: "YOU", SP: "CPU", ST: "YOU", SL: "CPU", SS: "DRAW"
};

                const outcome = outcomes[userValue + cpuValue];

                if (outcome === "DRAW") {
                    result.textContent = "DRAW";
                    ruleBox.textContent = "";
                    winnerImageElement.classList.remove("show");
                    winnerImageElement.src = "";
                } else {
                    result.textContent = `${outcome} WIN!!`;

                    const winner = outcome === "YOU" ? userValue : cpuValue;
                    const loser = outcome === "YOU" ? cpuValue : userValue;

                    const ruleText = rules[winner + loser] || "Rule not found";
                    ruleBox.textContent = ruleText;

                    const winnerImageMap = {
                        R: "images/Rockwin.png",
                        P: "images/Paperwin.png",
                        T: "images/Scissorswin.png",
                        L: "images/Lizardwin.png",
                        S: "images/Spockwin.png"
                    };

                    winnerImageElement.src = winnerImageMap[winner];
                    winnerImageElement.alt = `Winner is ${winner}`;

                    setTimeout(() => {
                        winnerImageElement.classList.add("show");
                    }, 100);
                }

            }, 2500);
        });
    });
});

// Background music toggle
document.getElementById('sound-toggle').addEventListener('click', function () {
    const music = document.getElementById('background-music');
    music.play().then(() => {
        console.log("Music activated");
        this.textContent = "🔈 Playing...";
        this.disabled = true;
    }).catch(err => {
        console.error("Failed to play music:", err);
    });
});