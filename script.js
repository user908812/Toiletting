let playerWidth = 50;
let playerHeight = 100;
let playerHealth = 20;
let playerSpeed = 15;
let skibidiToiletWidth = 140;
let skibidiToiletHeight = 200;
let skibidiToiletHealth = 2000;
let skibidiToiletJumpAnimationDuration = 5000;
let windowResolution = [1280, 720];

let settingsMenuKey = 'Escape';
let attackKey = 'r';
let forwardKey = 'd';
let backKey = 'a';
let jumpKey = ' ';

let score = 0;
let gameEnded = false;
let scoreInterval;

// For TV Players
const settingsMenuKeyTV = 'Enter';
const attackKeyTV = 'ArrowDown';
const forwardKeyTV = 'ArrowRight';
const backKeyTV = 'ArrowLeft';
const jumpKeyTV = 'ArrowUp';

const log = console.log.bind(document);
const warn = console.warn.bind(document);

const gameContainer = document.querySelector('main');
const gameField = document.getElementById('game-field');
const playerLoseDialogScreen = document.getElementById('player-lose-dialog-screen');
const playerWonDialogScreen = document.getElementById('player-won-dialog-screen');
const settingsDialogScreen = document.getElementById('settings-menu-screen');
const changeThemeSettingsMenuButton = document.getElementById('change-theme-settings-menu-button');

const player = document.getElementById('player');
const playerImage = document.getElementById('tv-man-image');
const playerHealthDisplay = document.getElementById('player-health-display');
const playerSpeedDisplay = document.getElementById('player-speed-display');
const playerPositionXDisplay = document.getElementById('player-position-x-display');
const playerPositionYDisplay = document.getElementById('player-position-y-display');
const playerScoreDisplay = document.getElementById('player-score-display');
const playerHealthDisplayContainer = document.getElementById('player-health-display-container-realtime');
const playerWidthDisplay = document.getElementById('player-width-display');
const playerHeightDisplay = document.getElementById('player-height-display');

const skibidiToilet = document.getElementById('skibidi-toilet');
const skibidiToiletImage = document.getElementById('skibidi-toilet-image');

const resolutionDisplay = document.getElementById('resolution-display');
const scoreDisplayTitleOnScreen = document.querySelector('.screen-score-display');

const skibidiToiletOriginalSong = document.getElementById('skibidi-toilet-original-song');
const tvManShootingSound = document.getElementById('tv-man-shooting-sound');

const menuKeyInput = document.getElementById('menu-key-input');
const attackKeyInput = document.getElementById('attack-key-input');
const forwardKeyInput = document.getElementById('forward-key-input');
const backKeyInput = document.getElementById('back-key-input');
const jumpKeyInput = document.getElementById('jump-key-input');

const isMusicCheckBox = document.getElementById('is-music-checkbox');
const playerWidthInput = document.getElementById('player-width-input');
const playerHeightInput = document.getElementById('player-height-input');
const skibidiToiletWidthInput = document.getElementById('skibidi-toilet-width-input');
const skibidiToiletHeightInput = document.getElementById('skibidi-toilet-height-input');
const playerHealthInput = document.getElementById('player-health-input');
const playerSpeedInputRange = document.getElementById('player-speed-input');
const skibidiToiletHealthInput = document.getElementById('skibidi-toilet-health-input');
const fontChangerDatalistInput = document.getElementById('fontChangerInput');
const fontSizeInput = document.getElementById('font-size-input');

player.style.width = playerWidth + 'px';
player.style.height = playerHeight + 'px';
skibidiToilet.style.width = skibidiToiletWidth + 'px';
skibidiToilet.style.height = skibidiToiletHeight + 'px';
gameField.style.width = windowResolution[0] + 'px';
gameField.style.height = windowResolution[1] + 'px';
settingsDialogScreen.style.background = 'white';

playerSpeedDisplay.innerHTML = playerSpeed;
resolutionDisplay.innerHTML = windowResolution[0] + '×' + windowResolution[1];
playerScoreDisplay.innerHTML = score;

