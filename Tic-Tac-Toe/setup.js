
const playerForm = document.querySelector("#player-form");
const player1Input = document.querySelector("#player1");
const player2Input = document.querySelector("#player2");
const formError = document.querySelector("#form-error");
const leaderboard = document.querySelector("#leaderboard");
const clearScoresBtn = document.querySelector("#clear-scores");

const PLAYERS_KEY = "ticTacToePlayers";
const ACTIVE_GAME_KEY = "ticTacToeActiveGame";

function getPlayers() {
    try {
        return JSON.parse(localStorage.getItem(PLAYERS_KEY)) || {};
    } catch {
        return {};
    }
}

function savePlayers(players) {
    localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
}

function getPlayerKey(name) {
    return name.trim().toLowerCase();
}

function renderLeaderboard() {
    const players = getPlayers();

    const sortedPlayers = Object.values(players).sort(
        (a, b) =>
            b.wins - a.wins ||
            b.draws - a.draws ||
            a.name.localeCompare(b.name)
    );

    leaderboard.replaceChildren();

    if (sortedPlayers.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-state";
        emptyMessage.textContent = "No matches yet. Start playing!";
        leaderboard.appendChild(emptyMessage);
        return;
    }

    sortedPlayers.forEach((player, index) => {
        const row = document.createElement("div");
        row.className = "leaderboard-row";

        const rank = document.createElement("span");
        rank.textContent = `#${index + 1}`;

        const details = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = player.name;

        const stats = document.createElement("small");
        stats.textContent =
            `${player.wins} wins · ${player.losses} losses · ` +
            `${player.draws} draws`;

        details.append(name, stats);

        const wins = document.createElement("strong");
        wins.textContent = `${player.wins} W`;

        row.append(rank, details, wins);
        leaderboard.appendChild(row);
    });
}

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name1 = player1Input.value.trim();
    const name2 = player2Input.value.trim();

    if (!name1 || !name2) {
        formError.textContent = "Please enter both player names.";
        return;
    }

    if (getPlayerKey(name1) === getPlayerKey(name2)) {
        formError.textContent = "Please enter two different names.";
        return;
    }

    const players = getPlayers();

    // Create records only for players who are new.
    for (const name of [name1, name2]) {
        const key = getPlayerKey(name);

        if (!players[key]) {
            players[key] = {
                name,
                wins: 0,
                losses: 0,
                draws: 0
            };
        }
    }

    savePlayers(players);

    localStorage.setItem(
        ACTIVE_GAME_KEY,
        JSON.stringify({
            player1: getPlayerKey(name1),
            player2: getPlayerKey(name2)
        })
    );

    window.location.href = "game.html";
});

clearScoresBtn.addEventListener("click", () => {
    const confirmed = window.confirm(
        "Reset every player's scores? Saved player names will remain."
    );

    if (!confirmed) return;

    const players = getPlayers();

    for (const player of Object.values(players)) {
        player.wins = 0;
        player.losses = 0;
        player.draws = 0;
    }

    savePlayers(players);
    renderLeaderboard();
});

renderLeaderboard();
