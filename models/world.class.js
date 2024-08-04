class World {
  endBossInformation = new EndBossInfo();
  gamePlayandPause = new GamePause();
  character = new Character();
  endBoss = new Endboss();
  gameover = new GameOver();
  audioManager = new AudioManager();
  win = new Win()
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  worldRemove = false;
  statusBar = new StatusBar();
  endBossStatusBar = new StatusBarEndBoss();
  statusBarBottle = new StatusBarBottle();
  statusBarCoin = new StatusBarCoin();
  throwableObjects = [];
  won = false;
  chickenKilled = true;
  endBossStatusBarShown = false;
  level = level1

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.run();
    this.runChickenDead();
    this.backMusic = false;
    this.checkWonAudio = false;
    this.gameOverAudio = false;
    this.initializeBottles()
    this.endBossInfo();
    this.positionXCharachter();
    this.bottleThrowOnEndBoss();
  }

  /**
  * Sets the world of the character to the current world.
  */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Runs the main game loop, checking for various game events.
   */
  run() {
    setInterval(() => {
      this.checkThrowObjects();
      this.checkCollectCoins();
      this.checkCollectBottles();
      this.charachterCollisionEndboss();
    }, 60);
  }

  /**
   * Runs the loop to check for dead chickens and handle enemy collisions.
   */
  runChickenDead() {
    setInterval(() => {
      this.checkChickenDead();
      this.handleEnemyCollisions();
    }, 50);
  }


  checkRightJumpCheck(currentEnemy) {
    return (this.character.y + this.character.height < currentEnemy.y + currentEnemy.height &&
      Math.abs((this.character.x + this.character.width / 2) -
        (currentEnemy.x + currentEnemy.width / 2)) < (currentEnemy.width / 2))
  }

  /**
   * Checks if a chicken is dead and handles the event accordingly.
   */
  checkChickenDead() {
    for (let i = this.level.enemies.length - 1; i >= 0; i--) {
      let currentEnemy = this.level.enemies[i];
      if (this.character.isAboveGround() &&
        this.character.isColliding(currentEnemy) &&
        !this.character.recentlyBittenOnGround && !currentEnemy.isEnemyKilled
        && this.checkRightJumpCheck(currentEnemy)
      ) {

        currentEnemy.isEnemyKilled = true;
        if (checkSound) {
          this.audioManager.playSound('audio/enemy-dead.mp3');
        }

        setTimeout(() => {
          this.level.enemies.splice(i, 1);
        }, 1000);
        currentEnemy.chickenKilled = true;
        break;
      }
    }
  }




  /**
   * Handles collisions between the character and enemies.
   */
  handleEnemyCollisions() {
    this.level.enemies.some(enemy => {
      if (this.character.isCollidingEnemies(enemy) && !enemy.chickenKilled) {
        if (!this.gamePlayandPause.isPauseOn) {
          this.character.hit();
          this.character.isHurt();
          this.statusBar.setPercentage(this.character.energy);
          if (!this.character.isAboveGround()) {
            this.character.recentlyBittenOnGround = true;
            setTimeout(() => {
              this.character.recentlyBittenOnGround = false;
            }, 1000);
          }
        }
        return true;
      }
      return false;
    });
  }

  /**
   * Checks if the player is throwing objects and handles the event.
   */
  checkThrowObjects() {
    if (!this.gamePlayandPause.isPauseOn) {
      const faceRight = this.character.otherDirection == false;
      if (this.keyboard.D && faceRight && this.character.collectBottle >= 10 && this.throwableObjects.length < 10) {
        if (checkSound) {
          this.audioManager.playSound('audio/throw_Bottle.mp3')
        }
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.character.collectBottle -= 10;
        this.statusBarBottle.setPercentage(this.character.collectBottle);
        setInterval(() => {
          this.bottleExplosion(bottle, this.throwableObjects)
        }, 2000);
      }
    }
  }

  /**
   * Handles the explosion of a bottle.
   */
  bottleExplosion(bottle, throwableObjects) {
    if (bottle.bottleonGround) {
      const index = throwableObjects.indexOf(bottle);
      if (index > -1) {
        throwableObjects.splice(index, 1);
      }
    }
  }

  /**
   * Checks if the player collects bottles and handles the event.
   */
  checkCollectBottles() {
    this.level.bottles.forEach((bottle, index) => {
      if (this.character.collectBottle < 100 && this.character.isColliding(bottle)) {
        if (checkSound) {
          this.audioManager.playSound('audio/collect-bottle.mp3');
        }
        this.character.collectBottles();
        this.level.bottles.splice(index, 1);
        this.statusBarBottle.setPercentage(this.character.collectBottle);
      }
    });
  }

  /**
   * Checks if the player collects coins and handles the event.
   */
  checkCollectCoins() {
    return this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        if (checkSound) {
          this.audioManager.playSound('audio/sound-coin.mp3');
        }
        this.character.collectCoins();
        this.level.coins.splice(index, 1);
        this.statusBarCoin.setPercentage(this.character.collectCoin);
      }
    });
  }

  /**
   * Initializes the number of bottles the character has.
   */
  initializeBottles() {
    this.character.collectBottle = 20;
    this.statusBarBottle.setPercentage(this.character.collectBottle);
  }

  /**
   * Handles the event when a bottle is thrown at the end boss.
   */
  bottleThrowOnEndBoss() {
    setInterval(() => {
      this.throwableObjects.forEach(bottle => {
        if (this.endBoss.isColliding(bottle)) {
          this.endBoss.hitEndboss = true
          this.endBoss.endBossisHurt()
          this.endBoss.endBossHit()
          this.endBossStatusBar.setPercentage(this.endBoss.endBossenergy)
        }
      })
    }, 200);
  }

  /**
   * Handles the collision between the character and the end boss.
   */
  charachterCollisionEndboss() {
    if (this.character.collisionEndboos(this.endBoss) && !this.gameOver() && !this.gameWon()) {
      this.character.hit();
      this.character.isHurt();
      this.statusBar.setPercentage(this.character.energy - 65);
      this.character.x = this.endBoss.x - 1;
    }
  }

  /**
   * Checks the character's position and updates the end boss image if necessary.
   */
  positionXCharachter() {
    setInterval(() => {
      if (this.character.x >= 3000) {
        this.endBoss.enbossImagechange();
      }
    }, 200);
  }

  /**
   * Plays the win audio if the game is won.
   */
  soundWinAudio() {
    if (!this.backMusic) {
      background_Melody.pause();
      this.backMusic = true;
      if (checkSound) {
        won_audio.play();
      } else {
        won_audio.pause();
      }
    }
  }

  /**
   * Plays the game over audio if the game is over.
   */
  sounGameOver() {
    if (!this.backMusic) {
      background_Melody.pause();
      this.backMusic = true;
      if (checkSound) {
        game_over_sound.play();
      } else {
        game_over_sound.pause();
      }
    }
  }

  /**
   * Checks if the game is over.
   */
  gameOver() {
    if (this.character.isDead()) {
      setTimeout(() => {
        this.worldRemove = true;
        this.keyboard = false;
      }, 2000);
    }
    return this.worldRemove;
  }

  /**
   * Checks if the game is won.
   */
  gameWon() {
    if (this.endBoss.isEndBossDead()) {
      setTimeout(() => {
        this.won = true;
        this.keyboard = false;
      }, 2000);
    }
    return this.won;
  }

  /**
   * Draws the game objects on the canvas.
   */
  draw() {
    this.addingImagesAndTranslateto()
    if (!this.gameOver() && !this.gameWon()) {
      this.worldObjectsAndImages()
    } else {
      if (this.gameOver()) {
        this.afterGameOverInfo()
      } else if (this.gameWon()) {
        this.afterGameWonInfo()
      }
      this.addingPlayAgainButtonsafterGame()
    }
    this.endBossstatusbarPosition();
    this.callingDrawMethode()
  }


  /** 
  * Calling everytime Draw Methode
 */
  callingDrawMethode() {
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    })
  }

  /** 
   * Adding Images and Translate to world
  */
  addingImagesAndTranslateto() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /** 
   * Adding Images and Objects to world
  */
  worldObjectsAndImages() {
    this.addObjectsToMap(this.level.clouds);
    this.addToMap(this.statusBar);
    this.addToMap(this.statusBarBottle);
    this.addToMap(this.statusBarCoin);
    this.ctx.translate(this.camera_x, 0);
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.gamePlayandPause.playGameParameter();
    this.addToMap(this.endBoss);
    this.addObjectsToMap(this.level.coins);
    this.addObjectsToMap(this.level.bottles);
    this.addObjectsToMap(this.throwableObjects);
    this.ctx.translate(-this.camera_x, 0);
  }

  /** 
  *Game Over Info
 */
  afterGameOverInfo() {
    this.sounGameOver();
    this.addToMap(this.gameover);
    this.gameover.showGameOver();
  }
  /** 
 *Game Won Info
*/
  afterGameWonInfo() {
    this.soundWinAudio();
    this.addToMap(this.win);
    this.addToMap(this.win.winInfo());
  }

  /** 
  *Adding Buttons after Game
 */
  addingPlayAgainButtonsafterGame() {
    this.addToMap(this.gameover.createRestartButton());
    this.addToMap(this.gameover.createBacktoMenu());
    this.gamePlayandPause.removeIcon();
  }


  /**
   * Updates the position of the end boss status bar.
   */
  endBossstatusbarPosition() {
    if (!this.endBossStatusBarShown && !this.gameOver() && !this.gameWon() && this.character.x >= 3000) {
      this.addToMap(this.endBossStatusBar);
      this.endBossStatusBarShown = true;
    } else if (this.endBossStatusBarShown && !this.gameOver() && !this.gameWon()) {
      this.addToMap(this.endBossStatusBar);
    }
  }

  /**
   * Displays information about the end boss.
   */
  endBossInfo() {
    setInterval(() => {
      if (this.character.x >= 3000 && !this.endBossInformation.endBossInfoDisplayed) {
        this.addToMap(this.endBossInformation.endBossInfos());
        this.endBossInformation.endBossInfoDisplayed = true;
      }
    }, 80);
  }

  /**
   * Adds multiple objects to the map.
   */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      if (o) {
        this.addToMap(o);
      }
    })
  }

  /**
   * Adds an object to the map.
   */
  addToMap(mo) {
    if (!mo || typeof mo.draw !== 'function') return;
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips an image horizontally.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips an image back to its original orientation.
   */
  flipImageBack(mo) {
    this.ctx.translate(mo.width, 0);
    mo.x = mo.x * -1;
    this.ctx.restore();
  }
}