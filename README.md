# Tic-Tac-Toe

A two-player Tic-Tac-Toe game built with HTML, CSS, and vanilla JavaScript. Enter player names, play locally in the browser, and keep a leaderboard of wins, losses, and draws.

## Features

- Two-player gameplay on a classic 3 × 3 board
- Player O goes first; turns alternate between O and X
- Automatic win and draw detection, with winning squares highlighted
- Play another round or change players at any time
- Persistent player records and a leaderboard, saved in the browser
- Reset scores without deleting saved player names
- Responsive layout for desktop and mobile screens

## Getting started

No dependencies, build tools, or account are required.

1. Download or clone this repository.
2. Open `index.html` in a modern web browser.
3. Enter two different player names and select **Start Game**.

For local development, you can also serve the project files with any static web server and open the local address it provides.

## How to play

Players take turns placing their symbol in an empty square. The first player to make a line of three symbols horizontally, vertically, or diagonally wins. If all nine squares are filled without a winning line, the round ends in a draw.

Use **Play Again** to start a new round with the same players, or **Change Players** to return to the player and leaderboard screen.

## Scores and saved data

Player names and records are stored in your browser's `localStorage`. The leaderboard is sorted by wins, then draws, then player name. Records are local to the browser and device where you play; they are not shared or synchronized online.

Select **Reset All Scores** on the player screen to clear wins, losses, and draws for every saved player. Player names are kept.

## Project files

| File | Purpose |
| --- | --- |
| `index.html` | Player-name form and leaderboard |
| `game.html` | Game board, player cards, and round controls |
| `setup.js` | Player setup, leaderboard rendering, and score reset |
| `script.js` | Turn handling, win/draw detection, and match statistics |
| `style.css` | Shared styling and responsive layout |

## Built with

- HTML
- CSS
- Vanilla JavaScript
