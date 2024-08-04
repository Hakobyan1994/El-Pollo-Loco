/**
 * Class representing bottles in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Bottles extends MovableObject {

  /**
   * Array of image paths for the bottles.
   * @type {string[]}
   */
  IMAGES = [
    'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  /**
   * Creates an instance of Bottles.
   * Loads the initial image, sets the dimensions and position,
   * and starts the animation.
   */
  constructor() {
    super().loadImage('img/6_salsa_bottle/2_salsa_bottle_on_ground.png');
    this.loadImages(this.IMAGES);
    this.height = 70;
    this.width = 70;
    this.y = 350;
    this.x = 250 + Math.random() * 2200;
    this.animate();
  }

  /**
   * Animates the bottles by playing their animation at a fixed interval,
   * if the game is not paused.
   */
  animate() {
    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn) {
        this.playAnimation(this.IMAGES);
      }
    }, 1000 / 2);
  }
}