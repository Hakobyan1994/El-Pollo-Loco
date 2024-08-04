/**
 * Class representing a level in the game.
 *
 * @class
 */
class LEVEL {
  /** @type {Array} The enemies in the level. */
  enemies;

  /** @type {Array} The background objects in the level. */
  backgroundObjects;

  /** @type {number} The x-coordinate where the level ends. */
  level_x_end = 4000;

  /** @type {Array} The coins in the level. */
  coins;

  /** @type {Array} The clouds in the level. */
  clouds;

  /** @type {Array} The bottles in the level. */
  bottles;

  /** @type {Array} The pause objects in the level. */
  pauseObjects;

  /**
   * Creates an instance of LEVEL.
   * 
   * @param {Array} backgroundObjects - The background objects in the level.
   * @param {Array} coins - The coins in the level.
   * @param {Array} clouds - The clouds in the level.
   * @param {Array} bottles - The bottles in the level.
   * @param {Array} enemies - The enemies in the level.
   */
  constructor(backgroundObjects, coins, clouds, bottles, enemies) {
    this.backgroundObjects = backgroundObjects;
    this.coins = coins;
    this.clouds = clouds;
    this.bottles = bottles;
    this.enemies = enemies;
  }
}