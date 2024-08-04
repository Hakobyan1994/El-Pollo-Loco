class AudioManager {
    constructor() {
      this.audioPool = {};
    }
     /**
  * Getting  Audio in the game.
  */
    getAudioElement(src) {
      if (!this.audioPool[src]) {
        this.audioPool[src] = new Audio(src);
      }
      return this.audioPool[src];
    }
    /**
  * Settings Audioa in the game.
  */
    playSound(src) {
      const audio = this.getAudioElement(src);
      if (audio.paused) {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      } else {
        audio.currentTime = 0;
        audio.play().catch(error => {
          console.error('Audio playback failed:', error);
        });
      }
    }
  }