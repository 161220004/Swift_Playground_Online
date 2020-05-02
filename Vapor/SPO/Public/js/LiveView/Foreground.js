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
  // 其他数据
  this.diamondNum = 0; // 钻石总数
  this.collectedNum = 0; // 收集总数
  // 初始化
  this.init();
  console.log("Foreground Added");
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
    if (this.blocks[i].itemType == ItemType.Diamond) {
      this.diamondNum += 1; // 宝石总数
    }
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
  this.blockNumX = this.blocks[maxXIndex].cellX - this.blocks[minXIndex].cellX + 1;
  this.blockNumY = this.blocks[maxYIndex].cellY - this.blocks[minYIndex].cellY + 1;
  this.blockBottom = this.blocks[maxYIndex].cellY;
  this.blockLeft = this.blocks[minXIndex].cellX;
}

/** 重置 */
Foreground.prototype.reset = function() {
  this.collectedNum = 0; // 收集总数
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].reset();
  }
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

/** 绘制 */
Foreground.prototype.update = function() {
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].update();
  }
}
