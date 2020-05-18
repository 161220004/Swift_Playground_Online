/** Lappland 类，其各个部位以 AnimatedSprite 和 Sprite 实现
 * @constructor
 */
function Lappland() {
  // 方向 [L, U, R, D]
  this.direction = SceneData.puzzle.lappInitDir;
  this.lastDirection = this.direction; // 上一次的朝向
  // 骨骼动画
  this.hair = new PIXI.AnimatedSprite(lappTextures["Hair"][this.direction]);
  this.tail = new PIXI.AnimatedSprite(lappTextures["Tail"][this.direction]);
  this.ribbon = new PIXI.AnimatedSprite(lappTextures["Ribbon"][this.direction]);
  this.face = new PIXI.AnimatedSprite(lappTextures["Face"][this.direction]);
  this.clothes = new PIXI.Sprite(lappTextures["Clothes"][this.direction]);
  this.leg = new PIXI.AnimatedSprite(lappTextures["Leg"][this.direction]);
  this.armb = new PIXI.AnimatedSprite(lappTextures["ArmB"][this.direction]);
  this.armf = new PIXI.AnimatedSprite(lappTextures["ArmF"][this.direction]);
  this.shadow = new PIXI.Sprite(lappTextures["Shadow"][this.direction]);
  this.shock = new PIXI.Sprite(lappTextures["Shock"][this.direction]);
  this.shock.visible = false;
  this.bubble = new PIXI.Sprite(lappTextures["Bubble"][this.direction][5]);
  this.bubble.visible = false;
  // 基本动画
  this.playNormal();
  // 与动画相关的其他属性
  this.legTexture; // 静止状态的腿部图片
  this.armbTexture; // 静止状态的胳膊图片
  this.armfTexture; // 静止状态的胳膊图片
  // 添加到Stage
  this.addToStage();
  // 计时器
  this.timer = 0;
  // 位置
  this.setCell(0, 0, 0);
  this.setPosition();
  console.log("Lappland Added");
}

/** 重置所有属性 */
Lappland.prototype.reset = function() {
  this.setDirection(SceneData.puzzle.lappInitDir); // 初始方向
  this.lastDirection = this.direction; // 上一次的朝向
  this.setCell(0, 0, 0);
  this.setPosition();
  this.playNormal();
  this.shock.visible = false;
  this.bubble.visible = false;
  this.timer = 0;
  console.log("Lappland Reset");
}

/** 强制改变绘制位置，偏移量为 dx, dy */
Lappland.prototype.setTempPosition = function(dx, dy) {
  let x = CameraX[this.direction] + dx;
  let y = CameraY + dy;
  this.hair.position.set(x, y);
  this.tail.position.set(x, y);
  this.ribbon.position.set(x, y);
  this.face.position.set(x, y);
  this.clothes.position.set(x, y);
  this.leg.position.set(x, y);
  this.armb.position.set(x, y);
  this.armf.position.set(x, y);
  this.shadow.position.set(x, y + LappShadowYBia);
  this.shock.position.set(x, y);
  let sign = (this.direction == 2 || this.direction == 1) ? (1) : (-1);
  this.bubble.position.set(x + sign * LappBubbleXBia, y + LappBubbleYBia);
}

/** 确定当前应该的绘制位置 */
Lappland.prototype.setPosition = function() {
  this.setTempPosition(0, 0);
}

/** 设置Cell位置 */
Lappland.prototype.setCell = function(x, y, z) {
  this.cellX = x;
  this.cellY = y;
  this.cellZ = z;
}

/** 设置方向 */
Lappland.prototype.setDirection = function(dir) {
  this.lastDirection = this.direction;
  this.direction = dir;
  this.hair.textures = lappTextures["Hair"][this.direction];
  this.tail.textures = lappTextures["Tail"][this.direction];
  this.ribbon.textures = lappTextures["Ribbon"][this.direction];
  this.face.textures = lappTextures["Face"][this.direction];
  this.clothes.texture = lappTextures["Clothes"][this.direction];
  this.leg.textures = lappTextures["Leg"][this.direction];
  this.armb.textures = lappTextures["ArmB"][this.direction];
  this.armf.textures = lappTextures["ArmF"][this.direction];
  this.shadow.texture = lappTextures["Shadow"][this.direction];
  this.shock.texture = lappTextures["Shock"][this.direction];
  this.bubble.texture = lappTextures["Bubble"][this.direction][5];
  this.playNormal();
}

