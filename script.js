document.addEventListener("DOMContentLoaded", function () {
  const INPUT_FIRST_LIST = document.getElementById("firstLaunchList");
  const INPUT_SECOND_LIST = document.getElementById("secondLaunchList");
  const INPUT_THIRD_LIST = document.getElementById("thirdLaunchList");
  const ROUND10_CHECKBOX = document.getElementById("round10Check");
  const SUBMIT_BUTTON = document.getElementById("submit");
  const FIRST_LAUNCH_SCORE_PARAGRAPH =
    document.getElementById("scoreFirstLaunch");
  const SECOND_LAUNCH_SCORE_PARAGRAPH =
    document.getElementById("scoreSecondLaunch");
  const SCORE_PARAGRAPH = document.getElementById("score");
  const SCORE_GIVEN_DIV = document.getElementById("scoreGiven");
  const DISPLAY_SCORE_DIV = document.getElementById("displayScore");

  let firstInputValid = false;
  let secondInputValid = false;
  let thirdInputValid = false;
  let substract;
  let round10CheckValid = false;
  let isRound10 = false;
  let score;
  let count = 0;
  let first = parseInt(INPUT_FIRST_LIST.value);
  let second = parseInt(INPUT_SECOND_LIST.value);
  let third = parseInt(INPUT_THIRD_LIST.value);

  function isLastInputValid(inputNumber) {
    switch (inputNumber) {
      case 2:
        if (INPUT_FIRST_LIST.value !== "") {
          firstInputValid = true;
        } else {
          firstInputValid = false;
        }
        break;
      case 3:
        if (
          INPUT_SECOND_LIST.value !== "" &&
          INPUT_SECOND_LIST.value !== "--Veuillez choisir un nombre de quille--"
        ) {
          console.log("test apaninan");
          secondInputValid = true;
        } else {
          secondInputValid = false;
        }
        break;
      case 4:
        if (ROUND10_CHECKBOX.checked === true) {
          round10CheckValid = true;
        } else {
          round10CheckValid = false;
        }
        break;
      case 5:
        if (
          INPUT_SECOND_LIST.value !== "" &&
          INPUT_SECOND_LIST.value !== "--Veuillez choisir un nombre de quille--"
        ) {
          thirdInputValid = true;
        } else {
          thirdInputValid = false;
        }
      default:
    }
  }

  function enableInput(inputNumber) {
    switch (inputNumber) {
      case 2:
        if (
          firstInputValid === true &&
          parseInt(INPUT_FIRST_LIST.value) !== 10 &&
          round10CheckValid === false
        ) {
          INPUT_SECOND_LIST.disabled = false; // 2eme input s'active
          // SUBMIT_BUTTON.disabled = true;

          if (secondInputValid) {
            console.log(INPUT_SECOND_LIST.value);
            SUBMIT_BUTTON.disabled = false;
          } else {
            SUBMIT_BUTTON.disabled = true;
          }
        } else if (firstInputValid === true && round10CheckValid === true) {
          console.log("2eme input");
          INPUT_SECOND_LIST.disabled = false; // 2eme input s'active (10eme manche)
        } else if (
          firstInputValid === true &&
          parseInt(INPUT_FIRST_LIST.value) === 10 &&
          round10CheckValid === false
        ) {
          INPUT_SECOND_LIST.disabled = true;
          SUBMIT_BUTTON.disabled = false; // 1er lancer strike donc le 2eme input s'active pas et le bouton s'active
        }
        break;
      case 3:
        if (
          (parseInt(INPUT_FIRST_LIST.value) === 10 ||
            parseInt(INPUT_SECOND_LIST.value) +
              parseInt(INPUT_FIRST_LIST.value) ===
              10) &&
          parseInt(INPUT_SECOND_LIST.value) !== 0 &&
          secondInputValid === true &&
          round10CheckValid === true
        ) {
          INPUT_THIRD_LIST.disabled = false;
        } else if (
          parseInt(INPUT_FIRST_LIST.value) +
            parseInt(INPUT_SECOND_LIST.value) !==
            10 &&
          secondInputValid === true &&
          round10CheckValid === true
        ) {
          INPUT_THIRD_LIST.disabled = true;
          SUBMIT_BUTTON.disabled = false;
        } else if (round10CheckValid === true) {
          INPUT_THIRD_LIST.disabled = true;
          SUBMIT_BUTTON.disabled = true;
        }
        break;
      case 4:
        if (thirdInputValid) {
          SUBMIT_BUTTON.disabled = false;
        } else {
          SUBMIT_BUTTON.disabled = true;
        }
      default:
    }
  }

  function addOptionsLaunch(inputNumber) {
    switch (inputNumber) {
      case 2:
        substract = 10 - parseInt(INPUT_FIRST_LIST.value);
        if (substract == 0 && round10CheckValid === false) {
          // Strike 1er lancer
        } else if (substract === 0 && round10CheckValid === true) {
          // Strike 1er lancer manche 10
          for (let i = 0; i <= 10; i++) {
            let opt = document.createElement("option");
            opt.value = i;
            if (i === 10) {
              opt.innerHTML = `${i} - Strike`;
            } else {
              opt.innerHTML = i;
            }
            INPUT_SECOND_LIST.appendChild(opt);
          }
        } else {
          // Pas strike
          for (let i = 0; i <= substract; i++) {
            let opt = document.createElement("option");
            opt.value = i;
            if (i === substract) {
              opt.innerHTML = `${i} - Spare`;
            } else {
              opt.innerHTML = i;
            }
            INPUT_SECOND_LIST.appendChild(opt);
          }
        }
        break;
      case 3:
        substract = 10 - parseInt(INPUT_SECOND_LIST.value);
        // Si on a fait un strike au premier lancer pour la 10eme manche
        if (
          parseInt(INPUT_FIRST_LIST.value) === 10 &&
          round10CheckValid === true &&
          parseInt(INPUT_SECOND_LIST.value) !== 0 &&
          secondInputValid === true &&
          parseInt(INPUT_SECOND_LIST.value) !== 10
        ) {
          console.log("Strike");

          for (let i = 0; i <= substract; i++) {
            let opt = document.createElement("option");
            opt.value = i;
            if (i === substract) {
              opt.innerHTML = `${i} - Spare`;
            } else {
              opt.innerHTML = i;
            }
            INPUT_THIRD_LIST.appendChild(opt);
          }
        } else if (
          (parseInt(INPUT_FIRST_LIST.value) === 10 &&
            parseInt(INPUT_SECOND_LIST.value) === 10) ||
          parseInt(INPUT_FIRST_LIST.value) +
            parseInt(INPUT_SECOND_LIST.value) ===
            10
        ) {
          for (let i = 0; i <= 10; i++) {
            let opt = document.createElement("option");
            opt.value = i;
            if (i === 10) {
              opt.innerHTML = `${i} - Strike`;
            } else {
              opt.innerHTML = i;
            }
            INPUT_THIRD_LIST.appendChild(opt);
          }
        }
        break;
      default:
    }
  }

  function clearOptionsInput(inputNumber) {
    switch (inputNumber) {
      case 2:
        INPUT_SECOND_LIST.innerHTML = "";
        let firstOption = document.createElement("option");
        firstOption.innerText = "--Veuillez choisir un nombre de quille--";
        INPUT_SECOND_LIST.appendChild(firstOption);
        break;
      case 3:
        INPUT_THIRD_LIST.innerHTML = "";
        let secondOption = document.createElement("option");
        secondOption.innerText = "--Veuillez choisir un nombre de quille--";
        INPUT_THIRD_LIST.appendChild(secondOption);
        break;
      default:
    }
  }

  function displayScore() {
    if ((count = 1)) {
      FIRST_LAUNCH_SCORE_PARAGRAPH.innerText = first;
      SECOND_LAUNCH_SCORE_PARAGRAPH.innerText = second;
      if (isRound10) {
        SCORE_GIVEN_DIV.innerHTML = `<p>${third}</p>`;
      }
    } else if (count <= 10 && isRound10 === false) {
      console.log("test affichage");
      DISPLAY_SCORE_DIV.innerHTML = `<div class="caseShowScore"><div class="scoreGiven2+"><p>${first}</p><p>${second}</p></div></div>`;
    } else if (count === 10 || isRound10 === true) {
      DISPLAY_SCORE_DIV.innerHTML = `<div class="caseShowScore"><div class="scoreGiven2+"><p>${first}</p><p>${second}</p><p>${third}</p></div></div>`;
    }
  }

  function calcScore() {
    first = parseInt(INPUT_FIRST_LIST.value);
    second = parseInt(INPUT_SECOND_LIST.value);
    third = parseInt(INPUT_THIRD_LIST.value);
  }

  function countSubmit() {
    count += 1;
  }

  ROUND10_CHECKBOX.addEventListener("click", function () {
    clearOptionsInput(2);
    clearOptionsInput(3);
    isLastInputValid(2);
    isLastInputValid(3);
    isLastInputValid(4);
    isLastInputValid(5);
    addOptionsLaunch(2);
    addOptionsLaunch(3);
    enableInput(2);
    enableInput(3);
    enableInput(4);
  });

  INPUT_FIRST_LIST.addEventListener("change", function () {
    clearOptionsInput(2);
    isLastInputValid(2);
    isLastInputValid(3);
    isLastInputValid(4);
    isLastInputValid(5);
    addOptionsLaunch(2);
    enableInput(2);
  });

  INPUT_SECOND_LIST.addEventListener("change", function () {
    clearOptionsInput(3);
    isLastInputValid(3);
    isLastInputValid(4);
    isLastInputValid(5);
    addOptionsLaunch(3);
    enableInput(2);
    enableInput(3);
  });

  INPUT_THIRD_LIST.addEventListener("change", function () {
    isLastInputValid(4);
    isLastInputValid(5);
    addOptionsLaunch(3);
    enableInput(4);
  });

  SUBMIT_BUTTON.addEventListener("click", function () {
    countSubmit();
    calcScore();
    displayScore();
  });
});
