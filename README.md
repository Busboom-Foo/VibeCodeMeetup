# Fartogger

A humorous take on the classic Frogger game, where the frog moves by farting.
This game is built with TypeScript and HTML5 Canvas.

## Game Features

- Control the frog with arrow keys (left/right) and space bar to fart (move forward)
- Multiple fart types with different effects: short farts, long farts, circle farts, and more
- Power-ups that give special fart abilities
- Cars that can be slowed down by farts
- Multiple levels with increasing difficulty
- High score system

## How to Play

1. Use the left and right arrow keys to move the frog left and right
2. Press space to fart, which propels the frog upward
3. Avoid cars while trying to cross to the top of the screen
4. Collect power-ups to gain special fart abilities
5. Complete levels by reaching the top of the screen
6. Try to achieve a high score!

## Development Setup

```bash
# Install dependencies
npm install

# Start the development server
npm start

# Build for production
npm run build
```

Alternatively, you can use the convenience script:

```bash
# Build and run the game
./build-and-run.sh
```

## Deploying to GitHub Pages

This game is configured to work with GitHub Pages out of the box. Follow these steps to deploy:

1. Push the repository to GitHub
2. Build the production version of the game:
   ```bash
   npm run build:pages
   ```
3. Commit the build artifacts (including bundle.js and assets)
4. In your GitHub repository settings, enable GitHub Pages and set the source to the main branch
5. Your game will be available at `https://[your-username].github.io/[repository-name]/`

Note: The .nojekyll file is included to ensure GitHub Pages doesn't process the site with Jekyll.

## Game Controls

- **Left Arrow**: Move frog left
- **Right Arrow**: Move frog right
- **Space**: Fart (move forward)
- **Mouse**: Click on power-ups to collect them

## License

ISC
