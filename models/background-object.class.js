/**
 * Class representing a background object in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class BackgroundObject extends MovableObject {
  /** @type {number} The width of the background object. */
  width = 720;
  
  /** @type {number} The height of the background object. */
  height = 480;

  /**
   * Creates an instance of BackgroundObject.
   * Loads the background image and sets its initial position.
   * 
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The initial x-coordinate of the background object.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}