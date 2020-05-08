/** PuzzleMap 类，小地图，图层范围是 1030 ~ 1040
 * @constructor
 */
function PuzzleMap() {
  this.isVisible = false;
  // 黑色背景
  this.mapboardWidth = MapMargin * 2 + foreground.blockNumX * MapSpace;
  this.mapboardHeight = MapMargin * 2 + foreground.blockNumY * MapSpace;
  this.mapboard;
  // Lappland图标
  this.miniLapp;
  // 小砖块/小宝石
  this.mapBlocks = [];
  this.mapDiamonds = [];
  this.init();
}

/* 绘制一个砖块 */
PuzzleMap.prototype.setMapBlock = function(mapBlock, block) {
  let mapBlockX = MapPostionLU + MapMargin + (block.cellX - foreground.blockLeft) * MapSpace;
  let mapBlockY = MapPostionLU + this.mapboardHeight - MapMargin - MapBlockSize + (block.cellY - foreground.blockBottom) * MapSpace;
  let colorRGB;
  switch (block.type) {
    case BlockType.Normal: colorRGB = 0xeeeeee; break;
    case BlockType.Red: colorRGB = 0xffcdd2; break;
    case BlockType.Yellow: colorRGB = 0xfff9c4; break;
    case BlockType.Green: colorRGB = 0xc8e6c9; break;
    case BlockType.Blue: colorRGB = 0xbbdefb; break;
    case BlockType.Purple: colorRGB = 0xd1c4e9; break;
    case BlockType.Dark: colorRGB = 0x757575; break;
    default: colorRGB = 0xeeeeee;
  }
  mapBlock.clear();
  mapBlock.beginFill(colorRGB); // 开始绘制
  mapBlock.drawRect(mapBlockX, mapBlockY, MapBlockSize, MapBlockSize);
  mapBlock.endFill();
  mapBlock.visible = this.isVisible;
  return [mapBlockX, mapBlockY];
}

/** 重新确认 MiniLappland 的正确位置 */
PuzzleMap.prototype.setMiniLappland = function() {
  let mapLappX = MapPostionLU + MapMargin + (lappland.cellX - foreground.blockLeft) * MapSpace + MapBlockSize / 2;
  let mapLappY = MapPostionLU + this.mapboardHeight - MapMargin +
                 (lappland.cellY - foreground.blockBottom) * MapSpace - MapBlockSize / 2;
  this.miniLapp.position.set(mapLappX, mapLappY);
}

/** 初始化 */
PuzzleMap.prototype.init = function() {
  // 绘制黑色背景
  this.mapboard = new PIXI.Graphics();
  this.mapboard.visible = false;
  this.mapboard.alpha = 0.7;
  this.mapboard.zIndex = 1030;
  this.mapboard.beginFill(0x000000); // 开始绘制
  this.mapboard.drawRect(MapPostionLU, MapPostionLU, this.mapboardWidth, this.mapboardHeight);
  this.mapboard.endFill(); // 停止绘制
  Stage.addChild(this.mapboard);
  // Mini Lappland
  this.miniLapp = new PIXI.Sprite(miniLappTexture);
  this.miniLapp.visible = false;
  this.miniLapp.zIndex = 1033;
  this.miniLapp.anchor.set(0.5);
  this.setMiniLappland();
  Stage.addChild(this.miniLapp);
  // Mini Blocks/Diamonds
  for (let i = 0; i < foreground.blocks.length; i++) {
    // 添加地砖
    this.mapBlocks[i] = new PIXI.Graphics();
    this.mapBlocks[i].zIndex = 1031;
    let mapBlockPos = this.setMapBlock(this.mapBlocks[i], foreground.blocks[i]);
    Stage.addChild(this.mapBlocks[i]);
    // 添加宝石（Purple/Red/Blue）
    if (foreground.blocks[i].type == BlockType.Purple || foreground.blocks[i].type == BlockType.Red ||
        foreground.blocks[i].type == BlockType.Blue) { // 可能有宝石
      let mapDiamCX = mapBlockPos[0] + MapBlockSize / 2;
      let mapDiamCY = mapBlockPos[1] + MapBlockSize / 2;
      this.mapDiamonds[i] = new PIXI.Graphics();
      this.mapDiamonds[i].visible = false;
      this.mapDiamonds[i].zIndex = 1032;
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

/** 可变绘制 */
PuzzleMap.prototype.update = function() {
  this.mapboard.visible = this.isVisible;
  this.miniLapp.visible = this.isVisible;
  this.setMiniLappland();
  for (let i = 0; i < foreground.blocks.length; i++) {
    this.setMapBlock(this.mapBlocks[i], foreground.blocks[i]);
    // 可能有宝石（即存在this.mapDiamonds[i]）
    if (foreground.blocks[i].type == BlockType.Purple || foreground.blocks[i].type == BlockType.Red || foreground.blocks[i].type == BlockType.Blue) {
      this.mapDiamonds[i].visible = false;
      if (foreground.blocks[i].itemType == ItemType.Diamond && !foreground.blocks[i].isCollected) { // 的确有宝石
        this.mapDiamonds[i].visible = true;
      }
    }
  }
}
