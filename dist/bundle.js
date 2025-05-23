/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/game/Car.ts":
/*!*************************!*\
  !*** ./src/game/Car.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Car: () => (/* binding */ Car)
/* harmony export */ });
class Car {
    constructor(x, y, speed, carType) {
        this.width = 80;
        this.height = 40;
        this.isSlowed = false;
        this.slowTimer = 0;
        this.slowDuration = 3; // seconds
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.originalSpeed = speed;
        // Assign a color based on car type
        switch (carType) {
            case 'car1':
                this.carColor = '#ff0000'; // Red
                break;
            case 'car2':
                this.carColor = '#0000ff'; // Blue
                break;
            case 'car3':
                this.carColor = '#ffcc00'; // Yellow
                break;
            default:
                this.carColor = '#888888'; // Gray
        }
    }
    update(deltaTime) {
        // Move car based on its speed
        this.x += this.speed * deltaTime;
        // Handle slow effect timer
        if (this.isSlowed) {
            this.slowTimer -= deltaTime;
            if (this.slowTimer <= 0) {
                this.isSlowed = false;
                this.speed = this.originalSpeed;
            }
        }
    }
    draw(ctx) {
        // Determine if the car is facing left or right
        const isRightFacing = this.speed > 0;
        // Save the current context state
        ctx.save();
        // Draw car body
        ctx.fillStyle = this.carColor;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        // Draw car details (windows, lights, etc.)
        ctx.fillStyle = '#222222'; // Darker color for details
        // Draw windows
        const windowWidth = this.width * 0.5;
        const windowHeight = this.height * 0.5;
        const windowX = this.x - windowWidth / 2;
        const windowY = this.y - windowHeight / 2;
        ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
        // Draw wheels
        const wheelRadius = this.height * 0.25;
        const wheelOffsetX = this.width * 0.3;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(this.x - wheelOffsetX, this.y + this.height * 0.3, wheelRadius, 0, Math.PI * 2);
        ctx.arc(this.x + wheelOffsetX, this.y + this.height * 0.3, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        // Draw headlights/taillights
        const lightRadius = this.height * 0.1;
        const lightOffsetX = this.width * 0.4;
        const lightOffsetY = this.height * 0.1;
        if (isRightFacing) {
            // Headlights (white) on right, taillights (red) on left
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x + lightOffsetX, this.y - lightOffsetY, lightRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(this.x - lightOffsetX, this.y - lightOffsetY, lightRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        else {
            // Headlights (white) on left, taillights (red) on right
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.x - lightOffsetX, this.y - lightOffsetY, lightRadius, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#ff0000';
            ctx.beginPath();
            ctx.arc(this.x + lightOffsetX, this.y - lightOffsetY, lightRadius, 0, Math.PI * 2);
            ctx.fill();
        }
        // Restore the context state
        ctx.restore();
        // Draw slow effect indicator if car is slowed
        if (this.isSlowed) {
            this.drawSlowEffect(ctx);
        }
    }
    drawSlowEffect(ctx) {
        // Draw a green haze around the car
        ctx.fillStyle = 'rgba(100, 200, 50, 0.3)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width * 0.7, this.height * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    slowDown() {
        if (!this.isSlowed) {
            this.isSlowed = true;
            this.speed = this.originalSpeed * 0.4; // Slow to 40% of original speed
            this.slowTimer = this.slowDuration;
        }
        else {
            // Extend slow duration if already slowed
            this.slowTimer = this.slowDuration;
        }
    }
    isOffScreen() {
        const buffer = 100; // Extra distance to travel before being removed
        if (this.speed > 0) {
            // Moving right
            return this.x - this.width / 2 > 800 + buffer; // Assuming canvas width is 800
        }
        else {
            // Moving left
            return this.x + this.width / 2 < -buffer;
        }
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}


/***/ }),

/***/ "./src/game/FartCloud.ts":
/*!*******************************!*\
  !*** ./src/game/FartCloud.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FartCloud: () => (/* binding */ FartCloud)
/* harmony export */ });
class FartCloud {
    constructor(x, y, width, height, lifetime) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifetime = lifetime;
        this.maxLifetime = lifetime;
        this.dissipationRate = 1; // How fast the cloud dissipates
        // Random greenish-brown color for the fart cloud
        const greenComponent = Math.floor(Math.random() * 100) + 100;
        const redComponent = Math.floor(Math.random() * 50) + 100;
        this.color = `rgba(${redComponent}, ${greenComponent}, 50, 0.7)`;
    }
    update(deltaTime) {
        // Reduce lifetime
        this.lifetime -= deltaTime * this.dissipationRate;
        // Make cloud grow slightly as it dissipates
        this.width += deltaTime * 5;
        this.height += deltaTime * 5;
    }
    draw(ctx) {
        // Calculate opacity based on remaining lifetime
        const opacity = (this.lifetime / this.maxLifetime) * 0.7;
        // Update color with new opacity
        const baseColor = this.color.substring(0, this.color.lastIndexOf(',') + 1);
        const cloudColor = `${baseColor} ${opacity})`;
        // Draw cloud as a semi-transparent circle
        ctx.fillStyle = cloudColor;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, Math.PI * 2);
        ctx.fill();
    }
    isDissipated() {
        return this.lifetime <= 0;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}


/***/ }),

/***/ "./src/game/FartType.ts":
/*!******************************!*\
  !*** ./src/game/FartType.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FartType: () => (/* binding */ FartType)
/* harmony export */ });
var FartType;
(function (FartType) {
    FartType["SHORT_FART"] = "SHORT_FART";
    FartType["LONG_FART"] = "LONG_FART";
    FartType["CIRCLE_FART"] = "CIRCLE_FART";
    FartType["SUPER_FART"] = "SUPER_FART";
    FartType["MEGA_FART"] = "MEGA_FART";
    FartType["ULTRA_FART"] = "ULTRA_FART";
})(FartType || (FartType = {}));


/***/ }),

/***/ "./src/game/Frog.ts":
/*!**************************!*\
  !*** ./src/game/Frog.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Frog: () => (/* binding */ Frog)
/* harmony export */ });
/* harmony import */ var _FartType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FartType */ "./src/game/FartType.ts");
/* harmony import */ var _FartCloud__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./FartCloud */ "./src/game/FartCloud.ts");


class Frog {
    constructor(x, y, canvas) {
        this.width = 40;
        this.height = 40;
        this.speed = 5;
        this.fartPower = 1;
        this.currentFartType = _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART;
        this.isAlive = true;
        this.isFarting = false;
        this.fartAnimationTimer = 0;
        this.fartAnimationDuration = 0.3; // seconds
        this.fartClouds = [];
        this.x = x;
        this.y = y;
        this.canvas = canvas;
    }
    update(deltaTime) {
        if (!this.isAlive)
            return;
        // Handle fart animation
        if (this.isFarting) {
            this.fartAnimationTimer += deltaTime;
            if (this.fartAnimationTimer >= this.fartAnimationDuration) {
                this.isFarting = false;
                this.fartAnimationTimer = 0;
            }
        }
        // Update fart clouds
        for (let i = this.fartClouds.length - 1; i >= 0; i--) {
            this.fartClouds[i].update(deltaTime);
            if (this.fartClouds[i].isDissipated()) {
                this.fartClouds.splice(i, 1);
            }
        }
    }
    draw(ctx) {
        // Draw fart clouds behind the frog
        this.fartClouds.forEach(cloud => cloud.draw(ctx));
        // Draw frog as a basic shape
        ctx.save();
        // Draw the frog body
        ctx.fillStyle = !this.isAlive ? '#888888' : (this.isFarting ? '#77CC77' : '#55AA55');
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Draw eyes
        const eyeRadius = this.width / 10;
        const eyeOffsetX = this.width / 4;
        const eyeOffsetY = -this.height / 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x - eyeOffsetX, this.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        ctx.arc(this.x + eyeOffsetX, this.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
        // Draw pupils
        ctx.fillStyle = '#000000';
        const pupilRadius = eyeRadius / 2;
        ctx.beginPath();
        ctx.arc(this.x - eyeOffsetX, this.y + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        ctx.arc(this.x + eyeOffsetX, this.y + eyeOffsetY, pupilRadius, 0, Math.PI * 2);
        ctx.fill();
        // Draw a smile or sad face based on alive status
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 2;
        ctx.beginPath();
        if (this.isAlive) {
            // Happy smile
            ctx.arc(this.x, this.y + this.height / 8, this.width / 4, 0, Math.PI);
        }
        else {
            // Sad face / X eyes
            ctx.moveTo(this.x - eyeOffsetX - eyeRadius, this.y + eyeOffsetY - eyeRadius);
            ctx.lineTo(this.x - eyeOffsetX + eyeRadius, this.y + eyeOffsetY + eyeRadius);
            ctx.moveTo(this.x - eyeOffsetX + eyeRadius, this.y + eyeOffsetY - eyeRadius);
            ctx.lineTo(this.x - eyeOffsetX - eyeRadius, this.y + eyeOffsetY + eyeRadius);
            ctx.moveTo(this.x + eyeOffsetX - eyeRadius, this.y + eyeOffsetY - eyeRadius);
            ctx.lineTo(this.x + eyeOffsetX + eyeRadius, this.y + eyeOffsetY + eyeRadius);
            ctx.moveTo(this.x + eyeOffsetX + eyeRadius, this.y + eyeOffsetY - eyeRadius);
            ctx.lineTo(this.x + eyeOffsetX - eyeRadius, this.y + eyeOffsetY + eyeRadius);
            // Sad mouth
            ctx.moveTo(this.x - this.width / 4, this.y + this.height / 4);
            ctx.quadraticCurveTo(this.x, this.y + this.height / 2, this.x + this.width / 4, this.y + this.height / 4);
        }
        ctx.stroke();
        ctx.restore();
        // Draw current fart type indicator
        this.drawFartTypeIndicator(ctx);
    }
    drawFartTypeIndicator(ctx) {
        if (!this.isAlive)
            return;
        const colors = {
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART]: '#3498db',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART]: '#2ecc71',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART]: '#f1c40f',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART]: '#e74c3c',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART]: '#9b59b6',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART]: '#1abc9c'
        };
        const color = colors[this.currentFartType] || '#3498db';
        // Draw indicator circle above frog
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.height / 2 - 10, 5, 0, Math.PI * 2);
        ctx.fill();
    }
    moveLeft() {
        if (!this.isAlive)
            return;
        this.x -= this.speed;
        // Keep the frog within the canvas bounds
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
    }
    moveRight() {
        if (!this.isAlive)
            return;
        this.x += this.speed;
        // Keep the frog within the canvas bounds
        if (this.x > this.canvas.width - this.width / 2) {
            this.x = this.canvas.width - this.width / 2;
        }
    }
    fart() {
        if (!this.isAlive || this.isFarting)
            return;
        this.isFarting = true;
        this.fartAnimationTimer = 0;
        // Create a fart cloud based on the current fart type
        switch (this.currentFartType) {
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART:
                this.createShortFart();
                this.moveForward(1 * this.fartPower);
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART:
                this.createLongFart();
                this.moveForward(2 * this.fartPower);
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART:
                this.createCircleFart();
                this.moveForward(1.5 * this.fartPower);
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART:
                this.createSuperFart();
                this.moveForward(2.5 * this.fartPower);
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART:
                this.createMegaFart();
                this.moveForward(3 * this.fartPower);
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART:
                this.createUltraFart();
                this.moveForward(4 * this.fartPower);
                break;
        }
    }
    moveForward(amount) {
        this.y -= amount * 20; // Move frog upward (forward)
    }
    createShortFart() {
        const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2, 20, 20, 1.5);
        this.fartClouds.push(cloud);
    }
    createLongFart() {
        // Create a series of clouds in a straight line behind the frog
        for (let i = 0; i < 3; i++) {
            const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2 + i * 15, 20 - i * 2, 20 - i * 2, 2 - i * 0.3);
            this.fartClouds.push(cloud);
        }
    }
    createCircleFart() {
        // Create a circle of fart clouds around the frog
        const numClouds = 8;
        const radius = 30;
        for (let i = 0; i < numClouds; i++) {
            const angle = (i / numClouds) * Math.PI * 2;
            const cloudX = this.x + Math.cos(angle) * radius;
            const cloudY = this.y + Math.sin(angle) * radius;
            const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 15, 15, 2);
            this.fartClouds.push(cloud);
        }
    }
    createSuperFart() {
        // Create a more powerful straight line fart
        for (let i = 0; i < 5; i++) {
            const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2 + i * 15, 25 - i * 2, 25 - i * 2, 2.5 - i * 0.2);
            this.fartClouds.push(cloud);
        }
    }
    createMegaFart() {
        // Create a large explosion of fart clouds
        const numClouds = 12;
        const radius = 40;
        for (let i = 0; i < numClouds; i++) {
            const angle = (i / numClouds) * Math.PI * 2;
            const cloudX = this.x + Math.cos(angle) * radius;
            const cloudY = this.y + Math.sin(angle) * radius;
            const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 20, 20, 3);
            this.fartClouds.push(cloud);
        }
    }
    createUltraFart() {
        // Create an ultra-powerful fart with multiple expanding rings
        for (let ring = 1; ring <= 3; ring++) {
            const numClouds = 8;
            const radius = 20 * ring;
            for (let i = 0; i < numClouds; i++) {
                const angle = (i / numClouds) * Math.PI * 2;
                const cloudX = this.x + Math.cos(angle) * radius;
                const cloudY = this.y + Math.sin(angle) * radius;
                const cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 25 - ring * 3, 25 - ring * 3, 4 - ring * 0.5);
                this.fartClouds.push(cloud);
            }
        }
    }
    hit() {
        this.isAlive = false;
    }
    collectPowerUp(fartType) {
        this.currentFartType = fartType;
        // Increase fart power temporarily
        this.fartPower = 1.5;
        // Reset fart power after a few seconds
        setTimeout(() => {
            this.fartPower = 1;
        }, 5000);
    }
    reset(x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = true;
        this.isFarting = false;
        this.currentFartType = _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART;
        this.fartPower = 1;
        this.fartClouds = [];
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
    getCurrentFartType() {
        return this.currentFartType;
    }
    getFartClouds() {
        return this.fartClouds;
    }
}


/***/ }),

/***/ "./src/game/Game.ts":
/*!**************************!*\
  !*** ./src/game/Game.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Game: () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _Frog__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Frog */ "./src/game/Frog.ts");
/* harmony import */ var _Car__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Car */ "./src/game/Car.ts");
/* harmony import */ var _PowerUp__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PowerUp */ "./src/game/PowerUp.ts");
/* harmony import */ var _FartType__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./FartType */ "./src/game/FartType.ts");
/* harmony import */ var _Level__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Level */ "./src/game/Level.ts");
/* harmony import */ var _utils_InputHandler__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/InputHandler */ "./src/utils/InputHandler.ts");
/* harmony import */ var _utils_CollisionDetector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/CollisionDetector */ "./src/utils/CollisionDetector.ts");
/* harmony import */ var _utils_SoundManager__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/SoundManager */ "./src/utils/SoundManager.ts");
/* harmony import */ var _utils_HighScoreManager__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/HighScoreManager */ "./src/utils/HighScoreManager.ts");









