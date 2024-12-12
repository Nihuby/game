let game = {
    doors: [0, 0, 0],
    selectedDoor: null,
    revealedDoor: null,
    finalChoice: null,
    win: false,
    stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
    },
};

function initializeGame() {
    game.doors = [0, 0, 0];
    game.doors[Math.floor(Math.random() * 3)] = 1;
    game.selectedDoor = null;
    game.revealedDoor = null;
    game.finalChoice = null;
    game.win = false;

    document.querySelectorAll(".content").forEach((content) => content.classList.add("hidden"));
    document.getElementById("message").textContent = "Choose a door to start!";
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("result-area").classList.add("hidden");
}

function chooseDoor(doorNumber) {
    if (game.selectedDoor !== null) return;

    game.selectedDoor = doorNumber;
    game.revealedDoor = [1, 2, 3].find((num) => num !== doorNumber && game.doors[num - 1] === 0);

    document.getElementById(`content${game.revealedDoor}`).classList.remove("hidden");
    document.getElementById(`result${game.revealedDoor}`).src = "static/goat.jpg";

    document.getElementById("message").textContent = `Door ${game.revealedDoor} has a goat. Do you want to stay or switch?`;
    document.getElementById("controls").classList.remove("hidden");
}

function makeFinalChoice(switchChoice) {
    game.finalChoice = switchChoice
        ? [1, 2, 3].find((num) => num !== game.selectedDoor && num !== game.revealedDoor)
        : game.selectedDoor;

    const win = game.doors[game.finalChoice - 1] === 1;
    game.win = win;

    for (let i = 1; i <= 3; i++) {
        document.getElementById(`content${i}`).classList.remove("hidden");
        document.getElementById(`result${i}`).src = game.doors[i - 1] === 1 ? "static/car.jpg" : "static/goat.jpg";
    }

    updateStats(win);

    document.getElementById("message").textContent = win
        ? "Congratulations! You won the car!"
        : "Sorry, you got a goat. Better luck next time!";
    document.getElementById("controls").classList.add("hidden");
    document.getElementById("result-area").classList.remove("hidden");
}

function updateStats(win) {
    game.stats.totalGames++;
    game.stats[win ? "wins" : "losses"]++;

    document.getElementById("total-games").textContent = game.stats.totalGames;
    document.getElementById("wins").textContent = game.stats.wins;
    document.getElementById("losses").textContent = game.stats.losses;
    document.getElementById("win-percentage").textContent = `${((game.stats.wins / game.stats.totalGames) * 100).toFixed(2)}%`;
}

function runSimulation() {
    const count = parseInt(document.getElementById("simulation-count").value, 10);
    let switchWins = 0;
    let stayWins = 0;

    for (let i = 0; i < count; i++) {
        const doors = [0, 0, 0];
        doors[Math.floor(Math.random() * 3)] = 1;

        const chosenDoor = Math.floor(Math.random() * 3);
        const revealedDoor = [0, 1, 2].find((num) => num !== chosenDoor && doors[num] === 0);
        const switchChoice = [0, 1, 2].find((num) => num !== chosenDoor && num !== revealedDoor);

        doors[switchChoice] === 1 ? switchWins++ : stayWins++;
    }

    document.getElementById("switch-wins").textContent = switchWins;
    document.getElementById("stay-wins").textContent = stayWins;
    document.getElementById("switch-win-percentage").textContent = `${((switchWins / count) * 100).toFixed(2)}%`;
    document.getElementById("stay-win-percentage").textContent = `${((stayWins / count) * 100).toFixed(2)}%`;
    document.getElementById("simulation-results").classList.remove("hidden");
}

function restartGame() {
    initializeGame();
}

initializeGame();
