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
  let playerOne = {
    score: undefined,
    characterSelected: undefined,
  };

  let playerTwo = {
    score: undefined,
    characterSelected: undefined,
  };

  let assignPlayModeModule = (function() {
    let playerVsPlayerButton = document.getElementById("player-vs-player");
    let playerVsComputerButton = document.getElementById("player-vs-computer");
    let playMode = "playerVsPlayer";

    function setPlayMode() {
      if (playerVsComputerButton.classList.contains("hidden")) {
        playMode = "playerVsComputer";
        playerVsComputerButton.classList.remove("hidden");
        playerVsPlayerButton.classList.add("hidden");
        console.log(`Play mode set to player vs computer`)
      } else {
        playMode = "playerVsPlayer";
        playerVsPlayerButton.classList.remove("hidden");
        playerVsComputerButton.classList.add("hidden");
        console.log(`Play mode set to player vs player`)
      }
    }

    playerVsPlayerButton.addEventListener("click", setPlayMode);
    playerVsComputerButton.addEventListener("click", setPlayMode);
  })();

  let jediHeroToggleModule = (function () {
    let jediButton = document.getElementById("jedi");
    let heroButton = document.getElementById("heroes");
    let jediCharacters = document.getElementById("jedi-characters");
    let heroCharacters = document.getElementById("hero-characters");

    function jediToggle() {
      if (jediCharacters.classList.contains("hidden")) {
        jediCharacters.classList.remove("hidden");
      }
      if (!heroCharacters.classList.contains("hidden")) {
        heroCharacters.classList.add("hidden");
      }
    }
    function heroToggle() {
      if (!jediCharacters.classList.contains("hidden")) {
        jediCharacters.classList.add("hidden");
      }
      if (heroCharacters.classList.contains("hidden")) {
        heroCharacters.classList.remove("hidden");
      }
    }

    jediButton.addEventListener("click", jediToggle);
    heroButton.addEventListener("click", heroToggle);

    return;
  })();

  let sithVillainToggleModule = (function () {
    let sithButton = document.getElementById("sith");
    let villainButton = document.getElementById("villains");
    let sithCharacters = document.getElementById("sith-characters");
    let villainCharacters = document.getElementById("villain-characters");

    function sithToggle() {
      sithCharacters.classList.remove("hidden");
      villainCharacters.classList.add("hidden");
    }
    function villainToggle() {
      sithCharacters.classList.add("hidden");
      villainCharacters.classList.remove("hidden");
    }

    sithButton.addEventListener("click", sithToggle);
    villainButton.addEventListener("click", villainToggle);
  })();

  let characterSelectModule = (function() {
    const jediButtons = document.querySelectorAll('#jedi-characters button');
    const heroButtons = document.querySelectorAll('#hero-characters button');
    const sithButtons = document.querySelectorAll('#sith-characters button');
    const villainButtons = document.querySelectorAll('#villain-characters button');

    const jediCharacters = {};
    jediButtons.forEach(button => {
        jediCharacters[button.id] = button;
    });

    const heroCharacters = {};
    heroButtons.forEach(button => {
        heroCharacters[button.id] = button;
    });

    const sithCharacters = {};
    sithButtons.forEach(button => {
        sithCharacters[button.id] = button;
    });

    const villainCharacters = {};
    villainButtons.forEach(button => {
        villainCharacters[button.id] = button;
    });

    let evilCharacters = {
        maul: document.getElementById("maul"),
        dooku: document.getElementById("dooku"),
        sideous: document.getElementById("sideous"),
        vader: document.getElementById("vader"),
        boba: document.getElementById("boba"),
        grievous: document.getElementById("grievous"),
        stormtrooper: document.getElementById("stormtrooper"),
        tarkin: document.getElementById("tarkin")
    }

    function assignCharacter (character) {
        if (character in jediCharacters || character in heroCharacters) {
            playerOne.characterSelected = character;
        } else {
            playerTwo.characterSelected = character;
        }
        console.log(`Player One: ${playerOne.characterSelected}`)
        console.log(`Player Two: ${playerTwo.characterSelected}`)
    }

    for (let character in jediCharacters) {
        jediCharacters[character].addEventListener("click", () => assignCharacter(character))
    }

    for (let character in heroCharacters) {
        heroCharacters[character].addEventListener("click", () => assignCharacter(character))
    }

    for (let character in sithCharacters) {
        sithCharacters[character].addEventListener("click", () => assignCharacter(character))
    }

    for (let character in villainCharacters) {
        villainCharacters[character].addEventListener("click", () => assignCharacter(character))
    }

  })();
});
