/**
 * Class representing the end boss in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Endboss extends MovableObject {
  /** @type {number} The height of the end boss. */
  height = 500;

  /** @type {number} The width of the end boss. */
  width = 300;

  /** @type {number} The y-coordinate of the end boss. */
  y = -50;

  /** @type {Object} The world object that the end boss interacts with. */
  worlds;

  /** @type {Audio} The audio that plays when the end boss is hit. */
  hit_audio = new Audio('audio/enemy_hit.mp3');

  /** @type {string[]} Array of image paths for the movement animation. */
  Images_Move = [
    'img/4_enemie_boss_chicken/1_walk/G1.png',
    'img/4_enemie_boss_chicken/1_walk/G2.png',
    'img/4_enemie_boss_chicken/1_walk/G3.png',
    'img/4_enemie_boss_chicken/1_walk/G4.png',
  ];

  /** @type {string[]} Array of image paths for the walking animation. */
  Images_WALKING = [
    'img/4_enemie_boss_chicken/2_alert/G5.png',
    'img/4_enemie_boss_chicken/2_alert/G6.png',
    'img/4_enemie_boss_chicken/2_alert/G7.png',
    'img/4_enemie_boss_chicken/2_alert/G8.png',
    'img/4_enemie_boss_chicken/2_alert/G9.png',
    'img/4_enemie_boss_chicken/2_alert/G10.png',
    'img/4_enemie_boss_chicken/2_alert/G11.png',
    'img/4_enemie_boss_chicken/2_alert/G12.png'
  ];

  /** @type {string[]} Array of image paths for the attack animation. */
  Images_Atack = [
    'img/4_enemie_boss_chicken/3_attack/G13.png',
    'img/4_enemie_boss_chicken/3_attack/G14.png',
    'img/4_enemie_boss_chicken/3_attack/G15.png',
    'img/4_enemie_boss_chicken/3_attack/G16.png',
    'img/4_enemie_boss_chicken/3_attack/G17.png',
    'img/4_enemie_boss_chicken/3_attack/G18.png',
    'img/4_enemie_boss_chicken/3_attack/G19.png',
    'img/4_enemie_boss_chicken/3_attack/G20.png'
  ];

  /** @type {string[]} Array of image paths for the hurt animation. */
  Images_Hurt = [
    'img/4_enemie_boss_chicken/4_hurt/G21.png',
    'img/4_enemie_boss_chicken/4_hurt/G22.png',
    'img/4_enemie_boss_chicken/4_hurt/G23.png'
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  Images_Dead = [
    'img/4_enemie_boss_chicken/5_dead/G24.png',
    'img/4_enemie_boss_chicken/5_dead/G25.png',
    'img/4_enemie_boss_chicken/5_dead/G26.png'
  ];

  /**
   * Creates an instance of Endboss.
   * Loads the initial image, sets the dimensions and position,
   * and starts the animation.
   */
  constructor() {
    super().loadImage(this.Images_WALKING[0]);
    this.loadImages(this.Images_Move);
    this.loadImages(this.Images_WALKING);
    this.loadImages(this.Images_Atack);
    this.loadImages(this.Images_Hurt);
    this.loadImages(this.Images_Dead);
    this.x = 3500;
    this.animate();
  }

  /**
   * Animates the end boss by moving it to the left at a fixed interval,
   * if the game is not paused and the end boss is not dead or hurt.
   * Also changes the animation based on the end boss's state (walking, attacking, hurt, or dead).
   */
  
  animate() {
    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn && this.endBossImagesChanging && !this.isEndBossDead() && !this.endBossisHurt() && !world.gameOver()) {
        this.moveLeftEndGame();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (!world.gamePlayandPause.isPauseOn) {
        if (this.isEndBossDead()) {
          this.playAnimation(this.Images_Dead);
        } else if (this.hitEndboss && this.endBossisHurt()) {
          if (checkSound) {
            this.hit_audio.play();
          }
          this.playAnimation(this.Images_Hurt);
        } else if (this.endBossImagesChanging) {
          this.playAnimation(this.Images_Atack);
        } else {
          this.playAnimation(this.Images_WALKING);
        }
      }
    }, 200);
  }
}