class Game {
    constructor() {
        this.cars = [];
        this.powerUps = [];
        this.fartClouds = [];
        this.score = 0;
        this.level = 1;
        this.time = 60;
        this.isGameOver = false;
        this.isGameRunning = false;
        this.lastTimestamp = 0;
        this.levels = [];
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.inputHandler = new _utils_InputHandler__WEBPACK_IMPORTED_MODULE_5__.InputHandler();
        this.collisionDetector = new _utils_CollisionDetector__WEBPACK_IMPORTED_MODULE_6__.CollisionDetector();
        this.soundManager = new _utils_SoundManager__WEBPACK_IMPORTED_MODULE_7__.SoundManager();
        this.highScoreManager = new _utils_HighScoreManager__WEBPACK_IMPORTED_MODULE_8__.HighScoreManager();
    }
    initialize() {
        // Set up event listeners for buttons
        const startButton = document.getElementById('start-button');
        const restartButton = document.getElementById('restart-button');
        if (startButton) {
            startButton.addEventListener('click', () => this.startGame());
        }
        if (restartButton) {
            restartButton.addEventListener('click', () => this.restartGame());
        }
        // Initialize levels
        this.initializeLevels();
        // Display high scores
        this.displayHighScores();
        // Load sounds
        this.soundManager.loadSounds();
    }
    initializeLevels() {
        // Create different levels with increasing difficulty
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(1, 2, 1, 1)); // Level 1: slow cars, few cars, few power-ups
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(2, 3, 1.5, 2)); // Level 2: more cars, faster, more power-ups
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(3, 4, 2, 2)); // Level 3: even more cars, even faster
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(4, 5, 2.5, 3)); // Level 4: lots of cars, very fast
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(5, 6, 3, 3)); // Level 5: extreme difficulty
    }
    startGame() {
        // Hide start screen
        const startScreen = document.getElementById('start-screen');
        if (startScreen) {
            startScreen.style.display = 'none';
        }
        // Reset game state
        this.score = 0;
        this.level = 1;
        this.time = 60;
        this.isGameOver = false;
        this.isGameRunning = true;
        this.cars = [];
        this.powerUps = [];
        this.fartClouds = [];
        // Set current level
        this.currentLevel = this.levels[0];
        // Create player
        this.frog = new _Frog__WEBPACK_IMPORTED_MODULE_0__.Frog(this.canvas.width / 2, this.canvas.height - 50, this.canvas);
        // Start game loop
        window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
    gameLoop(timestamp) {
        if (!this.isGameRunning)
            return;
        // Calculate delta time (time since last frame)
        const deltaTime = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 1000 : 0;
        this.lastTimestamp = timestamp;
        // Update game timer
        this.updateTimer(deltaTime);
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Update and draw game objects
        this.update(deltaTime);
        this.draw();
        // Check for collisions
        this.checkCollisions();
        // Check for level completion
        this.checkLevelCompletion();
        // Update input handler for next frame
        this.inputHandler.update();
        // Check for game over conditions
        if (this.time <= 0) {
            this.gameOver();
        }
        else if (!this.isGameOver) {
            // Continue the game loop if not game over
            window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
        }
    }
    update(deltaTime) {
        // Handle inputs
        if (this.inputHandler.isKeyDown('ArrowLeft')) {
            this.frog.moveLeft();
        }
        if (this.inputHandler.isKeyDown('ArrowRight')) {
            this.frog.moveRight();
        }
        if (this.inputHandler.isKeyPressed(' ')) {
            this.frog.fart();
        }
        // Update frog
        this.frog.update(deltaTime);
        // Spawn cars based on level difficulty
        this.spawnCars(deltaTime);
        // Spawn power-ups occasionally
        this.spawnPowerUps(deltaTime);
        // Update cars
        this.cars.forEach((car, index) => {
            car.update(deltaTime);
            // Remove cars that are off-screen
            if (car.isOffScreen()) {
                this.cars.splice(index, 1);
                this.increaseScore(10); // Points for avoiding a car
            }
        });
        // Update power-ups
        this.powerUps.forEach((powerUp, index) => {
            powerUp.update(deltaTime);
            // Remove power-ups that are off-screen
            if (powerUp.isOffScreen()) {
                this.powerUps.splice(index, 1);
            }
        });
        // Update fart clouds
        this.fartClouds.forEach((cloud, index) => {
            cloud.update(deltaTime);
            // Remove clouds that have dissipated
            if (cloud.isDissipated()) {
                this.fartClouds.splice(index, 1);
            }
        });
    }
    draw() {
        // Draw background
        this.drawBackground();
        // Draw game objects
        this.cars.forEach(car => car.draw(this.ctx));
        this.powerUps.forEach(powerUp => powerUp.draw(this.ctx));
        this.fartClouds.forEach(cloud => cloud.draw(this.ctx));
        this.frog.draw(this.ctx);
        // Update UI elements
        this.updateUIElements();
    }
    drawBackground() {
        // Draw road and lanes
        this.ctx.fillStyle = '#444444';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw lane markings
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.setLineDash([20, 15]);
        const laneHeight = this.canvas.height / 6;
        for (let i = 1; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, laneHeight * i);
            this.ctx.lineTo(this.canvas.width, laneHeight * i);
            this.ctx.stroke();
        }
        // Reset line dash
        this.ctx.setLineDash([]);
    }
    spawnCars(deltaTime) {
        // Probability of spawning a new car depends on level difficulty
        const spawnChance = this.currentLevel.carSpawnRate * deltaTime;
        if (Math.random() < spawnChance) {
            const laneHeight = this.canvas.height / 6;
            const lane = Math.floor(Math.random() * 5) + 1; // Lanes 1-5
            const yPosition = lane * laneHeight - laneHeight / 2;
            // Alternate direction based on lane
            const isLeftToRight = lane % 2 === 0;
            const xPosition = isLeftToRight ? -50 : this.canvas.width + 50;
            // Random car speed based on level difficulty
            const speed = (isLeftToRight ? 1 : -1) *
                (this.currentLevel.carSpeed * 100 * (0.8 + Math.random() * 0.4));
            const car = new _Car__WEBPACK_IMPORTED_MODULE_1__.Car(xPosition, yPosition, speed, `car${Math.floor(Math.random() * 3) + 1}`);
            this.cars.push(car);
        }
    }
    spawnPowerUps(deltaTime) {
        // Probability of spawning a new power-up depends on level
        const spawnChance = 0.01 * deltaTime * this.currentLevel.powerUpRate;
        if (Math.random() < spawnChance && this.powerUps.length < 3) {
            const x = Math.random() * (this.canvas.width - 40) + 20;
            const y = Math.random() * (this.canvas.height - 100) + 50;
            // Randomly select a fart type for the power-up
            const fartTypes = [
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.SHORT_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.LONG_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.CIRCLE_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.SUPER_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.MEGA_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.ULTRA_FART
            ];
            const randomIndex = Math.floor(Math.random() * fartTypes.length);
            const fartType = fartTypes[randomIndex];
            const powerUp = new _PowerUp__WEBPACK_IMPORTED_MODULE_2__.PowerUp(x, y, fartType);
            this.powerUps.push(powerUp);
        }
    }
    checkCollisions() {
        // Check for collisions between frog and cars
        for (const car of this.cars) {
            if (this.collisionDetector.checkCollision(this.frog, car)) {
                this.frog.hit();
                this.gameOver();
                return;
            }
        }
        // Check for collisions between frog and power-ups
        for (let i = this.powerUps.length - 1; i >= 0; i--) {
            if (this.collisionDetector.checkCollision(this.frog, this.powerUps[i])) {
                const powerUp = this.powerUps[i];
                this.frog.collectPowerUp(powerUp.getFartType());
                this.increaseScore(50); // Points for collecting a power-up
                this.addTime(5); // Add 5 seconds for collecting a power-up
                this.powerUps.splice(i, 1);
            }
        }
        // Check for collisions between fart clouds and cars
        for (const cloud of this.fartClouds) {
            for (let i = this.cars.length - 1; i >= 0; i--) {
                if (this.collisionDetector.checkCollision(cloud, this.cars[i])) {
                    // Slow down cars that hit fart clouds
                    this.cars[i].slowDown();
                    this.increaseScore(15); // Points for slowing a car
                }
            }
        }
    }
    checkLevelCompletion() {
        // Check if player has crossed to the top of the screen
        if (this.frog.getY() <= 30) {
            this.levelComplete();
        }
    }
    levelComplete() {
        // Increase level
        this.level++;
        // Add bonus points for completing level
        const levelBonus = this.level * 100;
        this.increaseScore(levelBonus);
        // Add bonus time
        this.addTime(10);
        // Set new level difficulty
        const levelIndex = Math.min(this.level - 1, this.levels.length - 1);
        this.currentLevel = this.levels[levelIndex];
        // Level completed
        // Reset frog position
        this.frog.reset(this.canvas.width / 2, this.canvas.height - 50);
        // Update level display
        document.getElementById('level').innerText = `Level: ${this.level}`;
    }
    increaseScore(points) {
        this.score += points;
        document.getElementById('score').innerText = `Score: ${this.score}`;
    }
    updateTimer(deltaTime) {
        this.time -= deltaTime;
        if (this.time < 0) {
            this.time = 0;
        }
        document.getElementById('time').innerText = `Time: ${Math.ceil(this.time)}`;
    }
    addTime(seconds) {
        this.time += seconds;
        document.getElementById('time').innerText = `Time: ${Math.ceil(this.time)}`;
    }
    updateUIElements() {
        document.getElementById('score').innerText = `Score: ${this.score}`;
        document.getElementById('time').innerText = `Time: ${Math.ceil(this.time)}`;
        document.getElementById('level').innerText = `Level: ${this.level}`;
    }
    gameOver() {
        this.isGameOver = true;
        this.isGameRunning = false;
        // Show game over screen
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'flex';
        }
        // Update final score
        const finalScoreElement = document.getElementById('final-score');
        if (finalScoreElement) {
            finalScoreElement.innerText = `Final Score: ${this.score}`;
        }
        // Save high score
        this.highScoreManager.addScore(this.score);
        this.displayHighScores();
    }
    restartGame() {
        // Hide game over screen
        const gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }
        // Start a new game
        this.startGame();
    }
    displayHighScores() {
        const scores = this.highScoreManager.getScores();
        const scoresList = document.getElementById('scores-list');
        if (scoresList) {
            scoresList.innerHTML = '';
            scores.slice(0, 5).forEach((score, index) => {
                const scoreElement = document.createElement('div');
                scoreElement.innerText = `${index + 1}. ${score}`;
                scoresList.appendChild(scoreElement);
            });
        }
    }
}


/***/ }),

/***/ "./src/game/Level.ts":
/*!***************************!*\
  !*** ./src/game/Level.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Level: () => (/* binding */ Level)
/* harmony export */ });
class Level {
    constructor(level, carSpawnRate, carSpeed, powerUpRate) {
        this.level = level;
        this.carSpawnRate = carSpawnRate;
        this.carSpeed = carSpeed;
        this.powerUpRate = powerUpRate;
    }
}


/***/ }),

/***/ "./src/game/PowerUp.ts":
/*!*****************************!*\
  !*** ./src/game/PowerUp.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   PowerUp: () => (/* binding */ PowerUp)
/* harmony export */ });
/* harmony import */ var _FartType__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FartType */ "./src/game/FartType.ts");

class PowerUp {
    constructor(x, y, fartType) {
        this.width = 30;
        this.height = 30;
        this.pulseSize = 0;
        this.pulseDirection = 1;
        this.pulseSpeed = 2;
        this.colors = {
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART]: '#3498db',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART]: '#2ecc71',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART]: '#f1c40f',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART]: '#e74c3c',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART]: '#9b59b6',
            [_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART]: '#1abc9c'
        };
        this.x = x;
        this.y = y;
        this.fartType = fartType;
    }
    update(deltaTime) {
        // Create a pulsing effect
        this.pulseSize += this.pulseDirection * this.pulseSpeed * deltaTime;
        if (this.pulseSize > 5) {
            this.pulseDirection = -1;
        }
        else if (this.pulseSize < 0) {
            this.pulseDirection = 1;
        }
    }
    draw(ctx) {
        const color = this.colors[this.fartType];
        // Draw power-up as a colored circle with a pulsing effect
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, (this.width / 2) + this.pulseSize, 0, Math.PI * 2);
        ctx.fill();
        // Draw inner circle
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width / 4, 0, Math.PI * 2);
        ctx.fill();
        // Draw text indicator for fart type
        let label;
        switch (this.fartType) {
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART:
                label = 'S';
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART:
                label = 'L';
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART:
                label = 'C';
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART:
                label = 'SP';
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART:
                label = 'M';
                break;
            case _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART:
                label = 'U';
                break;
        }
        ctx.fillStyle = 'black';
        ctx.font = '10px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(label, this.x, this.y);
    }
    isOffScreen() {
        return this.y > 600 + this.height; // Assuming canvas height is 600
    }
    getFartType() {
        return this.fartType;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getWidth() {
        return this.width;
    }
    getHeight() {
        return this.height;
    }
}


/***/ }),

/***/ "./src/utils/CollisionDetector.ts":
/*!****************************************!*\
  !*** ./src/utils/CollisionDetector.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CollisionDetector: () => (/* binding */ CollisionDetector)
/* harmony export */ });
class CollisionDetector {
    /**
     * Detects collision between two game objects using Axis-Aligned Bounding Box method
     * Both objects must have getX(), getY(), getWidth(), and getHeight() methods
     */
    checkCollision(obj1, obj2) {
        // Get positions and dimensions for both objects
        const obj1X = obj1.getX();
        const obj1Y = obj1.getY();
        const obj1Width = obj1.getWidth();
        const obj1Height = obj1.getHeight();
        const obj2X = obj2.getX();
        const obj2Y = obj2.getY();
        const obj2Width = obj2.getWidth();
        const obj2Height = obj2.getHeight();
        // Calculate bounds for both objects
        const obj1Left = obj1X - obj1Width / 2;
        const obj1Right = obj1X + obj1Width / 2;
        const obj1Top = obj1Y - obj1Height / 2;
        const obj1Bottom = obj1Y + obj1Height / 2;
        const obj2Left = obj2X - obj2Width / 2;
        const obj2Right = obj2X + obj2Width / 2;
        const obj2Top = obj2Y - obj2Height / 2;
        const obj2Bottom = obj2Y + obj2Height / 2;
        // Check for overlap on both axes
        return (obj1Right > obj2Left &&
            obj1Left < obj2Right &&
            obj1Bottom > obj2Top &&
            obj1Top < obj2Bottom);
    }
    /**
     * Checks if a point is inside an object
     */
    isPointInObject(pointX, pointY, obj) {
        const objX = obj.getX();
        const objY = obj.getY();
        const objWidth = obj.getWidth();
        const objHeight = obj.getHeight();
        const objLeft = objX - objWidth / 2;
        const objRight = objX + objWidth / 2;
        const objTop = objY - objHeight / 2;
        const objBottom = objY + objHeight / 2;
        return (pointX >= objLeft &&
            pointX <= objRight &&
            pointY >= objTop &&
            pointY <= objBottom);
    }
}


/***/ }),

/***/ "./src/utils/HighScoreManager.ts":
/*!***************************************!*\
  !*** ./src/utils/HighScoreManager.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   HighScoreManager: () => (/* binding */ HighScoreManager)
