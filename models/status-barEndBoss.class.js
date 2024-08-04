/**
 * Class representing the status bar for the end boss in the game.
 * Extends from the DrawableObject class.
 *
 * @class
 */
class StatusBarEndBoss extends DrawableObject {
  /**
   * Array of image paths for the status bar at different health levels.
   * @type {string[]}
   */
  Images = [
    'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
    'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
  ];

  /**
   * The current percentage of the end boss's health.
   * @type {number}
   */
  percentage = 0;

  /**
   * Creates an instance of StatusBarEndBoss.
   * Loads the images, sets the position and dimensions, and initializes the percentage.
   */
  constructor() {
    super();
    this.loadImages(this.Images);
    this.x = 40;
    this.y = 130;
    this.width = 200;
    this.height = 60;
    this.setPercentage(100);
  }

  /**
   * Sets the percentage of the end boss's health and updates the image accordingly.
   * 
   * @param {number} percentage - The percentage of the end boss's health.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.Images[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Determines the index of the image to use based on the current percentage of the end boss's health.
   * 
   * @returns {number} The index of the image to use.
   */
  resolveImageIndex() {
    if (this.percentage === 100) {
      return 5;
    } else if (this.percentage >= 80) {
      return 4;
    } else if (this.percentage >= 60) {
      return 3;
    } else if (this.percentage >= 40) {
      return 2;
    } else if (this.percentage >= 20) {
      return 1;
    } else {
      return 0;
    }
  }
}