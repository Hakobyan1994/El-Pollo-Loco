/**
 * Class representing the main character in the game.
 * Extends from the MovableObject class.
 *
 * @class
 */
class Character extends MovableObject {
  /** @type {number} The height of the character. */
  height = 250;

  /** @type {number} The initial y-coordinate of the character. */
  y = 180;

  /** @type {number} The speed of the character. */
  speed = 10;

  /** @type {number|null} Timeout ID for the idle animation. */
  idleTimeout = null;

  /** @type {number|null} Timeout ID for the long idle animation. */
  longIdleTimeout = null;

  /** @type {boolean} Indicates if the idle animation is active. */
  idleActive = false;

  /** @type {boolean} Indicates if the long idle animation is active. */
  longIdleActive = false;

  /** @type {boolean} Indicates if the dead sound has been checked. */
  cheakDeadSound = false;

  /** @type {string[]} Array of image paths for the walking animation. */
  Images_WALKING = [
    'img/2_character_pepe/2_walk/W-21.png',
    'img/2_character_pepe/2_walk/W-22.png',
    'img/2_character_pepe/2_walk/W-23.png',
    'img/2_character_pepe/2_walk/W-24.png',
    'img/2_character_pepe/2_walk/W-25.png',
    'img/2_character_pepe/2_walk/W-26.png'
  ];

  /** @type {string[]} Array of image paths for the jumping animation. */
  Images_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png'
  ];

  /** @type {string[]} Array of image paths for the dead animation. */
  Images_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-56.png',
    'img/2_character_pepe/5_dead/D-57.png'
  ];

  /** @type {string[]} Array of image paths for the long idle animation. */
  Images_LONGIDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  /** @type {string[]} Array of image paths for the hurt animation. */
  Images_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  /** @type {string[]} Array of image paths for the idle animation. */
  Images_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  /** @type {object} The game world the character interacts with. */
  world;

  /** @type {Audio} The sound played when the character is walking. */
  walking_sound = new Audio('audio/walking.mp3');

  /** @type {Audio} The sound played when the character jumps. */
  jump_sound = new Audio('audio/jump-charachter.mp3');

  /** @type {Audio} The sound played when the character is hurt. */
  hurt_sound = new Audio('audio/hit.mp3');

  /** @type {Audio} The sound played when the character is snoring. */
  snoring_sound = new Audio('audio/snoring.mp3');

  /**
   * Creates an instance of Character.
   * Loads the initial image, sets up animations and sounds, and applies gravity.
   */
  constructor() {
    super().loadImage('img/2_character_pepe/2_walk/W-21.png');
    this.loadImages(this.Images_WALKING);
    this.loadImages(this.Images_JUMPING);
    this.loadImages(this.Images_DEAD);
    this.loadImages(this.Images_HURT);
    this.loadImages(this.Images_IDLE);
    this.loadImages(this.Images_LONGIDLE);
    this.applyGravity();
    this.animate();
    this.recentlyBittenOnGround = false;
    this.differnetChangeAnimation();
    this.currentImages = 0;
    this.chack = false;
    this.isLAstJump = false;
    this.checkSnoringIdle = false;
    this.checkSnoringIdleTimeout = null;
  }

  /**
   * Animates the character by handling movement and playing sounds
   * based on keyboard input and game state.
   */
  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_x_end && !this.world.gamePlayandPause.isPauseOn) {
        this.otherDirection = false;
        if (checkSound) {
          this.walking_sound.play();
        }
        this.moveRight();
      }
      if (this.world.keyboard.LEFT && this.x > 0 && !this.world.gamePlayandPause.isPauseOn) {
        this.otherDirection = true;
        if (checkSound) {
          this.walking_sound.play();
        }
        this.moveLeft();
      }
      if (this.world.keyboard.SPACE && !this.isAboveGround() && !this.world.gamePlayandPause.isPauseOn) {
        if (checkSound) {
          this.jump_sound.play()
        }
        this.jump();
        this.currentImages = 0;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);
  }

  /**
   * Changes the animation based on the character's state
   * (dead, hurt, jumping, walking, or idle).
   */
  differnetChangeAnimation() {
    setInterval(() => {
      if (this.isDead()) {
        this.deadChangeAnimation();
      } else if (this.isHurt()) {
        this.hurtChangeAnimation();
      } else if (this.isAboveGround()) {
        this.checkSnoringIdle = false;
        this.playJumpAnimation();
      } else if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT && !this.isLAstJump) {
        this.checkchangingIdleAnimations()
      } else {
        this.checkWalkingAnimation();
      }
    }, 80);
  }

  /**
 * Check and update idle animations based on the game state.
 */
  checkchangingIdleAnimations() {
    if (!this.world.gamePlayandPause.isPauseOn) {
      if (!this.checkSnoringIdleTimeout) {
        this.changeIdleAnimationToLongIdle()
      }
      if (this.checkSnoringIdle) {
        this.longIdleAnimation()
      } else {
        this.playAnimation(this.Images_IDLE);
      }
    }
  }

  /**
  * Update the walking animation and reset the snoring idle state.
  */
  checkWalkingAnimation() {
    this.checkSnoringIdle = false;
    clearTimeout(this.checkSnoringIdleTimeout);
    this.checkSnoringIdleTimeout = null;
    this.walkingChangeAnimation();
  }



  /**
   * Play the long idle animation and snoring sound if conditions are met.
   */
  changeIdleAnimationToLongIdle() {
    this.playAnimation(this.Images_IDLE);
    this.checkSnoringIdleTimeout = setTimeout(() => {
      this.checkSnoringIdle = true;
    }, 7000);
  }

  /**
 * Update the animation to walking if the player is moving.
 */
  longIdleAnimation() {
    if (!this.world.gamePlayandPause.isPauseOn) {
      this.playAnimation(this.Images_LONGIDLE);
      if (checkSound && !world.gameOver() && !world.gameWon()) {
        this.snoring_sound.play()
      }
    }
  }

  /**
   * Play the hurt animation and sound.
   */
  walkingChangeAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      if (!this.world.gamePlayandPause.isPauseOn) {
        this.playAnimation(this.Images_WALKING);
      }
    }
  }

  /**
 * Play the dead animation.
 */
  hurtChangeAnimation() {
    if (checkSound) {
      this.hurt_sound.play()
    }
    if (!this.world.gamePlayandPause.isPauseOn) {
      this.playAnimation(this.Images_HURT);
    }
  }

  /**
 * Play the jump animation.
 */
  deadChangeAnimation() {
    this.playAnimation(this.Images_DEAD)
  }

  /**
 * Play the jump animation frames.
 */
  playJumpAnimation() {
    if (!this.world.gamePlayandPause.isPauseOn) {
      this.playJUmpsAnimation(this.Images_JUMPING);
    }
  }

  /**
* Play the jump animation frames.
*/
  playJUmpsAnimation(images) {
    if (this.currentImages < images.length - 1) {
      let i = this.currentImages % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.currentImages++;
    } else {
      let path = images[images.length - 1];
      this.img = this.imageCache[path];
      this.isLAstJump = true
      setTimeout(() => {
        this.isLAstJump = false;
      }, 3000);
    }
  }
}