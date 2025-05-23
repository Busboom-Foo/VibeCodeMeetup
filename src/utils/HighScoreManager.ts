export class HighScoreManager {
  private readonly STORAGE_KEY = 'fartogger_high_scores';
  private scores: number[] = [];
  
  constructor() {
    this.loadScores();
  }
  
  /**
   * Add a new score to the high scores list
   */
  public addScore(score: number): void {
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
  public getScores(): number[] {
    return [...this.scores];
  }
  
  /**
   * Check if a given score is a high score
   */
  public isHighScore(score: number): boolean {
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
  public clearScores(): void {
    this.scores = [];
    this.saveScores();
  }
  
  /**
   * Load scores from local storage
   */
  private loadScores(): void {
    const storedScores = localStorage.getItem(this.STORAGE_KEY);
    
    if (storedScores) {
      try {
        this.scores = JSON.parse(storedScores);
      } catch (error) {
        console.error('Error parsing stored scores:', error);
        this.scores = [];
      }
    }
  }
  
  /**
   * Save scores to local storage
   */
  private saveScores(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.scores));
    } catch (error) {
      console.error('Error saving scores:', error);
    }
  }
}
