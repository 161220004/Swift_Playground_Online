/** Foreground 类，场景中地砖的集合
 * @constructor
 */
function Foreground() {
  // 所有地砖
  this.blocks = [];
  // 用于绘制小地图
  this.blockNumX = 0; // blocks在X方向跨度
  this.blockNumY = 0; // blocks在Y方向跨度
  this.blockBottom = 0; // blocks在Y方向最小值
  this.blockLeft = 0; // blocks在X方向最小值
  // 关键数据
  this.targetDiamNum = SceneData.puzzle.targetDiamNum; // 要求收集的钻石数
  this.targetOnNum = SceneData.puzzle.targetOnNum; // 要求点亮的砖块数
  // 其他数据
  this.collectedNum = 0; // 收集总数
  this.switchOnNum = 0; // 点亮的砖块总数
  this.switchOffNum = 0; // 熄灭的砖块总数
  this.switchMap = []; // 所有switch砖块统计（右上角）
  this.dirArrow = new PIXI.Sprite(arrowTexture); // 方向标
  this.alphaBia = -0.02; // 用来计算方向标的透明度
  // 初始化
  this.init();
  console.log("Foreground Added");
}

/** 获取点亮/熄灭的砖块总数 */
Foreground.prototype.setSwitchNum = function() {
  this.switchOnNum = 0;
  this.switchOffNum = 0;
  for (let i = 0; i < this.blocks.length; i++) {
    if (this.blocks[i].type == BlockType.Yellow) {
      this.switchOnNum += 1; // 点亮的砖块总数
    }
    if (this.blocks[i].type == BlockType.Dark) {
      this.switchOffNum += 1; // 熄灭的砖块总数
    }
  }
}

/** 在右上角展示点亮/熄灭的砖块 */
Foreground.prototype.initSwitchMap = function() {
  let switchNum = this.switchOnNum + this.switchOffNum;
  for (let i = 0; i < switchNum; i++) {
    switchPosX = MiniSwitchX - MiniSwitchSpace * i;
    // 黑色砖块
    this.switchMap[i] = new PIXI.Graphics();
    this.switchMap[i].zIndex = 199;
    this.switchMap[i].visible = false;
    this.switchMap[i].beginFill(0x616161); // 开始绘制
    this.switchMap[i].lineStyle(1, 0xbdbdbd, 1); // 边框
    this.switchMap[i].drawCircle(switchPosX, MiniSwitchY, MiniSwitchR);
    this.switchMap[i].endFill(); // 停止绘制
    Stage.addChild(this.switchMap[i]);
    // 黄色砖块
    this.switchMap[switchNum + i] = new PIXI.Graphics();
    this.switchMap[switchNum + i].zIndex = 199;
    this.switchMap[switchNum + i].visible = false;
    this.switchMap[switchNum + i].beginFill(0xfff9c4); // 开始绘制
    this.switchMap[switchNum + i].lineStyle(1, 0xbdbdbd, 1); // 边框
    this.switchMap[switchNum + i].drawCircle(switchPosX, MiniSwitchY, MiniSwitchR);
    this.switchMap[switchNum + i].endFill(); // 停止绘制
    Stage.addChild(this.switchMap[switchNum + i]);
  }
}

/** 刷新右上角点亮/熄灭的砖块 */
Foreground.prototype.setSwitchMap = function() {
  let switchNum = this.switchOnNum + this.switchOffNum;
  for (let i = 0; i < this.switchOnNum; i++) {
    this.switchMap[i].visible = false;
    this.switchMap[switchNum + i].visible = true;
  }
  for (let i = this.switchOnNum; i < switchNum; i++) {
    this.switchMap[i].visible = true;
    this.switchMap[switchNum + i].visible = false;
  }
}

