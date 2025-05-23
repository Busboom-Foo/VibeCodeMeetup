export class Level {
  public readonly level: number;
  public readonly carSpawnRate: number;
  public readonly carSpeed: number;
  public readonly powerUpRate: number;

  constructor(level: number, carSpawnRate: number, carSpeed: number, powerUpRate: number) {
    this.level = level;
    this.carSpawnRate = carSpawnRate;
    this.carSpeed = carSpeed;
    this.powerUpRate = powerUpRate;
  }
}
