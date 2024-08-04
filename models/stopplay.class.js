/**
 * Class responsible for handling the game's pause functionality.
 *
 * @class
 */
class GamePause {
    /**
     * Creates an instance of GamePause.
     * Initializes the state of the pause icon and pause status.
     */
    constructor() {
      /** @type {boolean} Indicates whether the pause icon has been checked. */
      this.checkPlayIcon = false;
  
      /** @type {HTMLElement|null} The pause icon element. */
      this.pauseIcon = null;
  
      /** @type {boolean} Indicates whether the game is paused. */
      this.isPauseOn = false;
    }
  
    /**
     * Sets up the pause icon if it has not been set up already.
     * Adds the pause icon to the DOM and sets up the event listener for toggling pause.
     */
    playGameParameter() {
      if (!this.checkPlayIcon) {
        this.pauseIcon = document.getElementById('pauseButton');
        if (!this.pauseIcon) {
          this.pauseIcon = document.createElement('img');
          const div = document.getElementById('maindiv');
          this.pauseIcon.src = 'img/game_pause/pause.png';
          this.pauseIcon.className = 'pause-icon';
          this.pauseIcon.id = 'pauseButton';
          this.pauseIcon.addEventListener('click', () => this.gamePause());
          div.appendChild(this.pauseIcon);
        }
        this.checkPlayIcon = true;
      }
    }
  
    /**
     * Toggles the game pause status.
     * Updates the pause icon and shows/hides pause and continue titles accordingly.
     */
    gamePause() {
      this.isPauseOn = !this.isPauseOn;
      if (this.isPauseOn) {
        this.pauseIcon.src = 'img/game_pause/play.png';
        this.showPauseTitel();
      } else {
        this.pauseIcon.src = 'img/game_pause/pause.png';
        this.removeTitle();
        this.showContinueTitle();
        if (checkSound) {
          background_Melody.play();
        }
      }
    }
  
    /**
     * Removes the pause icon if the game is not paused.
     */
    removeIcon() {
      if (!this.isPauseOn && this.pauseIcon) {
        this.pauseIcon.remove();
        this.checkPlayIcon = false;
      }
    }
  
    /**
     * Shows the pause title on the screen.
     */
    showPauseTitel() {
      let title = document.createElement('p');
      const div = document.getElementById('maindiv');
      title.className = 'pause-title';
      title.innerText = 'Pause';
      div.appendChild(title);
    }
  
    /**
     * Shows the continue title on the screen for a short duration.
     */
    showContinueTitle() {
      let continueTitle = document.createElement('p');
      let div = document.getElementById('maindiv');
      continueTitle.innerText = 'Continue...';
      continueTitle.className = 'continue-title';
      div.appendChild(continueTitle);
      setTimeout(() => {
        continueTitle.remove();
      }, 1500);
    }
  
    /**
     * Removes the pause title from the screen.
     */
    removeTitle() {
      let title = document.querySelector('.pause-title');
      if (title) {
        title.remove();
      }
    }
}