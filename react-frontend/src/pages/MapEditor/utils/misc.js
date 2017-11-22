import * as PIXI from "pixi.js";

export function canvasSetup(hasUrl) {

  if (hasUrl === true) {
    this.aspectRatio = 0.7;
    this.width = this.self.parentNode.clientWidth - 30;
    this.height = this.width * this.aspectRatio;
    this.innerWidth = 0.45 * this.width;
    this.innerHeight = this.innerWidth;
  }
  else {
    this.aspectRatio = 0.5;
    this.width = this.self.parentNode.clientWidth - 30;
    this.height = this.width * this.aspectRatio;
    this.innerWidth = 0.45 * this.width;
    this.innerHeight = this.innerWidth;
  }

  //Setup PIXI Canvas in componentDidMount
  this.renderer = PIXI.autoDetectRenderer(this.width, this.height, { transparent: true });
  this.self.appendChild(this.renderer.view);

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

export function convertId(type) {
  if (type === "stone") {
    return 114;
  }
  else if (type === "grass") {
    return 115;
  }
  else if (type === "blank") {
    return 183;
  }
}
