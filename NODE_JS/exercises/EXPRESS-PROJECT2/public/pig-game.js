"use strict";
document.addEventListener("DOMContentLoaded", function () {
  let activePlayer = 0;
  let gameOn = true;
  const coagulate = function (...[arr]) {
    let sum = 0;
    for (let i = 0; i < arr.length; i++) {
      sum += arr[i];
    }
    return sum;
  };

  const roller = document.querySelector(".roll-panel");
  const holder = document.querySelector(".hold-panel");
  const refresh = document.querySelector(".new-game-panel");
  let diceEl = document.querySelector(".dice-pic");
  const diceElFrame = document.querySelector(".dice-pic-frame");

  //        STATE VALUES
  let counter = document.querySelector(`.counter-value-${activePlayer}`);
  let score = document.querySelector(`.current-value-${activePlayer}`);

  const switchPlayerState = function () {
    document.querySelector(".player--0").classList.toggle("player-highlight");
    document.querySelector(".player--1").classList.toggle("player-highlight");
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore[activePlayer] = 0;
    score.textContent = 0;
  };
  //Hide dice animation
  diceElFrame.classList.remove("spinning-dice");

  //score storage

  let currentScore = [0, 0];
  let scoreStore = [0, 0];

  roller.addEventListener("click", function () {
    if (gameOn) {
      score = document.querySelector(`.current-value-${activePlayer}`);
      diceElFrame.classList.toggle("spinning-dice");
      const diceVal = Math.trunc(Math.random() * 6) + 1;
      diceEl.src = `/static/IMAGES/dice-${diceVal}.png`;
      score.textContent = diceVal;
      if (diceVal !== 1) {
        currentScore[activePlayer] += diceVal;
        score.textContent = currentScore[activePlayer];
      } else {
        currentScore[activePlayer] = 0;
        score.textContent = 0;
        //console.log(activePlayer);
        switchPlayerState();
      }
    }
  });

  holder.addEventListener("click", function () {
    if (gameOn) {
      counter = document.querySelector(`.counter-value-${activePlayer}`);
      scoreStore[activePlayer] += currentScore[activePlayer];
      counter.textContent = scoreStore[activePlayer];
      // console.log(scoreStore[activePlayer]);
      if (Number(counter.textContent) >= 60) {
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.add("winning-player");
        document
          .querySelector(`.player--${activePlayer}`)
          .classList.remove("player-highlight");
        document
          .querySelector(`.current-score-panel-${activePlayer}`)
          .classList.add("disappear");
        diceEl.classList.add("disappear");
        gameOn = false;
      } else {
        switchPlayerState();
      }
    }
  });

  refresh.addEventListener("click", function () {
    //RESET ALL THE GAME STATES
    gameOn = true;
    diceEl.classList.remove("disappear");
    document
      .querySelector(`.current-score-panel-${activePlayer}`)
      .classList.remove("disappear");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("winning-player");
    //document.querySelector(`.player--${activePlayer}`).classList.toggle('player-highlight');
    //document.querySelector('.player--0').classList.toggle('player-highlight');
    document.querySelector(".player--0").classList.add("player-highlight");
    document.querySelector(".player--1").classList.remove("player-highlight");
    document.querySelector(`.counter-value-1`).textContent = 0;
    document.querySelector(`.counter-value-0`).textContent = 0;
    document.querySelector(`.current-value-1`).textContent = 0;
    document.querySelector(`.current-value-0`).textContent = 0;
    currentScore = [0, 0];
    scoreStore = [0, 0];
    counter = document.querySelector(`.counter-value-${activePlayer}`);
    score = document.querySelector(`.current-value-${activePlayer}`);
    diceEl.src = `/static/IMAGES/dice-1.png`;
    score.textContent = 0;
    activePlayer = 0;
  });
});
