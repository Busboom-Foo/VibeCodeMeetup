export class Car {
  private x: number;
  private y: number;
  private width: number = 80;
  private height: number = 40;
  private speed: number;
  private originalSpeed: number;
  private carColor: string;
  private isSlowed: boolean = false;
  private slowTimer: number = 0;
  private slowDuration: number = 3; // seconds
  
  constructor(x: number, y: number, speed: number, carType: string) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.originalSpeed = speed;
    
    // Assign a color based on car type
    switch(carType) {
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
  
  public update(deltaTime: number): void {
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
  
  public draw(ctx: CanvasRenderingContext2D): void {
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
    } else {
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
  
  private drawSlowEffect(ctx: CanvasRenderingContext2D): void {
    // Draw a green haze around the car
    ctx.fillStyle = 'rgba(100, 200, 50, 0.3)';
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.width * 0.7, this.height * 0.7, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  
  public slowDown(): void {
    if (!this.isSlowed) {
      this.isSlowed = true;
      this.speed = this.originalSpeed * 0.4; // Slow to 40% of original speed
      this.slowTimer = this.slowDuration;
    } else {
      // Extend slow duration if already slowed
      this.slowTimer = this.slowDuration;
    }
  }
  
  public isOffScreen(): boolean {
    const buffer = 100; // Extra distance to travel before being removed
    
    if (this.speed > 0) {
      // Moving right
      return this.x - this.width / 2 > 800 + buffer; // Assuming canvas width is 800
    } else {
      // Moving left
      return this.x + this.width / 2 < -buffer;
    }
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
}
