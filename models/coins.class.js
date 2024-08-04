/**
 * Class representing coins in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Coins extends MovableObject {
        /** @type {number} The width of the coin. */
        width = 80;
      
        /** @type {number} The height of the coin. */
        height = 80;
      
        /**
         * Array of image paths for the coin animation.
         * @type {string[]}
         */
        IMAGES = [
          'img/8_coin/coin_1.png',
          'img/8_coin/coin_2.png'
        ];
      
        /**
         * Creates an instance of Coins.
         * Loads the initial image, sets the dimensions and position,
         * and starts the animation.
         */
        constructor() {
          super().loadImage('img/8_coin/coin_1.png');
          this.loadImages(this.IMAGES);
          this.x = 200 + Math.random() * 2800;
          this.y = 220 + Math.random() * 100;
          this.animate();
        }
      
        /**
         * Animates the coin by playing its animation at a fixed interval,
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