const tryAgain = () => location.reload();

function checkSkibidiMusic() {
    if (isMusicCheckBox.checked) {
        skibidiToiletOriginalSong.play();
        log('Server: Skibidi toilet song have turned on.');
    } else {
        skibidiToiletOriginalSong.pause();
        skibidiToiletOriginalSong.currentTime = 0;
        log('Server: Skibidi toilet song have turned off.');
    }
}

function checkTheme() {
    if (settingsDialogScreen.style.background === 'white') {
        settingsDialogScreen.style.background = 'grey';
        changeThemeSettingsMenuButton.innerHTML = 'Light';
        changeThemeSettingsMenuButton.style.background = 'white';
        changeThemeSettingsMenuButton.style.color = 'grey';
        playerLoseDialogScreen.style.background = 'grey';
        playerWonDialogScreen.style.background = 'grey';
        settingsDialogScreen.style.transition = 'all 1s 0.2s';
        log('Server: Settings menu dark theme turned on.');
    } else {
        settingsDialogScreen.style.background = 'white';
        changeThemeSettingsMenuButton.innerHTML = 'Dark';
        changeThemeSettingsMenuButton.style.background = 'grey';
        changeThemeSettingsMenuButton.style.color = 'white';
        playerLoseDialogScreen.style.background = 'white';
        playerWonDialogScreen.style.background = 'white';
        log('Server: Settings menu dark theme turned off.');
    }
}

setInterval(() => {
    playerImage.width = playerWidth;
    playerImage.height = playerHeight;
    skibidiToiletImage.width = skibidiToiletWidth;
    skibidiToiletImage.height = skibidiToiletHeight;
}, 100);

scoreInterval = setInterval(() => {
    score++;
    playerScoreDisplay.innerHTML = score;
}, 1500);

setInterval(() => playerPositionXDisplay.innerHTML = parseInt(player.style.left), 80);
setInterval(() => playerHealthDisplay.innerHTML = playerHealth, 100);
setInterval(() => playerHealthDisplayContainer.innerHTML = playerHealth, 100);
setInterval(() => playerWidthDisplay.innerHTML = playerWidth, 100);
setInterval(() => playerHeightDisplay.innerHTML = playerHeight, 100);

log('Server: Succesfully joined the game.');

player.style.top = parseInt(gameField.style.height) - parseInt(player.style.height) - 30 + 'px';
skibidiToilet.style.top = parseInt(gameField.style.height) - parseInt(skibidiToilet.style.height) - 100 + 'px';
skibidiToilet.style.left = parseInt(gameField.style.width) - parseInt(skibidiToilet.style.width) + 'px';

if (!player.style.left) player.style.left = 0;

function setEntitySize(entity) {
    if (entity === 'player') {
        playerWidth = playerWidthInput.value;
        playerHeight = playerHeightInput.value;
        log(`Server: Player size changed to ${playerWidthInput.value}×${playerHeightInput.value}.`);
    } else if (entity === 'skibidiToilet') {
        skibidiToiletWidth = skibidiToiletWidthInput.value;
        skibidiToiletHeight = skibidiToiletHeightInput.value;
        log(`Server: Toilet size changed to ${skibidiToiletWidthInput.value}×${skibidiToiletHeightInput.value}.`);
    }
}

function setEntityHealth(entity) {
    if (entity === 'player') {
        playerHealth = playerHealthInput.value;
        log(`Server: Player health changed to ${playerHealthInput.value}.`);
    }
    else if (entity === 'skibidiToilet') {
        skibidiToiletHealth = skibidiToiletHealthInput.value;
        log(`Server: Toilet health changed to ${skibidiToiletHealthInput.value}.`);
    }
}

function setGameKeyBinds() {
    settingsMenuKey = menuKeyInput.value;
    attackKey = attackKeyInput.value;
    forwardKey = forwardKeyInput.value;
    backKey = backKeyInput.value;
    jumpKey = jumpKeyInput.value;
    log(`Server: Your keybinds have been set to: \nSettings menu: ${menuKeyInput.value.toUpperCase()}, \nAttack: ${attackKeyInput.value.toUpperCase()}, \nForward: ${forwardKeyInput.value.toUpperCase()}, \nBack: ${backKeyInput.value.toUpperCase()}, \nJump: ${jumpKeyInput.value.toUpperCase()}.`);
}

