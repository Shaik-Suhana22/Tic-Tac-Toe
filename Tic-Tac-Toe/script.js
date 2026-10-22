
const PLAYERS_KEY = "ticTacToePlayers";
const ACTIVE_GAME_KEY = "ticTacToeActiveGame";

const boxes = document.querySelectorAll(".box");
const statusText = document.querySelector("#status");
const newRoundBtn = document.querySelector("#new-round");
const changePlayersBtn = document.querySelector("#change-players");

const player1Name = document.querySelector("#player1-name");
const player2Name = document.querySelector("#player2-name");
const player1Score = document.querySelector("#player1-score");
const player2Score = document.querySelector("#player2-score");
const player1Card = document.querySelector("#player1-card");
const player2Card = document.querySelector("#player2-card");
const matchScores = document.querySelector("#match-scores");

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

function readStorage(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
        return fallback;
    }
}

let players = readStorage(PLAYERS_KEY, {});
let activeGame = readStorage(ACTIVE_GAME_KEY, null);

if (
    !activeGame ||
    !players[activeGame.player1] ||
    !players[activeGame.player2]
) {
    window.location.replace("index.html");
} else {
    startApp();
}

function startApp() {
    const playerO = players[activeGame.player1];
    const playerX = players[activeGame.player2];

    let turnO = true;
    let gameOver = false;

    player1Name.textContent = playerO.name;
    player2Name.textContent = playerX.name;

    function saveScores() {
        localStorage.setItem(PLAYERS_KEY, JSON.stringify(players));
    }

    function renderScores() {
        player1Score.textContent =
            `Wins: ${playerO.wins} | Losses: ${playerO.losses} | Draws: ${playerO.draws}`;

        player2Score.textContent =
            `Wins: ${playerX.wins} | Losses: ${playerX.losses} | Draws: ${playerX.draws}`;

        matchScores.replaceChildren();

        for (const player of [playerO, playerX]) {
            const row = document.createElement("div");
            row.className = "leaderboard-row";

            const name = document.createElement("strong");
            name.textContent = player.name;

            const stats = document.createElement("span");
            stats.textContent =
                `${player.wins} wins · ${player.losses} losses · ${player.draws} draws`;

            row.append(name, stats);
            matchScores.appendChild(row);
        }
    }

    function updateTurnIndicator() {
        player1Card.classList.toggle("active", turnO && !gameOver);
        player2Card.classList.toggle("active", !turnO && !gameOver);
    }

    function disableBoxes() {
        boxes.forEach((box) => {
            box.disabled = true;
        });
    }

    function showWinner(symbol, pattern) {
        gameOver = true;

        const winner = symbol === "O" ? playerO : playerX;
        const loser = symbol === "O" ? playerX : playerO;

        winner.wins++;
        loser.losses++;

        pattern.forEach((index) => {
            boxes[index].classList.add("winning");
        });

        statusText.textContent = `🎉 ${winner.name} wins!`;
        disableBoxes();
        saveScores();
        renderScores();
        updateTurnIndicator();
    }

    function checkWinner() {
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;

            const value = boxes[a].textContent;

            if (
                value !== "" &&
                value === boxes[b].textContent &&
                value === boxes[c].textContent
            ) {
                showWinner(value, pattern);
                return;
            }
        }

        const isDraw = [...boxes].every(
            (box) => box.textContent !== ""
        );

        if (isDraw) {
            gameOver = true;
            playerO.draws++;
            playerX.draws++;

            statusText.textContent = "🤝 It's a draw!";
            disableBoxes();
            saveScores();
            renderScores();
            updateTurnIndicator();
            return;
        }

        statusText.textContent =
            `Your turn: ${turnO ? playerO.name + " (O)" : playerX.name + " (X)"}`;

        updateTurnIndicator();
    }

    boxes.forEach((box) => {
        box.addEventListener("click", () => {
            if (gameOver || box.textContent !== "") return;

            box.textContent = turnO ? "O" : "X";
            box.disabled = true;

            turnO = !turnO;
            checkWinner();
        });
    });

    function resetBoard() {
        turnO = true;
        gameOver = false;

        boxes.forEach((box) => {
            box.textContent = "";
            box.disabled = false;
            box.classList.remove("winning");
        });

        statusText.textContent = `Your turn: ${playerO.name} (O)`;
        updateTurnIndicator();
    }

    newRoundBtn.addEventListener("click", resetBoard);

    changePlayersBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    renderScores();
    resetBoard();
}
