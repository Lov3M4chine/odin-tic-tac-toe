document.addEventListener("DOMContentLoaded", function () {
// Variables used by most modules.
  const gameBoardSubContainer = document.getElementById(
    "gameboard-sub-container"
  );
  const characterSelectSubContainer = document.getElementById(
    "character-select-sub-container"
  );
  const gridElement = document.querySelectorAll(".grid-element");
  const playerOneTurn = document.getElementById("player-one-turn");
  const playerTwoTurn = document.getElementById("player-two-turn");
  const playState = {
    playerTurn: "playerOne",
    gameBoard: {
      A1: "-",
      A2: "-",
      A3: "-",
      B1: "-",
      B2: "-",
      B3: "-",
      C1: "-",
      C2: "-",
      C3: "-",
    },
    count: 0,
  };

// Module that assigns the playMode for future functionality. Not currently in use, but I would like to implement an AI play mode to play against a computer.
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

    return {
      getPlayMode: function () {
        return playMode;
      },
    };
  })();

// Modules that control the jedi/hero/sith/villain buttons on the character select screen.
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
      heroToggle: heroToggle,
    };
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
      villainToggle: villainToggle,
    };
  })();

// Module that controls character selection.
  let characterSelectModule = (function () {
    let playerOne = { score: 0 };
    let playerTwo = { score: 0 };
    let playerComputer = { score: 0 };
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
    const highlight = ["border-2", "border-gold", "rounded"];

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

    return { playerOne, playerTwo, characters, highlight };
  })();

// Module that controls identifying a winner. When invoked it creates a gameboard 
// array for each player with their moves, then compares those moves to the winning 
// combinations to see if they won. It then displays winner on win screen.This module is invoked later. 
  let winnerModule = (function () {
    const winCombinations = [
      ["A1", "A2", "A3"],
      ["B1", "B2", "B3"],
      ["C1", "C2", "C3"],
      ["A1", "B1", "C1"],
      ["A2", "B2", "C2"],
      ["A3", "B3", "C3"],
      ["A1", "B2", "C3"],
      ["A3", "B2", "C1"],
    ];

    function createGameBoardArrays() {
      const gameBoardArrayPlayerOne = [];
      const gameBoardArrayPlayerTwo = [];

      for (let key in playState.gameBoard) {
        if (playState.gameBoard[key] === "playerOne") {
          gameBoardArrayPlayerOne.push(key);
        } else if (playState.gameBoard[key] === "playerTwo") {
          gameBoardArrayPlayerTwo.push(key);
        }
      }

      return { gameBoardArrayPlayerOne, gameBoardArrayPlayerTwo };
    }

    function compareGameBoardArrays(
      gameBoardArrayPlayerOne,
      gameBoardArrayPlayerTwo
    ) {
      for (let combo of winCombinations) {
        if (combo.every((item) => gameBoardArrayPlayerOne.includes(item))) {
          return "playerOne";
        } else if (
          combo.every((item) => gameBoardArrayPlayerTwo.includes(item))
        ) {
          return "playerTwo";
        }
      }
      return null;
    }

    function checkWinner() {
      const { gameBoardArrayPlayerOne, gameBoardArrayPlayerTwo } =
        createGameBoardArrays();
      const winner = compareGameBoardArrays(
        gameBoardArrayPlayerOne,
        gameBoardArrayPlayerTwo
      );

      if (winner) {
        return winner;
      } else if (playState.count === 9) {
        return "tie";
      } else {
        return null;
      }
    }

    function initiateWinState(playerOne, playerTwo, winner) {
      if (winner === "tie") {
        tieWinner();
      } else {
        const winningPlayer = winner === "playerOne" ? playerOne : playerTwo;
        if (winningPlayer.characterSelected.morality === "good") {
          winningPlayer.score += 1;
          goodWinner();
        } else if (winningPlayer.characterSelected.morality === "evil") {
          winningPlayer.score += 1;
          evilWinner();
        }
      }
    }

    function displayWinner(id, imageSources, gameBoardSubContainer) {
      const randomImageIndex = Math.floor(Math.random() * imageSources.length);
      const targetElement = document.getElementById(id);
      gameBoardSubContainer.classList.add("hidden");
      targetElement.classList.remove("hidden");

      const img = document.createElement("img");
      img.src = imageSources[randomImageIndex];
      img.classList =
        "m-4 mt-2 max-h-screen w-auto border-4 border-transparent rounded-xl";
      targetElement.appendChild(img);
    }

    function tieWinner() {
      const tieImages = [
        "./imgs/tie-one.jpg",
        "./imgs/tie-two.jpg",
        "./imgs/tie-three.jpg",
      ];
      displayWinner("tie", tieImages, gameBoardSubContainer);
    }

    function goodWinner() {
      const goodWinImages = [
        "./imgs/good-win-one.jpg",
        "./imgs/good-win-two.jpg",
        "./imgs/good-win-three.jpg",
      ];
      displayWinner("good-win", goodWinImages, gameBoardSubContainer);
    }

    function evilWinner() {
      const evilWinImages = [
        "./imgs/evil-win-one.jpg",
        "./imgs/evil-win-two.jpg",
        "./imgs/evil-win-three.jpg",
      ];
      displayWinner("evil-win", evilWinImages, gameBoardSubContainer);
    }

    return {
      checkWinner: checkWinner,
      initiateWinState: initiateWinState,
    };
  })();