const setChosenFont = () => {
    document.body.style.fontFamily = fontChangerDatalistInput.value;
    log(`Server: Font changed to ${fontChangerDatalistInput.value}.`);
}
const setChosenFontSize = () => {
    document.body.style.fontSize = `${fontSizeInput.value}px`; 
    log(`Server: Font size changed to ${fontSizeInput.value}.`);
}
const setPlayerSpeed = () => {
    playerSpeed = playerSpeedInputRange.value; 
    log(`Server: Player speed changed to ${playerSpeedInputRange.value}.`);
}

function checkPlayerCheating() {
    if (parseInt(player.style.left) < 0) {
        player.style.left = 0;
        warn('Server: Please stop cheating.');
    } else if (parseInt(player.style.left) > (windowResolution[0] - parseInt(player.style.width))) {
        player.style.left = windowResolution[0] - parseInt(player.style.width) + 'px';
        warn('Server: Please stop cheating.');
    }
}
setInterval(checkPlayerCheating, 0);

function getKeyboardEvents(event) {
    const currentPlayerPosX = parseInt(player.style.left);

    switch(event.key) {
        case settingsMenuKey:
            event.preventDefault();
            if (!settingsDialogScreen.open) {
                player.hidden = true;
                skibidiToilet.hidden = true;
                settingsDialogScreen.showModal();
                log('Server: Settings menu turned on.');
                } else {
                player.hidden = false;
                skibidiToilet.hidden = false;
                settingsDialogScreen.close();
                log('Server: Settings menu turned off.');
                }
            break;
        case attackKey:
            addAction({entity: player, action: 'attack', miscProperty: currentPlayerPosX + 30});
            break;
        case forwardKey:
            addAction({entity: player, action: 'go_forward', miscProperty: currentPlayerPosX});
            break;
        case backKey:
            addAction({entity: player, action: 'go_back', miscProperty: currentPlayerPosX});
            break;
        case jumpKey:
            addAction({entity: player, action: 'jump', miscProperty: 550});
            break;
            
        // For TV Players     
        case settingsMenuKeyTV:
            event.preventDefault();
            if (!settingsDialogScreen.open) {
                player.hidden = true;
                skibidiToilet.hidden = true;
                settingsDialogScreen.showModal();
                log('Server: Settings menu turned on.');
                } else {
                player.hidden = false;
                skibidiToilet.hidden = false;
                settingsDialogScreen.close();
                log('Server: Settings menu turned off.');
                }
            break;
        case attackKeyTV:
            addAction({entity: player, action: 'attack', miscProperty: currentPlayerPosX + 30});
            break;
        case forwardKeyTV:
            addAction({entity: player, action: 'go_forward', miscProperty: currentPlayerPosX});
            break;
        case backKeyTV:
            addAction({entity: player, action: 'go_back', miscProperty: currentPlayerPosX});
            break;
        case jumpKeyTV:
            addAction({entity: player, action: 'jump', miscProperty: 550});
            break;
    }
}

window.addEventListener('keydown', getKeyboardEvents);
window.addEventListener('contextmenu', e => e.preventDefault());

