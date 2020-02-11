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
  this.timerDiamond = 0;
  this.countDiamond = 0;
}

Block.prototype.drawDiamond = function() {
  if (this.item == ItemType.Diamond) {
    // Diamond旋转动画
    this.timerDiamond += interval;
    if (this.timerDiamond > DiamondInterval) {
      this.countDiamond = (this.countDiamond + 1) % 4;
      this.timerDiamond %= DiamondInterval;
    }
    ctxtI.save();
    ctxtI.translate(blockInitX + this.cellX * CellXBia + this.cellY * CellYBiaX - DiamondSize / 2 - camera.x,
                    blockInitY + this.cellY * CellYBiaY - DiamondSize / 2 - camera.y);
    ctxtI.drawImage(diamondImg[this.countDiamond], 0, DiamondYBia, DiamondSize, DiamondSize);
    ctxtI.restore();
  }
}

Block.prototype.draw = function() {
  ctxtF.save();
  ctxtF.translate(blockInitX + this.cellX * CellXBia + this.cellY * CellYBiaX - BlockWidth / 2 - camera.x,
                  blockInitY + this.cellY * CellYBiaY - BlockHeight / 2 - camera.y);
  ctxtF.drawImage(this.img, 0, BlockYBia, BlockWidth, BlockHeight);
  ctxtF.restore();
}
