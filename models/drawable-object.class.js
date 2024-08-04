/**
 * Class representing a drawable object in the game.
 *
 * @class
 */
class DrawableObject {
  /**
   * Cache for storing loaded images.
   * @type {Object.<string, HTMLImageElement>}
   */
  imageCache = {};

  /**
   * The current image being used for the object.
   * @type {HTMLImageElement}
   */
  img;

  /**
   * Index of the current image in an animation sequence.
   * @type {number}
   */
  currentImages = 0;

  /**
   * The x-coordinate of the object.
   * @type {number}
   */
  x = 120;

  /**
   * The y-coordinate of the object.
   * @type {number}
   */
  y = 250;

  /**
   * The height of the object.
   * @type {number}
   */
  height = 150;

  /**
   * The width of the object.
   * @type {number}
   */
  width =100;

  /**
   * Draws the object on the given canvas context.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the object.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a frame around the object if it is an instance of certain classes.
   *
   * @param {CanvasRenderingContext2D} ctx - The canvas context on which to draw the frame.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coins || this instanceof Endboss || this instanceof ThrowableObject) {
      ctx.beginPath();
      ctx.stroke();
    }
  }

  /**
   * Loads an image from the given path and sets it as the object's image.
   *
   * @param {string} path - The path to the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Loads multiple images from the given array of paths and stores them in the image cache.
   *
   * @param {string[]} arr - An array of paths to the images to load.
   */
  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}