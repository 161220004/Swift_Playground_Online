// 通关信息
var PuzzleMsg = function() {
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
