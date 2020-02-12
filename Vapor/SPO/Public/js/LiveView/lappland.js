var Lappland = function() {
  this.x; // 中心坐标
  this.y; // 中心坐标
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
  // 当前图片
  this.hairImg;
  this.ribbonImg;
  this.tailImg;
  this.faceImg;
  this.legnImg;
  this.legImg;
  this.armbnImg;
  this.armbImg;
  this.armfnImg;
  this.armfImg;
  this.clothesImg;
  this.shadowImg;
}

Lappland.prototype.setImageR = function() {
  this.hairImg = rLappHairImg;
  this.ribbonImg = rLappRibbonImg;
  this.tailImg = rLappTailImg;
  this.faceImg = rLappFaceImg;
  this.legnImg = rLappLegnImg;
  this.legImg = rLappLegImg;
  this.armbnImg = rLappArmBnImg;
  this.armbImg = rLappArmBImg;
  this.armfnImg = rLappArmFnImg;
  this.armfImg = rLappArmFImg;
  this.clothesImg = rLappClothesImg;
  this.shadowImg = rLappShadowImg;
}

Lappland.prototype.setImageL = function() {
  this.hairImg = lLappHairImg;
  this.ribbonImg = lLappRibbonImg;
  this.tailImg = lLappTailImg;
  this.faceImg = lLappFaceImg;
  this.legnImg = lLappLegnImg;
  this.legImg = lLappLegImg;
  this.armbnImg = lLappArmBnImg;
  this.armbImg = lLappArmBImg;
  this.armfnImg = lLappArmFnImg;
  this.armfImg = lLappArmFImg;
  this.clothesImg = lLappClothesImg;
  this.shadowImg = lLappShadowImg;
}

Lappland.prototype.init = function() {
  this.x = lappInitX;
  this.y = lappInitY;
  this.timer = 0;
  this.count = 0;
  this.timerBlink = 0;
  this.countBlink = 0;
  this.timerBreak = 0;
  this.timerWalk = 0;
  this.countWalk = 0;
  this.timerTurn = 0;
  this.timerLog = 0;
  this.hasToasted = false;
  // 调整Lappland方向以及Camera
  camera.setY();
  if (lappInitDir == 0 || lappInitDir == 3) { // Left, Down
    camera.setXR();
    this.setImageL();
  } else if (currentDirection == 2 || currentDirection == 1) { // Right, Up
    camera.setXL();
    this.setImageR();
  } else {
    alert("lappland.js - init(): No Direction !");
  }
}

