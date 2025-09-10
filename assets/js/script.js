document.addEventListener("DOMContentLoaded", () => {
    const gameContainer = document.querySelector(".container");
    const userResult = document.querySelector(".user-result img");
    const cpuResult = document.querySelector(".cpu-result img");
    const result = document.querySelector(".result");
    const optionImages = document.querySelectorAll(".option-image");
    const ruleBox = document.getElementById("rule-explanation");
    const winnerImageElement = document.getElementById("winner-image");
    const userScoreElement = document.getElementById("user-score");
    const cpuScoreElement = document.getElementById("cpu-score");
    
    // Score tracking system
    let userScore = 0;
    let cpuScore = 0;
    const maxScore = 5;

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

    let gameInProgress = false;

    optionImages.forEach((image, index) => {
        image.addEventListener("click", (e) => {
            // Prevent multiple clicks during game processing
            if (gameInProgress) {
                return;
            }
            
            gameInProgress = true;
            image.classList.add("active");

            userResult.src = cpuResult.src = "assets/images/Rock.png";
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
                    "assets/images/Rock.png",
                    "assets/images/Paper.png",
                    "assets/images/Scissors.png",
                    "assets/images/Lizard.png",
                    "assets/images/Spock.png"
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

                    // Update scores
                    if (outcome === "YOU") {
                        userScore++;
                        userScoreElement.textContent = userScore;
                    } else {
                        cpuScore++;
                        cpuScoreElement.textContent = cpuScore;
                    }

                    const winner = outcome === "YOU" ? userValue : cpuValue;
                    const loser = outcome === "YOU" ? cpuValue : userValue;

                    const ruleText = rules[winner + loser] || "Rule not found";
                    ruleBox.textContent = ruleText;

                    const winnerImageMap = {
                        R: "assets/images/Rockwin.png",
                        P: "assets/images/Paperwin.png",
                        T: "assets/images/Scissorswin.png",
                        L: "assets/images/Lizardwin.png",
                        S: "assets/images/Spockwin.png"
                    };

                    winnerImageElement.src = winnerImageMap[winner];
                    winnerImageElement.alt = `Winner is ${winner}`;

                    setTimeout(() => {
                        winnerImageElement.classList.add("show");
                    }, 100);
                    
                    // Check for game end
                    if (userScore >= maxScore || cpuScore >= maxScore) {
                        setTimeout(() => {
                            const gameWinner = userScore >= maxScore ? "You" : "Computer";
                            result.textContent = `🎉 ${gameWinner} wins the game! 🎉`;
                            ruleBox.textContent = `Final Score: You ${userScore} - ${cpuScore} Computer`;
                            
                            // Reset game
                            setTimeout(() => {
                                userScore = 0;
                                cpuScore = 0;
                                userScoreElement.textContent = "0";
                                cpuScoreElement.textContent = "0";
                                result.textContent = "¡¡START GAME!!";
                                ruleBox.textContent = "";
                                winnerImageElement.classList.remove("show");
                                winnerImageElement.src = "";
                            }, 3000);
                        }, 2000);
                    }
                }

                // Re-enable game after result
                gameInProgress = false;

            }, 2500);
        });
    });
});

// Background music toggle
document.getElementById('sound-toggle').addEventListener('click', function () {
    const music = document.getElementById('background-music');
    
    if (music.paused) {
        music.play().then(() => {
            console.log("Music activated");
            this.textContent = "🔈 Playing...";
        }).catch(err => {
            console.error("Failed to play music:", err);
        });
    } else {
        music.pause();
        this.textContent = "🔊 Activate Sound";
    }
});