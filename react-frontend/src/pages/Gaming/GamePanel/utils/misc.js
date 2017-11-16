import * as PIXI from "pixi.js";

export function convertX(x, width, row) {
  return parseInt(x * width / row, 10);
}

export function convertY(x, height, col) {
  return parseInt(x * height / col, 10);
}

export function canvasSetup() {
  this.width = this.self.parentNode.clientWidth;
  this.aspectRatio = 1;
  this.height = this.width * this.aspectRatio;
  this.FPS = 7;

  //Setup PIXI Canvas in componentDidMount
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
  this.self.appendChild(this.renderer.view);

  //Create a Pixi stage and renderer
  this.stage = new PIXI.Container();

  window.addEventListener('resize', () => {
    const zoomLevel = this.self.parentNode.clientWidth / this.width;
    this.stage.scale.x = zoomLevel;
    this.stage.scale.y = zoomLevel;
    this.renderer.resize(this.self.parentNode.clientWidth, this.self.parentNode.clientWidth * this.aspectRatio);
    this.renderer.render(this.stage);
  })
}

export function updatePhase(x) {
  x = parseInt(x, 10);
  if (x === 3) return 1;
  return x;
}
