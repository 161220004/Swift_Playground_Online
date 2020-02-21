var Scene = function() {
  // 背景图片左上角的初始位置
  this.backInitX = 0;
  this.backInitY = 0;
  // 地砖初始位置（像素）
  this.blockInitX = 300;
  this.blockInitY = 300;
  // Lappland初始位置（像素）
  this.lappInitX = 300;
  this.lappInitY = 300;
  // Lappland初始方向
  this.lappInitDir = 2; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)
  // 所有地砖
  this.blocks = [];
  // 用于绘制小地图
  this.blockNumX = 0; // blocks在X方向跨度
  this.blockNumY = 0; // blocks在Y方向跨度
}

Scene.prototype.initFromServer = function(data) {
  console.log("Init Data From Server");
  // 获取初始值
  let puzzleInfoFromServer = data.puzzle;
  this.backInitX = puzzleInfoFromServer.backInitX;
  this.backInitY = puzzleInfoFromServer.backInitY;
  this.blockInitX = puzzleInfoFromServer.blockInitX;
  this.blockInitY = puzzleInfoFromServer.blockInitY;
  this.lappInitX = puzzleInfoFromServer.lappInitX;
  this.lappInitY = puzzleInfoFromServer.lappInitY;
  this.lappInitDir = puzzleInfoFromServer.lappInitDir;
  console.log(puzzleInfoFromServer.description);
  // 按id排序，确认blocks绘制顺序
  let blocksFromServer = data.blocks;
  blocksFromServer.sort(function(block1, block2) {
    return block1.id - block2.id;
  });
  let minXIndex = 0; // X跨度左值
  let maxXIndex = 0; // X跨度右值
  let minYIndex = 0; // Y跨度左值
  let maxYIndex = 0; // Y跨度右值
  // 获取block数组，宝石总数，以及X/Y方向跨度
  for (let i = 0; i < blocksFromServer.length; i++) {
    this.blocks[i] = new Block(blocksFromServer[i].type, blocksFromServer[i].cellX, blocksFromServer[i].cellY, blocksFromServer[i].item);
    if (this.blocks[i].item == ItemType.Diamond) {
      puzzleMsg.totalNum += 1; // 宝石总数
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
}

// 绘制前景
Scene.prototype.drawForeground = function() {
  for (let i = 0; i < this.blocks.length; i++) {
    this.blocks[i].draw();
    this.blocks[i].drawDiamond();
  }
}

// 绘制背景
Scene.prototype.drawBackground = function() {
  let backgroundWidth = backgroundImg.width;
  let backgroundHeight = backgroundImg.height;
  ctxtB.save();
  ctxtB.translate(this.backInitX - camera.x, this.backInitY - camera.y);
  ctxtB.drawImage(backgroundImg, 0, 0);
  // 若背景图片不够大，补一张
  let needRight = (this.backInitX - camera.x + backgroundWidth < canvasWidth); // 右侧需要补
  let needLeft = (this.backInitX - camera.x > 0); // 左侧需要补
  let needUp = (this.backInitY - camera.y > 0); // 上面需要补
  let needDown = (this.backInitY - camera.y + backgroundHeight < canvasHeight); // 下面需要补
  if (needRight) {
    ctxtB.drawImage(backgroundImg, backgroundWidth, 0); // 在右侧补一张
  }
  if (needLeft) {
    ctxtB.drawImage(backgroundImg, -backgroundWidth, 0); // 在左侧补一张
  }
  if (needDown) {
    ctxtB.drawImage(backgroundImg, 0, backgroundHeight); // 在下面补一张
  }
  if (needUp) {
    ctxtB.drawImage(backgroundImg, 0, -backgroundHeight); // 在上面补一张
  }
  if (needRight && needUp) {
    ctxtB.drawImage(backgroundImg, backgroundWidth, -backgroundHeight); // 在右上补一张
  }
  if (needRight && needDown) {
    ctxtB.drawImage(backgroundImg, backgroundWidth, backgroundHeight); // 在右下补一张
  }
  if (needLeft && needUp) {
    ctxtB.drawImage(backgroundImg, -backgroundWidth, -backgroundHeight); // 在左上补一张
  }
  if (needLeft && needDown) {
    ctxtB.drawImage(backgroundImg, -backgroundWidth, backgroundHeight); // 在左下补一张
  }
  ctxtB.restore();
}

// 用于探测Lappland当前是否处于任意一块地砖上，是则返回该地砖下标，否则返回-1
Scene.prototype.detectOnBlock = function() {
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
