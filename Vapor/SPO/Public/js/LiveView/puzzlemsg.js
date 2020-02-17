// 通关信息
var PuzzleMsg = function() {
  this.isViewingMap = false; // 是否正在查看地图
  this.totalNum = 0; // 宝石总数
  this.collectNum = 0; // 收集宝石数
  this.stepNum = 0; // 步数
  // 绘制通关信息或失败信息
  this.timerResult = 0; // 结果动画计时器
  this.timerLoad = 0; // 加载动画计时器
  this.countLoad = 0; // 加载动画第几帧
}

// 查看地图
$("#view_map").click(function() {
  if (!puzzleStatus.isCompiling && !puzzleStatus.isCompleted) {
    puzzleMsg.isViewingMap = !puzzleMsg.isViewingMap;
  }
});

// 查看地图
PuzzleMsg.prototype.viewMap = function() {
  ctxtMsg.save();
  ctxtCtn.save();
  // 是否正在查看地图
  if (puzzleStatus.isCompiling || puzzleStatus.isCompleted) {
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
  ctxtMsg.restore();
  ctxtCtn.restore();
}

// 绘制Puzzle信息栏
PuzzleMsg.prototype.drawInfo = function() {
  ctxtMsg.save();
  // 右上角宝石数
  ctxtMsg.translate(MiniDiamondX, MiniDiamondY);
  for (var i = 0; i < this.collectNum; i++) {
    ctxtMsg.drawImage(diamondImg[0], 0, MiniDiamondSpace * i, MiniDiamondSize, MiniDiamondSize);
  }
  ctxtMsg.restore();
}

// 绘制加载中
PuzzleMsg.prototype.drawLoading = function() {
  if (puzzleStatus.isCompiling) {
    this.timerLoad += interval;
    if (this.timerLoad > LoadingJumpInterval) {
      this.countLoad = (this.countLoad + 1) % 8;
      this.timerLoad %= LoadingJumpInterval;
    }
    var loadYBias = [0, 0, 0, 0, 0, 0, 0, 0];
    loadYBias[this.countLoad] = LoadingJumpY;
    // 绘制开始
    ctxtMsg.save();
    ctxtCtn.save();
    ctxtCtn.globalAlpha = 0.6;
    ctxtCtn.fillRect(0, 0, canvasWidth, canvasHeight);
    ctxtMsg.drawImage(pzMsgLoadingImg[0], 0, loadYBias[0]);
    ctxtMsg.drawImage(pzMsgLoadingImg[1], 0, loadYBias[1]);
    ctxtMsg.drawImage(pzMsgLoadingImg[2], 0, loadYBias[2]);
    ctxtMsg.drawImage(pzMsgLoadingImg[3], 0, loadYBias[3]);
    ctxtMsg.restore();
    ctxtCtn.restore();
  }
}

// 绘制通关信息或失败信息
PuzzleMsg.prototype.drawResult = function() {
  if (puzzleStatus.isCompleted) { // 编译失败或运行结果不正确
    // 失败判定（默认）
    var pzMsgImg = pzMsgFailureImg;
    // 成功判定
    if (puzzleStatus.isSuccess) {
      pzMsgImg = pzMsgSuccessImg;
    }
    // 绘制开始
    ctxtMsg.save();
    ctxtCtn.save();
    this.timerResult += interval;
    if (this.timerResult > FinalWaitInterval + FinalLappEmoInterval + FinalAppearInterval) {
      // 显示最终结果
      ctxtCtn.globalAlpha = 0.6;
      ctxtCtn.fillRect(0, 0, canvasWidth, canvasHeight);
      ctxtMsg.globalAlpha = 1;
      ctxtMsg.drawImage(pzMsgImg, 0, 0);
    } else if (this.timerResult > FinalWaitInterval + FinalLappEmoInterval) {
      // 结果的淡出
      ctxtCtn.globalAlpha = 0.6;
      ctxtCtn.fillRect(0, 0, canvasWidth, canvasHeight);
      ctxtMsg.globalAlpha = (this.timerResult - FinalWaitInterval - FinalLappEmoInterval) / FinalAppearInterval;
      ctxtMsg.drawImage(pzMsgImg, 0, 0);
    } else if (this.timerResult > FinalWaitInterval) {
      // Lappland表情动画
      lappland.showBubble = true;
    } else { // 等待
      console.log("Waiting");
    }
    ctxtMsg.restore();
    ctxtCtn.restore();
  }
}
