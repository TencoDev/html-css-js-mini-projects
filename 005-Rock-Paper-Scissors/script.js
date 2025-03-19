// Function to randomly generate a choice for the computer
function getComputerChoice() {
    let random_number = Math.floor(Math.random() * 3);
    if (random_number === 0) {
        return "Rock";
    } else if (random_number === 1) {
        return "Paper";
    }
    return "Scissors";
}

// Function to set up event listeners and play the game
function playGame() {
    let human_score = 0;
    let computer_score = 0;

    function playRound(human_choice, computer_choice) {

        let winnerText = document.querySelector("#winnerText");
        let scoreBoard = document.querySelector(".scoreboard p");

        if (human_choice === "Rock" && computer_choice === "Scissors" ||
            human_choice === "Paper" && computer_choice === "Rock" ||
            human_choice === "Scissors" && computer_choice === "Paper") {
            winnerText.textContent = `You Won! Computer chose ${computer_choice}`;
            human_score += 1;
        } else if (human_choice === computer_choice) {
            winnerText.textContent = "It's a Draw!";
        } else {
            winnerText.textContent = `You Lost! Computer chose ${computer_choice}`;
            computer_score += 1;
        }

        scoreBoard.textContent = `Computer: ${computer_score} Human: ${human_score}`
        console.log(`Current Score - You: ${human_score}, Computer: ${computer_score}`);
    }

    
    let choice_text = document.querySelector("#playerChoice")

    let buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            let human_choice = button.textContent; // Get the button's text
            let computer_choice = getComputerChoice(); // Get computer's choice
            choice_text.textContent = human_choice
            playRound(human_choice, computer_choice); // Play a single round
        });
    });
}

// Start the game
playGame();