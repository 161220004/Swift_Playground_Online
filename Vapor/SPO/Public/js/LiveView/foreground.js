// 枚举类型： 地砖类型
var BlockType = {
  Normal: "Normal",
  Red: "Red",
  Yellow: "Yellow",
  Green: "Green",
  Blue: "Blue",
  Purple: "Purple",
  Dark: "Dark",
}

var ItemType = {
  None: "",
  Diamond: "Diamond",
}

// 地砖，从后端接收值
var Block = function(tp, cx, cy, it) {
  this.type = tp; // 地砖种类，决定放哪个图片
  this.cellX = cx;
  this.cellY = cy;
  this.item = it;
  switch (this.type) {
    case BlockType.Red:
      this.img = blockRedImg;
      break;
    case BlockType.Yellow:
      this.img = blockYellowImg;
      break;
    case BlockType.Green:
      this.img = blockGreenImg;
      break;
    case BlockType.Blue:
      this.img = blockBlueImg;
      break;
    case BlockType.Purple:
      this.img = blockPurpleImg;
      break;
    case BlockType.Dark:
      this.img = blockDarkImg;
      break;
    default:
      this.img = blockNormalImg;
  }
  this.timerDiamond = 0; // 旋转计时器
  this.countDiamond = 0;
  this.timerCollect = 0; // 收集动画计时器
  this.sizePercent = 1; // 宝石缩小后尺寸百分比
  this.isCollecting = false; // 是否被收集，是则开始缩小并飞到右上角
  this.isCollected = false; // 是否已经被收集没了
}

// 获取cell对应的像素X坐标
Block.prototype.getX = function() {
  return blockInitX + this.cellX * CellXBia + this.cellY * CellYBiaX;
}

// 获取cell对应的像素Y坐标（向下偏移前）
Block.prototype.getY = function() {
  return blockInitY + this.cellY * CellYBiaY;
}

// 绘制宝石
Block.prototype.drawDiamond = function() {
  if (this.item == ItemType.Diamond) {
    let curX = this.getX() - DiamondSize * this.sizePercent / 2 - camera.x;
    let curY = this.getY() - DiamondSize * this.sizePercent / 2 - camera.y + DiamondYBia;
    let flyX = 0;
    let flyY = 0;
    // Diamond收集动画
    if (puzzleStatus.isRunning && this.isCollecting) {
      this.timerCollect += interval;
      if (this.timerCollect > CollectShrinkInterval + CollectGetInterval) {
        // 开启下一步动作
        actions[actionCount].break();
        // 动画结束
        lappland.timerCollect = 0;
        this.isCollected = true;
        this.isCollecting = false;
        this.timerCollect = 0;
        puzzleMsg.collectNum += 1;
      } else if (this.timerCollect > CollectShrinkInterval) { // timer: CollectShrinkInterval ~ ..+ CollectGetInterval
        // 宝石飞向右上角动画
        let flyPercent = (this.timerCollect - CollectShrinkInterval) / CollectGetInterval;
        flyX = (MiniDiamondX - curX) * flyPercent;
        flyY = (MiniDiamondY + puzzleMsg.collectNum * MiniDiamondSpace - curY) * flyPercent;
      } else { // timer: 0 ~ CollectShrinkInterval
        // 宝石缩小动画 (100% -> 30%)
        this.sizePercent = 1 - 0.7 * this.timerCollect / CollectShrinkInterval;
      }
    }
    // 宝石在原位旋转（未采集）
    if (!this.isCollected) {
      // Diamond旋转动画
      this.timerDiamond += interval;
      if (this.timerDiamond > DiamondInterval) {
        this.countDiamond = (this.countDiamond + 1) % 4;
        this.timerDiamond %= DiamondInterval;
      }
      // 绘制
      ctxtI.save();
      ctxtI.translate(curX, curY);
      ctxtI.drawImage(diamondImg[this.countDiamond], flyX, flyY, DiamondSize * this.sizePercent, DiamondSize * this.sizePercent);
      ctxtI.restore();
    }
  }
}

// 绘制地砖
Block.prototype.draw = function() {
  ctxtF.save();
  ctxtF.translate(this.getX() - BlockWidth / 2 - camera.x, this.getY() - BlockHeight / 2 - camera.y);
  ctxtF.drawImage(this.img, 0, BlockYBia, BlockWidth, BlockHeight);
  ctxtF.restore();
}
