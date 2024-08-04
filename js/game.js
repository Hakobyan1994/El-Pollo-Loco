
let canvas;
let ctx;
let keyboard = new Keyboard();
let world;
let check = new GamePause()
let checkSound = true;
let checkGameOver = false
let won_audio = new Audio('audio/winsound.mp3');
let game_over_sound = new Audio('audio/over.mp3');
let checkLoadAnimation = false;

let background_Melody

/**
 * Checks if the user is on a mobile device.
 */
function isMobileDevice() {
  return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Displays or hides elements based on whether the user is on a mobile device.
 */
function displayShow() {
  const isMobile = isMobileDevice();

  if (isMobile) {
    document.getElementById('direction-move').style.display = 'flex';
    document.getElementById('jump-bottle').style.display = 'flex';
    document.getElementById('h1').style.display = 'none';
  } else {
    document.body.style.alignItems = 'center';
    document.body.style.flexDirection = 'column';
  }
}
  /** 
   * disabled contextmenu.
  */
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

/**
 * Checks the orientation of the device and displays a message if in portrait mode.
 */
function checkOrientation() {
  if (window.innerWidth < window.innerHeight) {
    document.getElementById('turnScreen').style.display = 'flex';
  } else {
    document.getElementById('turnScreen').style.display = 'none';
  }
}

window.addEventListener('load', checkOrientation);
window.addEventListener('resize', checkOrientation);


/**
 * Displays a loading screen for a specified duration before calling a callback function.
 * @param {Function} callback - The function to call after the loading screen is hidden.
 */
function setLoadingDiv(callback) {
  document.getElementById('loadingDiv').style.display = 'flex';
  setTimeout(() => {
    document.getElementById('loadingDiv').style.display = 'none';
    callback();
  }, 5000);
}

/**
 * Starts the game by initializing the game world and setting up various elements.
 */
function startGame() {
  removeTransparentDiv();
  setLoadingDiv(() => {
    setGame();
  });
}

/**
 * Initializes the game world and sets up various elements.
 */
function setGame() {
  setnewWorldObjects();
  const canvas = document.getElementById('canvas');
  world = new World(canvas, keyboard);
  displayShow();
  gameTitle();
  fullscreenImage();
  fullscreenChangeHandler();
  showSoundIcon();
  backgroundMelody();
}

/**
 * Displays the sound icon.
 */
function showSoundIcon() {
  document.getElementById('soundOn').style.display = 'flex';
}

/**
 * Toggles sound on.
 */
function makeSoundOn() {
  const soundOffButton = document.getElementById('soundOff');
  const soundOnButton = document.getElementById('soundOn');
  if (soundOnButton.style.display === 'flex') {
    soundOnButton.style.display = 'none';
    soundOffButton.style.display = 'flex';
    checkSound = false;
    backgroundMelody();
  }
}

/**
 * Toggles sound off.
 */
function makeSoundOff() {
  const soundOffButton = document.getElementById('soundOff');
  const soundOnButton = document.getElementById('soundOn');
  if (soundOffButton.style.display === 'flex') {
    soundOffButton.style.display = 'none';
    soundOnButton.style.display = 'flex';
    checkSound = true;
    backgroundMelody();
  }
}

/**
 * Plays or pauses the background melody based on the sound setting.
 */
function backgroundMelody() {
  initializeBackgroundMelody()
  if (checkSound === true) {
    background_Melody.play();
  } else {
    background_Melody.pause();
  }
}

function initializeBackgroundMelody() {
  if (!background_Melody) {
    background_Melody = new Audio('audio/backgroundmelody.mp3');
    background_Melody.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }
}

/**
 * Sets up the world canvas.
 */
function setWorldCanvas() {
  // Function content not provided
}

/**
 * Adds the 'active' class to the game title element.
 */
function gameTitle() {
  document.querySelector('h1').classList.add('active');
}

/**
 * Displays the fullscreen image.
 */
function fullscreenImage() {
  document.getElementById('fullscreeenImage').style.display = 'flex';
}

/**
 * Removes the transparent overlay div.
 */
function removeTransparentDiv() {
  const overlay = document.getElementById('transparenterDiv');
  if (overlay) {
    overlay.style.display = 'none';
  }
}

/**
 * Enters fullscreen mode.
 */
function enterFullscreen() {
  document.getElementById('fullscreeenImage').style.display = 'none';
  document.getElementById('fullscreeenImageExit').style.display = 'block';
  const maindiv = document.getElementById('maindiv');
  if (maindiv.requestFullscreen) {
    maindiv.requestFullscreen();
  } else if (maindiv.mozRequestFullScreen) {
    maindiv.mozRequestFullScreen();
  } else if (maindiv.webkitRequestFullscreen) {
    maindiv.webkitRequestFullscreen();
  } else if (maindiv.msRequestFullscreen) {
    maindiv.msRequestFullscreen();
  }

  document.addEventListener('fullscreenchange', fullscreenChangeHandler);
  document.addEventListener('webkitfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('mozfullscreenchange', fullscreenChangeHandler);
  document.addEventListener('MSFullscreenChange', fullscreenChangeHandler);
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    document.msExitFullscreen();
  }
}

/**
 * Handles changes in fullscreen mode and updates the display accordingly.
 */
function fullscreenChangeHandler() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.mozFullScreenElement && !document.msFullscreenElement) {
    document.getElementById('fullscreeenImage').style.display = 'block';
    document.getElementById('fullscreeenImageExit').style.display = 'none';
  } else {
    document.getElementById('fullscreeenImage').style.display = 'none';
    document.getElementById('fullscreeenImageExit').style.display = 'block';
  }
}

