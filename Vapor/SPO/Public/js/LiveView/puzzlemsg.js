// 通关信息
var PuzzleMsg = function() {
  this.isViewingMap = false; // Run前，是否正在查看地图
  this.failedToCompile = false; // Run初，失败：编译失败
  this.fallFromBlock = false; // Run途中，失败：掉落
  this.failedToCollect = false; // Run途中，失败：collect空地砖
  this.endNotEnough = false; // Run结束，失败：宝石收集不全
  this.endSucceed = false; // Run结束，成功
  this.collectNum = 0; // 收集宝石数
  this.stepNum = 0; // 步数
}

// 绘制Puzzle信息栏
PuzzleMsg.prototype.draw = function() {
  ctxtMsg.save();
  // 右上角宝石数
  ctxtMsg.translate(MiniDiamondX, MiniDiamondY);
  for (var i = 0; i < this.collectNum; i++) {
    ctxtMsg.drawImage(diamondImg[0], 0, MiniDiamondSpace * i, MiniDiamondSize, MiniDiamondSize);
  }
  ctxtMsg.restore();
}

// 查看地图
$("#view_map").click(function() {
  if (!isCompiling && !isCoping) {
    puzzleMsg.isViewingMap = !puzzleMsg.isViewingMap;
  }
});

// 检测状态，结算成果
PuzzleMsg.prototype.measure = function() {
  ctxtMsg.save();
  ctxtCtn.save();
  // 是否正在查看地图
  if (isCompiling || isCoping) {
    this.isViewingMap = false;
  } else if (this.isViewingMap) { // 若正在查看地图
    // 绘制黑色背景
    var mapCtnWidth = MapMargin * 2 + detectBlockNumX() * MapSpace;
    var mapCtnHeight = MapMargin * 2 + detectBlockNumY() * MapSpace;
    ctxtCtn.globalAlpha = 0.5;
    ctxtCtn.fillRect(MapPostionLU, MapPostionLU, mapCtnWidth, mapCtnHeight);
    // 绘制地砖以及地砖上的物品
    for (var i = 0; i < blocks.length; i++) {
      var mapBlockX = MapPostionLU + MapMargin + blocks[i].cellX * MapSpace;
      var mapBlockY = MapPostionLU + mapCtnHeight - MapMargin - MapBlockSize + blocks[i].cellY * MapSpace;
      switch (blocks[i].type) {
        case BlockType.Normal: ctxtMsg.fillStyle = "#eeeeee"; break;
        case BlockType.Red: ctxtMsg.fillStyle = "#ffcdd2"; break;
        case BlockType.Yellow: ctxtMsg.fillStyle = "#fff9c4"; break;
        case BlockType.Green: ctxtMsg.fillStyle = "#c8e6c9"; break;
        case BlockType.Blue: ctxtMsg.fillStyle = "#bbdefb"; break;
        case BlockType.Purple: ctxtMsg.fillStyle = "#d1c4e9"; break;
        case BlockType.Dark: ctxtMsg.fillStyle = "#bdbdbd"; break;
        default: ctxtMsg.fillStyle = "#eeeeee";
      }
      ctxtMsg.fillRect(mapBlockX, mapBlockY, MapBlockSize, MapBlockSize);
      // 绘制宝石
      switch (blocks[i].item) {
        case ItemType.Diamond:
          if (!blocks[i].isCollected) {
            var mapDiamCX = mapBlockX + MapBlockSize / 2;
            var mapDiamCY = mapBlockY + MapBlockSize / 2;
            ctxtMsg.fillStyle = "#9c27b0";
            ctxtMsg.beginPath();
            ctxtMsg.moveTo(mapDiamCX - MapDiamondWidth / 2, mapDiamCY);
            ctxtMsg.lineTo(mapDiamCX, mapDiamCY - MapDiamondHeight / 2);
            ctxtMsg.lineTo(mapDiamCX, mapDiamCY + MapDiamondHeight / 2);
            ctxtMsg.moveTo(mapDiamCX + MapDiamondWidth / 2, mapDiamCY);
            ctxtMsg.lineTo(mapDiamCX, mapDiamCY - MapDiamondHeight / 2);
            ctxtMsg.lineTo(mapDiamCX, mapDiamCY + MapDiamondHeight / 2);
            ctxtMsg.closePath();
            ctxtMsg.fill();
          }
          break;
        default: break;
      }
    }
    // 绘制Lappland
    var mapLappX = MapPostionLU + MapMargin + lappland.cellX * MapSpace + MapBlockSize / 2 - MapLappSize / 2;
    var mapLappY = MapPostionLU + mapCtnHeight - MapMargin + lappland.cellY * MapSpace - MapBlockSize / 2 - MapLappSize / 2;
    ctxtMsg.drawImage(miniLappImg, mapLappX, mapLappY, MapLappSize, MapLappSize);
  }
  // 失败判定 - 编译失败
  if (this.failedToCompile) {
    alert("Puzzle Message: Failed to Compile !")
  }
  // 失败判定 - 出界
  if (this.fallFromBlock) {
    alert("Puzzle Message: Fall from Block !")
  }
  // 失败判定 - 空取
  if (this.failedToCollect) {
    alert("Puzzle Message: Failed to Collect !")
  }
  ctxtMsg.restore();
  ctxtCtn.restore();
}