/** 初始化 */
Foreground.prototype.init = function() {
  // 按id从小到大排序，确认blocks绘制顺序
  SceneData.blocks.sort(function(block1, block2) {
    return block1.id - block2.id;
  });
  let minXIndex = 0; // X跨度左值
  let maxXIndex = 0; // X跨度右值
  let minYIndex = 0; // Y跨度左值
  let maxYIndex = 0; // Y跨度右值
  // 获取block数组，宝石总数，以及X/Y方向跨度
  for (let i = 0; i < SceneData.blocks.length; i++) {
    this.blocks[i] = new Block(SceneData.blocks[i].type, SceneData.blocks[i].cellX, SceneData.blocks[i].cellY,
                               SceneData.blocks[i].item, i);
    // X/Y跨度左右值
    if (this.blocks[i].cellX < this.blocks[minXIndex].cellX) {
      minXIndex = i;
    }
    if (this.blocks[i].cellX > this.blocks[maxXIndex].cellX) {
      maxXIndex = i;
    }
    if (this.blocks[i].cellY < this.blocks[minYIndex].cellY) {
      minYIndex = i;
    }
    if (this.blocks[i].cellY > this.blocks[maxYIndex].cellY) {
      maxYIndex = i;
    }
  }
  // 绘制右上角点亮总数
  this.setSwitchNum();
  this.initSwitchMap();
  this.setSwitchMap();
  this.blockNumX = this.blocks[maxXIndex].cellX - this.blocks[minXIndex].cellX + 1;
  this.blockNumY = this.blocks[maxYIndex].cellY - this.blocks[minYIndex].cellY + 1;
  this.blockBottom = this.blocks[maxYIndex].cellY;
  this.blockLeft = this.blocks[minXIndex].cellX;
  // 绘制方向标
  this.dirArrow.anchor.set(0.5);
  this.dirArrow.zIndex = 199;
  this.dirArrow.position.set(MiniDirX, MiniDirY);
  this.dirArrow.alpha = 1;
  this.dirArrow.rotation = lappland.turnRotation;
  Stage.addChild(this.dirArrow);
}

/** 重置 */
Foreground.prototype.reset = function() {
  this.collectedNum = 0; // 收集总数
  this.switchOnNum = 0; // 点亮的砖块总数
  this.switchOffNum = 0; // 熄灭的砖块总数
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].reset();
  }
  // 绘制右上角点亮总数
  this.setSwitchNum();
  this.setSwitchMap();
  console.log("Foreground Reset");
}

/** 用于探测Lappland当前是否处于任意一块地砖上，是则返回该地砖下标，否则返回-1 */
Foreground.prototype.detectOnBlock = function() {
  // 出界标准：左右超过cell长60%，上下超过cell高60%
  let index = (function(blocks) { // 探测当前与Lappland最接近的一块地砖，返回该地砖下标
    let neari = 0;
    for (let i = 0; i < blocks.length; i++) {
      let dcx = blocks[neari].cellX - lappland.cellX;
      let dcy = blocks[neari].cellY - lappland.cellY;
      let dcxi = blocks[i].cellX - lappland.cellX;
      let dcyi = blocks[i].cellY - lappland.cellY;
      if (dcxi * dcxi + dcyi * dcyi < dcx * dcx + dcy * dcy) {
        neari = i;
      }
    }
    return neari;
  })(this.blocks);
  if (Math.abs(this.blocks[index].cellX - lappland.cellX) < 0.6
      && Math.abs(this.blocks[index].cellY - lappland.cellY) < 0.6) {
    return index;
  } else {
    return -1;
  }
}

/** 开始收集当前的宝石，若当前位置没有则报错（理论上不应该报错，因为在Puzzle.judgeResult中已经检测出来了） */
Foreground.prototype.tryCollect = function() {
  let blockIndex = foreground.detectOnBlock();
  if (blockIndex >= 0 && this.blocks[blockIndex].itemType == ItemType.Diamond && !this.blocks[blockIndex].isCollected) {
    this.blocks[blockIndex].isCollecting = true;
  } else {
    console.log("Unexpect Error When Collect");
  }
}

/** 开始转换当前的地砖，若不能转换则报错（理论上不应该报错，因为在Puzzle.judgeResult中已经检测出来了） */
Foreground.prototype.trySwitch = function() {
  let blockIndex = foreground.detectOnBlock();
  if (blockIndex >= 0 && (foreground.blocks[blockIndex].type == BlockType.Dark || foreground.blocks[blockIndex].type == BlockType.Yellow)) {
    foreground.blocks[blockIndex].switchIt();
    this.setSwitchNum();
    this.setSwitchMap();
  } else {
    console.log("Unexpect Error When Switch");
  }
}

/** 绘制 */
Foreground.prototype.update = function() {
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].update();
  }
  // 方向标闪烁动画
  this.dirArrow.alpha += this.alphaBia;
  if (this.dirArrow.alpha > 1) {
    this.dirArrow.alpha = 1;
    this.alphaBia = -this.alphaBia;
  } else if (this.dirArrow.alpha < 0.6) {
    this.dirArrow.alpha = 0.6;
    this.alphaBia = -this.alphaBia;
  }
  this.dirArrow.rotation = lappland.turnRotation;
}
