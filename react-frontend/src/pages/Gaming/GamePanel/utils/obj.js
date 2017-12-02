import * as PIXI from "pixi.js";
import {
  updatePhase
} from "./misc";

export default class Obj {
  constructor(sprite, width, height, posx, posy, phase = null, visible = true) {
    this.obj = new PIXI.Sprite(sprite);
    this.obj.width = width;
    this.obj.height = height;
    this.obj.x = posx;
    this.obj.y = posy;
    this.obj.visible = visible;
    this.phase = phase;
  }
  addTo(stage) {
    stage.addChild(this.obj);
  }
  update(px, py, phase, FPS, dir, res) {
    this.obj.x = px;
    this.obj.y = py;
    this.phase = phase;
    this.obj.visible = true;
    this.obj.texture = res[`${10 + dir * 10 + updatePhase(this.phase / FPS)}.png`];
  }
  moveTo(px, py, FPS, dir, res, state) {
    if (this.prevPos === undefined) {
      return false;
    }
    if (px !== this.obj.x || py !== this.obj.y) {
      if (px !== this.obj.x) {
        this.obj.x = (px - this.prevPos.x) / 60 * state + this.prevPos.x;
      }
      else if (py !== this.obj.y) {
        this.obj.y = (py - this.prevPos.y) / 60 * state + this.prevPos.y;
      }
      this.obj.texture = res[`${10 + dir * 10 + updatePhase(this.phase / FPS)}.png`];
      this.phase = (this.phase + 1) % (4 * FPS);
      return true;
    }
    this.obj.texture = res[`${10 + dir * 10 + updatePhase(this.phase / FPS)}.png`];
    this.phase = 1 * FPS;
    return false;
  }
}