function addAction(props) {
    if (props.action === 'go_forward') {
        props.entity.style.left = (props.miscProperty + playerSpeed) + 'px';
    } else if (props.action === 'go_back') {
        props.entity.style.left = (props.miscProperty - playerSpeed) + 'px';
    } else if (props.action === 'jump') {
        setTimeout(() => {
            props.entity.classList.add('entity-jump');
            playerPositionYDisplay.innerHTML = 2;
        }, 0);
        setTimeout(() => {
            props.entity.classList.remove('entity-jump');
            playerPositionYDisplay.innerHTML = 0;
        }, props.miscProperty);
    } else if (props.action === 'attack') {
        setTimeout(() => {
            const playerBullet = document.createElement('div');
            gameField.appendChild(playerBullet);
            playerBullet.classList.add('playerBullet');
            playerBullet.style.top = parseInt(player.style.top) - 260 + 'px';
            playerBullet.style.left = parseInt(player.style.left) + 30 + 'px';
            setTimeout(() => {
                playerBullet.classList.add('playerBulletAnimation');
                setTimeout(() => playerBullet.hidden = true, 1000);

                function checkBulletCollision() {
                    if (isColliding(skibidiToilet, playerBullet)) {
                        tvManShootingSound.play();
                        damage('skibidiToilet');
                        skibidiToiletHealth--;
                        log(`Server: Skibidi toilet has ${skibidiToiletHealth} hearts.`);
                        return;
                    }
                    requestAnimationFrame(checkBulletCollision);
                }
                checkBulletCollision();

            }, 1000);
        }, 1000);

    }
}

function addSkibidiToiletAnimation() {
    skibidiToilet.classList.add('skibidiAnimation');
    log(`Server: Skibidi toilet animation enabled.`);
    setTimeout(() => {
        skibidiToilet.classList.remove('skibidiAnimation');
    }, skibidiToiletJumpAnimationDuration);
}
addSkibidiToiletAnimation();

function skibidiAttack() {
        setTimeout(() => {
            const bullet = document.createElement('div');
            gameField.appendChild(bullet);
            bullet.classList.add('bullet');
            bullet.style.top = parseInt(gameField.style.height) - parseInt(skibidiToiletImage.height) - 180 + 'px';
            bullet.style.left = parseInt(gameField.style.width) - parseInt(skibidiToiletImage.width) - 15 + 'px';
            setTimeout(() => bullet.hidden = true, 15000);
            setTimeout(() => bullet.hidden = false, 20000);
            setTimeout(() => {
                bullet.classList.add('bulletAnimation');

                function checkBulletCollision() {
                    if (isColliding(player, bullet)) {
                        damage('player');
                        playerHealth--;
                        log(`Server: You have ${playerHealth} hearts.`);
                    }
                    requestAnimationFrame(checkBulletCollision);
                }
                checkBulletCollision();

            }, 1200);
        }, 10000);
}
skibidiAttack();

function damage(entity) {
    if (entity === 'player') {
        playerImage.src = 'damaged-tv-man.png';
        setTimeout(() => playerImage.src = 'tv-man.png', 700);
    } else if (entity === 'skibidiToilet') {
        skibidiToiletImage.src = 'damaged-skibidi-toilet.gif';
        setTimeout(() => skibidiToiletImage.src = 'skibidi-toilet.gif', 700);
    }
}

function checkEntityHealth() {
    if (gameEnded) return;

    if (playerHealth <= 0) {
        clearInterval(scoreInterval);
        player.hidden = true;
        skibidiToilet.hidden = true;
        scoreDisplayTitleOnScreen.innerHTML = score;
        playerLoseDialogScreen.showModal();
        gameEnded = true;
        log(`Server: You lose. Thanks for playing!`);
    } else if (skibidiToiletHealth <= 0) {
        clearInterval(scoreInterval);
        player.hidden = true;
        skibidiToilet.hidden = true;
        playerWonDialogScreen.showModal();
        gameEnded = true;
        log(`Server: You won. Thanks for playing!`);
    }
}
setInterval(checkEntityHealth, 100);

function addSkibidiToiletFlyingAnimation() {
    skibidiToilet.classList.add('skibidiToiletFlyingAnimation');
    log(`Server: Skibidi toilet flying animation enabled.`);
    setTimeout(() => skibidiToilet.classList.remove('skibidiToiletFlyingAnimation'), 6000);
}
setInterval(addSkibidiToiletFlyingAnimation, 58000);

function isColliding(item1, item2) {
    const i1 = item1.getBoundingClientRect();
    const i2 = item2.getBoundingClientRect();

    return !(i1.right < i2.left ||
                i1.left > i2.right ||
                i1.bottom < i2.top ||
                i1.top > i2.bottom);
}