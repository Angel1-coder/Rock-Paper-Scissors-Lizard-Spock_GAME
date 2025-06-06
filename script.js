document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".container"),
        userResult = document.querySelector(".user-result img"),
        cpuResult = document.querySelector(".cpu-result img"),
        result = document.querySelector(".result"),
        optionImages = document.querySelectorAll(".option-image"),
        backToMenuButton = document.getElementById("back-to-menu");

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
        const ruleBox = document.getElementById('rules-box');
        if (ruleBox) {
            const randomIndex = Math.floor(Math.random() * allRules.length);
            ruleBox.textContent = allRules[randomIndex];
        }
    }

    // Display a new rule every 5 seconds
    setInterval(displayRandomRule, 5000);
    displayRandomRule(); // Initial display

    optionImages.forEach((image, index) => {
        image.addEventListener("click", (e) => {
            image.classList.add("active");

            // Reset values
            userResult.src = cpuResult.src = "images/Rock.png";
            result.textContent = "Wait...";
            ruleBox.textContent = "";
            winnerImageElement.classList.remove("show");
            winnerImageElement.src = "";

            optionImages.forEach((image2, index2) => {
                index !== index2 && image2.classList.remove("active");
            });

            gameContainer.classList.add("start");

            setTimeout(() => {
                gameContainer.classList.remove("start");

                let imageSrc = e.target.querySelector("img").src;
                userResult.src = imageSrc;

                let randomNumber = Math.floor(Math.random() * 5);

                const cpuImages = [
                    "images/Rock.png",
                    "images/Paper.png",
                    "images/Scissors.png",
                    "images/Lizard.png",
                    "images/Spock.png"
                ];

                cpuResult.src = cpuImages[randomNumber];

                const values = ["R", "P", "T", "L", "S"];
                let cpuValue = values[randomNumber];
                let userValue = values[index];

                const outcomes = {
                    RR: "DRAW",
                    RP: "CPU",
                    RT: "YOU",
                    RL: "YOU",
                    RS: "CPU",
                    PR: "YOU",
                    PP: "DRAW",
                    PT: "CPU",
                    PL: "YOU",
                    PS: "YOU",
                    TR: "CPU",
                    TP: "YOU",
                    TT: "DRAW",
                    TL: "YOU",
                    TS: "CPU",
                    LR: "CPU",
                    LP: "CPU",
                    LT: "CPU",
                    LL: "DRAW",
                    LS: "YOU",
                    SR: "YOU",
                    SP: "CPU",
                    ST: "YOU",
                    SL: "CPU",
                    SS: "DRAW"
                };

                const outcomeValue = outcomes[userValue + cpuValue];

                if (userValue === cpuValue) {
                    result.textContent = "DRAW";
                    ruleBox.textContent = "";
                    winnerImageElement.classList.remove("show");
                    winnerImageElement.src = "";
                } else {
                    result.textContent = `${outcomeValue} WIN!!`;

                    const winner = outcomeValue === "YOU" ? userValue : cpuValue;
                    const loser = outcomeValue === "YOU" ? cpuValue : userValue;

                    const ruleText = rules[winner + loser] || "Rule not found";
                    ruleBox.textContent = ruleText;

                    // Display winner image
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

// Play background music when button is clicked
document.getElementById('sound-toggle').addEventListener('click', function () {
  const music = document.getElementById('background-music');
  music.play().then(() => {
    console.log("Music activated");
    this.textContent = "🔈 Playing...";
    this.disabled = true; // Optional: disable the button after activation
  }).catch(err => {
    console.error("Failed to play music:", err);
  });
});
