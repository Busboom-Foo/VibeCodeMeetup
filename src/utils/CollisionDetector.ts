export class CollisionDetector {
  /**
   * Detects collision between two game objects using Axis-Aligned Bounding Box method
   * Both objects must have getX(), getY(), getWidth(), and getHeight() methods
   */
  public checkCollision(
    obj1: { getX(): number; getY(): number; getWidth(): number; getHeight(): number },
    obj2: { getX(): number; getY(): number; getWidth(): number; getHeight(): number }
  ): boolean {
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
    return (
      obj1Right > obj2Left &&
      obj1Left < obj2Right &&
      obj1Bottom > obj2Top &&
      obj1Top < obj2Bottom
    );
  }
  
  /**
   * Checks if a point is inside an object
   */
  public isPointInObject(
    pointX: number,
    pointY: number,
    obj: { getX(): number; getY(): number; getWidth(): number; getHeight(): number }
  ): boolean {
    const objX = obj.getX();
    const objY = obj.getY();
    const objWidth = obj.getWidth();
    const objHeight = obj.getHeight();
    
    const objLeft = objX - objWidth / 2;
    const objRight = objX + objWidth / 2;
    const objTop = objY - objHeight / 2;
    const objBottom = objY + objHeight / 2;
    
    return (
      pointX >= objLeft &&
      pointX <= objRight &&
      pointY >= objTop &&
      pointY <= objBottom
    );
  }
}
