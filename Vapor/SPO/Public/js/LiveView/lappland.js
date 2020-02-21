var Lappland = function() {
  this.cellX; // 中心坐标（Float类型，以支持行走动画）
  this.cellY; // 中心坐标（Float类型，以支持行走动画）
  this.cellZ; // 中心坐标（Float类型，以支持行走动画）
  this.timer; // 摇摆动作计时器
  this.count; // 摇摆动作执行到第几帧（0/1/2/3/4/5）
  this.timerBlink; // 眨眼动作计时器
  this.countBlink; // 眨眼动作执行到第几帧（0/1/2）
  this.timerBreak; // 休息计时器
  this.timerWalk; // 行走动作计时器
  this.countWalk; // 行走动作执行到第几帧 (0/.../11)
  this.timerTurn; // 转向动作计时器
  this.timerLog; // 对话动作计时器
  this.hasToasted; // 对话是否已经弹出（为了控制只弹出一次）
  this.timerCollect; // 触摸宝石跳跃/等待动作计时器
  this.showBubble; // 是否显示表情气泡
  this.isShocked; // 是否震惊脸
  // 当前图片
  this.hairImg;
  this.ribbonImg;
  this.tailImg;
  this.faceImg;
  this.legImg;
  this.armbImg;
  this.armfImg;
  this.clothesImg;
  this.shadowImg;
  this.shockImg;
  this.bubbleImg;
}

Lappland.prototype.init = function() {
  this.cellX = LappInitCellX;
  this.cellY = LappInitCellY;
  this.cellZ = LappInitCellZ;
  this.timer = 0;
  this.count = 0;
  this.timerBlink = 0;
  this.countBlink = 0;
  this.timerBreak = 0;
  this.timerWalk = 0;
  this.countWalk = 12;
  this.timerTurn = 0;
  this.timerLog = 0;
  this.hasToasted = false;
  this.timerCollect = 0;
  this.showBubble = false;
  this.isShocked = false;
  // 当前图片 [L, R, R, L]，二维数组
  this.hairImg = [lLappHairImg, rLappHairImg, rLappHairImg, lLappHairImg];
  this.ribbonImg = [lLappRibbonImg, rLappRibbonImg, rLappRibbonImg, lLappRibbonImg];
  this.tailImg = [lLappTailImg, rLappTailImg, rLappTailImg, lLappTailImg];
  this.faceImg = [lLappFaceImg, rLappFaceImg, rLappFaceImg, lLappFaceImg];
  this.legImg = [lLappLegImg, rLappLegImg, rLappLegImg, lLappLegImg];
  this.armbImg = [lLappArmBImg, rLappArmBImg, rLappArmBImg, lLappArmBImg];
  this.armfImg = [lLappArmFImg, rLappArmFImg, rLappArmFImg, lLappArmFImg];
  this.clothesImg = [lLappClothesImg, rLappClothesImg, rLappClothesImg, lLappClothesImg];
  this.shadowImg = [lLappShadowImg, rLappShadowImg, rLappShadowImg, lLappShadowImg];
  this.shockImg = [lLappShockImg, rLappShockImg, rLappShockImg, lLappShockImg];
  this.bubbleImg = [lLappBubbleImg, rLappBubbleImg, rLappBubbleImg, lLappBubbleImg];
}

// 获取cell对应的像素X坐标
Lappland.prototype.getX = function() {
  return scene.lappInitX + this.cellX * CellXBia + this.cellY * CellYBiaX;
}

// 获取cell对应的像素Y坐标
Lappland.prototype.getY = function() {
  return scene.lappInitY + this.cellY * CellYBiaY + this.cellZ * CellZBia;
}

// 获取cell移位对应的像素X移位
Lappland.prototype.getDX = function(dcx, dcy) {
  return dcx * CellXBia + dcy * CellYBiaX;
}

// 获取cell移位对应的像素Y移位
Lappland.prototype.getDY = function(dcy, dcz) {
  return dcy * CellYBiaY + dcz * CellZBia;
}

// 休息
Lappland.prototype.break = function() {
  this.timerBreak += interval;
  console.log("- Breaking");
  if (this.timerBreak > actionManager.breakTime) {
    this.timerBreak = 0;
    actionManager.next();
  }
}

