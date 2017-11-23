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
    // PIXI.loader.reset();

    this.Container = PIXI.Container;
    this.Sprite = PIXI.Sprite;
    this.resources = PIXI.loader.resources;

    this.gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`;
    this.chaJson = `${process.env.PUBLIC_URL}/img/character/character.json`;
    this.utilJson = `${process.env.PUBLIC_URL}/img/util/util.json`;
    this.objJson = `${process.env.PUBLIC_URL}/img/obj/obj.json`
    this.enmJson = `${process.env.PUBLIC_URL}/img/enemy/enemy.json`;
    this.effectJson = `${process.env.PUBLIC_URL}/img/effect/effect.json`;

    this.stage = stage;
    this.mapId = mapResource['id'];
    this.mapIdt = mapResource['id_t'];
    this.row = mapResource['width'];
    this.col = mapResource['height'];

    this.width = width;
    this.height = width;
    this.invHeight = height - width;

    this.FPS = FPS;
    this.timeStatus = 0;

    this.renderer = renderer;

    try {
      //Use Pixi's built-in `loader` object to load an image
      PIXI.loader
        .add(this.gpJson)
        .add(this.chaJson)
        .add(this.enmJson)
        .add(this.utilJson)
        .add(this.objJson)
        .add(this.effectJson)
        .load(this.setup);
    }
    catch (e) {

      PIXI.loader.reset();
      PIXI.loader
        .add(this.gpJson)
        .add(this.chaJson)
        .add(this.enmJson)
        .add(this.utilJson)
        .add(this.objJson)
        .add(this.effectJson)
        .load(this.setup);
    }
  }

  setup = () => {
    const {
      row,
      col,
      FPS,
      width,
      height,
      invHeight
    } = this;

    const gameScene = new this.Container();
    this.stage.addChild(gameScene);

    const utilId = this.resources[this.utilJson].textures;
    const inventory = new Obj(
      utilId['inventory.png'],
      width,
      invHeight,
      0,
      height
    );
    inventory.addTo(gameScene);

    const objId = this.resources[this.objJson].textures;
    this.item = [];
    for (let i = 0; i < 5; i++) {
      this.item[i] = new Obj(
        objId['torch.png'],
        width / row,
        height / col,
        width * 0.17 + i * width * 0.7 / 5, width + invHeight / 4.5,
      );
      this.item[i].addTo(gameScene);
    }

    const id = this.resources[this.gpJson].textures;
    const backgroundArray = this.mapId;
    const transparentArray = this.mapIdt;
    this.bg = [];
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
        this.bg.push(trans);
        trans.addTo(gameScene);
      }

    const cell = new Obj(
      utilId['cell.png'],
      width, width,
      0, 0
    );
    cell.obj.alpha = 0.2;
    cell.addTo(gameScene);

    const chest = new Obj(
      objId['chest.png'],
      width / row,
      height / col,
      convertX(mainControl.board.chestPos['y'], width, row),
      convertY(mainControl.board.chestPos['x'], height, col)
    );
    chest.addTo(gameScene);

    this.bomb = new Obj(
      objId['bomb.png'],
      width / row,
      height / col,
      0, 0,
      null, false
    );
    this.bomb.addTo(gameScene);

    this.torch = new Obj(
      objId['torch.png'],
      width / row,
      height / col,
      0, 0,
      null, false
    );
    this.torch.addTo(gameScene);

    this.effect = [];
    const effectId = this.resources[this.effectJson].textures;
    for (let i = 0; i < 3; i++) {
      this.effect[i] = new Obj(
        effectId['1.png'],
        width / row,
        height / col,
        0, 0,
        null, false
      );
      this.effect[i].addTo(gameScene);
    }

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
    const objId = this.resources[this.objJson].textures;

    const torchNum = player.character.items.torchNum;
    const bombNum = player.character.items.bombNum;

    for (let i = 0; i < torchNum; i++) {
      this.item[i].obj.texture = objId['torch.png'];
      this.item[i].obj.visible = true;
    }
    for (let i = torchNum; i < torchNum + bombNum; i++) {
      this.item[i].obj.texture = objId['bomb.png'];
      this.item[i].obj.visible = true;
    }
    for (let i = torchNum + bombNum; i < 5; i++) {
      this.item[i].obj.visible = false;
    }

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
        this.mEnemy[i].obj.visible = true;
        this.mEnemy[i].update(px, py, 1*FPS, FPS, baseEnmDir, enmId);
      }

      for (let i = 0; i < row * col; i++) {
        this.bg[i].obj.visible = true;
      }

      const px = convertX(player.character.pos['y'], width, row),
        py = convertY(player.character.pos['x'], height, col);
      this.mCharacter.update(px, py, 1*FPS, FPS, baseDir, chaId);
      this.setInvisible();
      this.timeStatus = 0;
      this.updatePrevPos();
      player.nextStep();
    }
    else if (status === 1) {
      const baseDir = player.character.dir;
      this.timeStatus++;
      if (this.timeStatus === 60) {
        this.timeStatus = 0;
        this.setInvisible();
        this.updatePrevPos();
        player.nextStep();
      }

      const numEnemy = mainControl.player.enemy.length;
      for (let i = 0; i < numEnemy; i++) {
        const px = convertX(player.enemy[i].pos['y'], width, row),
          py = convertY(player.enemy[i].pos['x'], height, col);
        const baseEnmDir = player.enemy[i].dir;
        this.mEnemy[i].moveTo(px, py, FPS, baseEnmDir, enmId, this.timeStatus);
        this.mEnemy[i].obj.visible = mainControl.player.enemy[i].status === "alive";
      }

      const px = convertX(player.character.pos['y'], width, row),
        py = convertY(player.character.pos['x'], height, col);
      this.mCharacter.moveTo(px, py, FPS, baseDir, chaId, this.timeStatus);

      if (mainControl.player.board.bombPos.x !== -1) {
        if (this.timeStatus === 0) {
            this.bomb.obj.x = convertX(mainControl.player.board.bombPos.y, width, row);
            this.bomb.obj.y = convertY(mainControl.player.board.bombPos.x, height, col);
            this.bomb.obj.visible = true;
        }
        else if (this.timeStatus === 30) {
          this.bomb.obj.visible = false;
          const len = mainControl.player.board.bombArea.length;
          for (let i = 0; i < len; i++) {
            this.effect[i].obj.x = convertX(mainControl.player.board.bombArea[i].y, width, row);
            this.effect[i].obj.y = convertY(mainControl.player.board.bombArea[i].x, height, col);
            this.effect[i].obj.visible = true;
          }
        }
        else if (this.timeStatus === 50) {
          const len = mainControl.player.board.bombArea.length;
          for (let i = 0; i < len; i++) {
            const x = mainControl.player.board.bombArea[i].y;
            const y = mainControl.player.board.bombArea[i].x;
            this.bg[row * y + x].obj.visible = false;
          }
        }
        if (this.timeStatus > 30 && this.timeStatus < 60) {
          const effectId = this.resources[this.effectJson].textures;
          const phase = parseInt((this.timeStatus - 30) / 3 * 4, 10);
          for (let i = 0; i < 3; i++) {
            this.effect[i].obj.texture = effectId[`${phase}.png`];
          }
        }
      }

      if (mainControl.player.board.torchPos.x !== -1) {
        if (this.timeStatus === 0) {
            this.torch.obj.x = convertX(mainControl.player.board.torchPos.y, width, row);
            this.torch.obj.y = convertY(mainControl.player.board.torchPos.x, height, col);
            this.torch.obj.visible = true;
        }
        else if (this.timeStatus === 30) {
          this.torch.obj.visible = false;
          this.effect[0].obj.x = convertX(mainControl.player.board.torchPos.y, width, row);
          this.effect[0].obj.y = convertY(mainControl.player.board.torchPos.x, height, col);
          this.effect[0].obj.visible = true;
        }
        else if (this.timeStatus === 50) {
          const i = mainControl.player.board.torchPos.y;
          const j = mainControl.player.board.torchPos.x;
          this.bg[row * j + i].obj.visible = false;
        }
        if (this.timeStatus > 30 && this.timeStatus < 60) {
          const effectId = this.resources[this.effectJson].textures;
          const phase = parseInt((this.timeStatus - 30) / 3 * 4, 10);
          this.effect[0].obj.texture = effectId[`${phase}.png`];
        }
      }
    }
    else if (status >= 2) {
      this.timeStatus = 0;
      this.setInvisible();
      this.state = this.end;
    }
  }

  end = () => {
    const status = mainControl.player.getStatus();
    if (status < 2) {
      this.state = this.play;
      return;
    }
  }

  updatePrevPos = () => {
    const {
      width, height,
      row, col
    } = this;

    const px = convertX(mainControl.player.character.pos['y'], width, row),
    py = convertY(mainControl.player.character.pos['x'], height, col);
    this.mCharacter.prevPos = {'x': px, 'y': py};
    const numEnemy = mainControl.player.enemy.length;
    for (let i = 0; i < numEnemy; i++) {
      const px = convertX(mainControl.player.enemy[i].pos['y'], width, row),
        py = convertY(mainControl.player.enemy[i].pos['x'], height, col);
      this.mEnemy[i].prevPos = {'x': px, 'y': py};
    }
  }

  setInvisible = () => {
    this.bomb.obj.visible = false;
    this.torch.obj.visible = false;
    for (let i = 0; i < 3; i++) {
      this.effect[i].obj.visible = false;
    }
  }
}
