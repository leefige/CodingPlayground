import * as PIXI from "pixi.js";
import Obj, { Button, Dragable } from "./obj";
import { post } from '../../../utils/Request'

// `setup` function will run when the image has loaded
export default class PixiComponent {

  constructor(stage, width, height, innerWidth, innerHeight, renderer) {
    this.Container = PIXI.Container;
    this.resources = PIXI.loader.resources;

    this.gpJson = `${process.env.PUBLIC_URL}/img/sources/gamePic.json`;
    this.utilJson = `${process.env.PUBLIC_URL}/img/util/util.json`;
    this.objJson = `${process.env.PUBLIC_URL}/img/obj/obj.json`
    this.mapJson = `${process.env.PUBLIC_URL}/img/map/map.json`;

    this.stage = stage;

    this.width = width;
    this.height = height;
    this.innerWidth = innerWidth;
    this.innerHeight = innerHeight;

    this.renderer = renderer;

    this.mapRecord = {};

    //Use Pixi's built-in `loader` object to load an image
    PIXI.loader
      .add(this.gpJson)
      .add(this.utilJson)
      .add(this.objJson)
      .add(this.mapJson)
      .load(this.setup);
  }

  setup = () => {
    const {
      width, height
    } = this;

    this.gameScene = new this.Container();
    this.stage.addChild(this.gameScene);

    const id = this.resources[this.mapJson].textures;
    let i = 0;
    for (let key in id) {
      const map = new Button(
        id[key],
        width / 10, width / 10,
        i * 0.13 * width + 0.25 * width,
        10
      );
      map.obj.on('click', () => {this.loadmap(parseInt(key.split('.')[0], 10))});
      map.addTo(this.stage);
      i++;
    }

    const util = this.resources[this.utilJson].textures;
    let okButton = new Button(
      util['ok.png'],
      height * 0.1,
      height * 0.1,
      width * 0.9,
      height * 0.9,
    );
    okButton.obj.on('click', this.report);
    okButton.addTo(this.stage);


    requestAnimationFrame(this.animate);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.renderer.render(this.stage);
  }

  loadmap = (mapId) => {
    post('/map/getId', {
      id: mapId,
    })
    .then((responseJson) => {
      const mapResource = responseJson.mapResource;
      const mapId = mapResource['id'];

      this.row = mapResource['width'];
      this.col = mapResource['height'];

      this.mapRecord.id_tools = new Array(this.row * this.col);

      const {
        row, col,
        width, height,
        innerWidth, innerHeight,
        gameScene
      } = this;

      gameScene.removeChildren();
      const id = this.resources[this.gpJson].textures;
      for (let i = 0; i < row; i++)
        for (let j = 0; j < col; j++) {
          const background = new Obj(
            id[`${mapId[i*row+j]}.png`],
            innerWidth / row, innerHeight / col,
            j * innerWidth / row + (width - innerWidth) / 2,
            i * innerHeight / col + (height - innerHeight) / 2
          );
          background.addTo(gameScene);
        }

        (new Dragable(
          this.mapRecord,
          'cha',
          innerWidth / row, innerHeight / col,
          0.06 * width, 0.06 * height,
          width, height, innerWidth, innerHeight, row, col
        )).addTo(this.gameScene);

        (new Dragable(
          this.mapRecord,
          '1',
          innerWidth / row, innerHeight / col,
          0.06 * width, Math.floor(height / 5) * 1 + 0.06 * width,
          width, height, innerWidth, innerHeight, row, col
        )).addTo(this.gameScene);

        // create a texture from an image path
        for (let i = 2; i < 5; i++) {
          (new Dragable(
            this.mapRecord,
            '5',
            innerWidth / row, innerHeight / col,
            0.06 * width, Math.floor(height / 5) * i + 0.06 * width,
            width, height, innerWidth, innerHeight, row, col
          )).addTo(this.gameScene);
        }
        for (let i = 0; i < 4; i++) {
          (new Dragable(
            this.mapRecord,
            '3',
            innerWidth / row, innerHeight / col,
            Math.floor(width - 0.06 * width), Math.floor(height / 5 * i + 0.06 * width),
            width, height, innerWidth, innerHeight, row, col
          )).addTo(this.gameScene);
        }

      requestAnimationFrame(this.animate);
    });
  }

  report = () => {
    post('/mapEdit/insert', {
      mapRecord: JSON.stringify(this.mapRecord),
      userId: "TEST"
    })
    alert("编辑成功！");
  }
}
