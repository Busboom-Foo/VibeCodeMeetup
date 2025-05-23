import { Frog } from './Frog';
import { Car } from './Car';
import { PowerUp } from './PowerUp';
import { FartType } from './FartType';
import { Level } from './Level';
import { InputHandler } from '../utils/InputHandler';
import { CollisionDetector } from '../utils/CollisionDetector';
import { SoundManager } from '../utils/SoundManager';
import { HighScoreManager } from '../utils/HighScoreManager';

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private frog: Frog;
  private cars: Car[] = [];
  private powerUps: PowerUp[] = [];
  private fartClouds: any[] = [];
  private score: number = 0;
  private level: number = 1;
  private time: number = 60;
  private isGameOver: boolean = false;
  private isGameRunning: boolean = false;
  private lastTimestamp: number = 0;
  private inputHandler: InputHandler;
  private collisionDetector: CollisionDetector;
  private soundManager: SoundManager;
  private highScoreManager: HighScoreManager;
  private currentLevel: Level;
  private levels: Level[] = [];

  constructor() {
    this.canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
    this.ctx = this.canvas.getContext('2d')!;
    this.inputHandler = new InputHandler();
    this.collisionDetector = new CollisionDetector();
    this.soundManager = new SoundManager();
    this.highScoreManager = new HighScoreManager();
  }

  public initialize(): void {
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

  private initializeLevels(): void {
    // Create different levels with increasing difficulty
    this.levels.push(new Level(1, 2, 1, 1)); // Level 1: slow cars, few cars, few power-ups
    this.levels.push(new Level(2, 3, 1.5, 2)); // Level 2: more cars, faster, more power-ups
    this.levels.push(new Level(3, 4, 2, 2)); // Level 3: even more cars, even faster
    this.levels.push(new Level(4, 5, 2.5, 3)); // Level 4: lots of cars, very fast
    this.levels.push(new Level(5, 6, 3, 3)); // Level 5: extreme difficulty
  }

  private startGame(): void {
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
    this.frog = new Frog(
      this.canvas.width / 2,
      this.canvas.height - 50,
      this.canvas
    );

    // Start game loop
    window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
  }

  private gameLoop(timestamp: number): void {
    if (!this.isGameRunning) return;

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
    } else if (!this.isGameOver) {
      // Continue the game loop if not game over
      window.requestAnimationFrame((timestamp) => this.gameLoop(timestamp));
    }
  }

  private update(deltaTime: number): void {
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

  private draw(): void {
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

  private drawBackground(): void {
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

  private spawnCars(deltaTime: number): void {
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
      
      const car = new Car(xPosition, yPosition, speed, `car${Math.floor(Math.random() * 3) + 1}`);
      this.cars.push(car);
    }
  }

  private spawnPowerUps(deltaTime: number): void {
    // Probability of spawning a new power-up depends on level
    const spawnChance = 0.01 * deltaTime * this.currentLevel.powerUpRate;
    
    if (Math.random() < spawnChance && this.powerUps.length < 3) {
      const x = Math.random() * (this.canvas.width - 40) + 20;
      const y = Math.random() * (this.canvas.height - 100) + 50;
      
      // Randomly select a fart type for the power-up
      const fartTypes = [
        FartType.SHORT_FART,
        FartType.LONG_FART, 
        FartType.CIRCLE_FART,
        FartType.SUPER_FART,
        FartType.MEGA_FART,
        FartType.ULTRA_FART
      ];
      
      const randomIndex = Math.floor(Math.random() * fartTypes.length);
      const fartType = fartTypes[randomIndex];
      
      const powerUp = new PowerUp(x, y, fartType);
      this.powerUps.push(powerUp);
    }
  }

  private checkCollisions(): void {
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

  private checkLevelCompletion(): void {
    // Check if player has crossed to the top of the screen
    if (this.frog.getY() <= 30) {
      this.levelComplete();
    }
  }

  private levelComplete(): void {
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
    document.getElementById('level')!.innerText = `Level: ${this.level}`;
  }

  private increaseScore(points: number): void {
    this.score += points;
    document.getElementById('score')!.innerText = `Score: ${this.score}`;
  }

  private updateTimer(deltaTime: number): void {
    this.time -= deltaTime;
    
    if (this.time < 0) {
      this.time = 0;
    }
    
    document.getElementById('time')!.innerText = `Time: ${Math.ceil(this.time)}`;
  }

  private addTime(seconds: number): void {
    this.time += seconds;
    document.getElementById('time')!.innerText = `Time: ${Math.ceil(this.time)}`;
  }

  private updateUIElements(): void {
    document.getElementById('score')!.innerText = `Score: ${this.score}`;
    document.getElementById('time')!.innerText = `Time: ${Math.ceil(this.time)}`;
    document.getElementById('level')!.innerText = `Level: ${this.level}`;
  }

  private gameOver(): void {
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

  private restartGame(): void {
    // Hide game over screen
    const gameOverScreen = document.getElementById('game-over-screen');
    if (gameOverScreen) {
      gameOverScreen.style.display = 'none';
    }
    
    // Start a new game
    this.startGame();
  }

  private displayHighScores(): void {
    const scores = this.highScoreManager.getScores();
    const scoresList = document.getElementById('scores-list');
    
    if (scoresList) {
      scoresList.innerHTML = '';
      
      scores.slice(0, 5).forEach((score: number, index: number) => {
        const scoreElement = document.createElement('div');
        scoreElement.innerText = `${index + 1}. ${score}`;
        scoresList.appendChild(scoreElement);
      });
    }
  }
}