/** 设置图层位置（当前所在的砖块的上一层） */
Lappland.prototype.setZIndex = function() {
  let blockIndex = foreground.detectOnBlock();
  if (blockIndex >= 0) {
    let blockZ = foreground.blocks[blockIndex].blockSprite.zIndex; // 当前所在砖块的图层
    this.shadow.zIndex = blockZ + 3;
    this.tail.zIndex = blockZ + 4;
    this.armb.zIndex = blockZ + 5;
    this.leg.zIndex = blockZ + 6;
    this.face.zIndex = blockZ + 7;
    this.clothes.zIndex = blockZ + 8;
    this.ribbon.zIndex = blockZ + 9;
    this.armf.zIndex = blockZ + 10;
    this.hair.zIndex = blockZ + 11;
    this.shock.zIndex = blockZ + 12;
    this.bubble.zIndex = blockZ + 13;
  }
}

/** 添加所有组件到Stage */
Lappland.prototype.addToStage = function() {
  this.shadow.alpha = 0.3;
  this.shadow.anchor.set(0.5);
  Stage.addChild(this.shadow);
  this.tail.anchor.set(0.5);
  Stage.addChild(this.tail);
  this.armb.anchor.set(0.5);
  Stage.addChild(this.armb);
  this.leg.anchor.set(0.5);
  Stage.addChild(this.leg);
  this.face.anchor.set(0.5);
  Stage.addChild(this.face);
  this.clothes.anchor.set(0.5);
  Stage.addChild(this.clothes);
  this.ribbon.anchor.set(0.5);
  Stage.addChild(this.ribbon);
  this.armf.anchor.set(0.5);
  Stage.addChild(this.armf);
  this.hair.anchor.set(0.5);
  Stage.addChild(this.hair);
  this.shock.anchor.set(0.5);
  Stage.addChild(this.shock);
  this.bubble.anchor.set(0.5);
  Stage.addChild(this.bubble);
}

/** 基本动画 */
Lappland.prototype.playNormal = function() {
  this.hair.loop = true;
  this.hair.animationSpeed = 0.09;
  this.hair.play();
  this.tail.loop = true;
  this.tail.animationSpeed = 0.09;
  this.tail.play();
  this.ribbon.loop = true;
  this.ribbon.animationSpeed = 0.09;
  this.ribbon.play();
}

/** 行走动画 -- 开始 */
Lappland.prototype.playWalk = function() {
  // 删除第一个元素
  this.legTexture = this.leg.textures.shift();
  this.armbTexture = this.armb.textures.shift();
  this.armfTexture = this.armf.textures.shift();
  // 开启动画
  this.leg.loop = true;
  this.leg.animationSpeed = 0.22;
  this.leg.play();
  this.armb.loop = true;
  this.armb.animationSpeed = 0.22;
  this.armb.play();
  this.armf.loop = true;
  this.armf.animationSpeed = 0.22;
  this.armf.play();
}

/** 行走动画 -- 停止 */
Lappland.prototype.stopWalk = function() {
  let frameNum = this.leg.textures.length;
  if (this.leg.currentFrame == frameNum - 1) { // 可以停止，并添加 0 号帧
    this.leg.textures.unshift(this.legTexture);
    this.armb.textures.unshift(this.armbTexture);
    this.armf.textures.unshift(this.armfTexture);
    this.leg.gotoAndStop(0);
    this.armb.gotoAndStop(0);
    this.armf.gotoAndStop(0);
    return true;
  } else { // 不能停止
    return false;
  }
}

/** 失足惊吓动画 */
Lappland.prototype.showShock = function() {
  // 归还行走缺失的帧
  this.leg.textures.unshift(this.legTexture);
  this.armb.textures.unshift(this.armbTexture);
  this.armf.textures.unshift(this.armfTexture);
  // 终止一切动画
  this.hair.stop();
  this.tail.stop();
  this.ribbon.stop();
  this.leg.stop();
  this.armb.stop();
  this.armf.stop();
  this.shock.visible = true;
  console.log("Lappland is Shocked");
}

/** 显示结果气泡动画 */
Lappland.prototype.showBubble = function(index) {
  this.bubble.texture = lappTextures["Bubble"][this.direction][index];
  this.bubble.visible = true;
  console.log("Show Bubble: " + bubbleImg[index]);
}

/** 刷新时的操作 */
Lappland.prototype.update = function() {
  // 眨眼动画
  this.timer += 1;
  if (this.timer >= 400) {
    this.timer %= 400;
    // 眨一次眼
    this.face.loop = false;
    this.face.animationSpeed = 0.18;
    this.face.gotoAndPlay(0);
  }
  // 确认Lappland图层
  if (!puzzle.isRunning) {
    if (foreground) this.setZIndex();
  }
}
