/**
 * Class representing a cloud in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Cloud extends MovableObject {
  /** @type {number} The y-coordinate of the cloud. */
  y = 20;

  /** @type {number} The width of the cloud. */
  width = 500;

  /** @type {number} The height of the cloud. */
  height = 150;

  /**
   * Creates an instance of Cloud.
   * Loads the cloud image and sets a random initial x-coordinate.
   * Starts the animation for the cloud movement.
   */
  constructor() {
    super().loadImage('img/5_background/layers/4_clouds/1.png');
    this.x = Math.random() * 3500;
    this.animate();
  }

  /**
   * Animates the cloud by moving it to the left at a fixed interval,
   * if the game is not paused.
   */
  animate() {
    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }
}



