/**
 * Fartogger - A Frogger-like game with farting mechanics
 * Main entry point file
 */
import { Game } from './game/Game';

// Wait for the DOM to load before initializing the game
window.addEventListener('load', () => {
  const game = new Game();
  game.initialize();
});
