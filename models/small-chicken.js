/**
 * Class representing a small chicken enemy in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class SmallChicken extends MovableObject {
  /** @type {number} The height of the small chicken. */
  height = 60;
  
  /** @type {number} The y-coordinate of the small chicken. */
  y = 360;
  
  /** @type {number} The width of the small chicken. */
  width = 80;

  /** @type {string[]} Array of image paths for the walking animation. */
  Images_WALKING = [
    'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  Images_DEAD = [
    'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
  ];

  /**
   * Creates an instance of SmallChicken.
   * Loads the initial image, sets the dimensions and position,
   * and starts the animation.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
    this.x = 250 + Math.random() * 3500;
    this.loadImages(this.Images_WALKING);
    this.loadImages(this.Images_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
    this.isEnemyKilled = false;
  }

  /**
   * Animates the small chicken by moving it to the left at a fixed interval,
   * if the game is not paused, the small chicken is not killed, and the game is not over or won.
   * Also changes the animation based on the small chicken's state (walking or dead).
   */
  animate() {
    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn && !this.isEnemyKilled && !world.gameOver() && !world.gameWon()) {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn) {
        if (this.isEnemyKilled) {
          this.playAnimation(this.Images_DEAD);
        } else {
          this.playAnimation(this.Images_WALKING);
        }
      }
    }, 200);
  }
}