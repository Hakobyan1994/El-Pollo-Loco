/**
 * Class representing the status bar for bottles in the game.
 * Extends from the DrawableObject class.
 *
 * @class
 */
class StatusBarBottle extends DrawableObject {
    /**
     * Array of image paths for the status bar at different bottle levels.
     * @type {string[]}
     */
    IMAGES = [
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
      'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
  
    /**
     * The current percentage of bottles.
     * @type {number}
     */
    percentage = 0;
  
    /**
     * Creates an instance of StatusBarBottle.
     * Loads the images, sets the position and dimensions, and initializes the percentage.
     */
    constructor() {
      super();
      this.loadImages(this.IMAGES);
      this.x = 40;
      this.y = 45;
      this.width = 200;
      this.height = 60;
      this.setPercentage(0);
    }
  
    /**
     * Sets the percentage of bottles and updates the image accordingly.
     * 
     * @param {number} percentage - The percentage of bottles to set.
     */
    setPercentage(percentage) {
      this.percentage = percentage;
      let path = this.IMAGES[this.resolveImageIndex()];
      this.img = this.imageCache[path];
    }
  
    /**
     * Determines the index of the image to use based on the current percentage of bottles.
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