window.addEventListener('keydown', (e) => {
  switch (e.keyCode) {
    case 38:
      keyboard.UP = true;
      break;
    case 40:
      keyboard.DOWN = true;
      break;
    case 39:
      keyboard.RIGHT = true;
      break;
    case 37:
      keyboard.LEFT = true;
      break;
    case 32:
      keyboard.SPACE = true;
      break;
    case 68:
      keyboard.D = true;
      break;
  }
});

window.addEventListener('keyup', (e) => {
  switch (e.keyCode) {
    case 38:
      keyboard.UP = false;
      break;
    case 40:
      keyboard.DOWN = false;
      break;
    case 39:
      keyboard.RIGHT = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 68:
      keyboard.D = false;
      break;
  }
});

/**
 * Navigates to the legal notice page.
 */
function enterLegalNoticy() {
  window.location.href = '../data-protection/legal-noticy.html';
}

/**
 * Navigates to the privacy policy page.
 */
function enterPrivacyPOlicy() {
  window.location.href = '../data-protection/privacy_policy.html';
}

document.getElementById('rightButton').addEventListener('touchstart', () => moveRight(true));
document.getElementById('rightButton').addEventListener('touchend', () => moveRight(false));
document.getElementById('leftButton').addEventListener('touchstart', () => moveLeft(true));
document.getElementById('leftButton').addEventListener('touchend', () => moveLeft(false));
document.getElementById('jump').addEventListener('touchstart', () => jump(true));
document.getElementById('jump').addEventListener('touchend', () => jump(false));
document.getElementById('throwBottle').addEventListener('touchstart', () => throwBottle(true));
document.getElementById('throwBottle').addEventListener('touchend', () => throwBottle(false));

/**
 * Moves the character to the right based on touch input.
 * @param {boolean} isTouched - Whether the button is touched.
 */
function moveRight(isTouched) {
  keyboard.RIGHT = isTouched;
}

/**
 * Moves the character to the left based on touch input.
 * @param {boolean} isTouched - Whether the button is touched.
 */
function moveLeft(isTouched) {
  keyboard.LEFT = isTouched;
}

/**
 * Makes the character jump based on touch input.
 */
function jump(isTouched) {
  keyboard.SPACE = isTouched;
}

/**
 * Throws a bottle based on touch input.
 */
function throwBottle(isTouched) {
  keyboard.D = isTouched;
}

/**
 * Navigates to the game information page.
 */
function gameInfo() {
  window.location.href = '../game-info/game_Info.html';
}