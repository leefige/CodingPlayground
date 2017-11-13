import * as PIXI from "pixi.js";

export function convertX(x, width, row) {
  return parseInt(x * width / row + 6);
}

export function convertY(x, height, col) {
  return parseInt(x * height / col - height / col / 2);
}

export function canvasSetup() {

  this.aspectRatio = 0.7;
  this.width = this.self.parentNode.clientWidth - 30;
  this.height = this.width * this.aspectRatio;

  //Setup PIXI Canvas in componentDidMount
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height);
  this.self.appendChild(this.renderer.view);

  this.innerWidth = 0.45 * this.width;
  this.innerHeight = this.innerWidth;

  this.mapRecord = {};

  //Create a Pixi stage and renderer
  this.stage = new PIXI.Container();

  window.addEventListener('resize', () => {
    const accWidth = this.self.parentNode.clientWidth - 30;
    const zoomLevel = accWidth / this.width;
    this.stage.scale.x = zoomLevel;
    this.stage.scale.y = zoomLevel;
    this.renderer.resize(accWidth, accWidth * this.aspectRatio);
  });
}

export function updatePhase(x) {
  x = parseInt(x);
  if (x === 3) return 1;
  return x;
}
