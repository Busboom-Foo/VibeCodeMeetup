import { FartType } from './FartType';
import { FartCloud } from './FartCloud';

export class Frog {
  private x: number;
  private y: number;
  private width: number = 40;
  private height: number = 40;
  private speed: number = 5;
  private fartPower: number = 1;
  private currentFartType: FartType = FartType.SHORT_FART;
  private isAlive: boolean = true;
  private isFarting: boolean = false;
  private fartAnimationTimer: number = 0;
  private fartAnimationDuration: number = 0.3; // seconds
  private canvas: HTMLCanvasElement;
  private fartClouds: FartCloud[] = [];
  
  constructor(x: number, y: number, canvas: HTMLCanvasElement) {
    this.x = x;
    this.y = y;
    this.canvas = canvas;
  }

  public update(deltaTime: number): void {
    if (!this.isAlive) return;
    
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

  public draw(ctx: CanvasRenderingContext2D): void {
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
    } else {
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

  private drawFartTypeIndicator(ctx: CanvasRenderingContext2D): void {
    if (!this.isAlive) return;
    
    const colors = {
      [FartType.SHORT_FART]: '#3498db',
      [FartType.LONG_FART]: '#2ecc71',
      [FartType.CIRCLE_FART]: '#f1c40f',
      [FartType.SUPER_FART]: '#e74c3c',
      [FartType.MEGA_FART]: '#9b59b6',
      [FartType.ULTRA_FART]: '#1abc9c'
    };
    
    const color = colors[this.currentFartType] || '#3498db';
    
    // Draw indicator circle above frog
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.x, this.y - this.height / 2 - 10, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  public moveLeft(): void {
    if (!this.isAlive) return;
    
    this.x -= this.speed;
    
    // Keep the frog within the canvas bounds
    if (this.x < this.width / 2) {
      this.x = this.width / 2;
    }
  }

  public moveRight(): void {
    if (!this.isAlive) return;
    
    this.x += this.speed;
    
    // Keep the frog within the canvas bounds
    if (this.x > this.canvas.width - this.width / 2) {
      this.x = this.canvas.width - this.width / 2;
    }
  }

  public fart(): void {
    if (!this.isAlive || this.isFarting) return;
    
    this.isFarting = true;
    this.fartAnimationTimer = 0;
    
    // Create a fart cloud based on the current fart type
    switch (this.currentFartType) {
      case FartType.SHORT_FART:
        this.createShortFart();
        this.moveForward(1 * this.fartPower);
        break;
        
      case FartType.LONG_FART:
        this.createLongFart();
        this.moveForward(2 * this.fartPower);
        break;
        
      case FartType.CIRCLE_FART:
        this.createCircleFart();
        this.moveForward(1.5 * this.fartPower);
        break;
        
      case FartType.SUPER_FART:
        this.createSuperFart();
        this.moveForward(2.5 * this.fartPower);
        break;
        
      case FartType.MEGA_FART:
        this.createMegaFart();
        this.moveForward(3 * this.fartPower);
        break;
        
      case FartType.ULTRA_FART:
        this.createUltraFart();
        this.moveForward(4 * this.fartPower);
        break;
    }
  }

  private moveForward(amount: number): void {
    this.y -= amount * 20; // Move frog upward (forward)
  }

  private createShortFart(): void {
    const cloud = new FartCloud(this.x, this.y + this.height / 2, 20, 20, 1.5);
    this.fartClouds.push(cloud);
  }

  private createLongFart(): void {
    // Create a series of clouds in a straight line behind the frog
    for (let i = 0; i < 3; i++) {
      const cloud = new FartCloud(
        this.x,
        this.y + this.height / 2 + i * 15,
        20 - i * 2,
        20 - i * 2,
        2 - i * 0.3
      );
      this.fartClouds.push(cloud);
    }
  }

  private createCircleFart(): void {
    // Create a circle of fart clouds around the frog
    const numClouds = 8;
    const radius = 30;
    
    for (let i = 0; i < numClouds; i++) {
      const angle = (i / numClouds) * Math.PI * 2;
      const cloudX = this.x + Math.cos(angle) * radius;
      const cloudY = this.y + Math.sin(angle) * radius;
      
      const cloud = new FartCloud(cloudX, cloudY, 15, 15, 2);
      this.fartClouds.push(cloud);
    }
  }

  private createSuperFart(): void {
    // Create a more powerful straight line fart
    for (let i = 0; i < 5; i++) {
      const cloud = new FartCloud(
        this.x,
        this.y + this.height / 2 + i * 15,
        25 - i * 2,
        25 - i * 2,
        2.5 - i * 0.2
      );
      this.fartClouds.push(cloud);
    }
  }

  private createMegaFart(): void {
    // Create a large explosion of fart clouds
    const numClouds = 12;
    const radius = 40;
    
    for (let i = 0; i < numClouds; i++) {
      const angle = (i / numClouds) * Math.PI * 2;
      const cloudX = this.x + Math.cos(angle) * radius;
      const cloudY = this.y + Math.sin(angle) * radius;
      
      const cloud = new FartCloud(cloudX, cloudY, 20, 20, 3);
      this.fartClouds.push(cloud);
    }
  }

  private createUltraFart(): void {
    // Create an ultra-powerful fart with multiple expanding rings
    for (let ring = 1; ring <= 3; ring++) {
      const numClouds = 8;
      const radius = 20 * ring;
      
      for (let i = 0; i < numClouds; i++) {
        const angle = (i / numClouds) * Math.PI * 2;
        const cloudX = this.x + Math.cos(angle) * radius;
        const cloudY = this.y + Math.sin(angle) * radius;
        
        const cloud = new FartCloud(cloudX, cloudY, 25 - ring * 3, 25 - ring * 3, 4 - ring * 0.5);
        this.fartClouds.push(cloud);
      }
    }
  }

  public hit(): void {
    this.isAlive = false;
  }

  public collectPowerUp(fartType: FartType): void {
    this.currentFartType = fartType;
    
    // Increase fart power temporarily
    this.fartPower = 1.5;
    
    // Reset fart power after a few seconds
    setTimeout(() => {
      this.fartPower = 1;
    }, 5000);
  }

  public reset(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.isAlive = true;
    this.isFarting = false;
    this.currentFartType = FartType.SHORT_FART;
    this.fartPower = 1;
    this.fartClouds = [];
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getWidth(): number {
    return this.width;
  }

  public getHeight(): number {
    return this.height;
  }

  public getCurrentFartType(): FartType {
    return this.currentFartType;
  }

  public getFartClouds(): FartCloud[] {
    return this.fartClouds;
  }
}
