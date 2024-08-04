/**
 * Class representing the sound parameter control in the game.
 *
 * @class
 */
class SoundParameter {
    /**
     * Creates an instance of SoundParameter.
     * Initializes the state of the sound icon and sound status.
     */
    constructor() {
      /** @type {boolean} Indicates whether the sound icon has been checked. */
      this.soundIconCheck = false;
  
      /** @type {HTMLElement|null} The sound icon element. */
      this.soundIcon = null;
  
      /** @type {boolean} Indicates whether the sound is on. */
      this.isSoundOn = true;
    }
  
    /**
     * Sets up the sound icon if it has not been set up already.
     * Adds the sound icon to the DOM and sets up the event listener for toggling sound.
     */
    soundparameter() {
      if (!this.soundIconCheck) {
        this.soundIcon = document.getElementById('soundButton');
        if (!this.soundIcon) {
          this.soundIcon = document.createElement('img');
          const div = document.getElementById('maindiv');
          this.soundIcon.src = 'img/soun_icon/sound-on.png';
          this.soundIcon.className = 'sound-icon';
          this.soundIcon.id = 'soundButton';
          this.soundIcon.addEventListener('click', () => this.soundOff());
          div.appendChild(this.soundIcon);
        }
        this.soundIconCheck = true;
      }
    }
  
    /**
     * Toggles the sound on and off.
     * Updates the sound icon and mutes/unmutes all audio elements accordingly.
     */
    soundOff() {
      this.isSoundOn = !this.isSoundOn;
      if (this.isSoundOn) {
        this.soundIcon.src = 'img/soun_icon/sound-on.png';
        this.unmuteAllAudio();
      } else {
        this.soundIcon.src = 'img/soun_icon/sound-off.png';
        this.muteAllAudio();
      }
    }
  
    /**
     * Mutes all audio elements on the page and pauses their playback.
     */
    muteAllAudio() {
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        audio.muted = true;
        audio.pause();
      });
    }
  
    /**
     * Unmutes all audio elements on the page and resumes their playback.
     */
    unmuteAllAudio() {
      const audios = document.querySelectorAll('audio');
      audios.forEach(audio => {
        audio.muted = false;
        audio.play();
      });
    }
  }