/* harmony export */ });
class HighScoreManager {
    constructor() {
        this.STORAGE_KEY = 'fartogger_high_scores';
        this.scores = [];
        this.loadScores();
    }
    /**
     * Add a new score to the high scores list
     */
    addScore(score) {
        this.scores.push(score);
        // Sort scores in descending order
        this.scores.sort((a, b) => b - a);
        // Keep only the top 10 scores
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }
        this.saveScores();
    }
    /**
     * Get all high scores
     */
    getScores() {
        return [...this.scores];
    }
    /**
     * Check if a given score is a high score
     */
    isHighScore(score) {
        // If we have less than 10 scores, any score is a high score
        if (this.scores.length < 10) {
            return true;
        }
        // Otherwise, check if the score is higher than the lowest high score
        return score > this.scores[this.scores.length - 1];
    }
    /**
     * Clear all high scores
     */
    clearScores() {
        this.scores = [];
        this.saveScores();
    }
    /**
     * Load scores from local storage
     */
    loadScores() {
        const storedScores = localStorage.getItem(this.STORAGE_KEY);
        if (storedScores) {
            try {
                this.scores = JSON.parse(storedScores);
            }
            catch (error) {
                console.error('Error parsing stored scores:', error);
                this.scores = [];
            }
        }
    }
    /**
     * Save scores to local storage
     */
    saveScores() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scores));
        }
        catch (error) {
            console.error('Error saving scores:', error);
        }
    }
}


/***/ }),

/***/ "./src/utils/InputHandler.ts":
/*!***********************************!*\
  !*** ./src/utils/InputHandler.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   InputHandler: () => (/* binding */ InputHandler)
/* harmony export */ });
class InputHandler {
    constructor() {
        this.keys = new Map();
        this.keysPressedThisFrame = new Set();
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseClicked = false;
        // Set up event listeners for keyboard
        window.addEventListener('keydown', (event) => {
            this.keys.set(event.key, true);
            this.keysPressedThisFrame.add(event.key);
        });
        window.addEventListener('keyup', (event) => {
            this.keys.set(event.key, false);
        });
        // Set up event listeners for mouse
        window.addEventListener('mousemove', (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        });
        window.addEventListener('mousedown', () => {
            this.mouseClicked = true;
        });
        window.addEventListener('mouseup', () => {
            this.mouseClicked = false;
        });
    }
    isKeyDown(key) {
        return this.keys.get(key) === true;
    }
    isKeyPressed(key) {
        const isPressed = this.keysPressedThisFrame.has(key);
        // Remove the key from the set once it's been checked
        // to ensure it's only reported as pressed once
        if (isPressed) {
            this.keysPressedThisFrame.delete(key);
        }
        return isPressed;
    }
    isMouseClicked() {
        const wasClicked = this.mouseClicked;
        // Reset mouse clicked state to ensure it's only reported once
        this.mouseClicked = false;
        return wasClicked;
    }
    getMouseX() {
        return this.mouseX;
    }
    getMouseY() {
        return this.mouseY;
    }
    update() {
        // Clear keys pressed this frame
        this.keysPressedThisFrame.clear();
    }
}


/***/ }),

/***/ "./src/utils/SoundManager.ts":
/*!***********************************!*\
  !*** ./src/utils/SoundManager.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SoundManager: () => (/* binding */ SoundManager)
/* harmony export */ });
/**
 * A no-op sound manager as per request to remove sound from the game
 */
