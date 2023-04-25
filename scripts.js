// Player
// -score
// -character selection
// -moves made

// Computer Player
// -Copy of Player
// -AI

// Gameboard
// -grid tiles

// Gamestate
// -score
// -moves made
// -who's turn it is

document.addEventListener("DOMContentLoaded", function () {
    let assignPlayModeModule = (function () {
        let playerVsPlayerButton = document.getElementById("player-vs-player");
        let playerVsComputerButton = document.getElementById("player-vs-computer");
        let playMode = "playerVsPlayer";

        function setPlayMode() {
        if (playerVsComputerButton.classList.contains("hidden")) {
            playMode = "playerVsComputer";
            playerVsComputerButton.classList.remove("hidden");
            playerVsPlayerButton.classList.add("hidden");
            console.log(`Play mode set to player vs computer`);
        } else {
            playMode = "playerVsPlayer";
            playerVsPlayerButton.classList.remove("hidden");
            playerVsComputerButton.classList.add("hidden");
            console.log(`Play mode set to player vs player`);
        }
        }

        playerVsPlayerButton.addEventListener("click", setPlayMode);
        playerVsComputerButton.addEventListener("click", setPlayMode);
        return {
        getPlayMode: function () {
            return playMode;
        },
        };
    })();

    let jediHeroToggleModule = (function () {
        let jediButton = document.getElementById("jedi");
        let heroButton = document.getElementById("heroes");
        let jediCharacters = document.getElementById("jedi-characters");
        let heroCharacters = document.getElementById("hero-characters");

        function jediToggle() {
        jediCharacters.classList.remove("hidden");
        heroCharacters.classList.add("hidden");
        heroButton.classList.remove("border-gold");
        jediButton.classList.add("border-gold");
        }
        function heroToggle() {
        jediCharacters.classList.add("hidden");
        heroCharacters.classList.remove("hidden");
        jediButton.classList.remove("border-gold");
        heroButton.classList.add("border-gold");
        }

        jediButton.addEventListener("click", jediToggle);
        heroButton.addEventListener("click", heroToggle);
    })();

    let sithVillainToggleModule = (function () {
        let sithButton = document.getElementById("sith");
        let villainButton = document.getElementById("villains");
        let sithCharacters = document.getElementById("sith-characters");
        let villainCharacters = document.getElementById("villain-characters");

        function sithToggle() {
        sithCharacters.classList.remove("hidden");
        villainCharacters.classList.add("hidden");
        sithButton.classList.add("border-gold");
        villainButton.classList.remove("border-gold");
        }
        function villainToggle() {
        sithCharacters.classList.add("hidden");
        villainCharacters.classList.remove("hidden");
        sithButton.classList.remove("border-gold");
        villainButton.classList.add("border-gold");
        }

        sithButton.addEventListener("click", sithToggle);
        villainButton.addEventListener("click", villainToggle);
    })();

    let characterSelectModule = (function () {
        let playerOne = {};
        let playerTwo = {};
        let playerComputer = {};

        const characterButtons = document.querySelectorAll(".character");
        const jediButtons = Array.from(
        document.querySelectorAll("#jedi-characters button")
        );
        const heroButtons = Array.from(
        document.querySelectorAll("#hero-characters button")
        );
        const sithButtons = Array.from(
        document.querySelectorAll("#sith-characters button")
        );
        const villainButtons = Array.from(
        document.querySelectorAll("#villain-characters button")
        );

        const characters = {};
        characterButtons.forEach((button) => {
        let name, faction, morality;
        if (jediButtons.includes(button)) {
            name = `${button.id}`;
            faction = "jedi";
            morality = "good";
            image = `./imgs/${button.id}.png`;
        } else if (heroButtons.includes(button)) {
            name = `${button.id}`;
            faction = "hero";
            morality = "good";
            image = `./imgs/${button.id}.png`;
        } else if (sithButtons.includes(button)) {
            name = `${button.id}`;
            faction = "sith";
            morality = "evil";
            image = `./imgs/${button.id}.png`;
        } else if (villainButtons.includes(button)) {
            name = `${button.id}`;
            faction = "villain";
            morality = "evil";
            image = `./imgs/${button.id}.png`;
        }
        characters[button.id] = { name, button, faction, morality, image };
        });

        playerOne.characterSelected = characters.luke;
        playerTwo.characterSelected = characters.vader;

        function assignCharacter(character) {
        if (character.morality === "good") {
            if (playerOne.characterSelected) {
            playerOne.characterSelected.button.classList.remove(
                "border-2",
                "border-gold",
                "rounded"
            );
            }
            playerOne.characterSelected = character;
            character.button.classList.add("border-2", "border-gold", "rounded");
            console.log(
            `Player One Character Selected: ${JSON.stringify(
                playerOne.characterSelected
            )}`
            );
        } else {
            if (playerTwo.characterSelected) {
            playerTwo.characterSelected.button.classList.remove(
                "border-2",
                "border-gold",
                "rounded"
            );
            }
            playerTwo.characterSelected = character;
            character.button.classList.add("border-2", "border-gold", "rounded");
            console.log(
            `Player Two Character Selected: ${JSON.stringify(
                playerTwo.characterSelected
            )}`
            );
        }
        }

        for (let character in characters) {
        characters[character].button.addEventListener("click", () => {
            assignCharacter(characters[character]);
        });
        }

        console.log(JSON.stringify(characters));
        console.log(
        `Player One Character: ${JSON.stringify(playerOne.characterSelected)}`
        );
        console.log(
        `Player Two Character: ${JSON.stringify(playerTwo.characterSelected)}`
        );

        return { playerOne, playerTwo };                        
    })();

    let playModule = (function (playerOne, playerTwo) {
        const playButton = document.getElementById("play");
        const gameBoardSubContainer = document.getElementById(
        "gameboard-sub-container"
        );
        const characterSelectSubContainer = document.getElementById(
        "character-select-sub-container"
        );
        const playerOneTurn = document.getElementById("player-one-turn");
        const playerTwoTurn = document.getElementById("player-two-turn");
        const gridElement = document.querySelectorAll(".grid-element");
        let playerTurn = "playerOne";
        const gameBoard = {
            A1: '-', A2: '-', A3: '-',
            B1: '-', B2: '-', B3: '-',
            C1: '-', C2: '-', C3: '-'
        };

        function showGameBoard() {
        gameBoardSubContainer.classList.remove("hidden");
        characterSelectSubContainer.classList.add("hidden");
        }

        playButton.addEventListener("click", showGameBoard);

        function switchPlayerTurn() {
            if (playerTurn === "playerOne") {
                playerOneTurn.classList.add("hidden");
                playerTwoTurn.classList.remove("hidden");
                gridElement.forEach((element) => {
                    if (element.classList.contains("hover:bg-blue-900")) {
                        element.classList.remove("hover:bg-blue-900");
                        element.classList.add("hover:bg-red-900");
                    }
                });
                playerTurn = "playerTwo";
            } else {
                playerOneTurn.classList.remove("hidden");
                playerTwoTurn.classList.add("hidden");
                gridElement.forEach((element) => {
                    if (element.classList.contains("hover:bg-red-900")) {
                        element.classList.add("hover:bg-blue-900");
                        element.classList.remove("hover:bg-red-900");
                    }
                });
                playerTurn = "playerOne";
            }
        }

        let count = 0;

        function addPlayerMove({ playerOne, playerTwo }, element) {
            const elementID = element.id;
        
            if (playerTurn === "playerOne") {
                const img = document.createElement("img");
                img.src = playerOne.characterSelected.image;
                img.alt = playerOne.characterSelected.name;
                element.appendChild(img);
                element.classList.remove("hover:bg-blue-900");
                gameBoard[elementID] = "playerOne";
                console.log(gameBoard);
            } else {
                const img = document.createElement("img");
                img.src = playerTwo.characterSelected.image;
                img.alt = playerTwo.characterSelected.name;
                element.appendChild(img);
                element.classList.remove("hover:bg-red-900");
                gameBoard[elementID] = "playerTwo";
                console.log(gameBoard);
            }
            return count += 1;
        }

        gridElement.forEach((element) => {
            element.addEventListener("click", () => {
                let winner;
                addPlayerMove({ playerOne, playerTwo }, element);
                winner = checkWinner(gameBoard, count);
        
                if (winner) {
                    initiateWinState(playerOne, playerTwo, winner, gameBoardSubContainer);
                } else {
                    switchPlayerTurn();
                }
            });
        });

        function checkWinner(gameBoard, count) {
            const winCombinations = [
            ["A1", "A2", "A3"],
            ["B1", "B2", "B3"],
            ["C1", "C2", "C3"],
            ["A1", "B1", "C1"],
            ["A2", "B2", "C2"],
            ["A3", "B3", "C3"],
            ["A1", "B2", "C3"],
            ["A3", "B2", "C1"]
            ];
        
            for (let combination of winCombinations) {
                if (
                    gameBoard[combination[0]] !== "-" &&
                    gameBoard[combination[0]] === gameBoard[combination[1]] &&
                    gameBoard[combination[0]] === gameBoard[combination[2]]
                ) { 
                    return gameBoard[combination[0]];
                }
            }
    
            if (count === 9) {
                return "tie";
            }
    
            return null;
        }

        function initiateWinState(playerOne, playerTwo, winner, gameBoardSubContainer) {
            if (winner === "tie") {
              gameBoardSubContainer.classList.add("hidden");
            } else {
              const winningPlayer = winner === "playerOne" ? playerOne : playerTwo;           
              if (winningPlayer.characterSelected.morality === "good") {
                gameBoardSubContainer.classList.add("hidden");
              } else if (winningPlayer.characterSelected.morality === "evil") {
                gameBoardSubContainer.classList.add("hidden");
              }
            }
        }
    })(characterSelectModule.playerOne, characterSelectModule.playerTwo);
});
