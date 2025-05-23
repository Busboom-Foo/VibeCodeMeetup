export class FartCloud {
  private x: number;
  private y: number;
  private width: number;
  private height: number;
  private lifetime: number;
  private maxLifetime: number;
  private dissipationRate: number;
  private color: string;
  
  constructor(x: number, y: number, width: number, height: number, lifetime: number) {
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
  
  public update(deltaTime: number): void {
    // Reduce lifetime
    this.lifetime -= deltaTime * this.dissipationRate;
    
    // Make cloud grow slightly as it dissipates
    this.width += deltaTime * 5;
    this.height += deltaTime * 5;
  }
  
  public draw(ctx: CanvasRenderingContext2D): void {
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
  
  public isDissipated(): boolean {
    return this.lifetime <= 0;
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
