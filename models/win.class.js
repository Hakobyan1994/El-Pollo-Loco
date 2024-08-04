/**
 * Class representing the win screen in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Win extends MovableObject {
  /**
   * Creates an instance of Win.
   * Loads the win image and sets the position and dimensions.
   */
  constructor() {
    super();
    this.loadImage('img/9_intro_outro_screens/game_over/won.png');
    this.x = 0;
    this.y = 0;
    this.width = 720;
    this.height = 480;
  }

  /**
   * Displays the win information on the screen.
   */
  winInfo() {
    let h1 = document.getElementById('afterGameInfo');
    h1.innerText = 'You Have Won';
  }
}