// Module responsible for initilizing play area, player movement, updating gameBoard, and invoking the winModule functions.
  let playModule = (function (playerOne, playerTwo) {
    const playButton = document.getElementById("play");
    function showGameBoard() {
      gameBoardSubContainer.classList.remove("hidden");
      characterSelectSubContainer.classList.add("hidden");
    }

    playButton.addEventListener("click", showGameBoard);

    let playerMovementModule = (function (checkWinner, initiateWinState) {
      function switchPlayerTurn() {
        if (playState.playerTurn === "playerOne") {
          playerOneTurn.classList.add("hidden");
          playerTwoTurn.classList.remove("hidden");
          gridElement.forEach((element) => {
            if (element.classList.contains("hover:bg-blue-900")) {
              element.classList.remove("hover:bg-blue-900");
              element.classList.add("hover:bg-red-900");
            }
          });
          playState.playerTurn = "playerTwo";
        } else {
          playerOneTurn.classList.remove("hidden");
          playerTwoTurn.classList.add("hidden");
          gridElement.forEach((element) => {
            if (element.classList.contains("hover:bg-red-900")) {
              element.classList.add("hover:bg-blue-900");
              element.classList.remove("hover:bg-red-900");
            }
          });
          playState.playerTurn = "playerOne";
        }
      }

      function initializePlayerMove({ playerOne, playerTwo }, element) {
        if (playState.playerTurn === "playerOne") {
          const img = document.createElement("img");
          img.src = playerOne.characterSelected.image;
          img.alt = playerOne.characterSelected.name;
          img.className = "character-image";
          element.appendChild(img);
          element.classList.remove("hover:bg-blue-900");
          playState.gameBoard[element.id] = "playerOne";
          console.log(playState.gameBoard);
        } else {
          const img = document.createElement("img");
          img.src = playerTwo.characterSelected.image;
          img.alt = playerTwo.characterSelected.name;
          img.className = "character-image";
          element.appendChild(img);
          element.classList.remove("hover:bg-red-900");
          playState.gameBoard[element.id] = "playerTwo";
          console.log(playState.gameBoard);
        }
        playState.count += 1;
      }

      function updateScoreBoard() {
        const goodScore = document.getElementById("good-score");
        const evilScore = document.getElementById("evil-score");
        goodScore.textContent = `light-side score: ${playerOne.score}`;
        evilScore.textContent = `dark-side score: ${playerTwo.score}`;
      }

      function initializeWinnerCheck() {
        const winner = checkWinner(playState.gameBoard, playState.count);
        if (winner) {
          initiateWinState(playerOne, playerTwo, winner);
          updateScoreBoard();
        } else {
          switchPlayerTurn();
        }
      }

      function gridElementClick() {
        initializePlayerMove({ playerOne, playerTwo }, this);
        initializeWinnerCheck();
        this.removeEventListener("click", gridElementClick);
      }

      function addEventListenersToGrid() {
        gridElement.forEach((element) => {
          element.addEventListener("click", gridElementClick);
        });
      }

      addEventListenersToGrid();

      return {
        addEventListenersToGrid,
      };
    })(winnerModule.checkWinner, winnerModule.initiateWinState);
    return {
      gridElement: gridElement,
      addEventListenersToGrid: playerMovementModule.addEventListenersToGrid,
    };
  })(characterSelectModule.playerOne, characterSelectModule.playerTwo);

// Module responsible for resetting the game but carrying the score over. 
  let resetModule = (function (
    gridElement,
    playerOne,
    playerTwo,
    characters,
    highlight,
    sithToggle,
    jediToggle,
    addEventListenersToGrid
  ) {
    const resetButton = document.querySelectorAll(".reset-button");
    resetButton.forEach((element) => {
      element.addEventListener("click", reset);
    });

    function reset() {
      (function clearCharacterSelection() {
        characterSelectModule.playerOne.characterSelected.button.classList.remove(
          ...highlight
        );
        characterSelectModule.playerTwo.characterSelected.button.classList.remove(
          ...highlight
        );
        characterSelectModule.playerOne.characterSelected = characters.luke;
        characterSelectModule.playerTwo.characterSelected = characters.vader;
        characterSelectModule.playerOne.characterSelected.button.classList.add(
          ...highlight
        );
        characterSelectModule.playerTwo.characterSelected.button.classList.add(
          ...highlight
        );
        sithToggle();
        jediToggle();
        console.log(playerOne.characterSelected);
        console.log(playerTwo.characterSelected);
      })();

      (function clearGameBoard(playState) {
        const characterImages = document.querySelectorAll(".character-image");

        for (let key in playState.gameBoard) {
          playState.gameBoard[key] = "-";
        }

        characterImages.forEach((characterImage) => {
          characterImage.parentElement.removeChild(characterImage);
        });

        gridElement.forEach((element) => {
          element.classList.add("hover:bg-blue-900");
          element.classList.remove("hover:bg-red-900");
        });

        playState.playerTurn = "playerOne";
        playerOneTurn.classList.remove("hidden");
        playerTwoTurn.classList.add("hidden");
        addEventListenersToGrid();
        playState.count = 0;

        console.log("Gameboard cleared.");
        console.log(playState.gameBoard);
        console.log(playState.playerTurn);
      })(playState);

      (function showCharacterSelect() {
        const winScreens = document.querySelectorAll(".win-screen");

        winScreens.forEach((element) => {
          element.classList.add("hidden");
        });

        const winScreenImgs = document.querySelectorAll(".win-screen img");
        winScreenImgs.forEach((imgElement) => {
          imgElement.remove();
        });

        characterSelectSubContainer.classList.remove("hidden");
        console.log("Character Selection Shown");
      })();
      console.log("Play Reset");
    }
  })(
    playModule.gridElement,
    characterSelectModule.playerOne,
    characterSelectModule.playerTwo,
    characterSelectModule.characters,
    characterSelectModule.highlight,
    sithVillainToggleModule.sithToggle,
    jediHeroToggleModule.jediToggle,
    playModule.addEventListenersToGrid
  );
});
