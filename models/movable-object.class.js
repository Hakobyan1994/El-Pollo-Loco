/**
 * Class representing a movable object in the game.
 * Extends from the DrawableObject class.
 *
 * @class
 */
class MovableObject extends DrawableObject {
  /** @type {number} The speed of the object. */
  speed = 0.15;

  /** @type {number} The speed of the end boss. */
  speedEndboss = 2;

  /** @type {boolean} Indicates if the object is facing the other direction. */
  otherDirection = false;

  /** @type {number} The vertical speed of the object. */
  sppedY = 0;

  /** @type {number} The acceleration of the object. */
  acceleration = 2.5;

  /** @type {number} The energy level of the object. */
  energy = 100;

  /** @type {number} The timestamp of the last hit. */
  lastHit = 0;

  /** @type {number} The number of coins collected by the object. */
  collectCoin = 0;

  /** @type {number} The number of bottles collected by the object. */
  collectBottle = 20;

  /** @type {boolean} Indicates if the enemy is killed. */
  isEnemyKilled = false;

  /** @type {boolean} Indicates if the chicken is killed. */
  chickenKilled = false;

  /** @type {boolean} Indicates if the end boss images are changing. */
  endBossImagesChanging = false;

  /** @type {boolean} Indicates if the end boss is hit. */
  hitEndboss = false;

  /** @type {number} The energy level of the end boss. */
  endBossenergy = 100;

  /**
   * Applies gravity to the object.
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.sppedY > 0) {
        this.y -= this.sppedY;
        this.sppedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  /**
   * Checks if the object is above the ground.
   *
   * @returns {boolean} True if the object is above the ground, false otherwise.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * Sets the object to face right.
   */
  facingRight() {
    this.otherDirection = false;
  }

  /**
   * Checks if the object is colliding with another object.
   *
   * @param {MovableObject} mo - The other object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x &&
      this.y < mo.y;
  }
    
  isCollidingEnemies(enemy) {
   return this.x + this.width > enemy.x &&
    this.y + this.height > enemy.y &&
    this.x < enemy.x + enemy.width &&
    this.y < enemy.y + enemy.height;
  }

  /**
   * Checks if the object is colliding with the end boss.
   *
   * @param {MovableObject} mo - The end boss object to check collision with.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  collisionEndboos(mo) {
    return this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height;
  }

  /**
   * Increases the number of collected coins.
   */
  collectCoins() {
    this.collectCoin += 10;
    if (this.collectCoin > 100) {
      this.collectCoin = 100;
    }
  }

  /**
   * Increases the number of collected bottles.
   */
  collectBottles() {
    this.collectBottle += 10;
    if (this.collectBottle > 100) {
      this.collectBottle = 100;
    }
  }

  /**
   * Changes the end boss images.
   */
  enbossImagechange() {
    this.endBossImagesChanging = true;
  }

  /**
   * Decreases the end boss's energy when hit.
   */
  endBossHit() {
    this.endBossenergy -= 3;
    if (this.endBossenergy < 0) {
      this.endBossenergy = 0;
    }
    this.lastHit = new Date().getTime();
  }

  /**
   * Checks if the end boss is hurt.
   *
   * @returns {boolean} True if the end boss is hurt, false otherwise.
   */
  endBossisHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Decreases the object's energy when hit.
   */
  hit() {
    this.energy -= 3;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object is hurt.
   *
   * @returns {boolean} True if the object is hurt, false otherwise.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Checks if the end boss is dead.
   *
   * @returns {boolean} True if the end boss is dead, false otherwise.
   */
  isEndBossDead() {
    return this.endBossenergy == 0;
  }

  /**
   * Checks if the object is dead.
   *
   * @returns {boolean} True if the object is dead, false otherwise.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Moves the end boss to the left.
   */
  moveLeftEndGame() {
    this.x -= this.speedEndboss;
  }

  /**
   * Plays the animation for the object.
   *
   * @param {string[]} images - An array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImages % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImages++;
  }

  /**
   * Makes the object jump.
   */
  jump() {
    this.sppedY = 30;
  }

  /**
   * Plays a sound.
   *
   * @param {HTMLAudioElement} sound - The sound to play.
   */
  setSoundPlay(sound) {
    sound.currentTime = 0;
    sound.play().catch(error => {
      console.error('Error playing sound:', error);
    });
  }
}