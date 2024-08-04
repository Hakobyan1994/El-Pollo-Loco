/**
 * Class responsible for displaying and removing the End Boss information on the screen.
 *
 * @class
 */
class EndBossInfo {
    /**
     * Creates an instance of EndBossInfo.
     * Initializes the state of the end boss info display.
     */
    constructor() {
      /** @type {boolean} Indicates whether the end boss info is currently displayed. */
      this.endBossInfoDisplayed = false;
    }
  
    /**
     * Displays the end boss information on the screen for a short duration.
     */
    endBossInfos() {
      let endBossInfo = document.createElement('p');
      let div = document.getElementById('maindiv');
      endBossInfo.innerText = 'Fight Endboss';
      endBossInfo.className = 'endBoss-Info';
      div.appendChild(endBossInfo);
  
      setTimeout(() => {
        this.removeEndBossInfo();
      }, 1500);
    }
  
    /**
     * Removes the end boss information from the screen if it is currently displayed.
     */
    removeEndBossInfo() {
      let endBossInfo = document.querySelector('.endBoss-Info');
      if (endBossInfo) {
        endBossInfo.remove();
      }
    }
  }