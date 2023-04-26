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
        return {
            jediToggle: jediToggle,
            heroToggle: heroToggle
        }
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
        return {
            sithToggle: sithToggle,
            villainToggle: villainToggle
        }
    })();

    let characterSelectModule = (function () {
        let playerOne = {score: 0};
        let playerTwo = {score: 0};
        let playerComputer = {score: 0};
        const characters = {};
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
        const highlight =  ["border-2", "border-gold", "rounded"];

        characterButtons.forEach((button) => {
        let name, faction, morality, image;
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
                playerOne.characterSelected.button.classList.remove(...highlight);
                }
                playerOne.characterSelected = character;
                character.button.classList.add(...highlight);
                console.log(
                `Player One Character Selected: ${JSON.stringify(
                    playerOne.characterSelected
                )}`
                );
            } else {
                if (playerTwo.characterSelected) {
                playerTwo.characterSelected.button.classList.remove(...highlight);
                }
                playerTwo.characterSelected = character;
                character.button.classList.add(...highlight);
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

        return { playerOne, playerTwo, characters, highlight};                        
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
        let count = 0;

        function showGameBoard() {
        gameBoardSubContainer.classList.remove("hidden");
        characterSelectSubContainer.classList.add("hidden");
        }

        playButton.addEventListener("click", showGameBoard);

        let checkWinnerModule = (function () {
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

            function initiateWinState(playerOne, playerTwo, winner) {
                if (winner === "tie") {
                    tieWinner();
                } else {
                const winningPlayer = winner === "playerOne" ? playerOne : playerTwo;
                if (winningPlayer.characterSelected.morality === "good") {
                    winningPlayer.score += 1
                    goodWinner();
                } else if (winningPlayer.characterSelected.morality === "evil") {
                    winningPlayer.score += 1
                    evilWinner();
                }
                }
            }

            function tieWinner () {
                const tieImages = [
                    "./imgs/tie-one.jpg",
                    "./imgs/tie-two.jpg",
                    "./imgs/tie-three.jpg",
                ];   
                const randomImageIndex = Math.floor(Math.random() * tieImages.length);
                const tie = document.getElementById("tie");
                gameBoardSubContainer.classList.add("hidden");
                tie.classList.remove("hidden");      
                const img = document.createElement("img");
                img.src = tieImages[randomImageIndex];
                img.classList = "m-4 mt-2 max-h-screen w-auto border-4 border-transparent rounded-xl";
                tie.appendChild(img);
            }

            function goodWinner() {
                const goodWinImages = [
                    "./imgs/good-win-one.jpg",
                    "./imgs/good-win-two.jpg",
                    "./imgs/good-win-three.jpg",
                    ];  
                const randomImageIndex = Math.floor(Math.random() * goodWinImages.length);
                const goodWin = document.getElementById("good-win");
                gameBoardSubContainer.classList.add("hidden");
                goodWin.classList.remove("hidden");
                const img = document.createElement("img");
                img.src = goodWinImages[randomImageIndex];
                img.classList = "m-4 mt-2 max-h-screen w-auto border-4 border-transparent rounded-xl";
                goodWin.appendChild(img);
                
            }

            function evilWinner() {
                const evilWinImages = [
                    "./imgs/evil-win-one.jpg",
                    "./imgs/evil-win-two.jpg",
                    "./imgs/evil-win-three.jpg",
                ];   
                const randomImageIndex = Math.floor(Math.random() * evilWinImages.length);
                const evilWin = document.getElementById("evil-win");
                gameBoardSubContainer.classList.add("hidden");
                evilWin.classList.remove("hidden");
                const img = document.createElement("img");
                img.src = evilWinImages[randomImageIndex];
                img.classList = "m-4 mt-2 max-h-screen w-auto border-4 border-transparent rounded-xl";
                evilWin.appendChild(img);
            }

            function updateScoreBoard() {
                const goodScore = document.getElementById('good-score');
                const evilScore = document.getElementById('evil-score');
            
                goodScore.textContent = `light-side score: ${playerOne.score}`;
                evilScore.textContent = `dark-side score: ${playerTwo.score}`;
            }

            return {
                checkWinner: checkWinner,
                initiateWinState: initiateWinState,
                updateScoreBoard: updateScoreBoard,
            };
        })();

        let playerMovementModule = (function (checkWinner, initiateWinState, updateScoreBoard) {
            let winner;

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

            function initializePlayerMove({playerOne, playerTwo}, element) {            
                if (playerTurn === "playerOne") {
                    const img = document.createElement("img");
                    img.src = playerOne.characterSelected.image;
                    img.alt = playerOne.characterSelected.name;
                    img.className = ("character-image");
                    element.appendChild(img);
                    element.classList.remove("hover:bg-blue-900");
                    gameBoard[element.id] = "playerOne";
                    console.log(gameBoard);
                } else {
                    const img = document.createElement("img");
                    img.src = playerTwo.characterSelected.image;
                    img.alt = playerTwo.characterSelected.name;
                    img.className = ("character-image");
                    element.appendChild(img);
                    element.classList.remove("hover:bg-red-900");
                    gameBoard[element.id] = "playerTwo";
                    console.log(gameBoard);
                }
                count += 1;
            }

            (function addEventListenersToGrid() {
                gridElement.forEach((element) => {
                    element.addEventListener("click", () => {
                        initializePlayerMove({ playerOne, playerTwo }, element);
                        winner = checkWinner(gameBoard, count);            
                        if (winner) {
                            initiateWinState(playerOne, playerTwo, winner);
                            updateScoreBoard();
                        } else {
                            switchPlayerTurn();
                        }
                    });
                });
            })();
        })(checkWinnerModule.checkWinner, checkWinnerModule.initiateWinState, checkWinnerModule.updateScoreBoard,);
        return {
            gridElement:gridElement,
            playerTurn: playerTurn,
            gameBoardSubContainer:gameBoardSubContainer,
            characterSelectSubContainer:characterSelectSubContainer,
            gameBoard: gameBoard,
        };
    })(characterSelectModule.playerOne, characterSelectModule.playerTwo,);

    let resetModule = (function (gridElement, playerOne, playerTwo, characterSelectSubContainer, characters, highlight, sithToggle, jediToggle, gameBoard) {
        const resetButton = document.querySelectorAll(".reset-button");
        resetButton.forEach((element) => {
            element.addEventListener("click", reset);
        });
        
    
        function reset() {
            (function clearCharacterSelection () {
                characterSelectModule.playerOne.characterSelected.button.classList.remove(...highlight);
                characterSelectModule.playerTwo.characterSelected.button.classList.remove(...highlight);
                characterSelectModule.playerOne.characterSelected = characters.luke;
                characterSelectModule.playerTwo.characterSelected = characters.vader;
                characterSelectModule.playerOne.characterSelected.button.classList.add(...highlight);
                characterSelectModule.playerTwo.characterSelected.button.classList.add(...highlight);
                sithVillainToggleModule.sithToggle();
                jediHeroToggleModule.jediToggle();
                console.log(playerOne.characterSelected);
                console.log(playerTwo.characterSelected);
            })();
    
            (function clearGameBoard () {
                const characterImages = document.querySelectorAll('.character-image');
    
                for (let key in gameBoard) {
                    gameBoard[key] = '-';
                }
    
                characterImages.forEach((characterImage) => {
                    characterImage.parentElement.removeChild(characterImage);
                });

                gridElement.forEach((element) => {
                  element.classList.add("hover:bg-blue-900");
                  element.classList.remove("hover:bg-red-900");
                });
    
                playModule.playerTurn = "playerOne";
                console.log("Gameboard cleared.");
                console.log(playModule.gameBoard);
                console.log(playModule.playerTurn);
            })();
    
            (function showCharacterSelect () {
                const winScreens = document.querySelectorAll(".win-screen");
                winScreens.forEach((element) => {
                    element.classList.add("hidden");
                });
                characterSelectSubContainer.classList.remove("hidden");
                console.log("Character Selection Shown")
            })();
            console.log("Play Reset");
        }
    })(playModule.gridElement, characterSelectModule.playerOne, characterSelectModule.playerTwo, playModule.characterSelectSubContainer, characterSelectModule.characters, characterSelectModule.highlight, sithVillainToggleModule.sithToggle, jediHeroToggleModule.heroToggle, playModule.gameBoard);
    
});