Lappland.prototype.draw = function() {
  // 是否休息中
  if (isRunning && actions[actionCount].isFinished) {
    this.timerBreak += interval;
    console.log("- Zzz...");
    if (this.timerBreak > BreakInterval) {
      actions[actionCount].next();
      this.timerBreak = 0;
    }
  }
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
  // 行走动画
  if (stepsRest <= 0) { // 停止行走
    this.timerWalk = 0; // 重置行走计时器
  } else if (isRunning && !actions[actionCount].isFinished && actions[actionCount].type == ActionType.GO) { // 正在行走
    this.timerWalk += interval;
    if (this.timerWalk > LappWalkInterval) {
      // 走完一步的处理
      if (this.countWalk == 11) { // 一个步伐的最后一帧
        console.log("- Steps Rest: " + stepsRest + ", X: " + this.x + ", Y: " + this.y);
        // 剩余步数-1
        stepsRest = (stepsRest - 1 < 0) ? (0) : (stepsRest - 1);
        // 若没有剩余步数了，判定当前行走动作执行完毕
        if (stepsRest <= 0) {
          if (actions[actionCount].type == ActionType.GO) {
            actions[actionCount].break();
          }
      }
      }
      // 换帧
      this.countWalk = (this.countWalk + 1) % 12;
      this.timerWalk %= LappWalkInterval;
      // 改位置
      var dx = 0;
      var dy = 0;
      if (currentDirection == 2) { // Right
        dx = LappPaceXBia;
      } else if (currentDirection == 0) { // Left
        dx = -LappPaceXBia;
      } else if (currentDirection == 1) { // Up
        dx = -LappPaceYBiaX;
        dy = -LappPaceYBiaY;
      } else if (currentDirection == 3) { // Down
        dx = LappPaceYBiaX;
        dy = LappPaceYBiaY;
      } else {
        alert("lappland.js - draw(): No Direction !");
      }
      this.x += dx;
      this.y += dy;
      // 移动相机（相机追随Lappland）
      camera.move(dx, dy);
    }
  }
  // 转向动画
  if (isRunning && !actions[actionCount].isFinished && actions[actionCount].type == ActionType.TURN) {
    // 计数，转向时间
    this.timerTurn += 1;
    // 立刻根据方向换Lappland左右图片
    if (this.timerTurn < 3) { // 为减少此段代码执行次数所作的尝试
      if (currentDirection == 2 || currentDirection == 1) { // Right, Up
        this.setImageR();
      } else if (currentDirection == 0 || currentDirection == 3) { // Left, Down
        this.setImageL();
      } else {
        alert("lappland.js - draw(): No Direction !");
      }
    }
    if (this.timerTurn <= LappTurnInterval) { // 正在转向
      if (currentDirection + lastDirection != 3) { // 缓慢移动相机焦点
        if (currentDirection == 2 || currentDirection == 1) { // 移向左焦点
          camera.move(CameraLRSpace / LappTurnInterval, 0);
        } else { // 移向右焦点
          camera.move(-CameraLRSpace / LappTurnInterval, 0);
        }
      }
    } else { // 结束转向
      this.timerTurn = 0;
      // 确认相机焦点
      if (currentDirection == 2 || currentDirection == 1) {
        camera.setXL();
      } else { // 移向右焦点
        camera.setXR();
      }
      actions[actionCount].break();
    }
  }
  // 对话动画
  if (isRunning && !actions[actionCount].isFinished && actions[actionCount].type == ActionType.LOG) {
    this.timerLog += interval;
    // 弹出Toast（仅一次）
    if (!this.hasToasted) {
      let message = actions[actionCount].log;
      toastReplaceRule(canvasBack.getBoundingClientRect().x, canvasBack.getBoundingClientRect().y, message.length);
      M.toast({html: message, displayLength: LappLogInterval, classes: "rounded my-toast"});
      this.hasToasted = true;
    }
    // 时间足够后结束对话
    if (this.timerLog > LappLogInterval) {
      this.timerLog = 0;
      this.hasToasted = false;
      actions[actionCount].break();
    }
  }
  // 绘制开始
  ctxtLB.save();
  ctxtLM.save();
  ctxtLC.save();
  ctxtLF.save();
  ctxtS.save();
  // 原点设为(x, y)
  var ox = this.x - LappWidth / 2 - camera.x;
  var oy = this.y - LappHeight / 2 - camera.y;
  ctxtLB.translate(ox, oy);
  ctxtLM.translate(ox, oy);
  ctxtLC.translate(ox, oy);
  ctxtLF.translate(ox, oy);
  ctxtS.translate(ox, oy);
  // 摇摆动画: Tail (ctxtLB), Hair/Ribbon (ctxtLF)
  ctxtLB.drawImage(this.tailImg[this.count], 0, 0, LappWidth, LappHeight);
  ctxtLF.drawImage(this.hairImg[this.count], 0, 0, LappWidth, LappHeight);
  ctxtLF.drawImage(this.ribbonImg[this.count], 0, 0, LappWidth, LappHeight);
  // 眨眼动画: Face (ctxtLM)
  ctxtLM.drawImage(this.faceImg[this.countBlink], 0, 0, LappWidth, LappHeight);
  // 行走动画: Leg (ctxtLM), ArmB (ctxtLB), ArmF (ctxtLF)
  if (stepsRest > 0 && isRunning && !actions[actionCount].isFinished && actions[actionCount].type == ActionType.GO) { // 正在行走
    ctxtLM.drawImage(this.legImg[this.countWalk], 0, 0, LappWidth, LappHeight);
    ctxtLB.drawImage(this.armbImg[this.countWalk], 0, 0, LappWidth, LappHeight);
    ctxtLF.drawImage(this.armfImg[this.countWalk], 0, 0, LappWidth, LappHeight);
  } else {
    ctxtLM.drawImage(this.legnImg, 0, 0, LappWidth, LappHeight);
    ctxtLB.drawImage(this.armbnImg, 0, 0, LappWidth, LappHeight);
    ctxtLF.drawImage(this.armfnImg, 0, 0, LappWidth, LappHeight);
  }
  // 无动画: Clothes (ctxtLC)
  ctxtLC.drawImage(this.clothesImg, 0, 0, LappWidth, LappHeight);
  // 无动画: Shadow (ctxtI)
  ctxtS.globalAlpha = 0.3;
  ctxtS.drawImage(this.shadowImg, 0, LappShadowYBia, LappWidth, LappHeight);
  // 绘制结束
  ctxtLB.restore();
  ctxtLM.restore();
  ctxtLC.restore();
  ctxtLF.restore();
  ctxtS.restore();
}
