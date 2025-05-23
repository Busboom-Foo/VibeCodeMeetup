import { FartType } from './FartType';

export class PowerUp {
  private x: number;
  private y: number;
  private width: number = 30;
  private height: number = 30;
  private fartType: FartType;
  private pulseSize: number = 0;
  private pulseDirection: number = 1;
  private pulseSpeed: number = 2;
  private colors: Record<FartType, string> = {
    [FartType.SHORT_FART]: '#3498db',
    [FartType.LONG_FART]: '#2ecc71',
    [FartType.CIRCLE_FART]: '#f1c40f',
    [FartType.SUPER_FART]: '#e74c3c',
    [FartType.MEGA_FART]: '#9b59b6',
    [FartType.ULTRA_FART]: '#1abc9c'
  };
  
  constructor(x: number, y: number, fartType: FartType) {
    this.x = x;
    this.y = y;
    this.fartType = fartType;
  }
  
  public update(deltaTime: number): void {
    // Create a pulsing effect
    this.pulseSize += this.pulseDirection * this.pulseSpeed * deltaTime;
    
    if (this.pulseSize > 5) {
      this.pulseDirection = -1;
    } else if (this.pulseSize < 0) {
      this.pulseDirection = 1;
    }
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
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
    let label: string;
    switch (this.fartType) {
      case FartType.SHORT_FART:
        label = 'S';
        break;
      case FartType.LONG_FART:
        label = 'L';
        break;
      case FartType.CIRCLE_FART:
        label = 'C';
        break;
      case FartType.SUPER_FART:
        label = 'SP';
        break;
      case FartType.MEGA_FART:
        label = 'M';
        break;
      case FartType.ULTRA_FART:
        label = 'U';
        break;
    }
    
    ctx.fillStyle = 'black';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, this.x, this.y);
  }
  
  public isOffScreen(): boolean {
    return this.y > 600 + this.height; // Assuming canvas height is 600
  }
  
  public getFartType(): FartType {
    return this.fartType;
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
