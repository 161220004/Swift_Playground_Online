/** Foreground 类，场景中地砖的集合，图层范围是 10 ~ 1000, 1000 ~ 1010
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
  this.totalDiamNum = 0; // 场景上的宝石总数（包含Random）
  this.totalSwitchNum = 0; // 场景上的可变砖块总数（包含Random）
  // 其他数据
  this.collectedNum = 0; // 收集总数
  this.switchOnNum = 0; // 点亮总数
  this.maxSwitchNum = 0; // 如果所有Random量都是Switch的最大数目
  this.switchMap = []; // 所有switch砖块统计（右上角）
  this.dirArrow = new PIXI.Sprite(arrowTexture); // 方向标
  this.alphaBia = -0.02; // 用来计算方向标的透明度
  // 初始化
  this.init();
  console.log("Foreground Added");
}

/** 刷新右上角点亮/熄灭的砖块，isInit表示是否是初始化 */
Foreground.prototype.setSwitchMap = function(isInit) {
  // 获取点亮/熄灭的砖块总数
  this.switchOnNum = 0;
  let switchOffNum = 0;
  for (let i = 0; i < this.blocks.length; i++) {
    if (this.blocks[i].type == BlockType.Yellow) {
      this.switchOnNum += 1; // 点亮的砖块总数
    } else if (this.blocks[i].type == BlockType.Dark) {
      switchOffNum += 1; // 熄灭的砖块总数
    }
  }
  // this.maxSwitchNum即可变砖块的最大可能数目，只有初始化的时候可以计算，然后就不能被改变
  if (isInit) { // 初始化
    this.maxSwitchNum = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i].type == BlockType.Yellow || this.blocks[i].type == BlockType.Dark ||
          this.blocks[i].type == BlockType.Green || this.blocks[i].type == BlockType.Blue) {
        this.maxSwitchNum += 1; // 可变砖块最大可能数目
      }
    }
  }
  for (let i = 0; i < this.maxSwitchNum; i++) { // 整理所有可能的Switch
    switchPosX = MiniSwitchX - MiniSwitchSpace * i;
    if (isInit) { // 初始化
      this.switchMap[i] = new PIXI.Graphics();
      this.switchMap[i].zIndex = 1000;
      Stage.addChild(this.switchMap[i]);
      this.switchMap[this.maxSwitchNum + i] = new PIXI.Graphics();
      this.switchMap[this.maxSwitchNum + i].zIndex = 1000;
      Stage.addChild(this.switchMap[this.maxSwitchNum + i]);
    }
    // 先清空全部砖块
    this.switchMap[i].clear();
    this.switchMap[this.maxSwitchNum + i].clear();
    this.switchMap[i].visible = false;
    this.switchMap[this.maxSwitchNum + i].visible = false;
    // 黑色砖块（空心）
    this.switchMap[i].lineStyle(2, 0xfafafa, 1); // 边框
    this.switchMap[i].drawCircle(switchPosX, MiniSwitchY, MiniSwitchR);
    this.switchMap[i].endFill(); // 停止绘制
    // 黄色砖块
    this.switchMap[this.maxSwitchNum + i].beginFill(0xfff9c4); // 开始绘制
    this.switchMap[this.maxSwitchNum + i].lineStyle(2, 0xbdbdbd, 1); // 边框
    this.switchMap[this.maxSwitchNum + i].drawCircle(switchPosX, MiniSwitchY, MiniSwitchR);
    this.switchMap[this.maxSwitchNum + i].endFill(); // 停止绘制
  }
  for (let i = 0; i < this.switchOnNum; i++) { // 点亮
    this.switchMap[this.maxSwitchNum + i].visible = true;
  }
  for (let i = this.switchOnNum; i < this.switchOnNum + switchOffNum; i++) {
    this.switchMap[i].visible = true;
  }
}

/** 初始化 */
Foreground.prototype.init = function() {
  let minXIndex = 0; // X跨度左值
  let maxXIndex = 0; // X跨度右值
  let minYIndex = 0; // Y跨度左值
  let maxYIndex = 0; // Y跨度右值
  // 获取block数组，宝石总数，以及X/Y方向跨度
  for (let i = 0; i < SceneData.blocks.length; i++) {
    this.blocks[i] = new Block(SceneData.blocks[i].type, SceneData.blocks[i].cellX, SceneData.blocks[i].cellY,
                               SceneData.blocks[i].item, SceneData.blocks[i].id);
    // X/Y跨度左右值
    if (this.blocks[i].cellX < this.blocks[minXIndex].cellX) minXIndex = i;
    if (this.blocks[i].cellX > this.blocks[maxXIndex].cellX) maxXIndex = i;
    if (this.blocks[i].cellY < this.blocks[minYIndex].cellY) minYIndex = i;
    if (this.blocks[i].cellY > this.blocks[maxYIndex].cellY) maxYIndex = i;
  }
  this.blockNumX = this.blocks[maxXIndex].cellX - this.blocks[minXIndex].cellX + 1;
  this.blockNumY = this.blocks[maxYIndex].cellY - this.blocks[minYIndex].cellY + 1;
  this.blockBottom = this.blocks[maxYIndex].cellY;
  this.blockLeft = this.blocks[minXIndex].cellX;
  // 初始化右上角点亮总数
  this.setSwitchMap(true);
  // 绘制方向标
  this.dirArrow.anchor.set(0.5);
  this.dirArrow.zIndex = 1000;
  this.dirArrow.position.set(MiniDirX, MiniDirY);
  this.dirArrow.alpha = 1;
  this.dirArrow.rotation = lappland.turnRotation;
  Stage.addChild(this.dirArrow);
}

/** 重置 */
Foreground.prototype.reset = function() {
  this.collectedNum = 0; // 收集总数
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].reset();
  }
  this.setSwitchMap(false); // 绘制右上角点亮总数
  console.log("Foreground Reset");
}

/* 代码Run的时候，必须把所有Random项目确定 */
Foreground.prototype.setRandom = function() {
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].setRandom();
  }
  // 重新计算当前右上角点亮总数
  this.setSwitchMap(false);
  // 计算宝石/开关总数
  this.totalSwitchNum = 0;
  this.totalDiamNum = 0;
  for (let i = 0; i < this.blocks.length; i++) {
    if (this.blocks[i].type == BlockType.Yellow || this.blocks[i].type == BlockType.Dark) {
      this.totalSwitchNum += 1;
    } else if (this.blocks[i].itemType == ItemType.Diamond) {
      this.totalDiamNum += 1;
    }
  }
  console.log("Set Random Scene: Switch(" + this.totalSwitchNum + "), Diamond(" + this.totalDiamNum + ")");
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
    this.setSwitchMap(false);
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
