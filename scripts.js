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
    characterSelected: undefined,
  };

  let playerTwo = {
    characterSelected: undefined,
  };

  let playerComputer = {
    characterSelected: undefined,
  };

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
    const characterButtons = document.querySelectorAll(".character");
    const jediButtons = Array.from(document.querySelectorAll("#jedi-characters button"));
    const heroButtons = Array.from(document.querySelectorAll("#hero-characters button"));
    const sithButtons = Array.from(document.querySelectorAll("#sith-characters button"));
    const villainButtons = Array.from(document.querySelectorAll("#villain-characters button"));

    const characters = {};
    characterButtons.forEach((button) => {
        let name, faction, morality;
        if (jediButtons.includes(button)) {
            name = `${button.id}`;
            faction = "jedi";
            morality = "good";
        } else if (heroButtons.includes(button)) {
            name = `${button.id}`;
            faction = "hero";
            morality = "good";
        } else if (sithButtons.includes(button)) {
            name = `${button.id}`;
            faction = "sith";
            morality = "evil";
        } else if (villainButtons.includes(button)) {
            name = `${button.id}`;
            faction = "villain";
            morality = "evil";
        }
        characters[button.id] = {name, button, faction, morality};
        playerOne.characterSelected = characters.luke;
        playerTwo.characterSelected = characters.vader;
    });

    function assignCharacter(character) {
      if (character.morality === "good") {
        if (playerOne.characterSelected) {
            playerOne.characterSelected.button.classList.remove('border-2', 'border-gold', 'rounded');
        }
        playerOne.characterSelected = character;
        character.button.classList.add('border-2', 'border-gold', 'rounded');
        console.log(`Player One Character Selected: ${JSON.stringify(playerOne.characterSelected)}`)
      } else {
        if (playerTwo.characterSelected) {
            playerTwo.characterSelected.button.classList.remove('border-2', 'border-gold', 'rounded');
        }
        playerTwo.characterSelected = character;
        character.button.classList.add('border-2', 'border-gold', 'rounded');
        console.log(`Player Two Character Selected: ${JSON.stringify(playerTwo.characterSelected)}`)
      }
    }

    for (let character in characters) {
        characters[character].button.addEventListener("click", () => {
          assignCharacter(characters[character]);
        });
    }
    
    console.log(JSON.stringify(characters));
    console.log(`Player One Character: ${JSON.stringify(playerOne.characterSelected)}`);
    console.log(`Player Two Character: ${JSON.stringify(playerTwo.characterSelected)}`);
  })();
});
