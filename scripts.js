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
      } else {
        playMode = "playerVsPlayer";
        playerVsPlayerButton.classList.remove("hidden");
        playerVsComputerButton.classList.add("hidden");
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
    let goodCharacters = {
        luke: document.getElementById("luke"),
        anakin: document.getElementById("anakin"),
        ben: document.getElementById("ben"),
        ahsoka: document.getElementById("ahsoka"),
        chewy: document.getElementById("chewy"),
        ewoks: document.getElementById("ewoks"),
        r2: document.getElementById("r2"),
        solo: document.getElementById("solo"),

      };

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

    function assignGoodCharacter(character) {
        playerOne.characterSelected = character;
        console.log(playerOne.characterSelected)
    }

    function assignEvilCharacter(character) {
        playerTwo.characterSelected = character;
        console.log(playerTwo.characterSelected);
    }

    for (let key in goodCharacters) {
        goodCharacters[key].addEventListener("click", () => assignGoodCharacter(key));
    }
    for (let key in evilCharacters) {
        evilCharacters[key].addEventListener("click", () => assignEvilCharacter(key))
    }


  })
});
