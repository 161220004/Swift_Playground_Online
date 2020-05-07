/** 枚举类型： 地砖类型 */
var BlockType = {
  Normal: 0,
  Red: 1,  // Random: 有/没有宝石
  Yellow: 2,
  Green: 3, // Random: Yellow/Dark
  Blue: 4, // Random: 可变砖块/宝石
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
function Block(btype, cx, cy, itype, id) {
  this.id = id; // 决定了图层顺序
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
  // Block Sprite (图层范围是 10 ~ 1000)
  this.type = btype;
  this.initType = btype; // 初始BlockType（获取Random之前）
  this.blockSprite = new PIXI.Sprite(itemsTextures["Block"][btype]);
  this.blockSprite.anchor.set(0.5);
  this.blockSprite.zIndex = 10 + 15 * id;
  Stage.addChild(this.blockSprite);
  // Item Sprite
  this.itemType = itype;
  this.initItem = itype; // 初始ItemType（获取Random之前）
  this.itemSprite;
  if (this.type == BlockType.Purple || this.type == BlockType.Red || this.type == BlockType.Blue) { // 可能有宝石
    this.itemSprite = new PIXI.AnimatedSprite(itemsTextures["Diamond"], 54, 54);
    this.itemSprite.anchor.set(0.5);
    this.itemSprite.zIndex = 11 + 15 * id;
    this.itemSprite.visible = false;
    Stage.addChild(this.itemSprite);
    this.itemSprite.loop = true;
    this.itemSprite.animationSpeed = 0.15;
    this.itemSprite.play();
  }
  if (this.itemType == ItemType.Diamond) { // 确定有宝石
    this.itemSprite.visible = true;
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
  // 回退到Random类型获取之前
  this.type = this.initType;
  this.itemType = this.initItem;
  if (this.type == BlockType.Red || this.type == BlockType.Blue) { // 隐藏随机宝石
    this.itemSprite.visible = false;
  }
}

/* 设置随机宝石：代码Run的时候，必须把所有Random项目确定 */
Block.prototype.setRandomDiam = function() {
  if (Math.random() < RandDiamPercent) { // 有
    this.type = BlockType.Purple;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
    this.itemType = ItemType.Diamond;
    this.itemSprite.visible = true;
  } else { // 没有
    this.type = BlockType.Normal;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
  }
}

/* 设置随机砖块：代码Run的时候，必须把所有Random项目确定 */
Block.prototype.setRandomSwitch = function() {
  if (Math.random() < RandOnPercent) { // Yellow
    this.type = BlockType.Yellow;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
  } else { // Dark
    this.type = BlockType.Dark;
    this.blockSprite.texture = itemsTextures["Block"][this.type];
  }
}

/* 代码Run的时候，必须把所有Random项目确定 */
Block.prototype.setRandom = function() {
  if (this.type == BlockType.Red) { // Random: 有/没有宝石
    this.setRandomDiam();
  } else if (this.type == BlockType.Green) { // Random: Yellow/Dark
    this.setRandomSwitch();
  } else if (this.type == BlockType.Blue) { // Random: Gem/Switch
    if (Math.random() < RandSwitchPercent) { // Switch
      this.setRandomSwitch();
    } else { // Gem
      this.setRandomDiam();
    }
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
          if (foreground.targetDiamNum != -1) {
            console.log("Diamond Collected (" + foreground.collectedNum + "/" + foreground.targetDiamNum + ")");
          } else {
            console.log("Diamond Collected (" + foreground.collectedNum + "/" + foreground.totalDiamNum + ")");
          }
        }
      }
    } else if (!this.isCollected) {
      this.itemSprite.position.set(x, y + DiamondYBia);
      this.itemSprite.scale.set(1);
    }
  }

}
