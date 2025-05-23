export class InputHandler {
  private keys: Map<string, boolean> = new Map();
  private keysPressedThisFrame: Set<string> = new Set();
  private mouseX: number = 0;
  private mouseY: number = 0;
  private mouseClicked: boolean = false;

  constructor() {
    // Set up event listeners for keyboard
    window.addEventListener('keydown', (event) => {
      this.keys.set(event.key, true);
      this.keysPressedThisFrame.add(event.key);
    });

    window.addEventListener('keyup', (event) => {
      this.keys.set(event.key, false);
    });

    // Set up event listeners for mouse
    window.addEventListener('mousemove', (event) => {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    });

    window.addEventListener('mousedown', () => {
      this.mouseClicked = true;
    });

    window.addEventListener('mouseup', () => {
      this.mouseClicked = false;
    });
  }

  public isKeyDown(key: string): boolean {
    return this.keys.get(key) === true;
  }

  public isKeyPressed(key: string): boolean {
    const isPressed = this.keysPressedThisFrame.has(key);
    // Remove the key from the set once it's been checked
    // to ensure it's only reported as pressed once
    if (isPressed) {
      this.keysPressedThisFrame.delete(key);
    }
    return isPressed;
  }

  public isMouseClicked(): boolean {
    const wasClicked = this.mouseClicked;
    // Reset mouse clicked state to ensure it's only reported once
    this.mouseClicked = false;
    return wasClicked;
  }

  public getMouseX(): number {
    return this.mouseX;
  }

  public getMouseY(): number {
    return this.mouseY;
  }

  public update(): void {
    // Clear keys pressed this frame
    this.keysPressedThisFrame.clear();
  }
}
