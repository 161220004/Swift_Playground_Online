var Lappland = function() {
  this.x; // 中心坐标
  this.y; // 中心坐标
  this.timer; // 摇摆动作计时器
  this.count; // 摇摆动作执行到第几帧（0/1/2/3/4/5）
  this.timerBlink; // 眨眼动作计时器
  this.countBlink; // 眨眼动作执行到第几帧（0/1/2）
  this.timerWalk; // 行走动作计时器
  this.countWalk; // 行走动作执行到第几帧 (0/.../11)
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
  this.timerWalk = 0;
  this.countWalk = 0;
  this.setImageR();
  // 调整Camera
  camera.setY();
  if (lappInitDirection == 0) { // Left
      camera.setXR();
  } else { // Right ...
    camera.setXL();
  }
}

Lappland.prototype.draw = function() {
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
  } else if (isRunning && (currentDirection == 0 || currentDirection == 2)
             && actions[actionCount].type == ActionType.GO) { // 正在行走
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
            actions[actionCount].finish();
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
        dx = LappPaceWidth;
      } else if (currentDirection == 0) { // Left
        dx = -LappPaceWidth;
      } else {
        alert("lappland.js - draw(): No Direction !");
      }
      this.x += dx;
      this.y += dy;
      // 移动相机（相机追随Lappland）
      camera.move(dx, dy);
    }
  }
  // 根据左右选择图片并调整相机
  if (currentDirection == 2) { // Right
    this.setImageR();
    camera.setXL();
  } else if (currentDirection == 0) { // Left
    this.setImageL();
    camera.setXR();
  } else {
    alert("lappland.js - draw(): No Direction !");
  }
  // 绘制开始
  ctxtLB.save();
  ctxtLM.save();
  ctxtLC.save();
  ctxtLF.save();
  ctxtS.save();
  // 原点设为(x, y)
  var ox = this.x - lappWidth / 2 - camera.x;
  var oy = this.y - lappHeight / 2 - camera.y;
  ctxtLB.translate(ox, oy);
  ctxtLM.translate(ox, oy);
  ctxtLC.translate(ox, oy);
  ctxtLF.translate(ox, oy);
  ctxtS.translate(ox, oy);
  // 摇摆动画: Tail (ctxtLB), Hair/Ribbon (ctxtLF)
  ctxtLB.drawImage(this.tailImg[this.count], 0, 0, lappWidth, lappHeight);
  ctxtLF.drawImage(this.hairImg[this.count], 0, 0, lappWidth, lappHeight);
  ctxtLF.drawImage(this.ribbonImg[this.count], 0, 0, lappWidth, lappHeight);
  // 眨眼动画: Face (ctxtLM)
  ctxtLM.drawImage(this.faceImg[this.countBlink], 0, 0, lappWidth, lappHeight);
  // 行走动画: Leg (ctxtLM), ArmB (ctxtLB), ArmF (ctxtLF)
  if (stepsRest > 0 && (currentDirection == 0 || currentDirection == 2)
      && actions[actionCount].type == ActionType.GO) { // 正在行走
    ctxtLM.drawImage(this.legImg[this.countWalk], 0, 0, lappWidth, lappHeight);
    ctxtLB.drawImage(this.armbImg[this.countWalk], 0, 0, lappWidth, lappHeight);
    ctxtLF.drawImage(this.armfImg[this.countWalk], 0, 0, lappWidth, lappHeight);
  } else {
    ctxtLM.drawImage(this.legnImg, 0, 0, lappWidth, lappHeight);
    ctxtLB.drawImage(this.armbnImg, 0, 0, lappWidth, lappHeight);
    ctxtLF.drawImage(this.armfnImg, 0, 0, lappWidth, lappHeight);
  }
  // 无动画: Clothes (ctxtLC)
  ctxtLC.drawImage(this.clothesImg, 0, 0, lappWidth, lappHeight);
  // 无动画: Shadow (ctxtI)
  ctxtS.globalAlpha = 0.3;
  ctxtS.drawImage(this.shadowImg, 0, lappShadowYBia, lappWidth, lappHeight);
  // 绘制结束
  ctxtLB.restore();
  ctxtLM.restore();
  ctxtLC.restore();
  ctxtLF.restore();
  ctxtS.restore();
}
