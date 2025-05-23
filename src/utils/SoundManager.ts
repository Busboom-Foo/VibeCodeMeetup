import { FartType } from '../game/FartType';

/**
 * A no-op sound manager as per request to remove sound from the game
 */
export class SoundManager {
  constructor() {
    // No sounds to initialize
  }
  
  public loadSounds(): void {
    // No-op
  }
  
  public playBackgroundMusic(): void {
    // No-op
  }
  
  public stopBackgroundMusic(): void {
    // No-op
  }
  
  public playFartSound(fartType: FartType): void {
    // No-op
  }
  
  public playHitSound(): void {
    // No-op
  }
  
  public playPowerUpSound(): void {
    // No-op
  }
  
  public playLevelCompleteSound(): void {
    // No-op
  }
  
  public playGameOverSound(): void {
    // No-op
  }
}