// 静止状态（摇摆/眨眼）
Lappland.prototype.normal = function() {
  // 摇摆动画
  this.timer += interval;
  if (this.timer > LappRockInterval) {
    this.count = (this.count + 1) % 6;
    this.timer %= LappRockInterval;
  }
  // 眨眼动画
  this.timerBlink += interval;
  if (this.timerBlink > LappBlinkInterval + this.countBlink * 100) {
    this.countBlink = (this.countBlink + 1) % 4;
    if (this.countBlink == 0) {
      this.timerBlink = 0;
    }
  }
}

// 行走动画
Lappland.prototype.walk = function() {
  this.timerWalk += interval;
  if (this.timerWalk > LappWalkInterval) {
    this.timerWalk %= LappWalkInterval;
    // 走完一步的处理
    if (this.countWalk == 11) { // 一个步伐的最后一帧
      console.log("- Steps Rest: " + actionManager.stepsRest + ", X: " + this.cellX + ", Y: " + this.cellY);
      // 剩余步数-1
      actionManager.stepsRest = (actionManager.stepsRest - 1 < 0) ? (0) : (actionManager.stepsRest - 1);
      // 若没有剩余步数了，判定当前行走动作执行完毕
      if (actionManager.stepsRest <= 0) {
        this.timerWalk = 0;
        this.countWalk = 12;
        actionManager.break();
        return;
      }
    }
    // 换帧
    if (this.countWalk == 12) { // 从静止的第一步
      this.countWalk %= 12;
    } else {
      this.countWalk = (this.countWalk + 1) % 12;
    }
    // 改位置
    let dcx = 0;
    let dcy = 0;
    switch (actionManager.direction) {
      case 0: dcx = -1/12; break; // Left
      case 1: dcy = -1/12; break;  // Up
      case 2: dcx = 1/12; break; // Right
      case 3: dcy = 1/12; break; // Down
      default: alert("lappland.js - draw(): No Direction !");
    }
    this.cellX += dcx;
    this.cellY += dcy;
    // 移动相机（相机追随Lappland）
    camera.move(this.getDX(dcx, dcy), this.getDY(dcy, 0));
  }
}

// 转向动画
Lappland.prototype.turn = function() {
  // 计数，转向时间
  this.timerTurn += 1;
  if (this.timerTurn <= LappTurnInterval) { // 正在转向
    if (actionManager.direction + actionManager.lastDirection != 3) { // 缓慢移动相机焦点
      if (actionManager.direction == 2 || actionManager.direction == 1) { // 移向左焦点
        camera.move(CameraLRSpace / LappTurnInterval, 0);
      } else { // 移向右焦点
        camera.move(-CameraLRSpace / LappTurnInterval, 0);
      }
    }
  } else { // 结束转向
    this.timerTurn = 0;
    camera.setX(); // 确认相机焦点
    actionManager.break();
  }
}

// 对话动画
Lappland.prototype.log = function() {
  this.timerLog += interval;
  // 弹出Toast（仅一次）
  if (!this.hasToasted) {
    let message = actionManager.message;
    toastReplaceRule(canvasBack.getBoundingClientRect().x, canvasBack.getBoundingClientRect().y, message.length);
    M.toast({html: message, displayLength: LappLogInterval, classes: "rounded my-toast"});
    this.hasToasted = true;
  }
  // 时间足够后结束对话
  if (this.timerLog > LappLogInterval) {
    this.timerLog = 0;
    this.hasToasted = false;
    actionManager.break();
  }
}

// 获取钻石动画
Lappland.prototype.collect = function() {
  this.timerCollect += 1;
  if (this.timerCollect > LappJumpInterval * 2) { // 结束跳跃
    actionManager.break(CollectShrinkInterval + CollectGetInterval);
    lappland.timerCollect = 0;
  } else if (this.timerCollect > LappJumpInterval) { // timer: LappJumpInterval+1 ~ .. * 2
    // 开始下降
    this.cellZ -= LappJumpZA * (this.timerCollect - LappJumpInterval - 1) / LappJumpInterval;
    if (this.timerCollect == LappJumpInterval * 2) { // 落地了，把cellZ置为整数以免误差的叠加
      this.cellZ = Math.round(this.cellZ);
    }
  } else { // timer: 1 ~ LappJumpInterval
    // 开始跳起
    this.cellZ += LappJumpZA * (LappJumpInterval - this.timerCollect) / LappJumpInterval;
  }
}