class SoundManager {
    constructor() {
        // No sounds to initialize
    }
    loadSounds() {
        // No-op
    }
    playBackgroundMusic() {
        // No-op
    }
    stopBackgroundMusic() {
        // No-op
    }
    playFartSound(fartType) {
        // No-op
    }
    playHitSound() {
        // No-op
    }
    playPowerUpSound() {
        // No-op
    }
    playLevelCompleteSound() {
        // No-op
    }
    playGameOverSound() {
        // No-op
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game_Game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game/Game */ "./src/game/Game.ts");
/**
 * Fartogger - A Frogger-like game with farting mechanics
 * Main entry point file
 */

// Wait for the DOM to load before initializing the game
window.addEventListener('load', () => {
    const game = new _game_Game__WEBPACK_IMPORTED_MODULE_0__.Game();
    game.initialize();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUU3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUM3RSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsVUFBVSxHQUFHLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLENBQUMsQ0FBQztZQUU3RSxZQUFZO1lBQ1osR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztZQUM5RCxHQUFHLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMs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cmMvZ2FtZS9DYXIudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL2dhbWUvRmFydENsb3VkLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy9nYW1lL0ZhcnRUeXBlLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy9nYW1lL0Zyb2cudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL2dhbWUvR2FtZS50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvZ2FtZS9MZXZlbC50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvZ2FtZS9Qb3dlclVwLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy91dGlscy9Db2xsaXNpb25EZXRlY3Rvci50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvdXRpbHMvSGlnaFNjb3JlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvdXRpbHMvSW5wdXRIYW5kbGVyLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy91dGlscy9Tb3VuZE1hbmFnZXIudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2ZhcnRvZ2dlci93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL2luZGV4LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBDYXIge1xuICBwcml2YXRlIHg6IG51bWJlcjtcbiAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDgwO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gNDA7XG4gIHByaXZhdGUgc3BlZWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBvcmlnaW5hbFNwZWVkOiBudW1iZXI7XG4gIHByaXZhdGUgY2FyQ29sb3I6IHN0cmluZztcbiAgcHJpdmF0ZSBpc1Nsb3dlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIHNsb3dUaW1lcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBzbG93RHVyYXRpb246IG51bWJlciA9IDM7IC8vIHNlY29uZHNcbiAgXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBzcGVlZDogbnVtYmVyLCBjYXJUeXBlOiBzdHJpbmcpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xuICAgIHRoaXMub3JpZ2luYWxTcGVlZCA9IHNwZWVkO1xuICAgIFxuICAgIC8vIEFzc2lnbiBhIGNvbG9yIGJhc2VkIG9uIGNhciB0eXBlXG4gICAgc3dpdGNoKGNhclR5cGUpIHtcbiAgICAgIGNhc2UgJ2NhcjEnOlxuICAgICAgICB0aGlzLmNhckNvbG9yID0gJyNmZjAwMDAnOyAvLyBSZWRcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjYXIyJzpcbiAgICAgICAgdGhpcy5jYXJDb2xvciA9ICcjMDAwMGZmJzsgLy8gQmx1ZVxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NhcjMnOlxuICAgICAgICB0aGlzLmNhckNvbG9yID0gJyNmZmNjMDAnOyAvLyBZZWxsb3dcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aGlzLmNhckNvbG9yID0gJyM4ODg4ODgnOyAvLyBHcmF5XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gTW92ZSBjYXIgYmFzZWQgb24gaXRzIHNwZWVkXG4gICAgdGhpcy54ICs9IHRoaXMuc3BlZWQgKiBkZWx0YVRpbWU7XG4gICAgXG4gICAgLy8gSGFuZGxlIHNsb3cgZWZmZWN0IHRpbWVyXG4gICAgaWYgKHRoaXMuaXNTbG93ZWQpIHtcbiAgICAgIHRoaXMuc2xvd1RpbWVyIC09IGRlbHRhVGltZTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMuc2xvd1RpbWVyIDw9IDApIHtcbiAgICAgICAgdGhpcy5pc1Nsb3dlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNwZWVkID0gdGhpcy5vcmlnaW5hbFNwZWVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIGNhciBpcyBmYWNpbmcgbGVmdCBvciByaWdodFxuICAgIGNvbnN0IGlzUmlnaHRGYWNpbmcgPSB0aGlzLnNwZWVkID4gMDtcbiAgICBcbiAgICAvLyBTYXZlIHRoZSBjdXJyZW50IGNvbnRleHQgc3RhdGVcbiAgICBjdHguc2F2ZSgpO1xuICAgIFxuICAgIC8vIERyYXcgY2FyIGJvZHlcbiAgICBjdHguZmlsbFN0eWxlID0gdGhpcy5jYXJDb2xvcjtcbiAgICBjdHguZmlsbFJlY3QodGhpcy54IC0gdGhpcy53aWR0aCAvIDIsIHRoaXMueSAtIHRoaXMuaGVpZ2h0IC8gMiwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIFxuICAgIC8vIERyYXcgY2FyIGRldGFpbHMgKHdpbmRvd3MsIGxpZ2h0cywgZXRjLilcbiAgICBjdHguZmlsbFN0eWxlID0gJyMyMjIyMjInOyAvLyBEYXJrZXIgY29sb3IgZm9yIGRldGFpbHNcbiAgICBcbiAgICAvLyBEcmF3IHdpbmRvd3NcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHRoaXMud2lkdGggKiAwLjU7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gdGhpcy5oZWlnaHQgKiAwLjU7XG4gICAgY29uc3Qgd2luZG93WCA9IHRoaXMueCAtIHdpbmRvd1dpZHRoIC8gMjtcbiAgICBjb25zdCB3aW5kb3dZID0gdGhpcy55IC0gd2luZG93SGVpZ2h0IC8gMjtcbiAgICBjdHguZmlsbFJlY3Qod2luZG93WCwgd2luZG93WSwgd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCk7XG4gICAgXG4gICAgLy8gRHJhdyB3aGVlbHNcbiAgICBjb25zdCB3aGVlbFJhZGl1cyA9IHRoaXMuaGVpZ2h0ICogMC4yNTtcbiAgICBjb25zdCB3aGVlbE9mZnNldFggPSB0aGlzLndpZHRoICogMC4zO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54IC0gd2hlZWxPZmZzZXRYLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAqIDAuMywgd2hlZWxSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguYXJjKHRoaXMueCArIHdoZWVsT2Zmc2V0WCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgKiAwLjMsIHdoZWVsUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBcbiAgICAvLyBEcmF3IGhlYWRsaWdodHMvdGFpbGxpZ2h0c1xuICAgIGNvbnN0IGxpZ2h0UmFkaXVzID0gdGhpcy5oZWlnaHQgKiAwLjE7XG4gICAgY29uc3QgbGlnaHRPZmZzZXRYID0gdGhpcy53aWR0aCAqIDAuNDtcbiAgICBjb25zdCBsaWdodE9mZnNldFkgPSB0aGlzLmhlaWdodCAqIDAuMTtcbiAgICBcbiAgICBpZiAoaXNSaWdodEZhY2luZykge1xuICAgICAgLy8gSGVhZGxpZ2h0cyAod2hpdGUpIG9uIHJpZ2h0LCB0YWlsbGlnaHRzIChyZWQpIG9uIGxlZnRcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZmZmZic7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKHRoaXMueCArIGxpZ2h0T2Zmc2V0WCwgdGhpcy55IC0gbGlnaHRPZmZzZXRZLCBsaWdodFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICAgIFxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmYwMDAwJztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmModGhpcy54IC0gbGlnaHRPZmZzZXRYLCB0aGlzLnkgLSBsaWdodE9mZnNldFksIGxpZ2h0UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIZWFkbGlnaHRzICh3aGl0ZSkgb24gbGVmdCwgdGFpbGxpZ2h0cyAocmVkKSBvbiByaWdodFxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmModGhpcy54IC0gbGlnaHRPZmZzZXRYLCB0aGlzLnkgLSBsaWdodE9mZnNldFksIGxpZ2h0UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgXG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZjAwMDAnO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyh0aGlzLnggKyBsaWdodE9mZnNldFgsIHRoaXMueSAtIGxpZ2h0T2Zmc2V0WSwgbGlnaHRSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlc3RvcmUgdGhlIGNvbnRleHQgc3RhdGVcbiAgICBjdHgucmVzdG9yZSgpO1xuICAgIFxuICAgIC8vIERyYXcgc2xvdyBlZmZlY3QgaW5kaWNhdG9yIGlmIGNhciBpcyBzbG93ZWRcbiAgICBpZiAodGhpcy5pc1Nsb3dlZCkge1xuICAgICAgdGhpcy5kcmF3U2xvd0VmZmVjdChjdHgpO1xuICAgIH1cbiAgfVxuICBcbiAgcHJpdmF0ZSBkcmF3U2xvd0VmZmVjdChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIC8vIERyYXcgYSBncmVlbiBoYXplIGFyb3VuZCB0aGUgY2FyXG4gICAgY3R4LmZpbGxTdHlsZSA9ICdyZ2JhKDEwMCwgMjAwLCA1MCwgMC4zKSc7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5lbGxpcHNlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoICogMC43LCB0aGlzLmhlaWdodCAqIDAuNywgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBzbG93RG93bigpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNTbG93ZWQpIHtcbiAgICAgIHRoaXMuaXNTbG93ZWQgPSB0cnVlO1xuICAgICAgdGhpcy5zcGVlZCA9IHRoaXMub3JpZ2luYWxTcGVlZCAqIDAuNDsgLy8gU2xvdyB0byA0MCUgb2Ygb3JpZ2luYWwgc3BlZWRcbiAgICAgIHRoaXMuc2xvd1RpbWVyID0gdGhpcy5zbG93RHVyYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEV4dGVuZCBzbG93IGR1cmF0aW9uIGlmIGFscmVhZHkgc2xvd2VkXG4gICAgICB0aGlzLnNsb3dUaW1lciA9IHRoaXMuc2xvd0R1cmF0aW9uO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGlzT2ZmU2NyZWVuKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJ1ZmZlciA9IDEwMDsgLy8gRXh0cmEgZGlzdGFuY2UgdG8gdHJhdmVsIGJlZm9yZSBiZWluZyByZW1vdmVkXG4gICAgXG4gICAgaWYgKHRoaXMuc3BlZWQgPiAwKSB7XG4gICAgICAvLyBNb3ZpbmcgcmlnaHRcbiAgICAgIHJldHVybiB0aGlzLnggLSB0aGlzLndpZHRoIC8gMiA+IDgwMCArIGJ1ZmZlcjsgLy8gQXNzdW1pbmcgY2FudmFzIHdpZHRoIGlzIDgwMFxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBNb3ZpbmcgbGVmdFxuICAgICAgcmV0dXJuIHRoaXMueCArIHRoaXMud2lkdGggLyAyIDwgLWJ1ZmZlcjtcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueDtcbiAgfVxuICBcbiAgcHVibGljIGdldFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy55O1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgfVxuICBcbiAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEZhcnRDbG91ZCB7XG4gIHByaXZhdGUgeDogbnVtYmVyO1xuICBwcml2YXRlIHk6IG51bWJlcjtcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyO1xuICBwcml2YXRlIGxpZmV0aW1lOiBudW1iZXI7XG4gIHByaXZhdGUgbWF4TGlmZXRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBkaXNzaXBhdGlvblJhdGU6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb2xvcjogc3RyaW5nO1xuICBcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBsaWZldGltZTogbnVtYmVyKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmxpZmV0aW1lID0gbGlmZXRpbWU7XG4gICAgdGhpcy5tYXhMaWZldGltZSA9IGxpZmV0aW1lO1xuICAgIHRoaXMuZGlzc2lwYXRpb25SYXRlID0gMTsgLy8gSG93IGZhc3QgdGhlIGNsb3VkIGRpc3NpcGF0ZXNcbiAgICBcbiAgICAvLyBSYW5kb20gZ3JlZW5pc2gtYnJvd24gY29sb3IgZm9yIHRoZSBmYXJ0IGNsb3VkXG4gICAgY29uc3QgZ3JlZW5Db21wb25lbnQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMDApICsgMTAwO1xuICAgIGNvbnN0IHJlZENvbXBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUwKSArIDEwMDtcbiAgICB0aGlzLmNvbG9yID0gYHJnYmEoJHtyZWRDb21wb25lbnR9LCAke2dyZWVuQ29tcG9uZW50fSwgNTAsIDAuNylgO1xuICB9XG4gIFxuICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gUmVkdWNlIGxpZmV0aW1lXG4gICAgdGhpcy5saWZldGltZSAtPSBkZWx0YVRpbWUgKiB0aGlzLmRpc3NpcGF0aW9uUmF0ZTtcbiAgICBcbiAgICAvLyBNYWtlIGNsb3VkIGdyb3cgc2xpZ2h0bHkgYXMgaXQgZGlzc2lwYXRlc1xuICAgIHRoaXMud2lkdGggKz0gZGVsdGFUaW1lICogNTtcbiAgICB0aGlzLmhlaWdodCArPSBkZWx0YVRpbWUgKiA1O1xuICB9XG4gIFxuICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIC8vIENhbGN1bGF0ZSBvcGFjaXR5IGJhc2VkIG9uIHJlbWFpbmluZyBsaWZldGltZVxuICAgIGNvbnN0IG9wYWNpdHkgPSAodGhpcy5saWZldGltZSAvIHRoaXMubWF4TGlmZXRpbWUpICogMC43O1xuICAgIFxuICAgIC8vIFVwZGF0ZSBjb2xvciB3aXRoIG5ldyBvcGFjaXR5XG4gICAgY29uc3QgYmFzZUNvbG9yID0gdGhpcy5jb2xvci5zdWJzdHJpbmcoMCwgdGhpcy5jb2xvci5sYXN0SW5kZXhPZignLCcpICsgMSk7XG4gICAgY29uc3QgY2xvdWRDb2xvciA9IGAke2Jhc2VDb2xvcn0gJHtvcGFjaXR5fSlgO1xuICAgIFxuICAgIC8vIERyYXcgY2xvdWQgYXMgYSBzZW1pLXRyYW5zcGFyZW50IGNpcmNsZVxuICAgIGN0eC5maWxsU3R5bGUgPSBjbG91ZENvbG9yO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZWxsaXBzZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQsIDAsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICB9XG4gIFxuICBwdWJsaWMgaXNEaXNzaXBhdGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmxpZmV0aW1lIDw9IDA7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueDtcbiAgfVxuICBcbiAgcHVibGljIGdldFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy55O1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgfVxuICBcbiAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxufVxuIiwiZXhwb3J0IGVudW0gRmFydFR5cGUge1xuICBTSE9SVF9GQVJUID0gJ1NIT1JUX0ZBUlQnLFxuICBMT05HX0ZBUlQgPSAnTE9OR19GQVJUJyxcbiAgQ0lSQ0xFX0ZBUlQgPSAnQ0lSQ0xFX0ZBUlQnLFxuICBTVVBFUl9GQVJUID0gJ1NVUEVSX0ZBUlQnLFxuICBNRUdBX0ZBUlQgPSAnTUVHQV9GQVJUJyxcbiAgVUxUUkFfRkFSVCA9ICdVTFRSQV9GQVJUJ1xufVxuIiwiaW1wb3J0IHsgRmFydFR5cGUgfSBmcm9tICcuL0ZhcnRUeXBlJztcbmltcG9ydCB7IEZhcnRDbG91ZCB9IGZyb20gJy4vRmFydENsb3VkJztcblxuZXhwb3J0IGNsYXNzIEZyb2cge1xuICBwcml2YXRlIHg6IG51bWJlcjtcbiAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDQwO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gNDA7XG4gIHByaXZhdGUgc3BlZWQ6IG51bWJlciA9IDU7XG4gIHByaXZhdGUgZmFydFBvd2VyOiBudW1iZXIgPSAxO1xuICBwcml2YXRlIGN1cnJlbnRGYXJ0VHlwZTogRmFydFR5cGUgPSBGYXJ0VHlwZS5TSE9SVF9GQVJUO1xuICBwcml2YXRlIGlzQWxpdmU6IGJvb2xlYW4gPSB0cnVlO1xuICBwcml2YXRlIGlzRmFydGluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGZhcnRBbmltYXRpb25UaW1lcjogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBmYXJ0QW5pbWF0aW9uRHVyYXRpb246IG51bWJlciA9IDAuMzsgLy8gc2Vjb25kc1xuICBwcml2YXRlIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHByaXZhdGUgZmFydENsb3VkczogRmFydENsb3VkW10gPSBbXTtcbiAgXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50KSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuY2FudmFzID0gY2FudmFzO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0FsaXZlKSByZXR1cm47XG4gICAgXG4gICAgLy8gSGFuZGxlIGZhcnQgYW5pbWF0aW9uXG4gICAgaWYgKHRoaXMuaXNGYXJ0aW5nKSB7XG4gICAgICB0aGlzLmZhcnRBbmltYXRpb25UaW1lciArPSBkZWx0YVRpbWU7XG4gICAgICBpZiAodGhpcy5mYXJ0QW5pbWF0aW9uVGltZXIgPj0gdGhpcy5mYXJ0QW5pbWF0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgdGhpcy5pc0ZhcnRpbmcgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5mYXJ0QW5pbWF0aW9uVGltZXIgPSAwO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvLyBVcGRhdGUgZmFydCBjbG91ZHNcbiAgICBmb3IgKGxldCBpID0gdGhpcy5mYXJ0Q2xvdWRzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB0aGlzLmZhcnRDbG91ZHNbaV0udXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICBcbiAgICAgIGlmICh0aGlzLmZhcnRDbG91ZHNbaV0uaXNEaXNzaXBhdGVkKCkpIHtcbiAgICAgICAgdGhpcy5mYXJ0Q2xvdWRzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIC8vIERyYXcgZmFydCBjbG91ZHMgYmVoaW5kIHRoZSBmcm9nXG4gICAgdGhpcy5mYXJ0Q2xvdWRzLmZvckVhY2goY2xvdWQgPT4gY2xvdWQuZHJhdyhjdHgpKTtcbiAgICBcbiAgICAvLyBEcmF3IGZyb2cgYXMgYSBiYXNpYyBzaGFwZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgXG4gICAgLy8gRHJhdyB0aGUgZnJvZyBib2R5XG4gICAgY3R4LmZpbGxTdHlsZSA9ICF0aGlzLmlzQWxpdmUgPyAnIzg4ODg4OCcgOiAodGhpcy5pc0ZhcnRpbmcgPyAnIzc3Q0M3NycgOiAnIzU1QUE1NScpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguZWxsaXBzZSh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCAvIDIsIHRoaXMuaGVpZ2h0IC8gMiwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgXG4gICAgLy8gRHJhdyBleWVzXG4gICAgY29uc3QgZXllUmFkaXVzID0gdGhpcy53aWR0aCAvIDEwO1xuICAgIGNvbnN0IGV5ZU9mZnNldFggPSB0aGlzLndpZHRoIC8gNDtcbiAgICBjb25zdCBleWVPZmZzZXRZID0gLXRoaXMuaGVpZ2h0IC8gNjtcbiAgICBcbiAgICBjdHguZmlsbFN0eWxlID0gJyNGRkZGRkYnO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCAtIGV5ZU9mZnNldFgsIHRoaXMueSArIGV5ZU9mZnNldFksIGV5ZVJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5hcmModGhpcy54ICsgZXllT2Zmc2V0WCwgdGhpcy55ICsgZXllT2Zmc2V0WSwgZXllUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBcbiAgICAvLyBEcmF3IHB1cGlsc1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMDAwMCc7XG4gICAgY29uc3QgcHVwaWxSYWRpdXMgPSBleWVSYWRpdXMgLyAyO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCAtIGV5ZU9mZnNldFgsIHRoaXMueSArIGV5ZU9mZnNldFksIHB1cGlsUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmFyYyh0aGlzLnggKyBleWVPZmZzZXRYLCB0aGlzLnkgKyBleWVPZmZzZXRZLCBwdXBpbFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgXG4gICAgLy8gRHJhdyBhIHNtaWxlIG9yIHNhZCBmYWNlIGJhc2VkIG9uIGFsaXZlIHN0YXR1c1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjMDAwMDAwJztcbiAgICBjdHgubGluZVdpZHRoID0gMjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgXG4gICAgaWYgKHRoaXMuaXNBbGl2ZSkge1xuICAgICAgLy8gSGFwcHkgc21pbGVcbiAgICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDgsIHRoaXMud2lkdGggLyA0LCAwLCBNYXRoLlBJKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gU2FkIGZhY2UgLyBYIGV5ZXNcbiAgICAgIGN0eC5tb3ZlVG8odGhpcy54IC0gZXllT2Zmc2V0WCAtIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSAtIGV5ZVJhZGl1cyk7XG4gICAgICBjdHgubGluZVRvKHRoaXMueCAtIGV5ZU9mZnNldFggKyBleWVSYWRpdXMsIHRoaXMueSArIGV5ZU9mZnNldFkgKyBleWVSYWRpdXMpO1xuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnggLSBleWVPZmZzZXRYICsgZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZIC0gZXllUmFkaXVzKTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy54IC0gZXllT2Zmc2V0WCAtIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSArIGV5ZVJhZGl1cyk7XG4gICAgICBcbiAgICAgIGN0eC5tb3ZlVG8odGhpcy54ICsgZXllT2Zmc2V0WCAtIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSAtIGV5ZVJhZGl1cyk7XG4gICAgICBjdHgubGluZVRvKHRoaXMueCArIGV5ZU9mZnNldFggKyBleWVSYWRpdXMsIHRoaXMueSArIGV5ZU9mZnNldFkgKyBleWVSYWRpdXMpO1xuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnggKyBleWVPZmZzZXRYICsgZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZIC0gZXllUmFkaXVzKTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy54ICsgZXllT2Zmc2V0WCAtIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSArIGV5ZVJhZGl1cyk7XG4gICAgICBcbiAgICAgIC8vIFNhZCBtb3V0aFxuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnggLSB0aGlzLndpZHRoIC8gNCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyA0KTtcbiAgICAgIGN0eC5xdWFkcmF0aWNDdXJ2ZVRvKHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyLCB0aGlzLnggKyB0aGlzLndpZHRoIC8gNCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyA0KTtcbiAgICB9XG4gICAgY3R4LnN0cm9rZSgpO1xuICAgIFxuICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgXG4gICAgLy8gRHJhdyBjdXJyZW50IGZhcnQgdHlwZSBpbmRpY2F0b3JcbiAgICB0aGlzLmRyYXdGYXJ0VHlwZUluZGljYXRvcihjdHgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3RmFydFR5cGVJbmRpY2F0b3IoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNBbGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIGNvbnN0IGNvbG9ycyA9IHtcbiAgICAgIFtGYXJ0VHlwZS5TSE9SVF9GQVJUXTogJyMzNDk4ZGInLFxuICAgICAgW0ZhcnRUeXBlLkxPTkdfRkFSVF06ICcjMmVjYzcxJyxcbiAgICAgIFtGYXJ0VHlwZS5DSVJDTEVfRkFSVF06ICcjZjFjNDBmJyxcbiAgICAgIFtGYXJ0VHlwZS5TVVBFUl9GQVJUXTogJyNlNzRjM2MnLFxuICAgICAgW0ZhcnRUeXBlLk1FR0FfRkFSVF06ICcjOWI1OWI2JyxcbiAgICAgIFtGYXJ0VHlwZS5VTFRSQV9GQVJUXTogJyMxYWJjOWMnXG4gICAgfTtcbiAgICBcbiAgICBjb25zdCBjb2xvciA9IGNvbG9yc1t0aGlzLmN1cnJlbnRGYXJ0VHlwZV0gfHwgJyMzNDk4ZGInO1xuICAgIFxuICAgIC8vIERyYXcgaW5kaWNhdG9yIGNpcmNsZSBhYm92ZSBmcm9nXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNvbG9yO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55IC0gdGhpcy5oZWlnaHQgLyAyIC0gMTAsIDUsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICB9XG5cbiAgcHVibGljIG1vdmVMZWZ0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0FsaXZlKSByZXR1cm47XG4gICAgXG4gICAgdGhpcy54IC09IHRoaXMuc3BlZWQ7XG4gICAgXG4gICAgLy8gS2VlcCB0aGUgZnJvZyB3aXRoaW4gdGhlIGNhbnZhcyBib3VuZHNcbiAgICBpZiAodGhpcy54IDwgdGhpcy53aWR0aCAvIDIpIHtcbiAgICAgIHRoaXMueCA9IHRoaXMud2lkdGggLyAyO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBtb3ZlUmlnaHQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQWxpdmUpIHJldHVybjtcbiAgICBcbiAgICB0aGlzLnggKz0gdGhpcy5zcGVlZDtcbiAgICBcbiAgICAvLyBLZWVwIHRoZSBmcm9nIHdpdGhpbiB0aGUgY2FudmFzIGJvdW5kc1xuICAgIGlmICh0aGlzLnggPiB0aGlzLmNhbnZhcy53aWR0aCAtIHRoaXMud2lkdGggLyAyKSB7XG4gICAgICB0aGlzLnggPSB0aGlzLmNhbnZhcy53aWR0aCAtIHRoaXMud2lkdGggLyAyO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmYXJ0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0FsaXZlIHx8IHRoaXMuaXNGYXJ0aW5nKSByZXR1cm47XG4gICAgXG4gICAgdGhpcy5pc0ZhcnRpbmcgPSB0cnVlO1xuICAgIHRoaXMuZmFydEFuaW1hdGlvblRpbWVyID0gMDtcbiAgICBcbiAgICAvLyBDcmVhdGUgYSBmYXJ0IGNsb3VkIGJhc2VkIG9uIHRoZSBjdXJyZW50IGZhcnQgdHlwZVxuICAgIHN3aXRjaCAodGhpcy5jdXJyZW50RmFydFR5cGUpIHtcbiAgICAgIGNhc2UgRmFydFR5cGUuU0hPUlRfRkFSVDpcbiAgICAgICAgdGhpcy5jcmVhdGVTaG9ydEZhcnQoKTtcbiAgICAgICAgdGhpcy5tb3ZlRm9yd2FyZCgxICogdGhpcy5mYXJ0UG93ZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICBjYXNlIEZhcnRUeXBlLkxPTkdfRkFSVDpcbiAgICAgICAgdGhpcy5jcmVhdGVMb25nRmFydCgpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKDIgKiB0aGlzLmZhcnRQb3dlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGNhc2UgRmFydFR5cGUuQ0lSQ0xFX0ZBUlQ6XG4gICAgICAgIHRoaXMuY3JlYXRlQ2lyY2xlRmFydCgpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKDEuNSAqIHRoaXMuZmFydFBvd2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgY2FzZSBGYXJ0VHlwZS5TVVBFUl9GQVJUOlxuICAgICAgICB0aGlzLmNyZWF0ZVN1cGVyRmFydCgpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKDIuNSAqIHRoaXMuZmFydFBvd2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgY2FzZSBGYXJ0VHlwZS5NRUdBX0ZBUlQ6XG4gICAgICAgIHRoaXMuY3JlYXRlTWVnYUZhcnQoKTtcbiAgICAgICAgdGhpcy5tb3ZlRm9yd2FyZCgzICogdGhpcy5mYXJ0UG93ZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICBjYXNlIEZhcnRUeXBlLlVMVFJBX0ZBUlQ6XG4gICAgICAgIHRoaXMuY3JlYXRlVWx0cmFGYXJ0KCk7XG4gICAgICAgIHRoaXMubW92ZUZvcndhcmQoNCAqIHRoaXMuZmFydFBvd2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlRm9yd2FyZChhbW91bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueSAtPSBhbW91bnQgKiAyMDsgLy8gTW92ZSBmcm9nIHVwd2FyZCAoZm9yd2FyZClcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlU2hvcnRGYXJ0KCk6IHZvaWQge1xuICAgIGNvbnN0IGNsb3VkID0gbmV3IEZhcnRDbG91ZCh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMiwgMjAsIDIwLCAxLjUpO1xuICAgIHRoaXMuZmFydENsb3Vkcy5wdXNoKGNsb3VkKTtcbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTG9uZ0ZhcnQoKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGEgc2VyaWVzIG9mIGNsb3VkcyBpbiBhIHN0cmFpZ2h0IGxpbmUgYmVoaW5kIHRoZSBmcm9nXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpKyspIHtcbiAgICAgIGNvbnN0IGNsb3VkID0gbmV3IEZhcnRDbG91ZChcbiAgICAgICAgdGhpcy54LFxuICAgICAgICB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIgKyBpICogMTUsXG4gICAgICAgIDIwIC0gaSAqIDIsXG4gICAgICAgIDIwIC0gaSAqIDIsXG4gICAgICAgIDIgLSBpICogMC4zXG4gICAgICApO1xuICAgICAgdGhpcy5mYXJ0Q2xvdWRzLnB1c2goY2xvdWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlQ2lyY2xlRmFydCgpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYSBjaXJjbGUgb2YgZmFydCBjbG91ZHMgYXJvdW5kIHRoZSBmcm9nXG4gICAgY29uc3QgbnVtQ2xvdWRzID0gODtcbiAgICBjb25zdCByYWRpdXMgPSAzMDtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNsb3VkczsgaSsrKSB7XG4gICAgICBjb25zdCBhbmdsZSA9IChpIC8gbnVtQ2xvdWRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgY29uc3QgY2xvdWRYID0gdGhpcy54ICsgTWF0aC5jb3MoYW5nbGUpICogcmFkaXVzO1xuICAgICAgY29uc3QgY2xvdWRZID0gdGhpcy55ICsgTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgXG4gICAgICBjb25zdCBjbG91ZCA9IG5ldyBGYXJ0Q2xvdWQoY2xvdWRYLCBjbG91ZFksIDE1LCAxNSwgMik7XG4gICAgICB0aGlzLmZhcnRDbG91ZHMucHVzaChjbG91ZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTdXBlckZhcnQoKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGEgbW9yZSBwb3dlcmZ1bCBzdHJhaWdodCBsaW5lIGZhcnRcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDU7IGkrKykge1xuICAgICAgY29uc3QgY2xvdWQgPSBuZXcgRmFydENsb3VkKFxuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMiArIGkgKiAxNSxcbiAgICAgICAgMjUgLSBpICogMixcbiAgICAgICAgMjUgLSBpICogMixcbiAgICAgICAgMi41IC0gaSAqIDAuMlxuICAgICAgKTtcbiAgICAgIHRoaXMuZmFydENsb3Vkcy5wdXNoKGNsb3VkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZU1lZ2FGYXJ0KCk6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhIGxhcmdlIGV4cGxvc2lvbiBvZiBmYXJ0IGNsb3Vkc1xuICAgIGNvbnN0IG51bUNsb3VkcyA9IDEyO1xuICAgIGNvbnN0IHJhZGl1cyA9IDQwO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2xvdWRzOyBpKyspIHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBudW1DbG91ZHMpICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCBjbG91ZFggPSB0aGlzLnggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICBjb25zdCBjbG91ZFkgPSB0aGlzLnkgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICBcbiAgICAgIGNvbnN0IGNsb3VkID0gbmV3IEZhcnRDbG91ZChjbG91ZFgsIGNsb3VkWSwgMjAsIDIwLCAzKTtcbiAgICAgIHRoaXMuZmFydENsb3Vkcy5wdXNoKGNsb3VkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVVsdHJhRmFydCgpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYW4gdWx0cmEtcG93ZXJmdWwgZmFydCB3aXRoIG11bHRpcGxlIGV4cGFuZGluZyByaW5nc1xuICAgIGZvciAobGV0IHJpbmcgPSAxOyByaW5nIDw9IDM7IHJpbmcrKykge1xuICAgICAgY29uc3QgbnVtQ2xvdWRzID0gODtcbiAgICAgIGNvbnN0IHJhZGl1cyA9IDIwICogcmluZztcbiAgICAgIFxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DbG91ZHM7IGkrKykge1xuICAgICAgICBjb25zdCBhbmdsZSA9IChpIC8gbnVtQ2xvdWRzKSAqIE1hdGguUEkgKiAyO1xuICAgICAgICBjb25zdCBjbG91ZFggPSB0aGlzLnggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICAgIGNvbnN0IGNsb3VkWSA9IHRoaXMueSArIE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNsb3VkID0gbmV3IEZhcnRDbG91ZChjbG91ZFgsIGNsb3VkWSwgMjUgLSByaW5nICogMywgMjUgLSByaW5nICogMywgNCAtIHJpbmcgKiAwLjUpO1xuICAgICAgICB0aGlzLmZhcnRDbG91ZHMucHVzaChjbG91ZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGhpdCgpOiB2b2lkIHtcbiAgICB0aGlzLmlzQWxpdmUgPSBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBjb2xsZWN0UG93ZXJVcChmYXJ0VHlwZTogRmFydFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLmN1cnJlbnRGYXJ0VHlwZSA9IGZhcnRUeXBlO1xuICAgIFxuICAgIC8vIEluY3JlYXNlIGZhcnQgcG93ZXIgdGVtcG9yYXJpbHlcbiAgICB0aGlzLmZhcnRQb3dlciA9IDEuNTtcbiAgICBcbiAgICAvLyBSZXNldCBmYXJ0IHBvd2VyIGFmdGVyIGEgZmV3IHNlY29uZHNcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZmFydFBvd2VyID0gMTtcbiAgICB9LCA1MDAwKTtcbiAgfVxuXG4gIHB1YmxpYyByZXNldCh4OiBudW1iZXIsIHk6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLmlzQWxpdmUgPSB0cnVlO1xuICAgIHRoaXMuaXNGYXJ0aW5nID0gZmFsc2U7XG4gICAgdGhpcy5jdXJyZW50RmFydFR5cGUgPSBGYXJ0VHlwZS5TSE9SVF9GQVJUO1xuICAgIHRoaXMuZmFydFBvd2VyID0gMTtcbiAgICB0aGlzLmZhcnRDbG91ZHMgPSBbXTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xuICB9XG5cbiAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRDdXJyZW50RmFydFR5cGUoKTogRmFydFR5cGUge1xuICAgIHJldHVybiB0aGlzLmN1cnJlbnRGYXJ0VHlwZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXRGYXJ0Q2xvdWRzKCk6IEZhcnRDbG91ZFtdIHtcbiAgICByZXR1cm4gdGhpcy5mYXJ0Q2xvdWRzO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGcm9nIH0gZnJvbSAnLi9Gcm9nJztcbmltcG9ydCB7IENhciB9IGZyb20gJy4vQ2FyJztcbmltcG9ydCB7IFBvd2VyVXAgfSBmcm9tICcuL1Bvd2VyVXAnO1xuaW1wb3J0IHsgRmFydFR5cGUgfSBmcm9tICcuL0ZhcnRUeXBlJztcbmltcG9ydCB7IExldmVsIH0gZnJvbSAnLi9MZXZlbCc7XG5pbXBvcnQgeyBJbnB1dEhhbmRsZXIgfSBmcm9tICcuLi91dGlscy9JbnB1dEhhbmRsZXInO1xuaW1wb3J0IHsgQ29sbGlzaW9uRGV0ZWN0b3IgfSBmcm9tICcuLi91dGlscy9Db2xsaXNpb25EZXRlY3Rvcic7XG5pbXBvcnQgeyBTb3VuZE1hbmFnZXIgfSBmcm9tICcuLi91dGlscy9Tb3VuZE1hbmFnZXInO1xuaW1wb3J0IHsgSGlnaFNjb3JlTWFuYWdlciB9IGZyb20gJy4uL3V0aWxzL0hpZ2hTY29yZU1hbmFnZXInO1xuXG5leHBvcnQgY2xhc3MgR2FtZSB7XG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRDtcbiAgcHJpdmF0ZSBmcm9nITogRnJvZzsgIC8vIFVzaW5nICEgdG8gaW5kaWNhdGUgaXQgd2lsbCBiZSBpbml0aWFsaXplZCBiZWZvcmUgdXNlXG4gIHByaXZhdGUgY2FyczogQ2FyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3dlclVwczogUG93ZXJVcFtdID0gW107XG4gIHByaXZhdGUgZmFydENsb3VkczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBzY29yZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSA2MDtcbiAgcHJpdmF0ZSBpc0dhbWVPdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNHYW1lUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RUaW1lc3RhbXA6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgaW5wdXRIYW5kbGVyOiBJbnB1dEhhbmRsZXI7XG4gIHByaXZhdGUgY29sbGlzaW9uRGV0ZWN0b3I6IENvbGxpc2lvbkRldGVjdG9yO1xuICBwcml2YXRlIHNvdW5kTWFuYWdlcjogU291bmRNYW5hZ2VyO1xuICBwcml2YXRlIGhpZ2hTY29yZU1hbmFnZXI6IEhpZ2hTY29yZU1hbmFnZXI7XG4gIHByaXZhdGUgY3VycmVudExldmVsITogTGV2ZWw7ICAvLyBVc2luZyAhIHRvIGluZGljYXRlIGl0IHdpbGwgYmUgaW5pdGlhbGl6ZWQgYmVmb3JlIHVzZVxuICBwcml2YXRlIGxldmVsczogTGV2ZWxbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtY2FudmFzJykgYXMgSFRNTENhbnZhc0VsZW1lbnQ7XG4gICAgdGhpcy5jdHggPSB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgICB0aGlzLmlucHV0SGFuZGxlciA9IG5ldyBJbnB1dEhhbmRsZXIoKTtcbiAgICB0aGlzLmNvbGxpc2lvbkRldGVjdG9yID0gbmV3IENvbGxpc2lvbkRldGVjdG9yKCk7XG4gICAgdGhpcy5zb3VuZE1hbmFnZXIgPSBuZXcgU291bmRNYW5hZ2VyKCk7XG4gICAgdGhpcy5oaWdoU2NvcmVNYW5hZ2VyID0gbmV3IEhpZ2hTY29yZU1hbmFnZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBpbml0aWFsaXplKCk6IHZvaWQge1xuICAgIC8vIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIGJ1dHRvbnNcbiAgICBjb25zdCBzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idXR0b24nKTtcbiAgICBjb25zdCByZXN0YXJ0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Jlc3RhcnQtYnV0dG9uJyk7XG5cbiAgICBpZiAoc3RhcnRCdXR0b24pIHtcbiAgICAgIHN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5zdGFydEdhbWUoKSk7XG4gICAgfVxuXG4gICAgaWYgKHJlc3RhcnRCdXR0b24pIHtcbiAgICAgIHJlc3RhcnRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnJlc3RhcnRHYW1lKCkpO1xuICAgIH1cblxuICAgIC8vIEluaXRpYWxpemUgbGV2ZWxzXG4gICAgdGhpcy5pbml0aWFsaXplTGV2ZWxzKCk7XG4gICAgXG4gICAgLy8gRGlzcGxheSBoaWdoIHNjb3Jlc1xuICAgIHRoaXMuZGlzcGxheUhpZ2hTY29yZXMoKTtcblxuICAgIC8vIExvYWQgc291bmRzXG4gICAgdGhpcy5zb3VuZE1hbmFnZXIubG9hZFNvdW5kcygpO1xuICB9XG5cbiAgcHJpdmF0ZSBpbml0aWFsaXplTGV2ZWxzKCk6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBkaWZmZXJlbnQgbGV2ZWxzIHdpdGggaW5jcmVhc2luZyBkaWZmaWN1bHR5XG4gICAgdGhpcy5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMSwgMiwgMSwgMSkpOyAvLyBMZXZlbCAxOiBzbG93IGNhcnMsIGZldyBjYXJzLCBmZXcgcG93ZXItdXBzXG4gICAgdGhpcy5sZXZlbHMucHVzaChuZXcgTGV2ZWwoMiwgMywgMS41LCAyKSk7IC8vIExldmVsIDI6IG1vcmUgY2FycywgZmFzdGVyLCBtb3JlIHBvd2VyLXVwc1xuICAgIHRoaXMubGV2ZWxzLnB1c2gobmV3IExldmVsKDMsIDQsIDIsIDIpKTsgLy8gTGV2ZWwgMzogZXZlbiBtb3JlIGNhcnMsIGV2ZW4gZmFzdGVyXG4gICAgdGhpcy5sZXZlbHMucHVzaChuZXcgTGV2ZWwoNCwgNSwgMi41LCAzKSk7IC8vIExldmVsIDQ6IGxvdHMgb2YgY2FycywgdmVyeSBmYXN0XG4gICAgdGhpcy5sZXZlbHMucHVzaChuZXcgTGV2ZWwoNSwgNiwgMywgMykpOyAvLyBMZXZlbCA1OiBleHRyZW1lIGRpZmZpY3VsdHlcbiAgfVxuXG4gIHByaXZhdGUgc3RhcnRHYW1lKCk6IHZvaWQge1xuICAgIC8vIEhpZGUgc3RhcnQgc2NyZWVuXG4gICAgY29uc3Qgc3RhcnRTY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtc2NyZWVuJyk7XG4gICAgaWYgKHN0YXJ0U2NyZWVuKSB7XG4gICAgICBzdGFydFNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cblxuICAgIC8vIFJlc2V0IGdhbWUgc3RhdGVcbiAgICB0aGlzLnNjb3JlID0gMDtcbiAgICB0aGlzLmxldmVsID0gMTtcbiAgICB0aGlzLnRpbWUgPSA2MDtcbiAgICB0aGlzLmlzR2FtZU92ZXIgPSBmYWxzZTtcbiAgICB0aGlzLmlzR2FtZVJ1bm5pbmcgPSB0cnVlO1xuICAgIHRoaXMuY2FycyA9IFtdO1xuICAgIHRoaXMucG93ZXJVcHMgPSBbXTtcbiAgICB0aGlzLmZhcnRDbG91ZHMgPSBbXTtcblxuICAgIC8vIFNldCBjdXJyZW50IGxldmVsXG4gICAgdGhpcy5jdXJyZW50TGV2ZWwgPSB0aGlzLmxldmVsc1swXTtcblxuICAgIC8vIENyZWF0ZSBwbGF5ZXJcbiAgICB0aGlzLmZyb2cgPSBuZXcgRnJvZyhcbiAgICAgIHRoaXMuY2FudmFzLndpZHRoIC8gMixcbiAgICAgIHRoaXMuY2FudmFzLmhlaWdodCAtIDUwLFxuICAgICAgdGhpcy5jYW52YXNcbiAgICApO1xuXG4gICAgLy8gU3RhcnQgZ2FtZSBsb29wXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB0aGlzLmdhbWVMb29wKHRpbWVzdGFtcCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnYW1lTG9vcCh0aW1lc3RhbXA6IG51bWJlcik6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0dhbWVSdW5uaW5nKSByZXR1cm47XG5cbiAgICAvLyBDYWxjdWxhdGUgZGVsdGEgdGltZSAodGltZSBzaW5jZSBsYXN0IGZyYW1lKVxuICAgIGNvbnN0IGRlbHRhVGltZSA9IHRoaXMubGFzdFRpbWVzdGFtcCA/ICh0aW1lc3RhbXAgLSB0aGlzLmxhc3RUaW1lc3RhbXApIC8gMTAwMCA6IDA7XG4gICAgdGhpcy5sYXN0VGltZXN0YW1wID0gdGltZXN0YW1wO1xuXG4gICAgLy8gVXBkYXRlIGdhbWUgdGltZXJcbiAgICB0aGlzLnVwZGF0ZVRpbWVyKGRlbHRhVGltZSk7XG5cbiAgICAvLyBDbGVhciBjYW52YXNcbiAgICB0aGlzLmN0eC5jbGVhclJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG5cbiAgICAvLyBVcGRhdGUgYW5kIGRyYXcgZ2FtZSBvYmplY3RzXG4gICAgdGhpcy51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICB0aGlzLmRyYXcoKTtcblxuICAgIC8vIENoZWNrIGZvciBjb2xsaXNpb25zXG4gICAgdGhpcy5jaGVja0NvbGxpc2lvbnMoKTtcblxuICAgIC8vIENoZWNrIGZvciBsZXZlbCBjb21wbGV0aW9uXG4gICAgdGhpcy5jaGVja0xldmVsQ29tcGxldGlvbigpO1xuXG4gICAgLy8gVXBkYXRlIGlucHV0IGhhbmRsZXIgZm9yIG5leHQgZnJhbWVcbiAgICB0aGlzLmlucHV0SGFuZGxlci51cGRhdGUoKTtcblxuICAgIC8vIENoZWNrIGZvciBnYW1lIG92ZXIgY29uZGl0aW9uc1xuICAgIGlmICh0aGlzLnRpbWUgPD0gMCkge1xuICAgICAgdGhpcy5nYW1lT3ZlcigpO1xuICAgIH0gZWxzZSBpZiAoIXRoaXMuaXNHYW1lT3Zlcikge1xuICAgICAgLy8gQ29udGludWUgdGhlIGdhbWUgbG9vcCBpZiBub3QgZ2FtZSBvdmVyXG4gICAgICB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKCh0aW1lc3RhbXApID0+IHRoaXMuZ2FtZUxvb3AodGltZXN0YW1wKSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBIYW5kbGUgaW5wdXRzXG4gICAgaWYgKHRoaXMuaW5wdXRIYW5kbGVyLmlzS2V5RG93bignQXJyb3dMZWZ0JykpIHtcbiAgICAgIHRoaXMuZnJvZy5tb3ZlTGVmdCgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5pbnB1dEhhbmRsZXIuaXNLZXlEb3duKCdBcnJvd1JpZ2h0JykpIHtcbiAgICAgIHRoaXMuZnJvZy5tb3ZlUmlnaHQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRIYW5kbGVyLmlzS2V5UHJlc3NlZCgnICcpKSB7XG4gICAgICB0aGlzLmZyb2cuZmFydCgpO1xuICAgIH1cblxuICAgIC8vIFVwZGF0ZSBmcm9nXG4gICAgdGhpcy5mcm9nLnVwZGF0ZShkZWx0YVRpbWUpO1xuXG4gICAgLy8gU3Bhd24gY2FycyBiYXNlZCBvbiBsZXZlbCBkaWZmaWN1bHR5XG4gICAgdGhpcy5zcGF3bkNhcnMoZGVsdGFUaW1lKTtcblxuICAgIC8vIFNwYXduIHBvd2VyLXVwcyBvY2Nhc2lvbmFsbHlcbiAgICB0aGlzLnNwYXduUG93ZXJVcHMoZGVsdGFUaW1lKTtcblxuICAgIC8vIFVwZGF0ZSBjYXJzXG4gICAgdGhpcy5jYXJzLmZvckVhY2goKGNhciwgaW5kZXgpID0+IHtcbiAgICAgIGNhci51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgIFxuICAgICAgLy8gUmVtb3ZlIGNhcnMgdGhhdCBhcmUgb2ZmLXNjcmVlblxuICAgICAgaWYgKGNhci5pc09mZlNjcmVlbigpKSB7XG4gICAgICAgIHRoaXMuY2Fycy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoMTApOyAvLyBQb2ludHMgZm9yIGF2b2lkaW5nIGEgY2FyXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgcG93ZXItdXBzXG4gICAgdGhpcy5wb3dlclVwcy5mb3JFYWNoKChwb3dlclVwLCBpbmRleCkgPT4ge1xuICAgICAgcG93ZXJVcC51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgIFxuICAgICAgLy8gUmVtb3ZlIHBvd2VyLXVwcyB0aGF0IGFyZSBvZmYtc2NyZWVuXG4gICAgICBpZiAocG93ZXJVcC5pc09mZlNjcmVlbigpKSB7XG4gICAgICAgIHRoaXMucG93ZXJVcHMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFVwZGF0ZSBmYXJ0IGNsb3Vkc1xuICAgIHRoaXMuZmFydENsb3Vkcy5mb3JFYWNoKChjbG91ZCwgaW5kZXgpID0+IHtcbiAgICAgIGNsb3VkLnVwZGF0ZShkZWx0YVRpbWUpO1xuICAgICAgXG4gICAgICAvLyBSZW1vdmUgY2xvdWRzIHRoYXQgaGF2ZSBkaXNzaXBhdGVkXG4gICAgICBpZiAoY2xvdWQuaXNEaXNzaXBhdGVkKCkpIHtcbiAgICAgICAgdGhpcy5mYXJ0Q2xvdWRzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRyYXcoKTogdm9pZCB7XG4gICAgLy8gRHJhdyBiYWNrZ3JvdW5kXG4gICAgdGhpcy5kcmF3QmFja2dyb3VuZCgpO1xuICAgIFxuICAgIC8vIERyYXcgZ2FtZSBvYmplY3RzXG4gICAgdGhpcy5jYXJzLmZvckVhY2goY2FyID0+IGNhci5kcmF3KHRoaXMuY3R4KSk7XG4gICAgdGhpcy5wb3dlclVwcy5mb3JFYWNoKHBvd2VyVXAgPT4gcG93ZXJVcC5kcmF3KHRoaXMuY3R4KSk7XG4gICAgdGhpcy5mYXJ0Q2xvdWRzLmZvckVhY2goY2xvdWQgPT4gY2xvdWQuZHJhdyh0aGlzLmN0eCkpO1xuICAgIHRoaXMuZnJvZy5kcmF3KHRoaXMuY3R4KTtcbiAgICBcbiAgICAvLyBVcGRhdGUgVUkgZWxlbWVudHNcbiAgICB0aGlzLnVwZGF0ZVVJRWxlbWVudHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJhd0JhY2tncm91bmQoKTogdm9pZCB7XG4gICAgLy8gRHJhdyByb2FkIGFuZCBsYW5lc1xuICAgIHRoaXMuY3R4LmZpbGxTdHlsZSA9ICcjNDQ0NDQ0JztcbiAgICB0aGlzLmN0eC5maWxsUmVjdCgwLCAwLCB0aGlzLmNhbnZhcy53aWR0aCwgdGhpcy5jYW52YXMuaGVpZ2h0KTtcbiAgICBcbiAgICAvLyBEcmF3IGxhbmUgbWFya2luZ3NcbiAgICB0aGlzLmN0eC5zdHJva2VTdHlsZSA9ICcjRkZGRkZGJztcbiAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbMjAsIDE1XSk7XG4gICAgXG4gICAgY29uc3QgbGFuZUhlaWdodCA9IHRoaXMuY2FudmFzLmhlaWdodCAvIDY7XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCA2OyBpKyspIHtcbiAgICAgIHRoaXMuY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5jdHgubW92ZVRvKDAsIGxhbmVIZWlnaHQgKiBpKTtcbiAgICAgIHRoaXMuY3R4LmxpbmVUbyh0aGlzLmNhbnZhcy53aWR0aCwgbGFuZUhlaWdodCAqIGkpO1xuICAgICAgdGhpcy5jdHguc3Ryb2tlKCk7XG4gICAgfVxuICAgIFxuICAgIC8vIFJlc2V0IGxpbmUgZGFzaFxuICAgIHRoaXMuY3R4LnNldExpbmVEYXNoKFtdKTtcbiAgfVxuXG4gIHByaXZhdGUgc3Bhd25DYXJzKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gUHJvYmFiaWxpdHkgb2Ygc3Bhd25pbmcgYSBuZXcgY2FyIGRlcGVuZHMgb24gbGV2ZWwgZGlmZmljdWx0eVxuICAgIGNvbnN0IHNwYXduQ2hhbmNlID0gdGhpcy5jdXJyZW50TGV2ZWwuY2FyU3Bhd25SYXRlICogZGVsdGFUaW1lO1xuICAgIFxuICAgIGlmIChNYXRoLnJhbmRvbSgpIDwgc3Bhd25DaGFuY2UpIHtcbiAgICAgIGNvbnN0IGxhbmVIZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyA2O1xuICAgICAgY29uc3QgbGFuZSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDUpICsgMTsgLy8gTGFuZXMgMS01XG4gICAgICBjb25zdCB5UG9zaXRpb24gPSBsYW5lICogbGFuZUhlaWdodCAtIGxhbmVIZWlnaHQgLyAyO1xuICAgICAgXG4gICAgICAvLyBBbHRlcm5hdGUgZGlyZWN0aW9uIGJhc2VkIG9uIGxhbmVcbiAgICAgIGNvbnN0IGlzTGVmdFRvUmlnaHQgPSBsYW5lICUgMiA9PT0gMDtcbiAgICAgIGNvbnN0IHhQb3NpdGlvbiA9IGlzTGVmdFRvUmlnaHQgPyAtNTAgOiB0aGlzLmNhbnZhcy53aWR0aCArIDUwO1xuICAgICAgXG4gICAgICAvLyBSYW5kb20gY2FyIHNwZWVkIGJhc2VkIG9uIGxldmVsIGRpZmZpY3VsdHlcbiAgICAgIGNvbnN0IHNwZWVkID0gKGlzTGVmdFRvUmlnaHQgPyAxIDogLTEpICogXG4gICAgICAgICh0aGlzLmN1cnJlbnRMZXZlbC5jYXJTcGVlZCAqIDEwMCAqICgwLjggKyBNYXRoLnJhbmRvbSgpICogMC40KSk7XG4gICAgICBcbiAgICAgIGNvbnN0IGNhciA9IG5ldyBDYXIoeFBvc2l0aW9uLCB5UG9zaXRpb24sIHNwZWVkLCBgY2FyJHtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAzKSArIDF9YCk7XG4gICAgICB0aGlzLmNhcnMucHVzaChjYXIpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3Bhd25Qb3dlclVwcyhkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIFByb2JhYmlsaXR5IG9mIHNwYXduaW5nIGEgbmV3IHBvd2VyLXVwIGRlcGVuZHMgb24gbGV2ZWxcbiAgICBjb25zdCBzcGF3bkNoYW5jZSA9IDAuMDEgKiBkZWx0YVRpbWUgKiB0aGlzLmN1cnJlbnRMZXZlbC5wb3dlclVwUmF0ZTtcbiAgICBcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHNwYXduQ2hhbmNlICYmIHRoaXMucG93ZXJVcHMubGVuZ3RoIDwgMykge1xuICAgICAgY29uc3QgeCA9IE1hdGgucmFuZG9tKCkgKiAodGhpcy5jYW52YXMud2lkdGggLSA0MCkgKyAyMDtcbiAgICAgIGNvbnN0IHkgPSBNYXRoLnJhbmRvbSgpICogKHRoaXMuY2FudmFzLmhlaWdodCAtIDEwMCkgKyA1MDtcbiAgICAgIFxuICAgICAgLy8gUmFuZG9tbHkgc2VsZWN0IGEgZmFydCB0eXBlIGZvciB0aGUgcG93ZXItdXBcbiAgICAgIGNvbnN0IGZhcnRUeXBlcyA9IFtcbiAgICAgICAgRmFydFR5cGUuU0hPUlRfRkFSVCxcbiAgICAgICAgRmFydFR5cGUuTE9OR19GQVJULCBcbiAgICAgICAgRmFydFR5cGUuQ0lSQ0xFX0ZBUlQsXG4gICAgICAgIEZhcnRUeXBlLlNVUEVSX0ZBUlQsXG4gICAgICAgIEZhcnRUeXBlLk1FR0FfRkFSVCxcbiAgICAgICAgRmFydFR5cGUuVUxUUkFfRkFSVFxuICAgICAgXTtcbiAgICAgIFxuICAgICAgY29uc3QgcmFuZG9tSW5kZXggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBmYXJ0VHlwZXMubGVuZ3RoKTtcbiAgICAgIGNvbnN0IGZhcnRUeXBlID0gZmFydFR5cGVzW3JhbmRvbUluZGV4XTtcbiAgICAgIFxuICAgICAgY29uc3QgcG93ZXJVcCA9IG5ldyBQb3dlclVwKHgsIHksIGZhcnRUeXBlKTtcbiAgICAgIHRoaXMucG93ZXJVcHMucHVzaChwb3dlclVwKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNoZWNrQ29sbGlzaW9ucygpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBmb3IgY29sbGlzaW9ucyBiZXR3ZWVuIGZyb2cgYW5kIGNhcnNcbiAgICBmb3IgKGNvbnN0IGNhciBvZiB0aGlzLmNhcnMpIHtcbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRldGVjdG9yLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZywgY2FyKSkge1xuICAgICAgICB0aGlzLmZyb2cuaGl0KCk7XG4gICAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIENoZWNrIGZvciBjb2xsaXNpb25zIGJldHdlZW4gZnJvZyBhbmQgcG93ZXItdXBzXG4gICAgZm9yIChsZXQgaSA9IHRoaXMucG93ZXJVcHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRldGVjdG9yLmNoZWNrQ29sbGlzaW9uKHRoaXMuZnJvZywgdGhpcy5wb3dlclVwc1tpXSkpIHtcbiAgICAgICAgY29uc3QgcG93ZXJVcCA9IHRoaXMucG93ZXJVcHNbaV07XG4gICAgICAgIHRoaXMuZnJvZy5jb2xsZWN0UG93ZXJVcChwb3dlclVwLmdldEZhcnRUeXBlKCkpO1xuICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoNTApOyAvLyBQb2ludHMgZm9yIGNvbGxlY3RpbmcgYSBwb3dlci11cFxuICAgICAgICB0aGlzLmFkZFRpbWUoNSk7IC8vIEFkZCA1IHNlY29uZHMgZm9yIGNvbGxlY3RpbmcgYSBwb3dlci11cFxuICAgICAgICB0aGlzLnBvd2VyVXBzLnNwbGljZShpLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgY29sbGlzaW9ucyBiZXR3ZWVuIGZhcnQgY2xvdWRzIGFuZCBjYXJzXG4gICAgZm9yIChjb25zdCBjbG91ZCBvZiB0aGlzLmZhcnRDbG91ZHMpIHtcbiAgICAgIGZvciAobGV0IGkgPSB0aGlzLmNhcnMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgaWYgKHRoaXMuY29sbGlzaW9uRGV0ZWN0b3IuY2hlY2tDb2xsaXNpb24oY2xvdWQsIHRoaXMuY2Fyc1tpXSkpIHtcbiAgICAgICAgICAvLyBTbG93IGRvd24gY2FycyB0aGF0IGhpdCBmYXJ0IGNsb3Vkc1xuICAgICAgICAgIHRoaXMuY2Fyc1tpXS5zbG93RG93bigpO1xuICAgICAgICAgIHRoaXMuaW5jcmVhc2VTY29yZSgxNSk7IC8vIFBvaW50cyBmb3Igc2xvd2luZyBhIGNhclxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0xldmVsQ29tcGxldGlvbigpOiB2b2lkIHtcbiAgICAvLyBDaGVjayBpZiBwbGF5ZXIgaGFzIGNyb3NzZWQgdG8gdGhlIHRvcCBvZiB0aGUgc2NyZWVuXG4gICAgaWYgKHRoaXMuZnJvZy5nZXRZKCkgPD0gMzApIHtcbiAgICAgIHRoaXMubGV2ZWxDb21wbGV0ZSgpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgbGV2ZWxDb21wbGV0ZSgpOiB2b2lkIHtcbiAgICAvLyBJbmNyZWFzZSBsZXZlbFxuICAgIHRoaXMubGV2ZWwrKztcbiAgICBcbiAgICAvLyBBZGQgYm9udXMgcG9pbnRzIGZvciBjb21wbGV0aW5nIGxldmVsXG4gICAgY29uc3QgbGV2ZWxCb251cyA9IHRoaXMubGV2ZWwgKiAxMDA7XG4gICAgdGhpcy5pbmNyZWFzZVNjb3JlKGxldmVsQm9udXMpO1xuICAgIFxuICAgIC8vIEFkZCBib251cyB0aW1lXG4gICAgdGhpcy5hZGRUaW1lKDEwKTtcbiAgICBcbiAgICAvLyBTZXQgbmV3IGxldmVsIGRpZmZpY3VsdHlcbiAgICBjb25zdCBsZXZlbEluZGV4ID0gTWF0aC5taW4odGhpcy5sZXZlbCAtIDEsIHRoaXMubGV2ZWxzLmxlbmd0aCAtIDEpO1xuICAgIHRoaXMuY3VycmVudExldmVsID0gdGhpcy5sZXZlbHNbbGV2ZWxJbmRleF07XG4gICAgXG4gICAgLy8gTGV2ZWwgY29tcGxldGVkXG4gICAgXG4gICAgLy8gUmVzZXQgZnJvZyBwb3NpdGlvblxuICAgIHRoaXMuZnJvZy5yZXNldCh0aGlzLmNhbnZhcy53aWR0aCAvIDIsIHRoaXMuY2FudmFzLmhlaWdodCAtIDUwKTtcbiAgICBcbiAgICAvLyBVcGRhdGUgbGV2ZWwgZGlzcGxheVxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXZlbCcpIS5pbm5lclRleHQgPSBgTGV2ZWw6ICR7dGhpcy5sZXZlbH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBpbmNyZWFzZVNjb3JlKHBvaW50czogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zY29yZSArPSBwb2ludHM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Njb3JlJykhLmlubmVyVGV4dCA9IGBTY29yZTogJHt0aGlzLnNjb3JlfWA7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZVRpbWVyKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lIC09IGRlbHRhVGltZTtcbiAgICBcbiAgICBpZiAodGhpcy50aW1lIDwgMCkge1xuICAgICAgdGhpcy50aW1lID0gMDtcbiAgICB9XG4gICAgXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKSEuaW5uZXJUZXh0ID0gYFRpbWU6ICR7TWF0aC5jZWlsKHRoaXMudGltZSl9YDtcbiAgfVxuXG4gIHByaXZhdGUgYWRkVGltZShzZWNvbmRzOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLnRpbWUgKz0gc2Vjb25kcztcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpIS5pbm5lclRleHQgPSBgVGltZTogJHtNYXRoLmNlaWwodGhpcy50aW1lKX1gO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVVSUVsZW1lbnRzKCk6IHZvaWQge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpIS5pbm5lclRleHQgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJykhLmlubmVyVGV4dCA9IGBUaW1lOiAke01hdGguY2VpbCh0aGlzLnRpbWUpfWA7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2xldmVsJykhLmlubmVyVGV4dCA9IGBMZXZlbDogJHt0aGlzLmxldmVsfWA7XG4gIH1cblxuICBwcml2YXRlIGdhbWVPdmVyKCk6IHZvaWQge1xuICAgIHRoaXMuaXNHYW1lT3ZlciA9IHRydWU7XG4gICAgdGhpcy5pc0dhbWVSdW5uaW5nID0gZmFsc2U7XG4gICAgXG4gICAgLy8gU2hvdyBnYW1lIG92ZXIgc2NyZWVuXG4gICAgY29uc3QgZ2FtZU92ZXJTY3JlZW4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1vdmVyLXNjcmVlbicpO1xuICAgIGlmIChnYW1lT3ZlclNjcmVlbikge1xuICAgICAgZ2FtZU92ZXJTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICB9XG4gICAgXG4gICAgLy8gVXBkYXRlIGZpbmFsIHNjb3JlXG4gICAgY29uc3QgZmluYWxTY29yZUVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluYWwtc2NvcmUnKTtcbiAgICBpZiAoZmluYWxTY29yZUVsZW1lbnQpIHtcbiAgICAgIGZpbmFsU2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGBGaW5hbCBTY29yZTogJHt0aGlzLnNjb3JlfWA7XG4gICAgfVxuICAgIFxuICAgIC8vIFNhdmUgaGlnaCBzY29yZVxuICAgIHRoaXMuaGlnaFNjb3JlTWFuYWdlci5hZGRTY29yZSh0aGlzLnNjb3JlKTtcbiAgICB0aGlzLmRpc3BsYXlIaWdoU2NvcmVzKCk7XG4gIH1cblxuICBwcml2YXRlIHJlc3RhcnRHYW1lKCk6IHZvaWQge1xuICAgIC8vIEhpZGUgZ2FtZSBvdmVyIHNjcmVlblxuICAgIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtb3Zlci1zY3JlZW4nKTtcbiAgICBpZiAoZ2FtZU92ZXJTY3JlZW4pIHtcbiAgICAgIGdhbWVPdmVyU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfVxuICAgIFxuICAgIC8vIFN0YXJ0IGEgbmV3IGdhbWVcbiAgICB0aGlzLnN0YXJ0R2FtZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkaXNwbGF5SGlnaFNjb3JlcygpOiB2b2lkIHtcbiAgICBjb25zdCBzY29yZXMgPSB0aGlzLmhpZ2hTY29yZU1hbmFnZXIuZ2V0U2NvcmVzKCk7XG4gICAgY29uc3Qgc2NvcmVzTGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZXMtbGlzdCcpO1xuICAgIFxuICAgIGlmIChzY29yZXNMaXN0KSB7XG4gICAgICBzY29yZXNMaXN0LmlubmVySFRNTCA9ICcnO1xuICAgICAgXG4gICAgICBzY29yZXMuc2xpY2UoMCwgNSkuZm9yRWFjaCgoc2NvcmU6IG51bWJlciwgaW5kZXg6IG51bWJlcikgPT4ge1xuICAgICAgICBjb25zdCBzY29yZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgc2NvcmVFbGVtZW50LmlubmVyVGV4dCA9IGAke2luZGV4ICsgMX0uICR7c2NvcmV9YDtcbiAgICAgICAgc2NvcmVzTGlzdC5hcHBlbmRDaGlsZChzY29yZUVsZW1lbnQpO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgTGV2ZWwge1xuICBwdWJsaWMgcmVhZG9ubHkgbGV2ZWw6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGNhclNwYXduUmF0ZTogbnVtYmVyO1xuICBwdWJsaWMgcmVhZG9ubHkgY2FyU3BlZWQ6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IHBvd2VyVXBSYXRlOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IobGV2ZWw6IG51bWJlciwgY2FyU3Bhd25SYXRlOiBudW1iZXIsIGNhclNwZWVkOiBudW1iZXIsIHBvd2VyVXBSYXRlOiBudW1iZXIpIHtcbiAgICB0aGlzLmxldmVsID0gbGV2ZWw7XG4gICAgdGhpcy5jYXJTcGF3blJhdGUgPSBjYXJTcGF3blJhdGU7XG4gICAgdGhpcy5jYXJTcGVlZCA9IGNhclNwZWVkO1xuICAgIHRoaXMucG93ZXJVcFJhdGUgPSBwb3dlclVwUmF0ZTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmFydFR5cGUgfSBmcm9tICcuL0ZhcnRUeXBlJztcblxuZXhwb3J0IGNsYXNzIFBvd2VyVXAge1xuICBwcml2YXRlIHg6IG51bWJlcjtcbiAgcHJpdmF0ZSB5OiBudW1iZXI7XG4gIHByaXZhdGUgd2lkdGg6IG51bWJlciA9IDMwO1xuICBwcml2YXRlIGhlaWdodDogbnVtYmVyID0gMzA7XG4gIHByaXZhdGUgZmFydFR5cGU6IEZhcnRUeXBlO1xuICBwcml2YXRlIHB1bHNlU2l6ZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBwdWxzZURpcmVjdGlvbjogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSBwdWxzZVNwZWVkOiBudW1iZXIgPSAyO1xuICBwcml2YXRlIGNvbG9yczogUmVjb3JkPEZhcnRUeXBlLCBzdHJpbmc+ID0ge1xuICAgIFtGYXJ0VHlwZS5TSE9SVF9GQVJUXTogJyMzNDk4ZGInLFxuICAgIFtGYXJ0VHlwZS5MT05HX0ZBUlRdOiAnIzJlY2M3MScsXG4gICAgW0ZhcnRUeXBlLkNJUkNMRV9GQVJUXTogJyNmMWM0MGYnLFxuICAgIFtGYXJ0VHlwZS5TVVBFUl9GQVJUXTogJyNlNzRjM2MnLFxuICAgIFtGYXJ0VHlwZS5NRUdBX0ZBUlRdOiAnIzliNTliNicsXG4gICAgW0ZhcnRUeXBlLlVMVFJBX0ZBUlRdOiAnIzFhYmM5YydcbiAgfTtcbiAgXG4gIGNvbnN0cnVjdG9yKHg6IG51bWJlciwgeTogbnVtYmVyLCBmYXJ0VHlwZTogRmFydFR5cGUpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5mYXJ0VHlwZSA9IGZhcnRUeXBlO1xuICB9XG4gIFxuICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGEgcHVsc2luZyBlZmZlY3RcbiAgICB0aGlzLnB1bHNlU2l6ZSArPSB0aGlzLnB1bHNlRGlyZWN0aW9uICogdGhpcy5wdWxzZVNwZWVkICogZGVsdGFUaW1lO1xuICAgIFxuICAgIGlmICh0aGlzLnB1bHNlU2l6ZSA+IDUpIHtcbiAgICAgIHRoaXMucHVsc2VEaXJlY3Rpb24gPSAtMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMucHVsc2VTaXplIDwgMCkge1xuICAgICAgdGhpcy5wdWxzZURpcmVjdGlvbiA9IDE7XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5jb2xvcnNbdGhpcy5mYXJ0VHlwZV07XG4gICAgXG4gICAgLy8gRHJhdyBwb3dlci11cCBhcyBhIGNvbG9yZWQgY2lyY2xlIHdpdGggYSBwdWxzaW5nIGVmZmVjdFxuICAgIGN0eC5maWxsU3R5bGUgPSBjb2xvcjtcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgKHRoaXMud2lkdGggLyAyKSArIHRoaXMucHVsc2VTaXplLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBcbiAgICAvLyBEcmF3IGlubmVyIGNpcmNsZVxuICAgIGN0eC5maWxsU3R5bGUgPSAnd2hpdGUnO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoIC8gNCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgXG4gICAgLy8gRHJhdyB0ZXh0IGluZGljYXRvciBmb3IgZmFydCB0eXBlXG4gICAgbGV0IGxhYmVsOiBzdHJpbmc7XG4gICAgc3dpdGNoICh0aGlzLmZhcnRUeXBlKSB7XG4gICAgICBjYXNlIEZhcnRUeXBlLlNIT1JUX0ZBUlQ6XG4gICAgICAgIGxhYmVsID0gJ1MnO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRmFydFR5cGUuTE9OR19GQVJUOlxuICAgICAgICBsYWJlbCA9ICdMJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZhcnRUeXBlLkNJUkNMRV9GQVJUOlxuICAgICAgICBsYWJlbCA9ICdDJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZhcnRUeXBlLlNVUEVSX0ZBUlQ6XG4gICAgICAgIGxhYmVsID0gJ1NQJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZhcnRUeXBlLk1FR0FfRkFSVDpcbiAgICAgICAgbGFiZWwgPSAnTSc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGYXJ0VHlwZS5VTFRSQV9GQVJUOlxuICAgICAgICBsYWJlbCA9ICdVJztcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIFxuICAgIGN0eC5maWxsU3R5bGUgPSAnYmxhY2snO1xuICAgIGN0eC5mb250ID0gJzEwcHggQXJpYWwnO1xuICAgIGN0eC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBjdHgudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY3R4LmZpbGxUZXh0KGxhYmVsLCB0aGlzLngsIHRoaXMueSk7XG4gIH1cbiAgXG4gIHB1YmxpYyBpc09mZlNjcmVlbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy55ID4gNjAwICsgdGhpcy5oZWlnaHQ7IC8vIEFzc3VtaW5nIGNhbnZhcyBoZWlnaHQgaXMgNjAwXG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRGYXJ0VHlwZSgpOiBGYXJ0VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuZmFydFR5cGU7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRYKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueDtcbiAgfVxuICBcbiAgcHVibGljIGdldFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy55O1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0V2lkdGgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy53aWR0aDtcbiAgfVxuICBcbiAgcHVibGljIGdldEhlaWdodCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIENvbGxpc2lvbkRldGVjdG9yIHtcbiAgLyoqXG4gICAqIERldGVjdHMgY29sbGlzaW9uIGJldHdlZW4gdHdvIGdhbWUgb2JqZWN0cyB1c2luZyBBeGlzLUFsaWduZWQgQm91bmRpbmcgQm94IG1ldGhvZFxuICAgKiBCb3RoIG9iamVjdHMgbXVzdCBoYXZlIGdldFgoKSwgZ2V0WSgpLCBnZXRXaWR0aCgpLCBhbmQgZ2V0SGVpZ2h0KCkgbWV0aG9kc1xuICAgKi9cbiAgcHVibGljIGNoZWNrQ29sbGlzaW9uKFxuICAgIG9iajE6IHsgZ2V0WCgpOiBudW1iZXI7IGdldFkoKTogbnVtYmVyOyBnZXRXaWR0aCgpOiBudW1iZXI7IGdldEhlaWdodCgpOiBudW1iZXIgfSxcbiAgICBvYmoyOiB7IGdldFgoKTogbnVtYmVyOyBnZXRZKCk6IG51bWJlcjsgZ2V0V2lkdGgoKTogbnVtYmVyOyBnZXRIZWlnaHQoKTogbnVtYmVyIH1cbiAgKTogYm9vbGVhbiB7XG4gICAgLy8gR2V0IHBvc2l0aW9ucyBhbmQgZGltZW5zaW9ucyBmb3IgYm90aCBvYmplY3RzXG4gICAgY29uc3Qgb2JqMVggPSBvYmoxLmdldFgoKTtcbiAgICBjb25zdCBvYmoxWSA9IG9iajEuZ2V0WSgpO1xuICAgIGNvbnN0IG9iajFXaWR0aCA9IG9iajEuZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBvYmoxSGVpZ2h0ID0gb2JqMS5nZXRIZWlnaHQoKTtcbiAgICBcbiAgICBjb25zdCBvYmoyWCA9IG9iajIuZ2V0WCgpO1xuICAgIGNvbnN0IG9iajJZID0gb2JqMi5nZXRZKCk7XG4gICAgY29uc3Qgb2JqMldpZHRoID0gb2JqMi5nZXRXaWR0aCgpO1xuICAgIGNvbnN0IG9iajJIZWlnaHQgPSBvYmoyLmdldEhlaWdodCgpO1xuICAgIFxuICAgIC8vIENhbGN1bGF0ZSBib3VuZHMgZm9yIGJvdGggb2JqZWN0c1xuICAgIGNvbnN0IG9iajFMZWZ0ID0gb2JqMVggLSBvYmoxV2lkdGggLyAyO1xuICAgIGNvbnN0IG9iajFSaWdodCA9IG9iajFYICsgb2JqMVdpZHRoIC8gMjtcbiAgICBjb25zdCBvYmoxVG9wID0gb2JqMVkgLSBvYmoxSGVpZ2h0IC8gMjtcbiAgICBjb25zdCBvYmoxQm90dG9tID0gb2JqMVkgKyBvYmoxSGVpZ2h0IC8gMjtcbiAgICBcbiAgICBjb25zdCBvYmoyTGVmdCA9IG9iajJYIC0gb2JqMldpZHRoIC8gMjtcbiAgICBjb25zdCBvYmoyUmlnaHQgPSBvYmoyWCArIG9iajJXaWR0aCAvIDI7XG4gICAgY29uc3Qgb2JqMlRvcCA9IG9iajJZIC0gb2JqMkhlaWdodCAvIDI7XG4gICAgY29uc3Qgb2JqMkJvdHRvbSA9IG9iajJZICsgb2JqMkhlaWdodCAvIDI7XG4gICAgXG4gICAgLy8gQ2hlY2sgZm9yIG92ZXJsYXAgb24gYm90aCBheGVzXG4gICAgcmV0dXJuIChcbiAgICAgIG9iajFSaWdodCA+IG9iajJMZWZ0ICYmXG4gICAgICBvYmoxTGVmdCA8IG9iajJSaWdodCAmJlxuICAgICAgb2JqMUJvdHRvbSA+IG9iajJUb3AgJiZcbiAgICAgIG9iajFUb3AgPCBvYmoyQm90dG9tXG4gICAgKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIENoZWNrcyBpZiBhIHBvaW50IGlzIGluc2lkZSBhbiBvYmplY3RcbiAgICovXG4gIHB1YmxpYyBpc1BvaW50SW5PYmplY3QoXG4gICAgcG9pbnRYOiBudW1iZXIsXG4gICAgcG9pbnRZOiBudW1iZXIsXG4gICAgb2JqOiB7IGdldFgoKTogbnVtYmVyOyBnZXRZKCk6IG51bWJlcjsgZ2V0V2lkdGgoKTogbnVtYmVyOyBnZXRIZWlnaHQoKTogbnVtYmVyIH1cbiAgKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgb2JqWCA9IG9iai5nZXRYKCk7XG4gICAgY29uc3Qgb2JqWSA9IG9iai5nZXRZKCk7XG4gICAgY29uc3Qgb2JqV2lkdGggPSBvYmouZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBvYmpIZWlnaHQgPSBvYmouZ2V0SGVpZ2h0KCk7XG4gICAgXG4gICAgY29uc3Qgb2JqTGVmdCA9IG9ialggLSBvYmpXaWR0aCAvIDI7XG4gICAgY29uc3Qgb2JqUmlnaHQgPSBvYmpYICsgb2JqV2lkdGggLyAyO1xuICAgIGNvbnN0IG9ialRvcCA9IG9ialkgLSBvYmpIZWlnaHQgLyAyO1xuICAgIGNvbnN0IG9iakJvdHRvbSA9IG9ialkgKyBvYmpIZWlnaHQgLyAyO1xuICAgIFxuICAgIHJldHVybiAoXG4gICAgICBwb2ludFggPj0gb2JqTGVmdCAmJlxuICAgICAgcG9pbnRYIDw9IG9ialJpZ2h0ICYmXG4gICAgICBwb2ludFkgPj0gb2JqVG9wICYmXG4gICAgICBwb2ludFkgPD0gb2JqQm90dG9tXG4gICAgKTtcbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIEhpZ2hTY29yZU1hbmFnZXIge1xuICBwcml2YXRlIHJlYWRvbmx5IFNUT1JBR0VfS0VZID0gJ2ZhcnRvZ2dlcl9oaWdoX3Njb3Jlcyc7XG4gIHByaXZhdGUgc2NvcmVzOiBudW1iZXJbXSA9IFtdO1xuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2FkU2NvcmVzKCk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBBZGQgYSBuZXcgc2NvcmUgdG8gdGhlIGhpZ2ggc2NvcmVzIGxpc3RcbiAgICovXG4gIHB1YmxpYyBhZGRTY29yZShzY29yZTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5zY29yZXMucHVzaChzY29yZSk7XG4gICAgXG4gICAgLy8gU29ydCBzY29yZXMgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgIHRoaXMuc2NvcmVzLnNvcnQoKGEsIGIpID0+IGIgLSBhKTtcbiAgICBcbiAgICAvLyBLZWVwIG9ubHkgdGhlIHRvcCAxMCBzY29yZXNcbiAgICBpZiAodGhpcy5zY29yZXMubGVuZ3RoID4gMTApIHtcbiAgICAgIHRoaXMuc2NvcmVzID0gdGhpcy5zY29yZXMuc2xpY2UoMCwgMTApO1xuICAgIH1cbiAgICBcbiAgICB0aGlzLnNhdmVTY29yZXMoKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIEdldCBhbGwgaGlnaCBzY29yZXNcbiAgICovXG4gIHB1YmxpYyBnZXRTY29yZXMoKTogbnVtYmVyW10ge1xuICAgIHJldHVybiBbLi4udGhpcy5zY29yZXNdO1xuICB9XG4gIFxuICAvKipcbiAgICogQ2hlY2sgaWYgYSBnaXZlbiBzY29yZSBpcyBhIGhpZ2ggc2NvcmVcbiAgICovXG4gIHB1YmxpYyBpc0hpZ2hTY29yZShzY29yZTogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgLy8gSWYgd2UgaGF2ZSBsZXNzIHRoYW4gMTAgc2NvcmVzLCBhbnkgc2NvcmUgaXMgYSBoaWdoIHNjb3JlXG4gICAgaWYgKHRoaXMuc2NvcmVzLmxlbmd0aCA8IDEwKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgXG4gICAgLy8gT3RoZXJ3aXNlLCBjaGVjayBpZiB0aGUgc2NvcmUgaXMgaGlnaGVyIHRoYW4gdGhlIGxvd2VzdCBoaWdoIHNjb3JlXG4gICAgcmV0dXJuIHNjb3JlID4gdGhpcy5zY29yZXNbdGhpcy5zY29yZXMubGVuZ3RoIC0gMV07XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgaGlnaCBzY29yZXNcbiAgICovXG4gIHB1YmxpYyBjbGVhclNjb3JlcygpOiB2b2lkIHtcbiAgICB0aGlzLnNjb3JlcyA9IFtdO1xuICAgIHRoaXMuc2F2ZVNjb3JlcygpO1xuICB9XG4gIFxuICAvKipcbiAgICogTG9hZCBzY29yZXMgZnJvbSBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBwcml2YXRlIGxvYWRTY29yZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RvcmVkU2NvcmVzID0gbG9jYWxTdG9yYWdlLmdldEl0ZW0odGhpcy5TVE9SQUdFX0tFWSk7XG4gICAgXG4gICAgaWYgKHN0b3JlZFNjb3Jlcykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy5zY29yZXMgPSBKU09OLnBhcnNlKHN0b3JlZFNjb3Jlcyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIHN0b3JlZCBzY29yZXM6JywgZXJyb3IpO1xuICAgICAgICB0aGlzLnNjb3JlcyA9IFtdO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBcbiAgLyoqXG4gICAqIFNhdmUgc2NvcmVzIHRvIGxvY2FsIHN0b3JhZ2VcbiAgICovXG4gIHByaXZhdGUgc2F2ZVNjb3JlcygpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5TVE9SQUdFX0tFWSwgSlNPTi5zdHJpbmdpZnkodGhpcy5zY29yZXMpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2F2aW5nIHNjb3JlczonLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgSW5wdXRIYW5kbGVyIHtcbiAgcHJpdmF0ZSBrZXlzOiBNYXA8c3RyaW5nLCBib29sZWFuPiA9IG5ldyBNYXAoKTtcbiAgcHJpdmF0ZSBrZXlzUHJlc3NlZFRoaXNGcmFtZTogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gIHByaXZhdGUgbW91c2VYOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdXNlWTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3VzZUNsaWNrZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICAvLyBTZXQgdXAgZXZlbnQgbGlzdGVuZXJzIGZvciBrZXlib2FyZFxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmtleXMuc2V0KGV2ZW50LmtleSwgdHJ1ZSk7XG4gICAgICB0aGlzLmtleXNQcmVzc2VkVGhpc0ZyYW1lLmFkZChldmVudC5rZXkpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLmtleXMuc2V0KGV2ZW50LmtleSwgZmFsc2UpO1xuICAgIH0pO1xuXG4gICAgLy8gU2V0IHVwIGV2ZW50IGxpc3RlbmVycyBmb3IgbW91c2VcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICB0aGlzLm1vdXNlWCA9IGV2ZW50LmNsaWVudFg7XG4gICAgICB0aGlzLm1vdXNlWSA9IGV2ZW50LmNsaWVudFk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZUNsaWNrZWQgPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICB0aGlzLm1vdXNlQ2xpY2tlZCA9IGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGlzS2V5RG93bihrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLmtleXMuZ2V0KGtleSkgPT09IHRydWU7XG4gIH1cblxuICBwdWJsaWMgaXNLZXlQcmVzc2VkKGtleTogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgaXNQcmVzc2VkID0gdGhpcy5rZXlzUHJlc3NlZFRoaXNGcmFtZS5oYXMoa2V5KTtcbiAgICAvLyBSZW1vdmUgdGhlIGtleSBmcm9tIHRoZSBzZXQgb25jZSBpdCdzIGJlZW4gY2hlY2tlZFxuICAgIC8vIHRvIGVuc3VyZSBpdCdzIG9ubHkgcmVwb3J0ZWQgYXMgcHJlc3NlZCBvbmNlXG4gICAgaWYgKGlzUHJlc3NlZCkge1xuICAgICAgdGhpcy5rZXlzUHJlc3NlZFRoaXNGcmFtZS5kZWxldGUoa2V5KTtcbiAgICB9XG4gICAgcmV0dXJuIGlzUHJlc3NlZDtcbiAgfVxuXG4gIHB1YmxpYyBpc01vdXNlQ2xpY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB3YXNDbGlja2VkID0gdGhpcy5tb3VzZUNsaWNrZWQ7XG4gICAgLy8gUmVzZXQgbW91c2UgY2xpY2tlZCBzdGF0ZSB0byBlbnN1cmUgaXQncyBvbmx5IHJlcG9ydGVkIG9uY2VcbiAgICB0aGlzLm1vdXNlQ2xpY2tlZCA9IGZhbHNlO1xuICAgIHJldHVybiB3YXNDbGlja2VkO1xuICB9XG5cbiAgcHVibGljIGdldE1vdXNlWCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLm1vdXNlWDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNb3VzZVkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZVk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKCk6IHZvaWQge1xuICAgIC8vIENsZWFyIGtleXMgcHJlc3NlZCB0aGlzIGZyYW1lXG4gICAgdGhpcy5rZXlzUHJlc3NlZFRoaXNGcmFtZS5jbGVhcigpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBGYXJ0VHlwZSB9IGZyb20gJy4uL2dhbWUvRmFydFR5cGUnO1xuXG4vKipcbiAqIEEgbm8tb3Agc291bmQgbWFuYWdlciBhcyBwZXIgcmVxdWVzdCB0byByZW1vdmUgc291bmQgZnJvbSB0aGUgZ2FtZVxuICovXG5leHBvcnQgY2xhc3MgU291bmRNYW5hZ2VyIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gTm8gc291bmRzIHRvIGluaXRpYWxpemVcbiAgfVxuICBcbiAgcHVibGljIGxvYWRTb3VuZHMoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlCYWNrZ3JvdW5kTXVzaWMoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHN0b3BCYWNrZ3JvdW5kTXVzaWMoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlGYXJ0U291bmQoZmFydFR5cGU6IEZhcnRUeXBlKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlIaXRTb3VuZCgpOiB2b2lkIHtcbiAgICAvLyBOby1vcFxuICB9XG4gIFxuICBwdWJsaWMgcGxheVBvd2VyVXBTb3VuZCgpOiB2b2lkIHtcbiAgICAvLyBOby1vcFxuICB9XG4gIFxuICBwdWJsaWMgcGxheUxldmVsQ29tcGxldGVTb3VuZCgpOiB2b2lkIHtcbiAgICAvLyBOby1vcFxuICB9XG4gIFxuICBwdWJsaWMgcGxheUdhbWVPdmVyU291bmQoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxufVxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCIvKipcbiAqIEZhcnRvZ2dlciAtIEEgRnJvZ2dlci1saWtlIGdhbWUgd2l0aCBmYXJ0aW5nIG1lY2hhbmljc1xuICogTWFpbiBlbnRyeSBwb2ludCBmaWxlXG4gKi9cbmltcG9ydCB7IEdhbWUgfSBmcm9tICcuL2dhbWUvR2FtZSc7XG5cbi8vIFdhaXQgZm9yIHRoZSBET00gdG8gbG9hZCBiZWZvcmUgaW5pdGlhbGl6aW5nIHRoZSBnYW1lXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgY29uc3QgZ2FtZSA9IG5ldyBHYW1lKCk7XG4gIGdhbWUuaW5pdGlhbGl6ZSgpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=