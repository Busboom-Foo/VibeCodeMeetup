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
var Car = /** @class */ (function () {
    function Car(x, y, speed, carType) {
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
    Car.prototype.update = function (deltaTime) {
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
    };
    Car.prototype.draw = function (ctx) {
        // Determine if the car is facing left or right
        var isRightFacing = this.speed > 0;
        // Save the current context state
        ctx.save();
        // Draw car body
        ctx.fillStyle = this.carColor;
        ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        // Draw car details (windows, lights, etc.)
        ctx.fillStyle = '#222222'; // Darker color for details
        // Draw windows
        var windowWidth = this.width * 0.5;
        var windowHeight = this.height * 0.5;
        var windowX = this.x - windowWidth / 2;
        var windowY = this.y - windowHeight / 2;
        ctx.fillRect(windowX, windowY, windowWidth, windowHeight);
        // Draw wheels
        var wheelRadius = this.height * 0.25;
        var wheelOffsetX = this.width * 0.3;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(this.x - wheelOffsetX, this.y + this.height * 0.3, wheelRadius, 0, Math.PI * 2);
        ctx.arc(this.x + wheelOffsetX, this.y + this.height * 0.3, wheelRadius, 0, Math.PI * 2);
        ctx.fill();
        // Draw headlights/taillights
        var lightRadius = this.height * 0.1;
        var lightOffsetX = this.width * 0.4;
        var lightOffsetY = this.height * 0.1;
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
    };
    Car.prototype.drawSlowEffect = function (ctx) {
        // Draw a green haze around the car
        ctx.fillStyle = 'rgba(100, 200, 50, 0.3)';
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width * 0.7, this.height * 0.7, 0, 0, Math.PI * 2);
        ctx.fill();
    };
    Car.prototype.slowDown = function () {
        if (!this.isSlowed) {
            this.isSlowed = true;
            this.speed = this.originalSpeed * 0.4; // Slow to 40% of original speed
            this.slowTimer = this.slowDuration;
        }
        else {
            // Extend slow duration if already slowed
            this.slowTimer = this.slowDuration;
        }
    };
    Car.prototype.isOffScreen = function () {
        var buffer = 100; // Extra distance to travel before being removed
        if (this.speed > 0) {
            // Moving right
            return this.x - this.width / 2 > 800 + buffer; // Assuming canvas width is 800
        }
        else {
            // Moving left
            return this.x + this.width / 2 < -buffer;
        }
    };
    Car.prototype.getX = function () {
        return this.x;
    };
    Car.prototype.getY = function () {
        return this.y;
    };
    Car.prototype.getWidth = function () {
        return this.width;
    };
    Car.prototype.getHeight = function () {
        return this.height;
    };
    return Car;
}());



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
var FartCloud = /** @class */ (function () {
    function FartCloud(x, y, width, height, lifetime) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.lifetime = lifetime;
        this.maxLifetime = lifetime;
        this.dissipationRate = 1; // How fast the cloud dissipates
        // Random greenish-brown color for the fart cloud
        var greenComponent = Math.floor(Math.random() * 100) + 100;
        var redComponent = Math.floor(Math.random() * 50) + 100;
        this.color = "rgba(".concat(redComponent, ", ").concat(greenComponent, ", 50, 0.7)");
    }
    FartCloud.prototype.update = function (deltaTime) {
        // Reduce lifetime
        this.lifetime -= deltaTime * this.dissipationRate;
        // Make cloud grow slightly as it dissipates
        this.width += deltaTime * 5;
        this.height += deltaTime * 5;
    };
    FartCloud.prototype.draw = function (ctx) {
        // Calculate opacity based on remaining lifetime
        var opacity = (this.lifetime / this.maxLifetime) * 0.7;
        // Update color with new opacity
        var baseColor = this.color.substring(0, this.color.lastIndexOf(',') + 1);
        var cloudColor = "".concat(baseColor, " ").concat(opacity, ")");
        // Draw cloud as a semi-transparent circle
        ctx.fillStyle = cloudColor;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width, this.height, 0, 0, Math.PI * 2);
        ctx.fill();
    };
    FartCloud.prototype.isDissipated = function () {
        return this.lifetime <= 0;
    };
    FartCloud.prototype.getX = function () {
        return this.x;
    };
    FartCloud.prototype.getY = function () {
        return this.y;
    };
    FartCloud.prototype.getWidth = function () {
        return this.width;
    };
    FartCloud.prototype.getHeight = function () {
        return this.height;
    };
    return FartCloud;
}());



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


var Frog = /** @class */ (function () {
    function Frog(x, y, canvas) {
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
    Frog.prototype.update = function (deltaTime) {
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
        for (var i = this.fartClouds.length - 1; i >= 0; i--) {
            this.fartClouds[i].update(deltaTime);
            if (this.fartClouds[i].isDissipated()) {
                this.fartClouds.splice(i, 1);
            }
        }
    };
    Frog.prototype.draw = function (ctx) {
        // Draw fart clouds behind the frog
        this.fartClouds.forEach(function (cloud) { return cloud.draw(ctx); });
        // Draw frog as a basic shape
        ctx.save();
        // Draw the frog body
        ctx.fillStyle = !this.isAlive ? '#888888' : (this.isFarting ? '#77CC77' : '#55AA55');
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.width / 2, this.height / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Draw eyes
        var eyeRadius = this.width / 10;
        var eyeOffsetX = this.width / 4;
        var eyeOffsetY = -this.height / 6;
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(this.x - eyeOffsetX, this.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        ctx.arc(this.x + eyeOffsetX, this.y + eyeOffsetY, eyeRadius, 0, Math.PI * 2);
        ctx.fill();
        // Draw pupils
        ctx.fillStyle = '#000000';
        var pupilRadius = eyeRadius / 2;
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
    };
    Frog.prototype.drawFartTypeIndicator = function (ctx) {
        var _a;
        if (!this.isAlive)
            return;
        var colors = (_a = {},
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART] = '#3498db',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART] = '#2ecc71',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART] = '#f1c40f',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART] = '#e74c3c',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART] = '#9b59b6',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART] = '#1abc9c',
            _a);
        var color = colors[this.currentFartType] || '#3498db';
        // Draw indicator circle above frog
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(this.x, this.y - this.height / 2 - 10, 5, 0, Math.PI * 2);
        ctx.fill();
    };
    Frog.prototype.moveLeft = function () {
        if (!this.isAlive)
            return;
        this.x -= this.speed;
        // Keep the frog within the canvas bounds
        if (this.x < this.width / 2) {
            this.x = this.width / 2;
        }
    };
    Frog.prototype.moveRight = function () {
        if (!this.isAlive)
            return;
        this.x += this.speed;
        // Keep the frog within the canvas bounds
        if (this.x > this.canvas.width - this.width / 2) {
            this.x = this.canvas.width - this.width / 2;
        }
    };
    Frog.prototype.fart = function () {
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
    };
    Frog.prototype.moveForward = function (amount) {
        this.y -= amount * 20; // Move frog upward (forward)
    };
    Frog.prototype.createShortFart = function () {
        var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2, 20, 20, 1.5);
        this.fartClouds.push(cloud);
    };
    Frog.prototype.createLongFart = function () {
        // Create a series of clouds in a straight line behind the frog
        for (var i = 0; i < 3; i++) {
            var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2 + i * 15, 20 - i * 2, 20 - i * 2, 2 - i * 0.3);
            this.fartClouds.push(cloud);
        }
    };
    Frog.prototype.createCircleFart = function () {
        // Create a circle of fart clouds around the frog
        var numClouds = 8;
        var radius = 30;
        for (var i = 0; i < numClouds; i++) {
            var angle = (i / numClouds) * Math.PI * 2;
            var cloudX = this.x + Math.cos(angle) * radius;
            var cloudY = this.y + Math.sin(angle) * radius;
            var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 15, 15, 2);
            this.fartClouds.push(cloud);
        }
    };
    Frog.prototype.createSuperFart = function () {
        // Create a more powerful straight line fart
        for (var i = 0; i < 5; i++) {
            var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(this.x, this.y + this.height / 2 + i * 15, 25 - i * 2, 25 - i * 2, 2.5 - i * 0.2);
            this.fartClouds.push(cloud);
        }
    };
    Frog.prototype.createMegaFart = function () {
        // Create a large explosion of fart clouds
        var numClouds = 12;
        var radius = 40;
        for (var i = 0; i < numClouds; i++) {
            var angle = (i / numClouds) * Math.PI * 2;
            var cloudX = this.x + Math.cos(angle) * radius;
            var cloudY = this.y + Math.sin(angle) * radius;
            var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 20, 20, 3);
            this.fartClouds.push(cloud);
        }
    };
    Frog.prototype.createUltraFart = function () {
        // Create an ultra-powerful fart with multiple expanding rings
        for (var ring = 1; ring <= 3; ring++) {
            var numClouds = 8;
            var radius = 20 * ring;
            for (var i = 0; i < numClouds; i++) {
                var angle = (i / numClouds) * Math.PI * 2;
                var cloudX = this.x + Math.cos(angle) * radius;
                var cloudY = this.y + Math.sin(angle) * radius;
                var cloud = new _FartCloud__WEBPACK_IMPORTED_MODULE_1__.FartCloud(cloudX, cloudY, 25 - ring * 3, 25 - ring * 3, 4 - ring * 0.5);
                this.fartClouds.push(cloud);
            }
        }
    };
    Frog.prototype.hit = function () {
        this.isAlive = false;
    };
    Frog.prototype.collectPowerUp = function (fartType) {
        var _this = this;
        this.currentFartType = fartType;
        // Increase fart power temporarily
        this.fartPower = 1.5;
        // Reset fart power after a few seconds
        setTimeout(function () {
            _this.fartPower = 1;
        }, 5000);
    };
    Frog.prototype.reset = function (x, y) {
        this.x = x;
        this.y = y;
        this.isAlive = true;
        this.isFarting = false;
        this.currentFartType = _FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART;
        this.fartPower = 1;
        this.fartClouds = [];
    };
    Frog.prototype.getX = function () {
        return this.x;
    };
    Frog.prototype.getY = function () {
        return this.y;
    };
    Frog.prototype.getWidth = function () {
        return this.width;
    };
    Frog.prototype.getHeight = function () {
        return this.height;
    };
    Frog.prototype.getCurrentFartType = function () {
        return this.currentFartType;
    };
    Frog.prototype.getFartClouds = function () {
        return this.fartClouds;
    };
    return Frog;
}());



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









var Game = /** @class */ (function () {
    function Game() {
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
    Game.prototype.initialize = function () {
        var _this = this;
        // Set up event listeners for buttons
        var startButton = document.getElementById('start-button');
        var restartButton = document.getElementById('restart-button');
        if (startButton) {
            startButton.addEventListener('click', function () { return _this.startGame(); });
        }
        if (restartButton) {
            restartButton.addEventListener('click', function () { return _this.restartGame(); });
        }
        // Initialize levels
        this.initializeLevels();
        // Display high scores
        this.displayHighScores();
        // Load sounds
        this.soundManager.loadSounds();
    };
    Game.prototype.initializeLevels = function () {
        // Create different levels with increasing difficulty
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(1, 2, 1, 1)); // Level 1: slow cars, few cars, few power-ups
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(2, 3, 1.5, 2)); // Level 2: more cars, faster, more power-ups
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(3, 4, 2, 2)); // Level 3: even more cars, even faster
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(4, 5, 2.5, 3)); // Level 4: lots of cars, very fast
        this.levels.push(new _Level__WEBPACK_IMPORTED_MODULE_4__.Level(5, 6, 3, 3)); // Level 5: extreme difficulty
    };
    Game.prototype.startGame = function () {
        var _this = this;
        // Hide start screen
        var startScreen = document.getElementById('start-screen');
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
        window.requestAnimationFrame(function (timestamp) { return _this.gameLoop(timestamp); });
    };
    Game.prototype.gameLoop = function (timestamp) {
        var _this = this;
        if (!this.isGameRunning)
            return;
        // Calculate delta time (time since last frame)
        var deltaTime = this.lastTimestamp ? (timestamp - this.lastTimestamp) / 1000 : 0;
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
            window.requestAnimationFrame(function (timestamp) { return _this.gameLoop(timestamp); });
        }
    };
    Game.prototype.update = function (deltaTime) {
        var _this = this;
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
        this.cars.forEach(function (car, index) {
            car.update(deltaTime);
            // Remove cars that are off-screen
            if (car.isOffScreen()) {
                _this.cars.splice(index, 1);
                _this.increaseScore(10); // Points for avoiding a car
            }
        });
        // Update power-ups
        this.powerUps.forEach(function (powerUp, index) {
            powerUp.update(deltaTime);
            // Remove power-ups that are off-screen
            if (powerUp.isOffScreen()) {
                _this.powerUps.splice(index, 1);
            }
        });
        // Update fart clouds
        this.fartClouds.forEach(function (cloud, index) {
            cloud.update(deltaTime);
            // Remove clouds that have dissipated
            if (cloud.isDissipated()) {
                _this.fartClouds.splice(index, 1);
            }
        });
    };
    Game.prototype.draw = function () {
        var _this = this;
        // Draw background
        this.drawBackground();
        // Draw game objects
        this.cars.forEach(function (car) { return car.draw(_this.ctx); });
        this.powerUps.forEach(function (powerUp) { return powerUp.draw(_this.ctx); });
        this.fartClouds.forEach(function (cloud) { return cloud.draw(_this.ctx); });
        this.frog.draw(this.ctx);
        // Update UI elements
        this.updateUIElements();
    };
    Game.prototype.drawBackground = function () {
        // Draw road and lanes
        this.ctx.fillStyle = '#444444';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        // Draw lane markings
        this.ctx.strokeStyle = '#FFFFFF';
        this.ctx.setLineDash([20, 15]);
        var laneHeight = this.canvas.height / 6;
        for (var i = 1; i < 6; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, laneHeight * i);
            this.ctx.lineTo(this.canvas.width, laneHeight * i);
            this.ctx.stroke();
        }
        // Reset line dash
        this.ctx.setLineDash([]);
    };
    Game.prototype.spawnCars = function (deltaTime) {
        // Probability of spawning a new car depends on level difficulty
        var spawnChance = this.currentLevel.carSpawnRate * deltaTime;
        if (Math.random() < spawnChance) {
            var laneHeight = this.canvas.height / 6;
            var lane = Math.floor(Math.random() * 5) + 1; // Lanes 1-5
            var yPosition = lane * laneHeight - laneHeight / 2;
            // Alternate direction based on lane
            var isLeftToRight = lane % 2 === 0;
            var xPosition = isLeftToRight ? -50 : this.canvas.width + 50;
            // Random car speed based on level difficulty
            var speed = (isLeftToRight ? 1 : -1) *
                (this.currentLevel.carSpeed * 100 * (0.8 + Math.random() * 0.4));
            var car = new _Car__WEBPACK_IMPORTED_MODULE_1__.Car(xPosition, yPosition, speed, "car".concat(Math.floor(Math.random() * 3) + 1));
            this.cars.push(car);
        }
    };
    Game.prototype.spawnPowerUps = function (deltaTime) {
        // Probability of spawning a new power-up depends on level
        var spawnChance = 0.01 * deltaTime * this.currentLevel.powerUpRate;
        if (Math.random() < spawnChance && this.powerUps.length < 3) {
            var x = Math.random() * (this.canvas.width - 40) + 20;
            var y = Math.random() * (this.canvas.height - 100) + 50;
            // Randomly select a fart type for the power-up
            var fartTypes = [
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.SHORT_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.LONG_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.CIRCLE_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.SUPER_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.MEGA_FART,
                _FartType__WEBPACK_IMPORTED_MODULE_3__.FartType.ULTRA_FART
            ];
            var randomIndex = Math.floor(Math.random() * fartTypes.length);
            var fartType = fartTypes[randomIndex];
            var powerUp = new _PowerUp__WEBPACK_IMPORTED_MODULE_2__.PowerUp(x, y, fartType);
            this.powerUps.push(powerUp);
        }
    };
    Game.prototype.checkCollisions = function () {
        // Check for collisions between frog and cars
        for (var _i = 0, _a = this.cars; _i < _a.length; _i++) {
            var car = _a[_i];
            if (this.collisionDetector.checkCollision(this.frog, car)) {
                this.frog.hit();
                this.gameOver();
                return;
            }
        }
        // Check for collisions between frog and power-ups
        for (var i = this.powerUps.length - 1; i >= 0; i--) {
            if (this.collisionDetector.checkCollision(this.frog, this.powerUps[i])) {
                var powerUp = this.powerUps[i];
                this.frog.collectPowerUp(powerUp.getFartType());
                this.increaseScore(50); // Points for collecting a power-up
                this.addTime(5); // Add 5 seconds for collecting a power-up
                this.powerUps.splice(i, 1);
            }
        }
        // Check for collisions between fart clouds and cars
        for (var _b = 0, _c = this.fartClouds; _b < _c.length; _b++) {
            var cloud = _c[_b];
            for (var i = this.cars.length - 1; i >= 0; i--) {
                if (this.collisionDetector.checkCollision(cloud, this.cars[i])) {
                    // Slow down cars that hit fart clouds
                    this.cars[i].slowDown();
                    this.increaseScore(15); // Points for slowing a car
                }
            }
        }
    };
    Game.prototype.checkLevelCompletion = function () {
        // Check if player has crossed to the top of the screen
        if (this.frog.getY() <= 30) {
            this.levelComplete();
        }
    };
    Game.prototype.levelComplete = function () {
        // Increase level
        this.level++;
        // Add bonus points for completing level
        var levelBonus = this.level * 100;
        this.increaseScore(levelBonus);
        // Add bonus time
        this.addTime(10);
        // Set new level difficulty
        var levelIndex = Math.min(this.level - 1, this.levels.length - 1);
        this.currentLevel = this.levels[levelIndex];
        // Level completed
        // Reset frog position
        this.frog.reset(this.canvas.width / 2, this.canvas.height - 50);
        // Update level display
        document.getElementById('level').innerText = "Level: ".concat(this.level);
    };
    Game.prototype.increaseScore = function (points) {
        this.score += points;
        document.getElementById('score').innerText = "Score: ".concat(this.score);
    };
    Game.prototype.updateTimer = function (deltaTime) {
        this.time -= deltaTime;
        if (this.time < 0) {
            this.time = 0;
        }
        document.getElementById('time').innerText = "Time: ".concat(Math.ceil(this.time));
    };
    Game.prototype.addTime = function (seconds) {
        this.time += seconds;
        document.getElementById('time').innerText = "Time: ".concat(Math.ceil(this.time));
    };
    Game.prototype.updateUIElements = function () {
        document.getElementById('score').innerText = "Score: ".concat(this.score);
        document.getElementById('time').innerText = "Time: ".concat(Math.ceil(this.time));
        document.getElementById('level').innerText = "Level: ".concat(this.level);
    };
    Game.prototype.gameOver = function () {
        this.isGameOver = true;
        this.isGameRunning = false;
        // Show game over screen
        var gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'flex';
        }
        // Update final score
        var finalScoreElement = document.getElementById('final-score');
        if (finalScoreElement) {
            finalScoreElement.innerText = "Final Score: ".concat(this.score);
        }
        // Save high score
        this.highScoreManager.addScore(this.score);
        this.displayHighScores();
    };
    Game.prototype.restartGame = function () {
        // Hide game over screen
        var gameOverScreen = document.getElementById('game-over-screen');
        if (gameOverScreen) {
            gameOverScreen.style.display = 'none';
        }
        // Start a new game
        this.startGame();
    };
    Game.prototype.displayHighScores = function () {
        var scores = this.highScoreManager.getScores();
        var scoresList = document.getElementById('scores-list');
        if (scoresList) {
            scoresList.innerHTML = '';
            scores.slice(0, 5).forEach(function (score, index) {
                var scoreElement = document.createElement('div');
                scoreElement.innerText = "".concat(index + 1, ". ").concat(score);
                scoresList.appendChild(scoreElement);
            });
        }
    };
    return Game;
}());



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
var Level = /** @class */ (function () {
    function Level(level, carSpawnRate, carSpeed, powerUpRate) {
        this.level = level;
        this.carSpawnRate = carSpawnRate;
        this.carSpeed = carSpeed;
        this.powerUpRate = powerUpRate;
    }
    return Level;
}());



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

