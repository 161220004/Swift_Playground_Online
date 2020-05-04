/** 枚举类型： 地砖类型 */
var BlockType = {
  Normal: 0,
  Red: 1,
  Yellow: 2,
  Green: 3,
  Blue: 4,
  Purple: 5,
  Dark: 6,
}

/** 枚举类型： 物品类型 */
var ItemType = {
  None: "",
  Diamond: "Diamond",
}

/** Block 类，绘制的地砖以 Sprite 实现，钻石以 AnimatedSprite 实现
 * @constructor
 */
function Block(btype, cx, cy, itype, z) {
  // Cell坐标
  this.cellX = cx;
  this.cellY = cy;
  // 钻石是否被收集
  this.isCollected = false;
  this.isCollecting = false;
  this.diamondScale = 1.0; // 收集过程中从 1.0 倒数到 0.3
  this.diamondFlyTime = 0; // 飞行时间 0 ~ MiniDiamondFlyInterval
  this.collectNo = 0; // 是第几个被收集的钻石
  // 是否被转换颜色
  this.isSwitched = false;
  // Block Sprite
  this.type = btype;
  this.blockSprite = new PIXI.Sprite(itemsTextures["Block"][btype]);
  this.blockSprite.anchor.set(0.5);
  this.blockSprite.zIndex = 10 + 2 * z;
  Stage.addChild(this.blockSprite);
  // Item Sprite
  this.itemType = itype;
  this.itemSprite;
  if (this.itemType == ItemType.Diamond) {
    this.itemSprite = new PIXI.AnimatedSprite(itemsTextures["Diamond"], 54, 54);
    this.itemSprite.anchor.set(0.5);
    this.itemSprite.zIndex = 11 + 2 * z;
    Stage.addChild(this.itemSprite);
    this.itemSprite.loop = true;
    this.itemSprite.animationSpeed = 0.15;
    this.itemSprite.play();
  }
}

/** 重置 */
Block.prototype.reset = function() {
  this.isCollected = false;
  this.isCollecting = false;
  this.diamondScale = 1.0; // 收集过程中从 1.0 倒数到 0.3
  this.diamondFlyTime = 0; // 飞行时间 0 ~ MiniDiamondFlyInterval
  this.collectNo = 0; // 是第几个被收集的钻石
  if (this.itemType == ItemType.Diamond) {
    this.itemSprite.play();
  }
  if (this.isSwitched) { // 恢复转换前的颜色
    this.switchIt();
  }
}

/** 点亮黑色砖块/熄灭黄色砖块 */
Block.prototype.switchIt = function() {
  if (this.type == BlockType.Dark) {
    this.type = BlockType.Yellow;
    this.isSwitched = !this.isSwitched;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
  } else if (this.type == BlockType.Yellow) {
    this.type = BlockType.Dark;
    this.isSwitched = !this.isSwitched;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
  }
}

/** 绘制 */
Block.prototype.update = function() {
  // 计算坐标
  let cellXBia = this.cellX - lappland.cellX;
  let cellYBia = this.cellY - lappland.cellY;
  let x = CameraX[lappland.direction] + cellXBia * XBia + cellYBia * YBiaX + lappland.turnXBia;
  let y = CameraY + cellYBia * YBiaY;
  // 绘制地砖
  this.blockSprite.position.set(x, y + BlockYBia);
  // 绘制钻石
  if (this.itemSprite) {
    if (this.isCollecting) {
      if (this.diamondScale > 0.3) { // 正在缩小中
        this.collectNo = foreground.collectedNum;
        this.diamondScale -= 0.014; // 50 loopCount
        this.itemSprite.setTransform(x, y + DiamondYBia, this.diamondScale, this.diamondScale);
      } else { // 正在飞向右上角
        let dx = (MiniDiamondX - MiniDiamondSpace * this.collectNo) - x;
        let dy = MiniDiamondY - (y + DiamondYBia);
        if (this.diamondFlyTime < MiniDiamondFlyInterval) { // 未到达目的地
          this.diamondFlyTime += 1;
          this.itemSprite.setTransform(x + dx * this.diamondFlyTime / MiniDiamondFlyInterval,
                                       y + DiamondYBia + dy * this.diamondFlyTime / MiniDiamondFlyInterval,
                                       this.diamondScale, this.diamondScale);
        } else { // 到达
          this.itemSprite.setTransform(x + dx, y + DiamondYBia + dy, this.diamondScale, this.diamondScale);
          this.itemSprite.gotoAndStop(0);
          foreground.collectedNum += 1;
          this.isCollecting = false;
          this.isCollected = true;
          console.log("Diamond Collected (" + foreground.collectedNum + "/" + foreground.targetDiamNum + ")");
        }
      }
    } else if (!this.isCollected) {
      this.itemSprite.position.set(x, y + DiamondYBia);
      this.itemSprite.scale.set(1);
    }
  }

}