//绘制Lappland
Lappland.prototype.draw = function() {
  // 普通动画
  this.normal();
  // 行走动画
  if (actionManager.isActing && actionManager.current == ActionType.GO) { // 正在行走
    this.walk();
  }
  // 转向动画
  if (actionManager.isActing && actionManager.current == ActionType.TURN) {
    this.turn();
  }
  // 对话动画
  if (actionManager.isActing && actionManager.current == ActionType.LOG) {
    this.log();
  }
  // 获取钻石动画（接foreground.js的drawDiamond）
  if (actionManager.isActing && actionManager.current == ActionType.COLLECT) {
    this.collect();
  }
  // 是否休息中（必须在最后处理，因为next）
  if (puzzleStatus.isRunning && !actionManager.isActing) {
    this.break();
  }
  // 绘制开始
  ctxtLB.save();
  ctxtLM.save();
  ctxtLC.save();
  ctxtLF.save();
  ctxtS.save();
  // 绘制原点设为(x, y)
  let ox = this.getX() - LappWidth / 2 - camera.x;
  let oy = this.getY() - LappHeight / 2 - camera.y;
  ctxtLB.translate(ox, oy);
  ctxtLM.translate(ox, oy);
  ctxtLC.translate(ox, oy);
  ctxtLF.translate(ox, oy);
  ctxtS.translate(ox, oy);
  // 摇摆动画: Tail (ctxtLB), Hair/Ribbon (ctxtLF)
  ctxtLB.drawImage(this.tailImg[actionManager.direction][this.count], 0, 0, LappWidth, LappHeight);
  ctxtLF.drawImage(this.hairImg[actionManager.direction][this.count], 0, 0, LappWidth, LappHeight);
  ctxtLF.drawImage(this.ribbonImg[actionManager.direction][this.count], 0, 0, LappWidth, LappHeight);
  // 眨眼动画: Face (ctxtLM)
  ctxtLM.drawImage(this.faceImg[actionManager.direction][this.countBlink], 0, 0, LappWidth, LappHeight);
  // 行走动画: Leg (ctxtLM), ArmB (ctxtLB), ArmF (ctxtLF)
  ctxtLM.drawImage(this.legImg[actionManager.direction][this.countWalk], 0, 0, LappWidth, LappHeight);
  ctxtLB.drawImage(this.armbImg[actionManager.direction][this.countWalk], 0, 0, LappWidth, LappHeight);
  ctxtLF.drawImage(this.armfImg[actionManager.direction][this.countWalk], 0, 0, LappWidth, LappHeight);
  // 无动画: Clothes (ctxtLC)
  ctxtLC.drawImage(this.clothesImg[actionManager.direction], 0, 0, LappWidth, LappHeight);
  // 无动画: Shadow (ctxtI)
  ctxtS.globalAlpha = 0.3;
  ctxtS.drawImage(this.shadowImg[actionManager.direction], 0, LappShadowYBia - this.cellZ * CellZBia, LappWidth, LappHeight);
  // 表情气泡
  if (this.showBubble) {
    let sign = (actionManager.direction == 2 || actionManager.direction == 1) ? (1) : (-1);
    ctxtLF.drawImage(this.bubbleImg[actionManager.direction][puzzleStatus.reason], sign * LappBubbleXBia, LappBubbleYBia, LappBubbleWidth, LappBubbleHeight);
  }
  // 震惊脸
  if (this.isShocked) {
    ctxtLF.drawImage(this.shockImg[actionManager.direction], 0, 0, LappWidth, LappHeight);
  }
  // 绘制结束
  ctxtLB.restore();
  ctxtLM.restore();
  ctxtLC.restore();
  ctxtLF.restore();
  ctxtS.restore();
}
