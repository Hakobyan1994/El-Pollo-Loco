/**
 * Class representing a throwable object in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class ThrowableObject extends MovableObject {
    /**
     * Indicates whether the bottle is on the ground.
     * @type {boolean}
     */
    bottleonGround = true;
  
    /**
     * Array of image paths for the bottle rotation animation.
     * @type {string[]}
     */
    Images = [
      'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
      'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
  
    /**
     * Array of image paths for the bottle splash animation.
     * @type {string[]}
     */
    bottle_splash = [
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
      'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
  
    /**
     * Creates an instance of ThrowableObject.
     * Loads the initial image, sets the position and dimensions, and throws the object.
     * 
     * @param {number} x - The initial x-coordinate of the throwable object.
     * @param {number} y - The initial y-coordinate of the throwable object.
     */
    constructor(x, y) {
      super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
      this.loadImages(this.Images);
      this.loadImages(this.bottle_splash);
      this.x = x;
      this.y = y;
      this.height = 60;
      this.width = 50;
      this.throw();
    }
  
    /**
     * Throws the object by applying gravity and moving it forward.
     * Plays the appropriate animation based on whether the object has hit the ground.
     */
    throw() {
      this.sppedY = 30;
      this.applyGravity();
      setInterval(() => {
        if (this.y >= 360) {
          this.playAnimation(this.bottle_splash);
          this.sppedY = 0;
          this.bottleonGround = true;
        } else {
          this.x += 10;
          this.playAnimation(this.Images);
        }
      }, 25);
    }
  }