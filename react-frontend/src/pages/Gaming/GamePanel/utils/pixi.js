import * as PIXI from "pixi.js";
import {
  convertX,
  convertY,
  updatePhase
} from "./misc";
import Obj from "./obj";
import { mainControl } from '../../../../logic/MainControl';

// `setup` function will run when the image has loaded
export default class PixiComponent {

  constructor(stage, mapResource, FPS, width, height, renderer) {
    this.Container = PIXI.Container;
    this.Sprite = PIXI.Sprite;
    this.resources = PIXI.loader.resources;

    this.gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`;
    this.chaJson = `${process.env.PUBLIC_URL}/img/character/character.json`;
    this.utilJson = `${process.env.PUBLIC_URL}/img/util/util.json`;
    this.objJson = `${process.env.PUBLIC_URL}/img/obj/obj.json`
    this.enmJson = `${process.env.PUBLIC_URL}/img/enemy/enemy.json`;

    this.stage = stage;
    this.mapId = mapResource['id'];
    this.mapIdt = mapResource['id_t'];
    this.row = mapResource['width'];
    this.col = mapResource['height'];

    this.width = width;
    this.height = height;

    this.FPS = FPS;
    this.timeStatus = 0;

    this.renderer = renderer;

    //Use Pixi's built-in `loader` object to load an image
    PIXI.loader
      .add(this.gpJson)
      .add(this.chaJson)
      .add(this.enmJson)
      .add(this.utilJson)
      .add(this.objJson)
      .load(this.setup);
  }

  setup = () => {
    const {
      row,
      col,
      FPS,
      width,
      height
    } = this;

    const gameScene = new this.Container();
    this.stage.addChild(gameScene);

    const id = this.resources[this.gpJson].textures;
    const backgroundArray = this.mapId;
    const transparentArray = this.mapIdt;

    for (let i = 0; i < row; i++)
      for (let j = 0; j < col; j++) {
        const background = new Obj(
          id[`${backgroundArray[i * row + j]}.png`],
          width / row,
          height / col,
          j * width / row,
          i * height / col
        );
        background.addTo(gameScene);

        const trans = new Obj(
          id[`${transparentArray[i * row + j]}.png`],
          width / row,
          height / col,
          j * width / row,
          i * height / col
        );
        trans.addTo(gameScene);
      }

    const objId = this.resources[this.objJson].textures;
    const chest = new Obj(
      objId['1.png'],
      width / row,
      height / col,
      convertX(mainControl.board.chestPos['y'], width, row),
      convertY(mainControl.board.chestPos['x'], height, col)
    );
    chest.addTo(gameScene);

    const chaId = this.resources[this.chaJson].textures;

    const baseDir = mainControl.player.character.dir;
    this.mCharacter = new Obj(
      chaId[`${10 + baseDir * 10 + updatePhase(1)}.png`],
      width / 10,
      height / 8,
      convertX(mainControl.player.character.pos['y'], width, row),
      convertY(mainControl.player.character.pos['x'], height, col),
      1 * FPS
    );
    this.mCharacter.addTo(gameScene);

    const numEnemy = mainControl.player.enemy.length;
    this.mEnemy = [];
    const enmId = this.resources[this.enmJson].textures;
    for (let i = 0; i < numEnemy; i++) {
      const enemy = new Obj(
        enmId[`${10 + baseDir * 10 + updatePhase(1)}.png`],
        width / 10,
        height / 8,
        convertX(mainControl.player.enemy[i].pos['y'], width, row),
        convertY(mainControl.player.enemy[i].pos['x'], height, col),
        1 * FPS
      );
      enemy.addTo(gameScene);
      this.mEnemy.push(enemy);
    }

    const utilId = this.resources[this.utilJson].textures;
    this.gameover = new Obj(
      utilId['gameover.png'],
      width, height,
      0, 0,
      null,
      false
    );
    this.gameover.addTo(gameScene);

    this.gamewin = new Obj(
      utilId['gamewin.png'],
      width, height,
      0, 0,
      null,
      false
    )
    this.gamewin.addTo(gameScene);

    this.state = this.play;

    //Render the stage
    this.gameLoop();
  }

  gameLoop = () => {
    requestAnimationFrame(this.gameLoop);
    this.state();
    this.renderer.render(this.stage);
  }

  play = () => {
    const player = mainControl.player;
    const status = player.getStatus();


    const enmId = this.resources[this.enmJson].textures;
    const chaId = this.resources[this.chaJson].textures;

    const {
      width, height,
      row, col,
      FPS
    } = this;

    if (status === 0) {
      const baseDir = player.character.dir;
      const numEnemy = mainControl.player.enemy.length;
      for (let i = 0; i < numEnemy; i++) {
        const px = convertX(player.enemy[i].pos['y'], width, row),
          py = convertY(player.enemy[i].pos['x'], height, col);
        const baseEnmDir = player.enemy[i].dir;
        this.mEnemy[i].update(px, py, 1*FPS, FPS, baseEnmDir, enmId);

      }

      const px = convertX(player.character.pos['y'], width, row),
        py = convertY(player.character.pos['x'], height, col);
      this.mCharacter.update(px, py, 1*FPS, FPS, baseDir, chaId);
      this.timeStatus = 0;
      this.mCharacter.prevPos = {'x': px, 'y': py};
      player.nextStep();
    }
    else if (status === 1) {
      const baseDir = player.character.dir;
      this.timeStatus++;
      if (this.timeStatus == 60) {
        this.timeStatus = 0;
        const px = convertX(player.character.pos['y'], width, row),
        py = convertY(player.character.pos['x'], height, col);
        this.mCharacter.prevPos = {'x': px, 'y': py};
        player.nextStep();
      }

      const numEnemy = mainControl.player.enemy.length;
      for (let i = 0; i < numEnemy; i++) {
        const px = convertX(player.enemy[i].pos['y'], width, row),
          py = convertY(player.enemy[i].pos['x'], height, col);
        const baseEnmDir = player.enemy[i].dir;
        this.mEnemy[i].moveTo(px, py, FPS, baseEnmDir, enmId, this.timeStatus);
      }

      const px = convertX(player.character.pos['y'], width, row),
        py = convertY(player.character.pos['x'], height, col);
      if (!this.mCharacter.moveTo(px, py, FPS, baseDir, chaId, this.timeStatus)) {
        // player.nextStep();
      }
    }
    else if (status >= 2) {
      this.timeStatus = 0;
      this.state = this.end;
    }
  }

  end = () => {
    const status = mainControl.player.getStatus();
    if (status < 2) {
      this.state = this.play;
      this.gameover.obj.visible = false;
      this.gamewin.obj.visible = false;
      return;
    }
    else if (status === 2) {
      this.gamewin.obj.visible = true;
    }
    else if (status === 3) {
      this.gameover.obj.visible = true;
    }
  }
}