var PowerUp = /** @class */ (function () {
    function PowerUp(x, y, fartType) {
        var _a;
        this.width = 30;
        this.height = 30;
        this.pulseSize = 0;
        this.pulseDirection = 1;
        this.pulseSpeed = 2;
        this.colors = (_a = {},
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SHORT_FART] = '#3498db',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.LONG_FART] = '#2ecc71',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.CIRCLE_FART] = '#f1c40f',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.SUPER_FART] = '#e74c3c',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.MEGA_FART] = '#9b59b6',
            _a[_FartType__WEBPACK_IMPORTED_MODULE_0__.FartType.ULTRA_FART] = '#1abc9c',
            _a);
        this.x = x;
        this.y = y;
        this.fartType = fartType;
    }
    PowerUp.prototype.update = function (deltaTime) {
        // Create a pulsing effect
        this.pulseSize += this.pulseDirection * this.pulseSpeed * deltaTime;
        if (this.pulseSize > 5) {
            this.pulseDirection = -1;
        }
        else if (this.pulseSize < 0) {
            this.pulseDirection = 1;
        }
    };
    PowerUp.prototype.draw = function (ctx) {
        var color = this.colors[this.fartType];
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
        var label;
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
    };
    PowerUp.prototype.isOffScreen = function () {
        return this.y > 600 + this.height; // Assuming canvas height is 600
    };
    PowerUp.prototype.getFartType = function () {
        return this.fartType;
    };
    PowerUp.prototype.getX = function () {
        return this.x;
    };
    PowerUp.prototype.getY = function () {
        return this.y;
    };
    PowerUp.prototype.getWidth = function () {
        return this.width;
    };
    PowerUp.prototype.getHeight = function () {
        return this.height;
    };
    return PowerUp;
}());



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
var CollisionDetector = /** @class */ (function () {
    function CollisionDetector() {
    }
    /**
     * Detects collision between two game objects using Axis-Aligned Bounding Box method
     * Both objects must have getX(), getY(), getWidth(), and getHeight() methods
     */
    CollisionDetector.prototype.checkCollision = function (obj1, obj2) {
        // Get positions and dimensions for both objects
        var obj1X = obj1.getX();
        var obj1Y = obj1.getY();
        var obj1Width = obj1.getWidth();
        var obj1Height = obj1.getHeight();
        var obj2X = obj2.getX();
        var obj2Y = obj2.getY();
        var obj2Width = obj2.getWidth();
        var obj2Height = obj2.getHeight();
        // Calculate bounds for both objects
        var obj1Left = obj1X - obj1Width / 2;
        var obj1Right = obj1X + obj1Width / 2;
        var obj1Top = obj1Y - obj1Height / 2;
        var obj1Bottom = obj1Y + obj1Height / 2;
        var obj2Left = obj2X - obj2Width / 2;
        var obj2Right = obj2X + obj2Width / 2;
        var obj2Top = obj2Y - obj2Height / 2;
        var obj2Bottom = obj2Y + obj2Height / 2;
        // Check for overlap on both axes
        return (obj1Right > obj2Left &&
            obj1Left < obj2Right &&
            obj1Bottom > obj2Top &&
            obj1Top < obj2Bottom);
    };
    /**
     * Checks if a point is inside an object
     */
    CollisionDetector.prototype.isPointInObject = function (pointX, pointY, obj) {
        var objX = obj.getX();
        var objY = obj.getY();
        var objWidth = obj.getWidth();
        var objHeight = obj.getHeight();
        var objLeft = objX - objWidth / 2;
        var objRight = objX + objWidth / 2;
        var objTop = objY - objHeight / 2;
        var objBottom = objY + objHeight / 2;
        return (pointX >= objLeft &&
            pointX <= objRight &&
            pointY >= objTop &&
            pointY <= objBottom);
    };
    return CollisionDetector;
}());



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
var __spreadArray = (undefined && undefined.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var HighScoreManager = /** @class */ (function () {
    function HighScoreManager() {
        this.STORAGE_KEY = 'fartogger_high_scores';
        this.scores = [];
        this.loadScores();
    }
    /**
     * Add a new score to the high scores list
     */
    HighScoreManager.prototype.addScore = function (score) {
        this.scores.push(score);
        // Sort scores in descending order
        this.scores.sort(function (a, b) { return b - a; });
        // Keep only the top 10 scores
        if (this.scores.length > 10) {
            this.scores = this.scores.slice(0, 10);
        }
        this.saveScores();
    };
    /**
     * Get all high scores
     */
    HighScoreManager.prototype.getScores = function () {
        return __spreadArray([], this.scores, true);
    };
    /**
     * Check if a given score is a high score
     */
    HighScoreManager.prototype.isHighScore = function (score) {
        // If we have less than 10 scores, any score is a high score
        if (this.scores.length < 10) {
            return true;
        }
        // Otherwise, check if the score is higher than the lowest high score
        return score > this.scores[this.scores.length - 1];
    };
    /**
     * Clear all high scores
     */
    HighScoreManager.prototype.clearScores = function () {
        this.scores = [];
        this.saveScores();
    };
    /**
     * Load scores from local storage
     */
    HighScoreManager.prototype.loadScores = function () {
        var storedScores = localStorage.getItem(this.STORAGE_KEY);
        if (storedScores) {
            try {
                this.scores = JSON.parse(storedScores);
            }
            catch (error) {
                console.error('Error parsing stored scores:', error);
                this.scores = [];
            }
        }
    };
    /**
     * Save scores to local storage
     */
    HighScoreManager.prototype.saveScores = function () {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scores));
        }
        catch (error) {
            console.error('Error saving scores:', error);
        }
    };
    return HighScoreManager;
}());



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
var InputHandler = /** @class */ (function () {
    function InputHandler() {
        var _this = this;
        this.keys = new Map();
        this.keysPressedThisFrame = new Set();
        this.mouseX = 0;
        this.mouseY = 0;
        this.mouseClicked = false;
        // Set up event listeners for keyboard
        window.addEventListener('keydown', function (event) {
            _this.keys.set(event.key, true);
            _this.keysPressedThisFrame.add(event.key);
        });
        window.addEventListener('keyup', function (event) {
            _this.keys.set(event.key, false);
        });
        // Set up event listeners for mouse
        window.addEventListener('mousemove', function (event) {
            _this.mouseX = event.clientX;
            _this.mouseY = event.clientY;
        });
        window.addEventListener('mousedown', function () {
            _this.mouseClicked = true;
        });
        window.addEventListener('mouseup', function () {
            _this.mouseClicked = false;
        });
    }
    InputHandler.prototype.isKeyDown = function (key) {
        return this.keys.get(key) === true;
    };
    InputHandler.prototype.isKeyPressed = function (key) {
        var isPressed = this.keysPressedThisFrame.has(key);
        // Remove the key from the set once it's been checked
        // to ensure it's only reported as pressed once
        if (isPressed) {
            this.keysPressedThisFrame.delete(key);
        }
        return isPressed;
    };
    InputHandler.prototype.isMouseClicked = function () {
        var wasClicked = this.mouseClicked;
        // Reset mouse clicked state to ensure it's only reported once
        this.mouseClicked = false;
        return wasClicked;
    };
    InputHandler.prototype.getMouseX = function () {
        return this.mouseX;
    };
    InputHandler.prototype.getMouseY = function () {
        return this.mouseY;
    };
    InputHandler.prototype.update = function () {
        // Clear keys pressed this frame
        this.keysPressedThisFrame.clear();
    };
    return InputHandler;
}());



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
var SoundManager = /** @class */ (function () {
    function SoundManager() {
        // No sounds to initialize
    }
    SoundManager.prototype.loadSounds = function () {
        // No-op
    };
    SoundManager.prototype.playBackgroundMusic = function () {
        // No-op
    };
    SoundManager.prototype.stopBackgroundMusic = function () {
        // No-op
    };
    SoundManager.prototype.playFartSound = function (fartType) {
        // No-op
    };
    SoundManager.prototype.playHitSound = function () {
        // No-op
    };
    SoundManager.prototype.playPowerUpSound = function () {
        // No-op
    };
    SoundManager.prototype.playLevelCompleteSound = function () {
        // No-op
    };
    SoundManager.prototype.playGameOverSound = function () {
        // No-op
    };
    return SoundManager;
}());



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
window.addEventListener('load', function () {
    var game = new _game_Game__WEBPACK_IMPORTED_MODULE_0__.Game();
    game.initialize();
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFFN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFDN0UsR0FBRyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFVBQVUsR0FBRyxTQUFTLEVBQUUsSUFBSSxDQUFDLENBQUMsR0FBRyxVQUFVLEdBQUcsU0FBUyxDQUFDLENBQUM7WUFFN0UsWUFBWTtZQUNaLEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsRUFB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QVE7SUFDVixDQUFDO0lBRU0sdUNBQWdCLEdBQXZCO1FBQ0UsUUFBUTtJQUNWLENBQUM7SUFFTSw2Q0FBc0IsR0FBN0I7UUFDRSxRQUFRO0lBQ1YsQ0FBQztJQUVNLHdDQUFpQixHQUF4QjtRQUNFLFFBQVE7SUFDVixDQUFDO0lBQ0gsbUJBQUM7QUFBRCxDQUFDOzs7Ozs7OztVQ3pDRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7O0FDTkE7OztHQUdHO0FBQ2dDO0FBRW5DLHdEQUF3RDtBQUN4RCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxFQUFFO0lBQzlCLElBQU0sSUFBSSxHQUFHLElBQUksNENBQUksRUFBRSxDQUFDO0lBQ3hCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNwQixDQUFDLENBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy9nYW1lL0Nhci50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvZ2FtZS9GYXJ0Q2xvdWQudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL2dhbWUvRmFydFR5cGUudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL2dhbWUvRnJvZy50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvZ2FtZS9HYW1lLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy9nYW1lL0xldmVsLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy9nYW1lL1Bvd2VyVXAudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL3V0aWxzL0NvbGxpc2lvbkRldGVjdG9yLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy91dGlscy9IaWdoU2NvcmVNYW5hZ2VyLnRzIiwid2VicGFjazovL2ZhcnRvZ2dlci8uL3NyYy91dGlscy9JbnB1dEhhbmRsZXIudHMiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyLy4vc3JjL3V0aWxzL1NvdW5kTWFuYWdlci50cyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZmFydG9nZ2VyL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9mYXJ0b2dnZXIvLi9zcmMvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIENhciB7XG4gIHByaXZhdGUgeDogbnVtYmVyO1xuICBwcml2YXRlIHk6IG51bWJlcjtcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gODA7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSA0MDtcbiAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyO1xuICBwcml2YXRlIG9yaWdpbmFsU3BlZWQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjYXJDb2xvcjogc3RyaW5nO1xuICBwcml2YXRlIGlzU2xvd2VkOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgc2xvd1RpbWVyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIHNsb3dEdXJhdGlvbjogbnVtYmVyID0gMzsgLy8gc2Vjb25kc1xuICBcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIHNwZWVkOiBudW1iZXIsIGNhclR5cGU6IHN0cmluZykge1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XG4gICAgdGhpcy5vcmlnaW5hbFNwZWVkID0gc3BlZWQ7XG4gICAgXG4gICAgLy8gQXNzaWduIGEgY29sb3IgYmFzZWQgb24gY2FyIHR5cGVcbiAgICBzd2l0Y2goY2FyVHlwZSkge1xuICAgICAgY2FzZSAnY2FyMSc6XG4gICAgICAgIHRoaXMuY2FyQ29sb3IgPSAnI2ZmMDAwMCc7IC8vIFJlZFxuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2NhcjInOlxuICAgICAgICB0aGlzLmNhckNvbG9yID0gJyMwMDAwZmYnOyAvLyBCbHVlXG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnY2FyMyc6XG4gICAgICAgIHRoaXMuY2FyQ29sb3IgPSAnI2ZmY2MwMCc7IC8vIFllbGxvd1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRoaXMuY2FyQ29sb3IgPSAnIzg4ODg4OCc7IC8vIEdyYXlcbiAgICB9XG4gIH1cbiAgXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBNb3ZlIGNhciBiYXNlZCBvbiBpdHMgc3BlZWRcbiAgICB0aGlzLnggKz0gdGhpcy5zcGVlZCAqIGRlbHRhVGltZTtcbiAgICBcbiAgICAvLyBIYW5kbGUgc2xvdyBlZmZlY3QgdGltZXJcbiAgICBpZiAodGhpcy5pc1Nsb3dlZCkge1xuICAgICAgdGhpcy5zbG93VGltZXIgLT0gZGVsdGFUaW1lO1xuICAgICAgXG4gICAgICBpZiAodGhpcy5zbG93VGltZXIgPD0gMCkge1xuICAgICAgICB0aGlzLmlzU2xvd2VkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3BlZWQgPSB0aGlzLm9yaWdpbmFsU3BlZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgZHJhdyhjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIC8vIERldGVybWluZSBpZiB0aGUgY2FyIGlzIGZhY2luZyBsZWZ0IG9yIHJpZ2h0XG4gICAgY29uc3QgaXNSaWdodEZhY2luZyA9IHRoaXMuc3BlZWQgPiAwO1xuICAgIFxuICAgIC8vIFNhdmUgdGhlIGN1cnJlbnQgY29udGV4dCBzdGF0ZVxuICAgIGN0eC5zYXZlKCk7XG4gICAgXG4gICAgLy8gRHJhdyBjYXIgYm9keVxuICAgIGN0eC5maWxsU3R5bGUgPSB0aGlzLmNhckNvbG9yO1xuICAgIGN0eC5maWxsUmVjdCh0aGlzLnggLSB0aGlzLndpZHRoIC8gMiwgdGhpcy55IC0gdGhpcy5oZWlnaHQgLyAyLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgXG4gICAgLy8gRHJhdyBjYXIgZGV0YWlscyAod2luZG93cywgbGlnaHRzLCBldGMuKVxuICAgIGN0eC5maWxsU3R5bGUgPSAnIzIyMjIyMic7IC8vIERhcmtlciBjb2xvciBmb3IgZGV0YWlsc1xuICAgIFxuICAgIC8vIERyYXcgd2luZG93c1xuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gdGhpcy53aWR0aCAqIDAuNTtcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB0aGlzLmhlaWdodCAqIDAuNTtcbiAgICBjb25zdCB3aW5kb3dYID0gdGhpcy54IC0gd2luZG93V2lkdGggLyAyO1xuICAgIGNvbnN0IHdpbmRvd1kgPSB0aGlzLnkgLSB3aW5kb3dIZWlnaHQgLyAyO1xuICAgIGN0eC5maWxsUmVjdCh3aW5kb3dYLCB3aW5kb3dZLCB3aW5kb3dXaWR0aCwgd2luZG93SGVpZ2h0KTtcbiAgICBcbiAgICAvLyBEcmF3IHdoZWVsc1xuICAgIGNvbnN0IHdoZWVsUmFkaXVzID0gdGhpcy5oZWlnaHQgKiAwLjI1O1xuICAgIGNvbnN0IHdoZWVsT2Zmc2V0WCA9IHRoaXMud2lkdGggKiAwLjM7XG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLnggLSB3aGVlbE9mZnNldFgsIHRoaXMueSArIHRoaXMuaGVpZ2h0ICogMC4zLCB3aGVlbFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5hcmModGhpcy54ICsgd2hlZWxPZmZzZXRYLCB0aGlzLnkgKyB0aGlzLmhlaWdodCAqIDAuMywgd2hlZWxSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIFxuICAgIC8vIERyYXcgaGVhZGxpZ2h0cy90YWlsbGlnaHRzXG4gICAgY29uc3QgbGlnaHRSYWRpdXMgPSB0aGlzLmhlaWdodCAqIDAuMTtcbiAgICBjb25zdCBsaWdodE9mZnNldFggPSB0aGlzLndpZHRoICogMC40O1xuICAgIGNvbnN0IGxpZ2h0T2Zmc2V0WSA9IHRoaXMuaGVpZ2h0ICogMC4xO1xuICAgIFxuICAgIGlmIChpc1JpZ2h0RmFjaW5nKSB7XG4gICAgICAvLyBIZWFkbGlnaHRzICh3aGl0ZSkgb24gcmlnaHQsIHRhaWxsaWdodHMgKHJlZCkgb24gbGVmdFxuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmZmZmJztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5hcmModGhpcy54ICsgbGlnaHRPZmZzZXRYLCB0aGlzLnkgLSBsaWdodE9mZnNldFksIGxpZ2h0UmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgICBjdHguZmlsbCgpO1xuICAgICAgXG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZjAwMDAnO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyh0aGlzLnggLSBsaWdodE9mZnNldFgsIHRoaXMueSAtIGxpZ2h0T2Zmc2V0WSwgbGlnaHRSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhlYWRsaWdodHMgKHdoaXRlKSBvbiBsZWZ0LCB0YWlsbGlnaHRzIChyZWQpIG9uIHJpZ2h0XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmZmZmYnO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4LmFyYyh0aGlzLnggLSBsaWdodE9mZnNldFgsIHRoaXMueSAtIGxpZ2h0T2Zmc2V0WSwgbGlnaHRSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICAgIGN0eC5maWxsKCk7XG4gICAgICBcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmMDAwMCc7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHguYXJjKHRoaXMueCArIGxpZ2h0T2Zmc2V0WCwgdGhpcy55IC0gbGlnaHRPZmZzZXRZLCBsaWdodFJhZGl1cywgMCwgTWF0aC5QSSAqIDIpO1xuICAgICAgY3R4LmZpbGwoKTtcbiAgICB9XG4gICAgXG4gICAgLy8gUmVzdG9yZSB0aGUgY29udGV4dCBzdGF0ZVxuICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgXG4gICAgLy8gRHJhdyBzbG93IGVmZmVjdCBpbmRpY2F0b3IgaWYgY2FyIGlzIHNsb3dlZFxuICAgIGlmICh0aGlzLmlzU2xvd2VkKSB7XG4gICAgICB0aGlzLmRyYXdTbG93RWZmZWN0KGN0eCk7XG4gICAgfVxuICB9XG4gIFxuICBwcml2YXRlIGRyYXdTbG93RWZmZWN0KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgLy8gRHJhdyBhIGdyZWVuIGhhemUgYXJvdW5kIHRoZSBjYXJcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMTAwLCAyMDAsIDUwLCAwLjMpJztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmVsbGlwc2UodGhpcy54LCB0aGlzLnksIHRoaXMud2lkdGggKiAwLjcsIHRoaXMuaGVpZ2h0ICogMC43LCAwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgfVxuICBcbiAgcHVibGljIHNsb3dEb3duKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc1Nsb3dlZCkge1xuICAgICAgdGhpcy5pc1Nsb3dlZCA9IHRydWU7XG4gICAgICB0aGlzLnNwZWVkID0gdGhpcy5vcmlnaW5hbFNwZWVkICogMC40OyAvLyBTbG93IHRvIDQwJSBvZiBvcmlnaW5hbCBzcGVlZFxuICAgICAgdGhpcy5zbG93VGltZXIgPSB0aGlzLnNsb3dEdXJhdGlvbjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gRXh0ZW5kIHNsb3cgZHVyYXRpb24gaWYgYWxyZWFkeSBzbG93ZWRcbiAgICAgIHRoaXMuc2xvd1RpbWVyID0gdGhpcy5zbG93RHVyYXRpb247XG4gICAgfVxuICB9XG4gIFxuICBwdWJsaWMgaXNPZmZTY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYnVmZmVyID0gMTAwOyAvLyBFeHRyYSBkaXN0YW5jZSB0byB0cmF2ZWwgYmVmb3JlIGJlaW5nIHJlbW92ZWRcbiAgICBcbiAgICBpZiAodGhpcy5zcGVlZCA+IDApIHtcbiAgICAgIC8vIE1vdmluZyByaWdodFxuICAgICAgcmV0dXJuIHRoaXMueCAtIHRoaXMud2lkdGggLyAyID4gODAwICsgYnVmZmVyOyAvLyBBc3N1bWluZyBjYW52YXMgd2lkdGggaXMgODAwXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE1vdmluZyBsZWZ0XG4gICAgICByZXR1cm4gdGhpcy54ICsgdGhpcy53aWR0aCAvIDIgPCAtYnVmZmVyO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54O1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0WSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICB9XG59XG4iLCJleHBvcnQgY2xhc3MgRmFydENsb3VkIHtcbiAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gIHByaXZhdGUgeTogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXI7XG4gIHByaXZhdGUgbGlmZXRpbWU6IG51bWJlcjtcbiAgcHJpdmF0ZSBtYXhMaWZldGltZTogbnVtYmVyO1xuICBwcml2YXRlIGRpc3NpcGF0aW9uUmF0ZTogbnVtYmVyO1xuICBwcml2YXRlIGNvbG9yOiBzdHJpbmc7XG4gIFxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgd2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGxpZmV0aW1lOiBudW1iZXIpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMubGlmZXRpbWUgPSBsaWZldGltZTtcbiAgICB0aGlzLm1heExpZmV0aW1lID0gbGlmZXRpbWU7XG4gICAgdGhpcy5kaXNzaXBhdGlvblJhdGUgPSAxOyAvLyBIb3cgZmFzdCB0aGUgY2xvdWQgZGlzc2lwYXRlc1xuICAgIFxuICAgIC8vIFJhbmRvbSBncmVlbmlzaC1icm93biBjb2xvciBmb3IgdGhlIGZhcnQgY2xvdWRcbiAgICBjb25zdCBncmVlbkNvbXBvbmVudCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwMCkgKyAxMDA7XG4gICAgY29uc3QgcmVkQ29tcG9uZW50ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogNTApICsgMTAwO1xuICAgIHRoaXMuY29sb3IgPSBgcmdiYSgke3JlZENvbXBvbmVudH0sICR7Z3JlZW5Db21wb25lbnR9LCA1MCwgMC43KWA7XG4gIH1cbiAgXG4gIHB1YmxpYyB1cGRhdGUoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBSZWR1Y2UgbGlmZXRpbWVcbiAgICB0aGlzLmxpZmV0aW1lIC09IGRlbHRhVGltZSAqIHRoaXMuZGlzc2lwYXRpb25SYXRlO1xuICAgIFxuICAgIC8vIE1ha2UgY2xvdWQgZ3JvdyBzbGlnaHRseSBhcyBpdCBkaXNzaXBhdGVzXG4gICAgdGhpcy53aWR0aCArPSBkZWx0YVRpbWUgKiA1O1xuICAgIHRoaXMuaGVpZ2h0ICs9IGRlbHRhVGltZSAqIDU7XG4gIH1cbiAgXG4gIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgLy8gQ2FsY3VsYXRlIG9wYWNpdHkgYmFzZWQgb24gcmVtYWluaW5nIGxpZmV0aW1lXG4gICAgY29uc3Qgb3BhY2l0eSA9ICh0aGlzLmxpZmV0aW1lIC8gdGhpcy5tYXhMaWZldGltZSkgKiAwLjc7XG4gICAgXG4gICAgLy8gVXBkYXRlIGNvbG9yIHdpdGggbmV3IG9wYWNpdHlcbiAgICBjb25zdCBiYXNlQ29sb3IgPSB0aGlzLmNvbG9yLnN1YnN0cmluZygwLCB0aGlzLmNvbG9yLmxhc3RJbmRleE9mKCcsJykgKyAxKTtcbiAgICBjb25zdCBjbG91ZENvbG9yID0gYCR7YmFzZUNvbG9yfSAke29wYWNpdHl9KWA7XG4gICAgXG4gICAgLy8gRHJhdyBjbG91ZCBhcyBhIHNlbWktdHJhbnNwYXJlbnQgY2lyY2xlXG4gICAgY3R4LmZpbGxTdHlsZSA9IGNsb3VkQ29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5lbGxpcHNlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCwgMCwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cbiAgXG4gIHB1YmxpYyBpc0Rpc3NpcGF0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMubGlmZXRpbWUgPD0gMDtcbiAgfVxuICBcbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54O1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0WSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLnk7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRXaWR0aCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLndpZHRoO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICB9XG59XG4iLCJleHBvcnQgZW51bSBGYXJ0VHlwZSB7XG4gIFNIT1JUX0ZBUlQgPSAnU0hPUlRfRkFSVCcsXG4gIExPTkdfRkFSVCA9ICdMT05HX0ZBUlQnLFxuICBDSVJDTEVfRkFSVCA9ICdDSVJDTEVfRkFSVCcsXG4gIFNVUEVSX0ZBUlQgPSAnU1VQRVJfRkFSVCcsXG4gIE1FR0FfRkFSVCA9ICdNRUdBX0ZBUlQnLFxuICBVTFRSQV9GQVJUID0gJ1VMVFJBX0ZBUlQnXG59XG4iLCJpbXBvcnQgeyBGYXJ0VHlwZSB9IGZyb20gJy4vRmFydFR5cGUnO1xuaW1wb3J0IHsgRmFydENsb3VkIH0gZnJvbSAnLi9GYXJ0Q2xvdWQnO1xuXG5leHBvcnQgY2xhc3MgRnJvZyB7XG4gIHByaXZhdGUgeDogbnVtYmVyO1xuICBwcml2YXRlIHk6IG51bWJlcjtcbiAgcHJpdmF0ZSB3aWR0aDogbnVtYmVyID0gNDA7XG4gIHByaXZhdGUgaGVpZ2h0OiBudW1iZXIgPSA0MDtcbiAgcHJpdmF0ZSBzcGVlZDogbnVtYmVyID0gNTtcbiAgcHJpdmF0ZSBmYXJ0UG93ZXI6IG51bWJlciA9IDE7XG4gIHByaXZhdGUgY3VycmVudEZhcnRUeXBlOiBGYXJ0VHlwZSA9IEZhcnRUeXBlLlNIT1JUX0ZBUlQ7XG4gIHByaXZhdGUgaXNBbGl2ZTogYm9vbGVhbiA9IHRydWU7XG4gIHByaXZhdGUgaXNGYXJ0aW5nOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgZmFydEFuaW1hdGlvblRpbWVyOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIGZhcnRBbmltYXRpb25EdXJhdGlvbjogbnVtYmVyID0gMC4zOyAvLyBzZWNvbmRzXG4gIHByaXZhdGUgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgcHJpdmF0ZSBmYXJ0Q2xvdWRzOiBGYXJ0Q2xvdWRbXSA9IFtdO1xuICBcbiAgY29uc3RydWN0b3IoeDogbnVtYmVyLCB5OiBudW1iZXIsIGNhbnZhczogSFRNTENhbnZhc0VsZW1lbnQpIHtcbiAgICB0aGlzLnggPSB4O1xuICAgIHRoaXMueSA9IHk7XG4gICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQWxpdmUpIHJldHVybjtcbiAgICBcbiAgICAvLyBIYW5kbGUgZmFydCBhbmltYXRpb25cbiAgICBpZiAodGhpcy5pc0ZhcnRpbmcpIHtcbiAgICAgIHRoaXMuZmFydEFuaW1hdGlvblRpbWVyICs9IGRlbHRhVGltZTtcbiAgICAgIGlmICh0aGlzLmZhcnRBbmltYXRpb25UaW1lciA+PSB0aGlzLmZhcnRBbmltYXRpb25EdXJhdGlvbikge1xuICAgICAgICB0aGlzLmlzRmFydGluZyA9IGZhbHNlO1xuICAgICAgICB0aGlzLmZhcnRBbmltYXRpb25UaW1lciA9IDA7XG4gICAgICB9XG4gICAgfVxuICAgIFxuICAgIC8vIFVwZGF0ZSBmYXJ0IGNsb3Vkc1xuICAgIGZvciAobGV0IGkgPSB0aGlzLmZhcnRDbG91ZHMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgIHRoaXMuZmFydENsb3Vkc1tpXS51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgIFxuICAgICAgaWYgKHRoaXMuZmFydENsb3Vkc1tpXS5pc0Rpc3NpcGF0ZWQoKSkge1xuICAgICAgICB0aGlzLmZhcnRDbG91ZHMuc3BsaWNlKGksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBkcmF3KGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEKTogdm9pZCB7XG4gICAgLy8gRHJhdyBmYXJ0IGNsb3VkcyBiZWhpbmQgdGhlIGZyb2dcbiAgICB0aGlzLmZhcnRDbG91ZHMuZm9yRWFjaChjbG91ZCA9PiBjbG91ZC5kcmF3KGN0eCkpO1xuICAgIFxuICAgIC8vIERyYXcgZnJvZyBhcyBhIGJhc2ljIHNoYXBlXG4gICAgY3R4LnNhdmUoKTtcbiAgICBcbiAgICAvLyBEcmF3IHRoZSBmcm9nIGJvZHlcbiAgICBjdHguZmlsbFN0eWxlID0gIXRoaXMuaXNBbGl2ZSA/ICcjODg4ODg4JyA6ICh0aGlzLmlzRmFydGluZyA/ICcjNzdDQzc3JyA6ICcjNTVBQTU1Jyk7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5lbGxpcHNlKHRoaXMueCwgdGhpcy55LCB0aGlzLndpZHRoIC8gMiwgdGhpcy5oZWlnaHQgLyAyLCAwLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBcbiAgICAvLyBEcmF3IGV5ZXNcbiAgICBjb25zdCBleWVSYWRpdXMgPSB0aGlzLndpZHRoIC8gMTA7XG4gICAgY29uc3QgZXllT2Zmc2V0WCA9IHRoaXMud2lkdGggLyA0O1xuICAgIGNvbnN0IGV5ZU9mZnNldFkgPSAtdGhpcy5oZWlnaHQgLyA2O1xuICAgIFxuICAgIGN0eC5maWxsU3R5bGUgPSAnI0ZGRkZGRic7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54IC0gZXllT2Zmc2V0WCwgdGhpcy55ICsgZXllT2Zmc2V0WSwgZXllUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmFyYyh0aGlzLnggKyBleWVPZmZzZXRYLCB0aGlzLnkgKyBleWVPZmZzZXRZLCBleWVSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIFxuICAgIC8vIERyYXcgcHVwaWxzXG4gICAgY3R4LmZpbGxTdHlsZSA9ICcjMDAwMDAwJztcbiAgICBjb25zdCBwdXBpbFJhZGl1cyA9IGV5ZVJhZGl1cyAvIDI7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54IC0gZXllT2Zmc2V0WCwgdGhpcy55ICsgZXllT2Zmc2V0WSwgcHVwaWxSYWRpdXMsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguYXJjKHRoaXMueCArIGV5ZU9mZnNldFgsIHRoaXMueSArIGV5ZU9mZnNldFksIHB1cGlsUmFkaXVzLCAwLCBNYXRoLlBJICogMik7XG4gICAgY3R4LmZpbGwoKTtcbiAgICBcbiAgICAvLyBEcmF3IGEgc21pbGUgb3Igc2FkIGZhY2UgYmFzZWQgb24gYWxpdmUgc3RhdHVzXG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAwMDAnO1xuICAgIGN0eC5saW5lV2lkdGggPSAyO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBcbiAgICBpZiAodGhpcy5pc0FsaXZlKSB7XG4gICAgICAvLyBIYXBweSBzbWlsZVxuICAgICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gOCwgdGhpcy53aWR0aCAvIDQsIDAsIE1hdGguUEkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBTYWQgZmFjZSAvIFggZXllc1xuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnggLSBleWVPZmZzZXRYIC0gZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZIC0gZXllUmFkaXVzKTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy54IC0gZXllT2Zmc2V0WCArIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSArIGV5ZVJhZGl1cyk7XG4gICAgICBjdHgubW92ZVRvKHRoaXMueCAtIGV5ZU9mZnNldFggKyBleWVSYWRpdXMsIHRoaXMueSArIGV5ZU9mZnNldFkgLSBleWVSYWRpdXMpO1xuICAgICAgY3R4LmxpbmVUbyh0aGlzLnggLSBleWVPZmZzZXRYIC0gZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZICsgZXllUmFkaXVzKTtcbiAgICAgIFxuICAgICAgY3R4Lm1vdmVUbyh0aGlzLnggKyBleWVPZmZzZXRYIC0gZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZIC0gZXllUmFkaXVzKTtcbiAgICAgIGN0eC5saW5lVG8odGhpcy54ICsgZXllT2Zmc2V0WCArIGV5ZVJhZGl1cywgdGhpcy55ICsgZXllT2Zmc2V0WSArIGV5ZVJhZGl1cyk7XG4gICAgICBjdHgubW92ZVRvKHRoaXMueCArIGV5ZU9mZnNldFggKyBleWVSYWRpdXMsIHRoaXMueSArIGV5ZU9mZnNldFkgLSBleWVSYWRpdXMpO1xuICAgICAgY3R4LmxpbmVUbyh0aGlzLnggKyBleWVPZmZzZXRYIC0gZXllUmFkaXVzLCB0aGlzLnkgKyBleWVPZmZzZXRZICsgZXllUmFkaXVzKTtcbiAgICAgIFxuICAgICAgLy8gU2FkIG1vdXRoXG4gICAgICBjdHgubW92ZVRvKHRoaXMueCAtIHRoaXMud2lkdGggLyA0LCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDQpO1xuICAgICAgY3R4LnF1YWRyYXRpY0N1cnZlVG8odGhpcy54LCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDIsIHRoaXMueCArIHRoaXMud2lkdGggLyA0LCB0aGlzLnkgKyB0aGlzLmhlaWdodCAvIDQpO1xuICAgIH1cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgXG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgICBcbiAgICAvLyBEcmF3IGN1cnJlbnQgZmFydCB0eXBlIGluZGljYXRvclxuICAgIHRoaXMuZHJhd0ZhcnRUeXBlSW5kaWNhdG9yKGN0eCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdGYXJ0VHlwZUluZGljYXRvcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5pc0FsaXZlKSByZXR1cm47XG4gICAgXG4gICAgY29uc3QgY29sb3JzID0ge1xuICAgICAgW0ZhcnRUeXBlLlNIT1JUX0ZBUlRdOiAnIzM0OThkYicsXG4gICAgICBbRmFydFR5cGUuTE9OR19GQVJUXTogJyMyZWNjNzEnLFxuICAgICAgW0ZhcnRUeXBlLkNJUkNMRV9GQVJUXTogJyNmMWM0MGYnLFxuICAgICAgW0ZhcnRUeXBlLlNVUEVSX0ZBUlRdOiAnI2U3NGMzYycsXG4gICAgICBbRmFydFR5cGUuTUVHQV9GQVJUXTogJyM5YjU5YjYnLFxuICAgICAgW0ZhcnRUeXBlLlVMVFJBX0ZBUlRdOiAnIzFhYmM5YydcbiAgICB9O1xuICAgIFxuICAgIGNvbnN0IGNvbG9yID0gY29sb3JzW3RoaXMuY3VycmVudEZhcnRUeXBlXSB8fCAnIzM0OThkYic7XG4gICAgXG4gICAgLy8gRHJhdyBpbmRpY2F0b3IgY2lyY2xlIGFib3ZlIGZyb2dcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnkgLSB0aGlzLmhlaWdodCAvIDIgLSAxMCwgNSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBwdWJsaWMgbW92ZUxlZnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQWxpdmUpIHJldHVybjtcbiAgICBcbiAgICB0aGlzLnggLT0gdGhpcy5zcGVlZDtcbiAgICBcbiAgICAvLyBLZWVwIHRoZSBmcm9nIHdpdGhpbiB0aGUgY2FudmFzIGJvdW5kc1xuICAgIGlmICh0aGlzLnggPCB0aGlzLndpZHRoIC8gMikge1xuICAgICAgdGhpcy54ID0gdGhpcy53aWR0aCAvIDI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG1vdmVSaWdodCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNBbGl2ZSkgcmV0dXJuO1xuICAgIFxuICAgIHRoaXMueCArPSB0aGlzLnNwZWVkO1xuICAgIFxuICAgIC8vIEtlZXAgdGhlIGZyb2cgd2l0aGluIHRoZSBjYW52YXMgYm91bmRzXG4gICAgaWYgKHRoaXMueCA+IHRoaXMuY2FudmFzLndpZHRoIC0gdGhpcy53aWR0aCAvIDIpIHtcbiAgICAgIHRoaXMueCA9IHRoaXMuY2FudmFzLndpZHRoIC0gdGhpcy53aWR0aCAvIDI7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGZhcnQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmlzQWxpdmUgfHwgdGhpcy5pc0ZhcnRpbmcpIHJldHVybjtcbiAgICBcbiAgICB0aGlzLmlzRmFydGluZyA9IHRydWU7XG4gICAgdGhpcy5mYXJ0QW5pbWF0aW9uVGltZXIgPSAwO1xuICAgIFxuICAgIC8vIENyZWF0ZSBhIGZhcnQgY2xvdWQgYmFzZWQgb24gdGhlIGN1cnJlbnQgZmFydCB0eXBlXG4gICAgc3dpdGNoICh0aGlzLmN1cnJlbnRGYXJ0VHlwZSkge1xuICAgICAgY2FzZSBGYXJ0VHlwZS5TSE9SVF9GQVJUOlxuICAgICAgICB0aGlzLmNyZWF0ZVNob3J0RmFydCgpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKDEgKiB0aGlzLmZhcnRQb3dlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGNhc2UgRmFydFR5cGUuTE9OR19GQVJUOlxuICAgICAgICB0aGlzLmNyZWF0ZUxvbmdGYXJ0KCk7XG4gICAgICAgIHRoaXMubW92ZUZvcndhcmQoMiAqIHRoaXMuZmFydFBvd2VyKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAgIFxuICAgICAgY2FzZSBGYXJ0VHlwZS5DSVJDTEVfRkFSVDpcbiAgICAgICAgdGhpcy5jcmVhdGVDaXJjbGVGYXJ0KCk7XG4gICAgICAgIHRoaXMubW92ZUZvcndhcmQoMS41ICogdGhpcy5mYXJ0UG93ZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICBjYXNlIEZhcnRUeXBlLlNVUEVSX0ZBUlQ6XG4gICAgICAgIHRoaXMuY3JlYXRlU3VwZXJGYXJ0KCk7XG4gICAgICAgIHRoaXMubW92ZUZvcndhcmQoMi41ICogdGhpcy5mYXJ0UG93ZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgICAgXG4gICAgICBjYXNlIEZhcnRUeXBlLk1FR0FfRkFSVDpcbiAgICAgICAgdGhpcy5jcmVhdGVNZWdhRmFydCgpO1xuICAgICAgICB0aGlzLm1vdmVGb3J3YXJkKDMgKiB0aGlzLmZhcnRQb3dlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgICBcbiAgICAgIGNhc2UgRmFydFR5cGUuVUxUUkFfRkFSVDpcbiAgICAgICAgdGhpcy5jcmVhdGVVbHRyYUZhcnQoKTtcbiAgICAgICAgdGhpcy5tb3ZlRm9yd2FyZCg0ICogdGhpcy5mYXJ0UG93ZXIpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1vdmVGb3J3YXJkKGFtb3VudDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy55IC09IGFtb3VudCAqIDIwOyAvLyBNb3ZlIGZyb2cgdXB3YXJkIChmb3J3YXJkKVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVTaG9ydEZhcnQoKTogdm9pZCB7XG4gICAgY29uc3QgY2xvdWQgPSBuZXcgRmFydENsb3VkKHRoaXMueCwgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyLCAyMCwgMjAsIDEuNSk7XG4gICAgdGhpcy5mYXJ0Q2xvdWRzLnB1c2goY2xvdWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVMb25nRmFydCgpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYSBzZXJpZXMgb2YgY2xvdWRzIGluIGEgc3RyYWlnaHQgbGluZSBiZWhpbmQgdGhlIGZyb2dcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDM7IGkrKykge1xuICAgICAgY29uc3QgY2xvdWQgPSBuZXcgRmFydENsb3VkKFxuICAgICAgICB0aGlzLngsXG4gICAgICAgIHRoaXMueSArIHRoaXMuaGVpZ2h0IC8gMiArIGkgKiAxNSxcbiAgICAgICAgMjAgLSBpICogMixcbiAgICAgICAgMjAgLSBpICogMixcbiAgICAgICAgMiAtIGkgKiAwLjNcbiAgICAgICk7XG4gICAgICB0aGlzLmZhcnRDbG91ZHMucHVzaChjbG91ZCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjcmVhdGVDaXJjbGVGYXJ0KCk6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhIGNpcmNsZSBvZiBmYXJ0IGNsb3VkcyBhcm91bmQgdGhlIGZyb2dcbiAgICBjb25zdCBudW1DbG91ZHMgPSA4O1xuICAgIGNvbnN0IHJhZGl1cyA9IDMwO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtQ2xvdWRzOyBpKyspIHtcbiAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBudW1DbG91ZHMpICogTWF0aC5QSSAqIDI7XG4gICAgICBjb25zdCBjbG91ZFggPSB0aGlzLnggKyBNYXRoLmNvcyhhbmdsZSkgKiByYWRpdXM7XG4gICAgICBjb25zdCBjbG91ZFkgPSB0aGlzLnkgKyBNYXRoLnNpbihhbmdsZSkgKiByYWRpdXM7XG4gICAgICBcbiAgICAgIGNvbnN0IGNsb3VkID0gbmV3IEZhcnRDbG91ZChjbG91ZFgsIGNsb3VkWSwgMTUsIDE1LCAyKTtcbiAgICAgIHRoaXMuZmFydENsb3Vkcy5wdXNoKGNsb3VkKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGNyZWF0ZVN1cGVyRmFydCgpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgYSBtb3JlIHBvd2VyZnVsIHN0cmFpZ2h0IGxpbmUgZmFydFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNTsgaSsrKSB7XG4gICAgICBjb25zdCBjbG91ZCA9IG5ldyBGYXJ0Q2xvdWQoXG4gICAgICAgIHRoaXMueCxcbiAgICAgICAgdGhpcy55ICsgdGhpcy5oZWlnaHQgLyAyICsgaSAqIDE1LFxuICAgICAgICAyNSAtIGkgKiAyLFxuICAgICAgICAyNSAtIGkgKiAyLFxuICAgICAgICAyLjUgLSBpICogMC4yXG4gICAgICApO1xuICAgICAgdGhpcy5mYXJ0Q2xvdWRzLnB1c2goY2xvdWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlTWVnYUZhcnQoKTogdm9pZCB7XG4gICAgLy8gQ3JlYXRlIGEgbGFyZ2UgZXhwbG9zaW9uIG9mIGZhcnQgY2xvdWRzXG4gICAgY29uc3QgbnVtQ2xvdWRzID0gMTI7XG4gICAgY29uc3QgcmFkaXVzID0gNDA7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1DbG91ZHM7IGkrKykge1xuICAgICAgY29uc3QgYW5nbGUgPSAoaSAvIG51bUNsb3VkcykgKiBNYXRoLlBJICogMjtcbiAgICAgIGNvbnN0IGNsb3VkWCA9IHRoaXMueCArIE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgIGNvbnN0IGNsb3VkWSA9IHRoaXMueSArIE1hdGguc2luKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgIFxuICAgICAgY29uc3QgY2xvdWQgPSBuZXcgRmFydENsb3VkKGNsb3VkWCwgY2xvdWRZLCAyMCwgMjAsIDMpO1xuICAgICAgdGhpcy5mYXJ0Q2xvdWRzLnB1c2goY2xvdWQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY3JlYXRlVWx0cmFGYXJ0KCk6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhbiB1bHRyYS1wb3dlcmZ1bCBmYXJ0IHdpdGggbXVsdGlwbGUgZXhwYW5kaW5nIHJpbmdzXG4gICAgZm9yIChsZXQgcmluZyA9IDE7IHJpbmcgPD0gMzsgcmluZysrKSB7XG4gICAgICBjb25zdCBudW1DbG91ZHMgPSA4O1xuICAgICAgY29uc3QgcmFkaXVzID0gMjAgKiByaW5nO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bUNsb3VkczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGFuZ2xlID0gKGkgLyBudW1DbG91ZHMpICogTWF0aC5QSSAqIDI7XG4gICAgICAgIGNvbnN0IGNsb3VkWCA9IHRoaXMueCArIE1hdGguY29zKGFuZ2xlKSAqIHJhZGl1cztcbiAgICAgICAgY29uc3QgY2xvdWRZID0gdGhpcy55ICsgTWF0aC5zaW4oYW5nbGUpICogcmFkaXVzO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2xvdWQgPSBuZXcgRmFydENsb3VkKGNsb3VkWCwgY2xvdWRZLCAyNSAtIHJpbmcgKiAzLCAyNSAtIHJpbmcgKiAzLCA0IC0gcmluZyAqIDAuNSk7XG4gICAgICAgIHRoaXMuZmFydENsb3Vkcy5wdXNoKGNsb3VkKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGl0KCk6IHZvaWQge1xuICAgIHRoaXMuaXNBbGl2ZSA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIGNvbGxlY3RQb3dlclVwKGZhcnRUeXBlOiBGYXJ0VHlwZSk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudEZhcnRUeXBlID0gZmFydFR5cGU7XG4gICAgXG4gICAgLy8gSW5jcmVhc2UgZmFydCBwb3dlciB0ZW1wb3JhcmlseVxuICAgIHRoaXMuZmFydFBvd2VyID0gMS41O1xuICAgIFxuICAgIC8vIFJlc2V0IGZhcnQgcG93ZXIgYWZ0ZXIgYSBmZXcgc2Vjb25kc1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mYXJ0UG93ZXIgPSAxO1xuICAgIH0sIDUwMDApO1xuICB9XG5cbiAgcHVibGljIHJlc2V0KHg6IG51bWJlciwgeTogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuaXNBbGl2ZSA9IHRydWU7XG4gICAgdGhpcy5pc0ZhcnRpbmcgPSBmYWxzZTtcbiAgICB0aGlzLmN1cnJlbnRGYXJ0VHlwZSA9IEZhcnRUeXBlLlNIT1JUX0ZBUlQ7XG4gICAgdGhpcy5mYXJ0UG93ZXIgPSAxO1xuICAgIHRoaXMuZmFydENsb3VkcyA9IFtdO1xuICB9XG5cbiAgcHVibGljIGdldFgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy54O1xuICB9XG5cbiAgcHVibGljIGdldFkoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy55O1xuICB9XG5cbiAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gIH1cblxuICBwdWJsaWMgZ2V0SGVpZ2h0KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICB9XG5cbiAgcHVibGljIGdldEN1cnJlbnRGYXJ0VHlwZSgpOiBGYXJ0VHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudEZhcnRUeXBlO1xuICB9XG5cbiAgcHVibGljIGdldEZhcnRDbG91ZHMoKTogRmFydENsb3VkW10ge1xuICAgIHJldHVybiB0aGlzLmZhcnRDbG91ZHM7XG4gIH1cbn1cbiIsImltcG9ydCB7IEZyb2cgfSBmcm9tICcuL0Zyb2cnO1xuaW1wb3J0IHsgQ2FyIH0gZnJvbSAnLi9DYXInO1xuaW1wb3J0IHsgUG93ZXJVcCB9IGZyb20gJy4vUG93ZXJVcCc7XG5pbXBvcnQgeyBGYXJ0VHlwZSB9IGZyb20gJy4vRmFydFR5cGUnO1xuaW1wb3J0IHsgTGV2ZWwgfSBmcm9tICcuL0xldmVsJztcbmltcG9ydCB7IElucHV0SGFuZGxlciB9IGZyb20gJy4uL3V0aWxzL0lucHV0SGFuZGxlcic7XG5pbXBvcnQgeyBDb2xsaXNpb25EZXRlY3RvciB9IGZyb20gJy4uL3V0aWxzL0NvbGxpc2lvbkRldGVjdG9yJztcbmltcG9ydCB7IFNvdW5kTWFuYWdlciB9IGZyb20gJy4uL3V0aWxzL1NvdW5kTWFuYWdlcic7XG5pbXBvcnQgeyBIaWdoU2NvcmVNYW5hZ2VyIH0gZnJvbSAnLi4vdXRpbHMvSGlnaFNjb3JlTWFuYWdlcic7XG5cbmV4cG9ydCBjbGFzcyBHYW1lIHtcbiAgcHJpdmF0ZSBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBwcml2YXRlIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEO1xuICBwcml2YXRlIGZyb2c6IEZyb2c7XG4gIHByaXZhdGUgY2FyczogQ2FyW10gPSBbXTtcbiAgcHJpdmF0ZSBwb3dlclVwczogUG93ZXJVcFtdID0gW107XG4gIHByaXZhdGUgZmFydENsb3VkczogYW55W10gPSBbXTtcbiAgcHJpdmF0ZSBzY29yZTogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBsZXZlbDogbnVtYmVyID0gMTtcbiAgcHJpdmF0ZSB0aW1lOiBudW1iZXIgPSA2MDtcbiAgcHJpdmF0ZSBpc0dhbWVPdmVyOiBib29sZWFuID0gZmFsc2U7XG4gIHByaXZhdGUgaXNHYW1lUnVubmluZzogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIGxhc3RUaW1lc3RhbXA6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgaW5wdXRIYW5kbGVyOiBJbnB1dEhhbmRsZXI7XG4gIHByaXZhdGUgY29sbGlzaW9uRGV0ZWN0b3I6IENvbGxpc2lvbkRldGVjdG9yO1xuICBwcml2YXRlIHNvdW5kTWFuYWdlcjogU291bmRNYW5hZ2VyO1xuICBwcml2YXRlIGhpZ2hTY29yZU1hbmFnZXI6IEhpZ2hTY29yZU1hbmFnZXI7XG4gIHByaXZhdGUgY3VycmVudExldmVsOiBMZXZlbDtcbiAgcHJpdmF0ZSBsZXZlbHM6IExldmVsW10gPSBbXTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWNhbnZhcycpIGFzIEhUTUxDYW52YXNFbGVtZW50O1xuICAgIHRoaXMuY3R4ID0gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gICAgdGhpcy5pbnB1dEhhbmRsZXIgPSBuZXcgSW5wdXRIYW5kbGVyKCk7XG4gICAgdGhpcy5jb2xsaXNpb25EZXRlY3RvciA9IG5ldyBDb2xsaXNpb25EZXRlY3RvcigpO1xuICAgIHRoaXMuc291bmRNYW5hZ2VyID0gbmV3IFNvdW5kTWFuYWdlcigpO1xuICAgIHRoaXMuaGlnaFNjb3JlTWFuYWdlciA9IG5ldyBIaWdoU2NvcmVNYW5hZ2VyKCk7XG4gIH1cblxuICBwdWJsaWMgaW5pdGlhbGl6ZSgpOiB2b2lkIHtcbiAgICAvLyBTZXQgdXAgZXZlbnQgbGlzdGVuZXJzIGZvciBidXR0b25zXG4gICAgY29uc3Qgc3RhcnRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc3RhcnQtYnV0dG9uJyk7XG4gICAgY29uc3QgcmVzdGFydEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyZXN0YXJ0LWJ1dHRvbicpO1xuXG4gICAgaWYgKHN0YXJ0QnV0dG9uKSB7XG4gICAgICBzdGFydEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc3RhcnRHYW1lKCkpO1xuICAgIH1cblxuICAgIGlmIChyZXN0YXJ0QnV0dG9uKSB7XG4gICAgICByZXN0YXJ0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5yZXN0YXJ0R2FtZSgpKTtcbiAgICB9XG5cbiAgICAvLyBJbml0aWFsaXplIGxldmVsc1xuICAgIHRoaXMuaW5pdGlhbGl6ZUxldmVscygpO1xuICAgIFxuICAgIC8vIERpc3BsYXkgaGlnaCBzY29yZXNcbiAgICB0aGlzLmRpc3BsYXlIaWdoU2NvcmVzKCk7XG5cbiAgICAvLyBMb2FkIHNvdW5kc1xuICAgIHRoaXMuc291bmRNYW5hZ2VyLmxvYWRTb3VuZHMoKTtcbiAgfVxuXG4gIHByaXZhdGUgaW5pdGlhbGl6ZUxldmVscygpOiB2b2lkIHtcbiAgICAvLyBDcmVhdGUgZGlmZmVyZW50IGxldmVscyB3aXRoIGluY3JlYXNpbmcgZGlmZmljdWx0eVxuICAgIHRoaXMubGV2ZWxzLnB1c2gobmV3IExldmVsKDEsIDIsIDEsIDEpKTsgLy8gTGV2ZWwgMTogc2xvdyBjYXJzLCBmZXcgY2FycywgZmV3IHBvd2VyLXVwc1xuICAgIHRoaXMubGV2ZWxzLnB1c2gobmV3IExldmVsKDIsIDMsIDEuNSwgMikpOyAvLyBMZXZlbCAyOiBtb3JlIGNhcnMsIGZhc3RlciwgbW9yZSBwb3dlci11cHNcbiAgICB0aGlzLmxldmVscy5wdXNoKG5ldyBMZXZlbCgzLCA0LCAyLCAyKSk7IC8vIExldmVsIDM6IGV2ZW4gbW9yZSBjYXJzLCBldmVuIGZhc3RlclxuICAgIHRoaXMubGV2ZWxzLnB1c2gobmV3IExldmVsKDQsIDUsIDIuNSwgMykpOyAvLyBMZXZlbCA0OiBsb3RzIG9mIGNhcnMsIHZlcnkgZmFzdFxuICAgIHRoaXMubGV2ZWxzLnB1c2gobmV3IExldmVsKDUsIDYsIDMsIDMpKTsgLy8gTGV2ZWwgNTogZXh0cmVtZSBkaWZmaWN1bHR5XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0R2FtZSgpOiB2b2lkIHtcbiAgICAvLyBIaWRlIHN0YXJ0IHNjcmVlblxuICAgIGNvbnN0IHN0YXJ0U2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3N0YXJ0LXNjcmVlbicpO1xuICAgIGlmIChzdGFydFNjcmVlbikge1xuICAgICAgc3RhcnRTY3JlZW4uc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9XG5cbiAgICAvLyBSZXNldCBnYW1lIHN0YXRlXG4gICAgdGhpcy5zY29yZSA9IDA7XG4gICAgdGhpcy5sZXZlbCA9IDE7XG4gICAgdGhpcy50aW1lID0gNjA7XG4gICAgdGhpcy5pc0dhbWVPdmVyID0gZmFsc2U7XG4gICAgdGhpcy5pc0dhbWVSdW5uaW5nID0gdHJ1ZTtcbiAgICB0aGlzLmNhcnMgPSBbXTtcbiAgICB0aGlzLnBvd2VyVXBzID0gW107XG4gICAgdGhpcy5mYXJ0Q2xvdWRzID0gW107XG5cbiAgICAvLyBTZXQgY3VycmVudCBsZXZlbFxuICAgIHRoaXMuY3VycmVudExldmVsID0gdGhpcy5sZXZlbHNbMF07XG5cbiAgICAvLyBDcmVhdGUgcGxheWVyXG4gICAgdGhpcy5mcm9nID0gbmV3IEZyb2coXG4gICAgICB0aGlzLmNhbnZhcy53aWR0aCAvIDIsXG4gICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgLSA1MCxcbiAgICAgIHRoaXMuY2FudmFzXG4gICAgKTtcblxuICAgIC8vIFN0YXJ0IGdhbWUgbG9vcFxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKHRpbWVzdGFtcCkgPT4gdGhpcy5nYW1lTG9vcCh0aW1lc3RhbXApKTtcbiAgfVxuXG4gIHByaXZhdGUgZ2FtZUxvb3AodGltZXN0YW1wOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuaXNHYW1lUnVubmluZykgcmV0dXJuO1xuXG4gICAgLy8gQ2FsY3VsYXRlIGRlbHRhIHRpbWUgKHRpbWUgc2luY2UgbGFzdCBmcmFtZSlcbiAgICBjb25zdCBkZWx0YVRpbWUgPSB0aGlzLmxhc3RUaW1lc3RhbXAgPyAodGltZXN0YW1wIC0gdGhpcy5sYXN0VGltZXN0YW1wKSAvIDEwMDAgOiAwO1xuICAgIHRoaXMubGFzdFRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuICAgIC8vIFVwZGF0ZSBnYW1lIHRpbWVyXG4gICAgdGhpcy51cGRhdGVUaW1lcihkZWx0YVRpbWUpO1xuXG4gICAgLy8gQ2xlYXIgY2FudmFzXG4gICAgdGhpcy5jdHguY2xlYXJSZWN0KDAsIDAsIHRoaXMuY2FudmFzLndpZHRoLCB0aGlzLmNhbnZhcy5oZWlnaHQpO1xuXG4gICAgLy8gVXBkYXRlIGFuZCBkcmF3IGdhbWUgb2JqZWN0c1xuICAgIHRoaXMudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgdGhpcy5kcmF3KCk7XG5cbiAgICAvLyBDaGVjayBmb3IgY29sbGlzaW9uc1xuICAgIHRoaXMuY2hlY2tDb2xsaXNpb25zKCk7XG5cbiAgICAvLyBDaGVjayBmb3IgbGV2ZWwgY29tcGxldGlvblxuICAgIHRoaXMuY2hlY2tMZXZlbENvbXBsZXRpb24oKTtcblxuICAgIC8vIFVwZGF0ZSBpbnB1dCBoYW5kbGVyIGZvciBuZXh0IGZyYW1lXG4gICAgdGhpcy5pbnB1dEhhbmRsZXIudXBkYXRlKCk7XG5cbiAgICAvLyBDaGVjayBmb3IgZ2FtZSBvdmVyIGNvbmRpdGlvbnNcbiAgICBpZiAodGhpcy50aW1lIDw9IDApIHtcbiAgICAgIHRoaXMuZ2FtZU92ZXIoKTtcbiAgICB9IGVsc2UgaWYgKCF0aGlzLmlzR2FtZU92ZXIpIHtcbiAgICAgIC8vIENvbnRpbnVlIHRoZSBnYW1lIGxvb3AgaWYgbm90IGdhbWUgb3ZlclxuICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSgodGltZXN0YW1wKSA9PiB0aGlzLmdhbWVMb29wKHRpbWVzdGFtcCkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlKGRlbHRhVGltZTogbnVtYmVyKTogdm9pZCB7XG4gICAgLy8gSGFuZGxlIGlucHV0c1xuICAgIGlmICh0aGlzLmlucHV0SGFuZGxlci5pc0tleURvd24oJ0Fycm93TGVmdCcpKSB7XG4gICAgICB0aGlzLmZyb2cubW92ZUxlZnQoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuaW5wdXRIYW5kbGVyLmlzS2V5RG93bignQXJyb3dSaWdodCcpKSB7XG4gICAgICB0aGlzLmZyb2cubW92ZVJpZ2h0KCk7XG4gICAgfVxuICAgIGlmICh0aGlzLmlucHV0SGFuZGxlci5pc0tleVByZXNzZWQoJyAnKSkge1xuICAgICAgdGhpcy5mcm9nLmZhcnQoKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgZnJvZ1xuICAgIHRoaXMuZnJvZy51cGRhdGUoZGVsdGFUaW1lKTtcblxuICAgIC8vIFNwYXduIGNhcnMgYmFzZWQgb24gbGV2ZWwgZGlmZmljdWx0eVxuICAgIHRoaXMuc3Bhd25DYXJzKGRlbHRhVGltZSk7XG5cbiAgICAvLyBTcGF3biBwb3dlci11cHMgb2NjYXNpb25hbGx5XG4gICAgdGhpcy5zcGF3blBvd2VyVXBzKGRlbHRhVGltZSk7XG5cbiAgICAvLyBVcGRhdGUgY2Fyc1xuICAgIHRoaXMuY2Fycy5mb3JFYWNoKChjYXIsIGluZGV4KSA9PiB7XG4gICAgICBjYXIudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICBcbiAgICAgIC8vIFJlbW92ZSBjYXJzIHRoYXQgYXJlIG9mZi1zY3JlZW5cbiAgICAgIGlmIChjYXIuaXNPZmZTY3JlZW4oKSkge1xuICAgICAgICB0aGlzLmNhcnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgdGhpcy5pbmNyZWFzZVNjb3JlKDEwKTsgLy8gUG9pbnRzIGZvciBhdm9pZGluZyBhIGNhclxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gVXBkYXRlIHBvd2VyLXVwc1xuICAgIHRoaXMucG93ZXJVcHMuZm9yRWFjaCgocG93ZXJVcCwgaW5kZXgpID0+IHtcbiAgICAgIHBvd2VyVXAudXBkYXRlKGRlbHRhVGltZSk7XG4gICAgICBcbiAgICAgIC8vIFJlbW92ZSBwb3dlci11cHMgdGhhdCBhcmUgb2ZmLXNjcmVlblxuICAgICAgaWYgKHBvd2VyVXAuaXNPZmZTY3JlZW4oKSkge1xuICAgICAgICB0aGlzLnBvd2VyVXBzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBVcGRhdGUgZmFydCBjbG91ZHNcbiAgICB0aGlzLmZhcnRDbG91ZHMuZm9yRWFjaCgoY2xvdWQsIGluZGV4KSA9PiB7XG4gICAgICBjbG91ZC51cGRhdGUoZGVsdGFUaW1lKTtcbiAgICAgIFxuICAgICAgLy8gUmVtb3ZlIGNsb3VkcyB0aGF0IGhhdmUgZGlzc2lwYXRlZFxuICAgICAgaWYgKGNsb3VkLmlzRGlzc2lwYXRlZCgpKSB7XG4gICAgICAgIHRoaXMuZmFydENsb3Vkcy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBkcmF3KCk6IHZvaWQge1xuICAgIC8vIERyYXcgYmFja2dyb3VuZFxuICAgIHRoaXMuZHJhd0JhY2tncm91bmQoKTtcbiAgICBcbiAgICAvLyBEcmF3IGdhbWUgb2JqZWN0c1xuICAgIHRoaXMuY2Fycy5mb3JFYWNoKGNhciA9PiBjYXIuZHJhdyh0aGlzLmN0eCkpO1xuICAgIHRoaXMucG93ZXJVcHMuZm9yRWFjaChwb3dlclVwID0+IHBvd2VyVXAuZHJhdyh0aGlzLmN0eCkpO1xuICAgIHRoaXMuZmFydENsb3Vkcy5mb3JFYWNoKGNsb3VkID0+IGNsb3VkLmRyYXcodGhpcy5jdHgpKTtcbiAgICB0aGlzLmZyb2cuZHJhdyh0aGlzLmN0eCk7XG4gICAgXG4gICAgLy8gVXBkYXRlIFVJIGVsZW1lbnRzXG4gICAgdGhpcy51cGRhdGVVSUVsZW1lbnRzKCk7XG4gIH1cblxuICBwcml2YXRlIGRyYXdCYWNrZ3JvdW5kKCk6IHZvaWQge1xuICAgIC8vIERyYXcgcm9hZCBhbmQgbGFuZXNcbiAgICB0aGlzLmN0eC5maWxsU3R5bGUgPSAnIzQ0NDQ0NCc7XG4gICAgdGhpcy5jdHguZmlsbFJlY3QoMCwgMCwgdGhpcy5jYW52YXMud2lkdGgsIHRoaXMuY2FudmFzLmhlaWdodCk7XG4gICAgXG4gICAgLy8gRHJhdyBsYW5lIG1hcmtpbmdzXG4gICAgdGhpcy5jdHguc3Ryb2tlU3R5bGUgPSAnI0ZGRkZGRic7XG4gICAgdGhpcy5jdHguc2V0TGluZURhc2goWzIwLCAxNV0pO1xuICAgIFxuICAgIGNvbnN0IGxhbmVIZWlnaHQgPSB0aGlzLmNhbnZhcy5oZWlnaHQgLyA2O1xuICAgIGZvciAobGV0IGkgPSAxOyBpIDwgNjsgaSsrKSB7XG4gICAgICB0aGlzLmN0eC5iZWdpblBhdGgoKTtcbiAgICAgIHRoaXMuY3R4Lm1vdmVUbygwLCBsYW5lSGVpZ2h0ICogaSk7XG4gICAgICB0aGlzLmN0eC5saW5lVG8odGhpcy5jYW52YXMud2lkdGgsIGxhbmVIZWlnaHQgKiBpKTtcbiAgICAgIHRoaXMuY3R4LnN0cm9rZSgpO1xuICAgIH1cbiAgICBcbiAgICAvLyBSZXNldCBsaW5lIGRhc2hcbiAgICB0aGlzLmN0eC5zZXRMaW5lRGFzaChbXSk7XG4gIH1cblxuICBwcml2YXRlIHNwYXduQ2FycyhkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIFByb2JhYmlsaXR5IG9mIHNwYXduaW5nIGEgbmV3IGNhciBkZXBlbmRzIG9uIGxldmVsIGRpZmZpY3VsdHlcbiAgICBjb25zdCBzcGF3bkNoYW5jZSA9IHRoaXMuY3VycmVudExldmVsLmNhclNwYXduUmF0ZSAqIGRlbHRhVGltZTtcbiAgICBcbiAgICBpZiAoTWF0aC5yYW5kb20oKSA8IHNwYXduQ2hhbmNlKSB7XG4gICAgICBjb25zdCBsYW5lSGVpZ2h0ID0gdGhpcy5jYW52YXMuaGVpZ2h0IC8gNjtcbiAgICAgIGNvbnN0IGxhbmUgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDE7IC8vIExhbmVzIDEtNVxuICAgICAgY29uc3QgeVBvc2l0aW9uID0gbGFuZSAqIGxhbmVIZWlnaHQgLSBsYW5lSGVpZ2h0IC8gMjtcbiAgICAgIFxuICAgICAgLy8gQWx0ZXJuYXRlIGRpcmVjdGlvbiBiYXNlZCBvbiBsYW5lXG4gICAgICBjb25zdCBpc0xlZnRUb1JpZ2h0ID0gbGFuZSAlIDIgPT09IDA7XG4gICAgICBjb25zdCB4UG9zaXRpb24gPSBpc0xlZnRUb1JpZ2h0ID8gLTUwIDogdGhpcy5jYW52YXMud2lkdGggKyA1MDtcbiAgICAgIFxuICAgICAgLy8gUmFuZG9tIGNhciBzcGVlZCBiYXNlZCBvbiBsZXZlbCBkaWZmaWN1bHR5XG4gICAgICBjb25zdCBzcGVlZCA9IChpc0xlZnRUb1JpZ2h0ID8gMSA6IC0xKSAqIFxuICAgICAgICAodGhpcy5jdXJyZW50TGV2ZWwuY2FyU3BlZWQgKiAxMDAgKiAoMC44ICsgTWF0aC5yYW5kb20oKSAqIDAuNCkpO1xuICAgICAgXG4gICAgICBjb25zdCBjYXIgPSBuZXcgQ2FyKHhQb3NpdGlvbiwgeVBvc2l0aW9uLCBzcGVlZCwgYGNhciR7TWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMykgKyAxfWApO1xuICAgICAgdGhpcy5jYXJzLnB1c2goY2FyKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHNwYXduUG93ZXJVcHMoZGVsdGFUaW1lOiBudW1iZXIpOiB2b2lkIHtcbiAgICAvLyBQcm9iYWJpbGl0eSBvZiBzcGF3bmluZyBhIG5ldyBwb3dlci11cCBkZXBlbmRzIG9uIGxldmVsXG4gICAgY29uc3Qgc3Bhd25DaGFuY2UgPSAwLjAxICogZGVsdGFUaW1lICogdGhpcy5jdXJyZW50TGV2ZWwucG93ZXJVcFJhdGU7XG4gICAgXG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCBzcGF3bkNoYW5jZSAmJiB0aGlzLnBvd2VyVXBzLmxlbmd0aCA8IDMpIHtcbiAgICAgIGNvbnN0IHggPSBNYXRoLnJhbmRvbSgpICogKHRoaXMuY2FudmFzLndpZHRoIC0gNDApICsgMjA7XG4gICAgICBjb25zdCB5ID0gTWF0aC5yYW5kb20oKSAqICh0aGlzLmNhbnZhcy5oZWlnaHQgLSAxMDApICsgNTA7XG4gICAgICBcbiAgICAgIC8vIFJhbmRvbWx5IHNlbGVjdCBhIGZhcnQgdHlwZSBmb3IgdGhlIHBvd2VyLXVwXG4gICAgICBjb25zdCBmYXJ0VHlwZXMgPSBbXG4gICAgICAgIEZhcnRUeXBlLlNIT1JUX0ZBUlQsXG4gICAgICAgIEZhcnRUeXBlLkxPTkdfRkFSVCwgXG4gICAgICAgIEZhcnRUeXBlLkNJUkNMRV9GQVJULFxuICAgICAgICBGYXJ0VHlwZS5TVVBFUl9GQVJULFxuICAgICAgICBGYXJ0VHlwZS5NRUdBX0ZBUlQsXG4gICAgICAgIEZhcnRUeXBlLlVMVFJBX0ZBUlRcbiAgICAgIF07XG4gICAgICBcbiAgICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZmFydFR5cGVzLmxlbmd0aCk7XG4gICAgICBjb25zdCBmYXJ0VHlwZSA9IGZhcnRUeXBlc1tyYW5kb21JbmRleF07XG4gICAgICBcbiAgICAgIGNvbnN0IHBvd2VyVXAgPSBuZXcgUG93ZXJVcCh4LCB5LCBmYXJ0VHlwZSk7XG4gICAgICB0aGlzLnBvd2VyVXBzLnB1c2gocG93ZXJVcCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjaGVja0NvbGxpc2lvbnMoKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgZm9yIGNvbGxpc2lvbnMgYmV0d2VlbiBmcm9nIGFuZCBjYXJzXG4gICAgZm9yIChjb25zdCBjYXIgb2YgdGhpcy5jYXJzKSB7XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25EZXRlY3Rvci5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2csIGNhcikpIHtcbiAgICAgICAgdGhpcy5mcm9nLmhpdCgpO1xuICAgICAgICB0aGlzLmdhbWVPdmVyKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBmb3IgY29sbGlzaW9ucyBiZXR3ZWVuIGZyb2cgYW5kIHBvd2VyLXVwc1xuICAgIGZvciAobGV0IGkgPSB0aGlzLnBvd2VyVXBzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICBpZiAodGhpcy5jb2xsaXNpb25EZXRlY3Rvci5jaGVja0NvbGxpc2lvbih0aGlzLmZyb2csIHRoaXMucG93ZXJVcHNbaV0pKSB7XG4gICAgICAgIGNvbnN0IHBvd2VyVXAgPSB0aGlzLnBvd2VyVXBzW2ldO1xuICAgICAgICB0aGlzLmZyb2cuY29sbGVjdFBvd2VyVXAocG93ZXJVcC5nZXRGYXJ0VHlwZSgpKTtcbiAgICAgICAgdGhpcy5pbmNyZWFzZVNjb3JlKDUwKTsgLy8gUG9pbnRzIGZvciBjb2xsZWN0aW5nIGEgcG93ZXItdXBcbiAgICAgICAgdGhpcy5hZGRUaW1lKDUpOyAvLyBBZGQgNSBzZWNvbmRzIGZvciBjb2xsZWN0aW5nIGEgcG93ZXItdXBcbiAgICAgICAgdGhpcy5wb3dlclVwcy5zcGxpY2UoaSwgMSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgZm9yIGNvbGxpc2lvbnMgYmV0d2VlbiBmYXJ0IGNsb3VkcyBhbmQgY2Fyc1xuICAgIGZvciAoY29uc3QgY2xvdWQgb2YgdGhpcy5mYXJ0Q2xvdWRzKSB7XG4gICAgICBmb3IgKGxldCBpID0gdGhpcy5jYXJzLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbGxpc2lvbkRldGVjdG9yLmNoZWNrQ29sbGlzaW9uKGNsb3VkLCB0aGlzLmNhcnNbaV0pKSB7XG4gICAgICAgICAgLy8gU2xvdyBkb3duIGNhcnMgdGhhdCBoaXQgZmFydCBjbG91ZHNcbiAgICAgICAgICB0aGlzLmNhcnNbaV0uc2xvd0Rvd24oKTtcbiAgICAgICAgICB0aGlzLmluY3JlYXNlU2NvcmUoMTUpOyAvLyBQb2ludHMgZm9yIHNsb3dpbmcgYSBjYXJcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2hlY2tMZXZlbENvbXBsZXRpb24oKTogdm9pZCB7XG4gICAgLy8gQ2hlY2sgaWYgcGxheWVyIGhhcyBjcm9zc2VkIHRvIHRoZSB0b3Agb2YgdGhlIHNjcmVlblxuICAgIGlmICh0aGlzLmZyb2cuZ2V0WSgpIDw9IDMwKSB7XG4gICAgICB0aGlzLmxldmVsQ29tcGxldGUoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxldmVsQ29tcGxldGUoKTogdm9pZCB7XG4gICAgLy8gSW5jcmVhc2UgbGV2ZWxcbiAgICB0aGlzLmxldmVsKys7XG4gICAgXG4gICAgLy8gQWRkIGJvbnVzIHBvaW50cyBmb3IgY29tcGxldGluZyBsZXZlbFxuICAgIGNvbnN0IGxldmVsQm9udXMgPSB0aGlzLmxldmVsICogMTAwO1xuICAgIHRoaXMuaW5jcmVhc2VTY29yZShsZXZlbEJvbnVzKTtcbiAgICBcbiAgICAvLyBBZGQgYm9udXMgdGltZVxuICAgIHRoaXMuYWRkVGltZSgxMCk7XG4gICAgXG4gICAgLy8gU2V0IG5ldyBsZXZlbCBkaWZmaWN1bHR5XG4gICAgY29uc3QgbGV2ZWxJbmRleCA9IE1hdGgubWluKHRoaXMubGV2ZWwgLSAxLCB0aGlzLmxldmVscy5sZW5ndGggLSAxKTtcbiAgICB0aGlzLmN1cnJlbnRMZXZlbCA9IHRoaXMubGV2ZWxzW2xldmVsSW5kZXhdO1xuICAgIFxuICAgIC8vIExldmVsIGNvbXBsZXRlZFxuICAgIFxuICAgIC8vIFJlc2V0IGZyb2cgcG9zaXRpb25cbiAgICB0aGlzLmZyb2cucmVzZXQodGhpcy5jYW52YXMud2lkdGggLyAyLCB0aGlzLmNhbnZhcy5oZWlnaHQgLSA1MCk7XG4gICAgXG4gICAgLy8gVXBkYXRlIGxldmVsIGRpc3BsYXlcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbGV2ZWwnKSEuaW5uZXJUZXh0ID0gYExldmVsOiAke3RoaXMubGV2ZWx9YDtcbiAgfVxuXG4gIHByaXZhdGUgaW5jcmVhc2VTY29yZShwb2ludHM6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2NvcmUgKz0gcG9pbnRzO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY29yZScpIS5pbm5lclRleHQgPSBgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVUaW1lcihkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMudGltZSAtPSBkZWx0YVRpbWU7XG4gICAgXG4gICAgaWYgKHRoaXMudGltZSA8IDApIHtcbiAgICAgIHRoaXMudGltZSA9IDA7XG4gICAgfVxuICAgIFxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aW1lJykhLmlubmVyVGV4dCA9IGBUaW1lOiAke01hdGguY2VpbCh0aGlzLnRpbWUpfWA7XG4gIH1cblxuICBwcml2YXRlIGFkZFRpbWUoc2Vjb25kczogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy50aW1lICs9IHNlY29uZHM7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKSEuaW5uZXJUZXh0ID0gYFRpbWU6ICR7TWF0aC5jZWlsKHRoaXMudGltZSl9YDtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlVUlFbGVtZW50cygpOiB2b2lkIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmUnKSEuaW5uZXJUZXh0ID0gYFNjb3JlOiAke3RoaXMuc2NvcmV9YDtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpIS5pbm5lclRleHQgPSBgVGltZTogJHtNYXRoLmNlaWwodGhpcy50aW1lKX1gO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdsZXZlbCcpIS5pbm5lclRleHQgPSBgTGV2ZWw6ICR7dGhpcy5sZXZlbH1gO1xuICB9XG5cbiAgcHJpdmF0ZSBnYW1lT3ZlcigpOiB2b2lkIHtcbiAgICB0aGlzLmlzR2FtZU92ZXIgPSB0cnVlO1xuICAgIHRoaXMuaXNHYW1lUnVubmluZyA9IGZhbHNlO1xuICAgIFxuICAgIC8vIFNob3cgZ2FtZSBvdmVyIHNjcmVlblxuICAgIGNvbnN0IGdhbWVPdmVyU2NyZWVuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWUtb3Zlci1zY3JlZW4nKTtcbiAgICBpZiAoZ2FtZU92ZXJTY3JlZW4pIHtcbiAgICAgIGdhbWVPdmVyU2NyZWVuLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgfVxuICAgIFxuICAgIC8vIFVwZGF0ZSBmaW5hbCBzY29yZVxuICAgIGNvbnN0IGZpbmFsU2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmFsLXNjb3JlJyk7XG4gICAgaWYgKGZpbmFsU2NvcmVFbGVtZW50KSB7XG4gICAgICBmaW5hbFNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBgRmluYWwgU2NvcmU6ICR7dGhpcy5zY29yZX1gO1xuICAgIH1cbiAgICBcbiAgICAvLyBTYXZlIGhpZ2ggc2NvcmVcbiAgICB0aGlzLmhpZ2hTY29yZU1hbmFnZXIuYWRkU2NvcmUodGhpcy5zY29yZSk7XG4gICAgdGhpcy5kaXNwbGF5SGlnaFNjb3JlcygpO1xuICB9XG5cbiAgcHJpdmF0ZSByZXN0YXJ0R2FtZSgpOiB2b2lkIHtcbiAgICAvLyBIaWRlIGdhbWUgb3ZlciBzY3JlZW5cbiAgICBjb25zdCBnYW1lT3ZlclNjcmVlbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLW92ZXItc2NyZWVuJyk7XG4gICAgaWYgKGdhbWVPdmVyU2NyZWVuKSB7XG4gICAgICBnYW1lT3ZlclNjcmVlbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIH1cbiAgICBcbiAgICAvLyBTdGFydCBhIG5ldyBnYW1lXG4gICAgdGhpcy5zdGFydEdhbWUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZGlzcGxheUhpZ2hTY29yZXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc2NvcmVzID0gdGhpcy5oaWdoU2NvcmVNYW5hZ2VyLmdldFNjb3JlcygpO1xuICAgIGNvbnN0IHNjb3Jlc0xpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NvcmVzLWxpc3QnKTtcbiAgICBcbiAgICBpZiAoc2NvcmVzTGlzdCkge1xuICAgICAgc2NvcmVzTGlzdC5pbm5lckhUTUwgPSAnJztcbiAgICAgIFxuICAgICAgc2NvcmVzLnNsaWNlKDAsIDUpLmZvckVhY2goKHNjb3JlOiBudW1iZXIsIGluZGV4OiBudW1iZXIpID0+IHtcbiAgICAgICAgY29uc3Qgc2NvcmVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHNjb3JlRWxlbWVudC5pbm5lclRleHQgPSBgJHtpbmRleCArIDF9LiAke3Njb3JlfWA7XG4gICAgICAgIHNjb3Jlc0xpc3QuYXBwZW5kQ2hpbGQoc2NvcmVFbGVtZW50KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIExldmVsIHtcbiAgcHVibGljIHJlYWRvbmx5IGxldmVsOiBudW1iZXI7XG4gIHB1YmxpYyByZWFkb25seSBjYXJTcGF3blJhdGU6IG51bWJlcjtcbiAgcHVibGljIHJlYWRvbmx5IGNhclNwZWVkOiBudW1iZXI7XG4gIHB1YmxpYyByZWFkb25seSBwb3dlclVwUmF0ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGxldmVsOiBudW1iZXIsIGNhclNwYXduUmF0ZTogbnVtYmVyLCBjYXJTcGVlZDogbnVtYmVyLCBwb3dlclVwUmF0ZTogbnVtYmVyKSB7XG4gICAgdGhpcy5sZXZlbCA9IGxldmVsO1xuICAgIHRoaXMuY2FyU3Bhd25SYXRlID0gY2FyU3Bhd25SYXRlO1xuICAgIHRoaXMuY2FyU3BlZWQgPSBjYXJTcGVlZDtcbiAgICB0aGlzLnBvd2VyVXBSYXRlID0gcG93ZXJVcFJhdGU7XG4gIH1cbn1cbiIsImltcG9ydCB7IEZhcnRUeXBlIH0gZnJvbSAnLi9GYXJ0VHlwZSc7XG5cbmV4cG9ydCBjbGFzcyBQb3dlclVwIHtcbiAgcHJpdmF0ZSB4OiBudW1iZXI7XG4gIHByaXZhdGUgeTogbnVtYmVyO1xuICBwcml2YXRlIHdpZHRoOiBudW1iZXIgPSAzMDtcbiAgcHJpdmF0ZSBoZWlnaHQ6IG51bWJlciA9IDMwO1xuICBwcml2YXRlIGZhcnRUeXBlOiBGYXJ0VHlwZTtcbiAgcHJpdmF0ZSBwdWxzZVNpemU6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgcHVsc2VEaXJlY3Rpb246IG51bWJlciA9IDE7XG4gIHByaXZhdGUgcHVsc2VTcGVlZDogbnVtYmVyID0gMjtcbiAgcHJpdmF0ZSBjb2xvcnM6IFJlY29yZDxGYXJ0VHlwZSwgc3RyaW5nPiA9IHtcbiAgICBbRmFydFR5cGUuU0hPUlRfRkFSVF06ICcjMzQ5OGRiJyxcbiAgICBbRmFydFR5cGUuTE9OR19GQVJUXTogJyMyZWNjNzEnLFxuICAgIFtGYXJ0VHlwZS5DSVJDTEVfRkFSVF06ICcjZjFjNDBmJyxcbiAgICBbRmFydFR5cGUuU1VQRVJfRkFSVF06ICcjZTc0YzNjJyxcbiAgICBbRmFydFR5cGUuTUVHQV9GQVJUXTogJyM5YjU5YjYnLFxuICAgIFtGYXJ0VHlwZS5VTFRSQV9GQVJUXTogJyMxYWJjOWMnXG4gIH07XG4gIFxuICBjb25zdHJ1Y3Rvcih4OiBudW1iZXIsIHk6IG51bWJlciwgZmFydFR5cGU6IEZhcnRUeXBlKSB7XG4gICAgdGhpcy54ID0geDtcbiAgICB0aGlzLnkgPSB5O1xuICAgIHRoaXMuZmFydFR5cGUgPSBmYXJ0VHlwZTtcbiAgfVxuICBcbiAgcHVibGljIHVwZGF0ZShkZWx0YVRpbWU6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIENyZWF0ZSBhIHB1bHNpbmcgZWZmZWN0XG4gICAgdGhpcy5wdWxzZVNpemUgKz0gdGhpcy5wdWxzZURpcmVjdGlvbiAqIHRoaXMucHVsc2VTcGVlZCAqIGRlbHRhVGltZTtcbiAgICBcbiAgICBpZiAodGhpcy5wdWxzZVNpemUgPiA1KSB7XG4gICAgICB0aGlzLnB1bHNlRGlyZWN0aW9uID0gLTE7XG4gICAgfSBlbHNlIGlmICh0aGlzLnB1bHNlU2l6ZSA8IDApIHtcbiAgICAgIHRoaXMucHVsc2VEaXJlY3Rpb24gPSAxO1xuICAgIH1cbiAgfVxuICBcbiAgcHVibGljIGRyYXcoY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQpOiB2b2lkIHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuY29sb3JzW3RoaXMuZmFydFR5cGVdO1xuICAgIFxuICAgIC8vIERyYXcgcG93ZXItdXAgYXMgYSBjb2xvcmVkIGNpcmNsZSB3aXRoIGEgcHVsc2luZyBlZmZlY3RcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgIGN0eC5hcmModGhpcy54LCB0aGlzLnksICh0aGlzLndpZHRoIC8gMikgKyB0aGlzLnB1bHNlU2l6ZSwgMCwgTWF0aC5QSSAqIDIpO1xuICAgIGN0eC5maWxsKCk7XG4gICAgXG4gICAgLy8gRHJhdyBpbm5lciBjaXJjbGVcbiAgICBjdHguZmlsbFN0eWxlID0gJ3doaXRlJztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4LmFyYyh0aGlzLngsIHRoaXMueSwgdGhpcy53aWR0aCAvIDQsIDAsIE1hdGguUEkgKiAyKTtcbiAgICBjdHguZmlsbCgpO1xuICAgIFxuICAgIC8vIERyYXcgdGV4dCBpbmRpY2F0b3IgZm9yIGZhcnQgdHlwZVxuICAgIGxldCBsYWJlbDogc3RyaW5nO1xuICAgIHN3aXRjaCAodGhpcy5mYXJ0VHlwZSkge1xuICAgICAgY2FzZSBGYXJ0VHlwZS5TSE9SVF9GQVJUOlxuICAgICAgICBsYWJlbCA9ICdTJztcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIEZhcnRUeXBlLkxPTkdfRkFSVDpcbiAgICAgICAgbGFiZWwgPSAnTCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGYXJ0VHlwZS5DSVJDTEVfRkFSVDpcbiAgICAgICAgbGFiZWwgPSAnQyc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGYXJ0VHlwZS5TVVBFUl9GQVJUOlxuICAgICAgICBsYWJlbCA9ICdTUCc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBGYXJ0VHlwZS5NRUdBX0ZBUlQ6XG4gICAgICAgIGxhYmVsID0gJ00nO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgRmFydFR5cGUuVUxUUkFfRkFSVDpcbiAgICAgICAgbGFiZWwgPSAnVSc7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBcbiAgICBjdHguZmlsbFN0eWxlID0gJ2JsYWNrJztcbiAgICBjdHguZm9udCA9ICcxMHB4IEFyaWFsJztcbiAgICBjdHgudGV4dEFsaWduID0gJ2NlbnRlcic7XG4gICAgY3R4LnRleHRCYXNlbGluZSA9ICdtaWRkbGUnO1xuICAgIGN0eC5maWxsVGV4dChsYWJlbCwgdGhpcy54LCB0aGlzLnkpO1xuICB9XG4gIFxuICBwdWJsaWMgaXNPZmZTY3JlZW4oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMueSA+IDYwMCArIHRoaXMuaGVpZ2h0OyAvLyBBc3N1bWluZyBjYW52YXMgaGVpZ2h0IGlzIDYwMFxuICB9XG4gIFxuICBwdWJsaWMgZ2V0RmFydFR5cGUoKTogRmFydFR5cGUge1xuICAgIHJldHVybiB0aGlzLmZhcnRUeXBlO1xuICB9XG4gIFxuICBwdWJsaWMgZ2V0WCgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMueTtcbiAgfVxuICBcbiAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMud2lkdGg7XG4gIH1cbiAgXG4gIHB1YmxpYyBnZXRIZWlnaHQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBDb2xsaXNpb25EZXRlY3RvciB7XG4gIC8qKlxuICAgKiBEZXRlY3RzIGNvbGxpc2lvbiBiZXR3ZWVuIHR3byBnYW1lIG9iamVjdHMgdXNpbmcgQXhpcy1BbGlnbmVkIEJvdW5kaW5nIEJveCBtZXRob2RcbiAgICogQm90aCBvYmplY3RzIG11c3QgaGF2ZSBnZXRYKCksIGdldFkoKSwgZ2V0V2lkdGgoKSwgYW5kIGdldEhlaWdodCgpIG1ldGhvZHNcbiAgICovXG4gIHB1YmxpYyBjaGVja0NvbGxpc2lvbihcbiAgICBvYmoxOiB7IGdldFgoKTogbnVtYmVyOyBnZXRZKCk6IG51bWJlcjsgZ2V0V2lkdGgoKTogbnVtYmVyOyBnZXRIZWlnaHQoKTogbnVtYmVyIH0sXG4gICAgb2JqMjogeyBnZXRYKCk6IG51bWJlcjsgZ2V0WSgpOiBudW1iZXI7IGdldFdpZHRoKCk6IG51bWJlcjsgZ2V0SGVpZ2h0KCk6IG51bWJlciB9XG4gICk6IGJvb2xlYW4ge1xuICAgIC8vIEdldCBwb3NpdGlvbnMgYW5kIGRpbWVuc2lvbnMgZm9yIGJvdGggb2JqZWN0c1xuICAgIGNvbnN0IG9iajFYID0gb2JqMS5nZXRYKCk7XG4gICAgY29uc3Qgb2JqMVkgPSBvYmoxLmdldFkoKTtcbiAgICBjb25zdCBvYmoxV2lkdGggPSBvYmoxLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgb2JqMUhlaWdodCA9IG9iajEuZ2V0SGVpZ2h0KCk7XG4gICAgXG4gICAgY29uc3Qgb2JqMlggPSBvYmoyLmdldFgoKTtcbiAgICBjb25zdCBvYmoyWSA9IG9iajIuZ2V0WSgpO1xuICAgIGNvbnN0IG9iajJXaWR0aCA9IG9iajIuZ2V0V2lkdGgoKTtcbiAgICBjb25zdCBvYmoySGVpZ2h0ID0gb2JqMi5nZXRIZWlnaHQoKTtcbiAgICBcbiAgICAvLyBDYWxjdWxhdGUgYm91bmRzIGZvciBib3RoIG9iamVjdHNcbiAgICBjb25zdCBvYmoxTGVmdCA9IG9iajFYIC0gb2JqMVdpZHRoIC8gMjtcbiAgICBjb25zdCBvYmoxUmlnaHQgPSBvYmoxWCArIG9iajFXaWR0aCAvIDI7XG4gICAgY29uc3Qgb2JqMVRvcCA9IG9iajFZIC0gb2JqMUhlaWdodCAvIDI7XG4gICAgY29uc3Qgb2JqMUJvdHRvbSA9IG9iajFZICsgb2JqMUhlaWdodCAvIDI7XG4gICAgXG4gICAgY29uc3Qgb2JqMkxlZnQgPSBvYmoyWCAtIG9iajJXaWR0aCAvIDI7XG4gICAgY29uc3Qgb2JqMlJpZ2h0ID0gb2JqMlggKyBvYmoyV2lkdGggLyAyO1xuICAgIGNvbnN0IG9iajJUb3AgPSBvYmoyWSAtIG9iajJIZWlnaHQgLyAyO1xuICAgIGNvbnN0IG9iajJCb3R0b20gPSBvYmoyWSArIG9iajJIZWlnaHQgLyAyO1xuICAgIFxuICAgIC8vIENoZWNrIGZvciBvdmVybGFwIG9uIGJvdGggYXhlc1xuICAgIHJldHVybiAoXG4gICAgICBvYmoxUmlnaHQgPiBvYmoyTGVmdCAmJlxuICAgICAgb2JqMUxlZnQgPCBvYmoyUmlnaHQgJiZcbiAgICAgIG9iajFCb3R0b20gPiBvYmoyVG9wICYmXG4gICAgICBvYmoxVG9wIDwgb2JqMkJvdHRvbVxuICAgICk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBDaGVja3MgaWYgYSBwb2ludCBpcyBpbnNpZGUgYW4gb2JqZWN0XG4gICAqL1xuICBwdWJsaWMgaXNQb2ludEluT2JqZWN0KFxuICAgIHBvaW50WDogbnVtYmVyLFxuICAgIHBvaW50WTogbnVtYmVyLFxuICAgIG9iajogeyBnZXRYKCk6IG51bWJlcjsgZ2V0WSgpOiBudW1iZXI7IGdldFdpZHRoKCk6IG51bWJlcjsgZ2V0SGVpZ2h0KCk6IG51bWJlciB9XG4gICk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG9ialggPSBvYmouZ2V0WCgpO1xuICAgIGNvbnN0IG9ialkgPSBvYmouZ2V0WSgpO1xuICAgIGNvbnN0IG9ialdpZHRoID0gb2JqLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgb2JqSGVpZ2h0ID0gb2JqLmdldEhlaWdodCgpO1xuICAgIFxuICAgIGNvbnN0IG9iakxlZnQgPSBvYmpYIC0gb2JqV2lkdGggLyAyO1xuICAgIGNvbnN0IG9ialJpZ2h0ID0gb2JqWCArIG9ialdpZHRoIC8gMjtcbiAgICBjb25zdCBvYmpUb3AgPSBvYmpZIC0gb2JqSGVpZ2h0IC8gMjtcbiAgICBjb25zdCBvYmpCb3R0b20gPSBvYmpZICsgb2JqSGVpZ2h0IC8gMjtcbiAgICBcbiAgICByZXR1cm4gKFxuICAgICAgcG9pbnRYID49IG9iakxlZnQgJiZcbiAgICAgIHBvaW50WCA8PSBvYmpSaWdodCAmJlxuICAgICAgcG9pbnRZID49IG9ialRvcCAmJlxuICAgICAgcG9pbnRZIDw9IG9iakJvdHRvbVxuICAgICk7XG4gIH1cbn1cbiIsImV4cG9ydCBjbGFzcyBIaWdoU2NvcmVNYW5hZ2VyIHtcbiAgcHJpdmF0ZSByZWFkb25seSBTVE9SQUdFX0tFWSA9ICdmYXJ0b2dnZXJfaGlnaF9zY29yZXMnO1xuICBwcml2YXRlIHNjb3JlczogbnVtYmVyW10gPSBbXTtcbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubG9hZFNjb3JlcygpO1xuICB9XG4gIFxuICAvKipcbiAgICogQWRkIGEgbmV3IHNjb3JlIHRvIHRoZSBoaWdoIHNjb3JlcyBsaXN0XG4gICAqL1xuICBwdWJsaWMgYWRkU2NvcmUoc2NvcmU6IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuc2NvcmVzLnB1c2goc2NvcmUpO1xuICAgIFxuICAgIC8vIFNvcnQgc2NvcmVzIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICB0aGlzLnNjb3Jlcy5zb3J0KChhLCBiKSA9PiBiIC0gYSk7XG4gICAgXG4gICAgLy8gS2VlcCBvbmx5IHRoZSB0b3AgMTAgc2NvcmVzXG4gICAgaWYgKHRoaXMuc2NvcmVzLmxlbmd0aCA+IDEwKSB7XG4gICAgICB0aGlzLnNjb3JlcyA9IHRoaXMuc2NvcmVzLnNsaWNlKDAsIDEwKTtcbiAgICB9XG4gICAgXG4gICAgdGhpcy5zYXZlU2NvcmVzKCk7XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBHZXQgYWxsIGhpZ2ggc2NvcmVzXG4gICAqL1xuICBwdWJsaWMgZ2V0U2NvcmVzKCk6IG51bWJlcltdIHtcbiAgICByZXR1cm4gWy4uLnRoaXMuc2NvcmVzXTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIENoZWNrIGlmIGEgZ2l2ZW4gc2NvcmUgaXMgYSBoaWdoIHNjb3JlXG4gICAqL1xuICBwdWJsaWMgaXNIaWdoU2NvcmUoc2NvcmU6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIC8vIElmIHdlIGhhdmUgbGVzcyB0aGFuIDEwIHNjb3JlcywgYW55IHNjb3JlIGlzIGEgaGlnaCBzY29yZVxuICAgIGlmICh0aGlzLnNjb3Jlcy5sZW5ndGggPCAxMCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIFxuICAgIC8vIE90aGVyd2lzZSwgY2hlY2sgaWYgdGhlIHNjb3JlIGlzIGhpZ2hlciB0aGFuIHRoZSBsb3dlc3QgaGlnaCBzY29yZVxuICAgIHJldHVybiBzY29yZSA+IHRoaXMuc2NvcmVzW3RoaXMuc2NvcmVzLmxlbmd0aCAtIDFdO1xuICB9XG4gIFxuICAvKipcbiAgICogQ2xlYXIgYWxsIGhpZ2ggc2NvcmVzXG4gICAqL1xuICBwdWJsaWMgY2xlYXJTY29yZXMoKTogdm9pZCB7XG4gICAgdGhpcy5zY29yZXMgPSBbXTtcbiAgICB0aGlzLnNhdmVTY29yZXMoKTtcbiAgfVxuICBcbiAgLyoqXG4gICAqIExvYWQgc2NvcmVzIGZyb20gbG9jYWwgc3RvcmFnZVxuICAgKi9cbiAgcHJpdmF0ZSBsb2FkU2NvcmVzKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0b3JlZFNjb3JlcyA9IGxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoaXMuU1RPUkFHRV9LRVkpO1xuICAgIFxuICAgIGlmIChzdG9yZWRTY29yZXMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMuc2NvcmVzID0gSlNPTi5wYXJzZShzdG9yZWRTY29yZXMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgcGFyc2luZyBzdG9yZWQgc2NvcmVzOicsIGVycm9yKTtcbiAgICAgICAgdGhpcy5zY29yZXMgPSBbXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBTYXZlIHNjb3JlcyB0byBsb2NhbCBzdG9yYWdlXG4gICAqL1xuICBwcml2YXRlIHNhdmVTY29yZXMoKTogdm9pZCB7XG4gICAgdHJ5IHtcbiAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoaXMuU1RPUkFHRV9LRVksIEpTT04uc3RyaW5naWZ5KHRoaXMuc2NvcmVzKSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNhdmluZyBzY29yZXM6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIiwiZXhwb3J0IGNsYXNzIElucHV0SGFuZGxlciB7XG4gIHByaXZhdGUga2V5czogTWFwPHN0cmluZywgYm9vbGVhbj4gPSBuZXcgTWFwKCk7XG4gIHByaXZhdGUga2V5c1ByZXNzZWRUaGlzRnJhbWU6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICBwcml2YXRlIG1vdXNlWDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBtb3VzZVk6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbW91c2VDbGlja2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgLy8gU2V0IHVwIGV2ZW50IGxpc3RlbmVycyBmb3Iga2V5Ym9hcmRcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5rZXlzLnNldChldmVudC5rZXksIHRydWUpO1xuICAgICAgdGhpcy5rZXlzUHJlc3NlZFRoaXNGcmFtZS5hZGQoZXZlbnQua2V5KTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdrZXl1cCcsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5rZXlzLnNldChldmVudC5rZXksIGZhbHNlKTtcbiAgICB9KTtcblxuICAgIC8vIFNldCB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIG1vdXNlXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZVggPSBldmVudC5jbGllbnRYO1xuICAgICAgdGhpcy5tb3VzZVkgPSBldmVudC5jbGllbnRZO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIHRoaXMubW91c2VDbGlja2VkID0gdHJ1ZTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgdGhpcy5tb3VzZUNsaWNrZWQgPSBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBpc0tleURvd24oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5rZXlzLmdldChrZXkpID09PSB0cnVlO1xuICB9XG5cbiAgcHVibGljIGlzS2V5UHJlc3NlZChrZXk6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGlzUHJlc3NlZCA9IHRoaXMua2V5c1ByZXNzZWRUaGlzRnJhbWUuaGFzKGtleSk7XG4gICAgLy8gUmVtb3ZlIHRoZSBrZXkgZnJvbSB0aGUgc2V0IG9uY2UgaXQncyBiZWVuIGNoZWNrZWRcbiAgICAvLyB0byBlbnN1cmUgaXQncyBvbmx5IHJlcG9ydGVkIGFzIHByZXNzZWQgb25jZVxuICAgIGlmIChpc1ByZXNzZWQpIHtcbiAgICAgIHRoaXMua2V5c1ByZXNzZWRUaGlzRnJhbWUuZGVsZXRlKGtleSk7XG4gICAgfVxuICAgIHJldHVybiBpc1ByZXNzZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNNb3VzZUNsaWNrZWQoKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgd2FzQ2xpY2tlZCA9IHRoaXMubW91c2VDbGlja2VkO1xuICAgIC8vIFJlc2V0IG1vdXNlIGNsaWNrZWQgc3RhdGUgdG8gZW5zdXJlIGl0J3Mgb25seSByZXBvcnRlZCBvbmNlXG4gICAgdGhpcy5tb3VzZUNsaWNrZWQgPSBmYWxzZTtcbiAgICByZXR1cm4gd2FzQ2xpY2tlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXRNb3VzZVgoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5tb3VzZVg7XG4gIH1cblxuICBwdWJsaWMgZ2V0TW91c2VZKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMubW91c2VZO1xuICB9XG5cbiAgcHVibGljIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAvLyBDbGVhciBrZXlzIHByZXNzZWQgdGhpcyBmcmFtZVxuICAgIHRoaXMua2V5c1ByZXNzZWRUaGlzRnJhbWUuY2xlYXIoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgRmFydFR5cGUgfSBmcm9tICcuLi9nYW1lL0ZhcnRUeXBlJztcblxuLyoqXG4gKiBBIG5vLW9wIHNvdW5kIG1hbmFnZXIgYXMgcGVyIHJlcXVlc3QgdG8gcmVtb3ZlIHNvdW5kIGZyb20gdGhlIGdhbWVcbiAqL1xuZXhwb3J0IGNsYXNzIFNvdW5kTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIC8vIE5vIHNvdW5kcyB0byBpbml0aWFsaXplXG4gIH1cbiAgXG4gIHB1YmxpYyBsb2FkU291bmRzKCk6IHZvaWQge1xuICAgIC8vIE5vLW9wXG4gIH1cbiAgXG4gIHB1YmxpYyBwbGF5QmFja2dyb3VuZE11c2ljKCk6IHZvaWQge1xuICAgIC8vIE5vLW9wXG4gIH1cbiAgXG4gIHB1YmxpYyBzdG9wQmFja2dyb3VuZE11c2ljKCk6IHZvaWQge1xuICAgIC8vIE5vLW9wXG4gIH1cbiAgXG4gIHB1YmxpYyBwbGF5RmFydFNvdW5kKGZhcnRUeXBlOiBGYXJ0VHlwZSk6IHZvaWQge1xuICAgIC8vIE5vLW9wXG4gIH1cbiAgXG4gIHB1YmxpYyBwbGF5SGl0U291bmQoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlQb3dlclVwU291bmQoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlMZXZlbENvbXBsZXRlU291bmQoKTogdm9pZCB7XG4gICAgLy8gTm8tb3BcbiAgfVxuICBcbiAgcHVibGljIHBsYXlHYW1lT3ZlclNvdW5kKCk6IHZvaWQge1xuICAgIC8vIE5vLW9wXG4gIH1cbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLyoqXG4gKiBGYXJ0b2dnZXIgLSBBIEZyb2dnZXItbGlrZSBnYW1lIHdpdGggZmFydGluZyBtZWNoYW5pY3NcbiAqIE1haW4gZW50cnkgcG9pbnQgZmlsZVxuICovXG5pbXBvcnQgeyBHYW1lIH0gZnJvbSAnLi9nYW1lL0dhbWUnO1xuXG4vLyBXYWl0IGZvciB0aGUgRE9NIHRvIGxvYWQgYmVmb3JlIGluaXRpYWxpemluZyB0aGUgZ2FtZVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gIGNvbnN0IGdhbWUgPSBuZXcgR2FtZSgpO1xuICBnYW1lLmluaXRpYWxpemUoKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9