/**
 * Class representing the game over screen in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class GameOver extends MovableObject {
    /** @type {boolean} Checks if exit fullscreen image is displayed. */
    checkEXitFullscreenIamge = false;
  
    /**
     * Creates an instance of GameOver.
     * Loads the game over image and sets the dimensions and position.
     */
    constructor() {
      super();
      this.loadImage('img/9_intro_outro_screens/game_over/oh no you lost!.png');
      this.x = 0;
      this.y = 0;
      this.height = 480;
      this.width = 720;
      this.backToMenuvar = null;
      this.restartButton = null;
    }
  
    /**
     * Creates a restart button if it does not already exist.
     */
    createRestartButton() {
      if (!this.restartButton) {
        this.restartButton = document.createElement('button');
        const div = document.getElementById('gameover');
        div.style.display = 'flex';
        this.restartButton.className = 'restart-button';
        this.restartButton.innerText = 'Play again';
        this.restartButton.addEventListener('click', () => this.restartGame());
        div.appendChild(this.restartButton);
      }  
    }
  
    /**
     * Removes the restart button if it exists.
     */
    removeRestartButton() {
      if (this.restartButton) {
        this.restartButton.remove();
      }
    }
  
    /**
     * Restarts the game by resetting necessary elements and starting a new game.
     */
    restartGame() {
        this.removeRestartButton();
        this.removeBackToMenu();
        this.removeGameOverInfo();
        background_Melody.currentTime = 0;
        setTimeout(() => {
          setGame();
      }, 100);
    }
  
    /**
     * Creates a back to menu button if it does not already exist.
     */
    createBacktoMenu() {
      if (!this.backToMenuvar) {
        this.backToMenuvar = document.createElement('button');
        const div = document.getElementById('gameover');
        div.style.display = 'flex';
        this.backToMenuvar.className = 'back-menu';
        this.backToMenuvar.innerText = 'Back Menu';
        this.backToMenuvar.addEventListener('click', () => this.backMenu());
        div.appendChild(this.backToMenuvar);
      }
    }
  
    /**
     * Removes the back to menu button if it exists.
     */
    removeBackToMenu() {
      if (this.backToMenuvar) {
        this.backToMenuvar.remove();
      }
    }
  
    /**
     * Navigates back to the menu by resetting necessary elements and redirecting to the menu page.
     */
    backMenu() {
      this.removeRestartButton();
      this.removeBackToMenu();
      setTimeout(() => {
        window.location.href = './El-Pollo-Loco.html';
      }, 100);
    }
  
    /**
     * Removes the game over information from the screen.
     */
    removeGameOverInfo() {
      const div = document.getElementById('gameover');
      div.style.display = 'none';
    }
  
    /**
     * Displays the game over screen with options to restart or go back to the menu.
     */
    showGameOver() {
      let h1 = document.getElementById('afterGameInfo');
      h1.innerText = 'Game Over';
    }
  }