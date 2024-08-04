/**
 * Class representing a chicken enemy in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Chicken extends MovableObject {
  /** @type {number} The height of the chicken. */
  height = 60;
  
  /** @type {number} The y-coordinate of the chicken. */
  y = 360;
  
  /** @type {number} The width of the chicken. */
  width = 80;

  /** @type {string[]} Array of image paths for the walking animation. */
  Images_WALKING = [
    'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
    'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  Images_DEAD = [
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
    'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
  ];

  /**
   * Creates an instance of Chicken.
   * Loads the initial image, sets the dimensions and position,
   * and starts the animation.
   */
  constructor() {
    super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
    this.x = 250 + Math.random() * 3500;
    this.loadImages(this.Images_WALKING);
    this.loadImages(this.Images_DEAD);
    this.animate();
    this.speed = 0.15 + Math.random() * 0.5;
    this.isEnemyKilled = false;
  }

  /**
   * Animates the chicken by moving it to the left at a fixed interval,
   * if the game is not paused and the chicken is not killed.
   * Also changes the animation based on the chicken's state (walking or dead).
   */
  animate() {
    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn && !this.isEnemyKilled) {
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






