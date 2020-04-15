/** PuzzleMap 类，小地图
 * @constructor
 */
function PuzzleMap() {
  this.isVisible = false;
  this.mapboard;
  this.miniLapp;
  this.mapBlocks = [];
  this.mapDiamonds = [];
  this.init();
}

/** 初始化 */
PuzzleMap.prototype.init = function() {
  // 绘制黑色背景
  let mapboardWidth = MapMargin * 2 + foreground.blockNumX * MapSpace;
  let mapboardHeight = MapMargin * 2 + foreground.blockNumY * MapSpace;
  this.mapboard = new PIXI.Graphics();
  this.mapboard.visible = false;
  this.mapboard.alpha = 0.7;
  this.mapboard.zIndex = 210;
  this.mapboard.beginFill(0x000000); // 开始绘制
  this.mapboard.drawRect(MapPostionLU, MapPostionLU, mapboardWidth, mapboardHeight);
  this.mapboard.endFill(); // 停止绘制
  Stage.addChild(this.mapboard);
  // Mini Lappland
  let mapLappX = MapPostionLU + MapMargin + lappland.cellX * MapSpace + MapBlockSize / 2;
  let mapLappY = MapPostionLU + mapboardHeight - MapMargin + lappland.cellY * MapSpace - MapBlockSize / 2;
  this.miniLapp = new PIXI.Sprite(miniLappTexture);
  this.miniLapp.visible = false;
  this.miniLapp.zIndex = 213;
  this.miniLapp.anchor.set(0.5);
  this.miniLapp.position.set(mapLappX, mapLappY);
  Stage.addChild(this.miniLapp);
  // Mini Blocks/Diamonds
  for (let i = 0; i < foreground.blocks.length; i++) {
    // 添加地砖
    let mapBlockX = MapPostionLU + MapMargin + foreground.blocks[i].cellX * MapSpace;
    let mapBlockY = MapPostionLU + mapboardHeight - MapMargin - MapBlockSize + foreground.blocks[i].cellY * MapSpace;
    let colorRGB;
    switch (foreground.blocks[i].type) {
      case BlockType.Normal: colorRGB = 0xeeeeee; break;
      case BlockType.Red: colorRGB = 0xffcdd2; break;
      case BlockType.Yellow: colorRGB = 0xfff9c4; break;
      case BlockType.Green: colorRGB = 0xc8e6c9; break;
      case BlockType.Blue: colorRGB = 0xbbdefb; break;
      case BlockType.Purple: colorRGB = 0xd1c4e9; break;
      case BlockType.Dark: colorRGB = 0xbdbdbd; break;
      default: colorRGB = 0xeeeeee;
    }
    this.mapBlocks[i] = new PIXI.Graphics();
    this.mapBlocks[i].visible = false;
    this.mapBlocks[i].zIndex = 211;
    this.mapBlocks[i].beginFill(colorRGB); // 开始绘制
    this.mapBlocks[i].drawRect(mapBlockX, mapBlockY, MapBlockSize, MapBlockSize);
    this.mapBlocks[i].endFill(); // 停止绘制
    Stage.addChild(this.mapBlocks[i]);
    // 添加宝石
    if (foreground.blocks[i].itemType == ItemType.Diamond) {
      let mapDiamCX = mapBlockX + MapBlockSize / 2;
      let mapDiamCY = mapBlockY + MapBlockSize / 2;
      this.mapDiamonds[i] = new PIXI.Graphics();
      this.mapDiamonds[i].visible = false;
      this.mapDiamonds[i].zIndex = 212;
      this.mapDiamonds[i].beginFill(0x9c27b0); // 开始绘制
      this.mapDiamonds[i].lineStyle(1, 0x8a2be2, 1); // 边框
      this.mapDiamonds[i].drawPolygon([new PIXI.Point(mapDiamCX - MapDiamondWidth / 2, mapDiamCY),
                                       new PIXI.Point(mapDiamCX, mapDiamCY - MapDiamondHeight / 2),
                                       new PIXI.Point(mapDiamCX + MapDiamondWidth / 2, mapDiamCY),
                                       new PIXI.Point(mapDiamCX, mapDiamCY + MapDiamondHeight / 2)]);
      this.mapDiamonds[i].endFill(); // 停止绘制
      Stage.addChild(this.mapDiamonds[i]);
    }
  }
}

/** 重新确认 MiniLappland 的正确位置 */
PuzzleMap.prototype.setMiniLappland = function() {
  let mapboardHeight = MapMargin * 2 + foreground.blockNumY * MapSpace;
  let mapLappX = MapPostionLU + MapMargin + lappland.cellX * MapSpace + MapBlockSize / 2;
  let mapLappY = MapPostionLU + mapboardHeight - MapMargin + lappland.cellY * MapSpace - MapBlockSize / 2;
  this.miniLapp.position.set(mapLappX, mapLappY);
}

/** 可变绘制 */
PuzzleMap.prototype.update = function() {
  if (puzzle.isCompiling || puzzle.isCompleted) {
    this.isVisible = false;
  }
  this.mapboard.visible = this.isVisible;
  this.miniLapp.visible = this.isVisible;
  this.setMiniLappland();
  for (let i = 0; i < foreground.blocks.length; i++) {
    this.mapBlocks[i].visible = this.isVisible;
    if (foreground.blocks[i].itemType == ItemType.Diamond) {
      if (foreground.blocks[i].isCollected) {
        this.mapDiamonds[i].visible = false;
      } else {
        this.mapDiamonds[i].visible = this.isVisible;
      }
    }
  }
}
