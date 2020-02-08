var Lappland = function() {
  this.x;
  this.y;
  this.timer; // 摇摆动作计时器
  this.count; // 摇摆动作执行到第几帧（0/1/2/3/4/5）
  this.timerBlink; // 眨眼动作计时器
  this.countBlink; // 眨眼动作执行到第几帧（0/1/2）
}

Lappland.prototype.init = function() {
  this.x = canvasWidth / 2;
  this.y = canvasHeight / 2;
  this.timer = 0;
  this.count = 0;
  this.timerBlink = 0;
  this.countBlink = 0;
}

Lappland.prototype.draw = function() {
  // 计时换帧
  this.timer += interval;
  this.timerBlink += interval;
  // 摇摆动画
  if (this.timer > LappRockInterval) {
    this.count = (this.count + 1) % 6;
    this.timer %= LappRockInterval;
  }
  // 眨眼动画
  if (this.timerBlink > LappBlinkInterval + this.countBlink * 100) {
    this.countBlink = (this.countBlink + 1) % 4;
    if (this.countBlink == 0) {
      this.timerBlink = 0;
    }
  }
  // 绘制开始
  ctxtLB.save();
  ctxtLM.save();
  ctxtLC.save();
  ctxtLF.save();
  // 原点设为(x, y)
  ctxtLB.translate(this.x - lappWidth / 2, this.y - lappHeight / 2);
  ctxtLM.translate(this.x - lappWidth / 2, this.y - lappHeight / 2);
  ctxtLC.translate(this.x - lappWidth / 2, this.y - lappHeight / 2);
  ctxtLF.translate(this.x - lappWidth / 2, this.y - lappHeight / 2);
  // Tail (ctxtLB) (摇摆动画)
  ctxtLB.drawImage(rLappTailImg[this.count], 0, 0, lappWidth, lappHeight);
  // Hair/Ribbon (ctxtLF) (摇摆动画)
  ctxtLF.drawImage(rLappHairImg[this.count], 0, 0, lappWidth, lappHeight);
  ctxtLF.drawImage(rLappRibbonImg[this.count], 0, 0, lappWidth, lappHeight);
  // Face (ctxtLM) (眨眼动画)
  ctxtLM.drawImage(rLappFaceImg[this.countBlink], 0, 0, lappWidth, lappHeight);
  // ArmB (ctxtLB)
  ctxtLB.drawImage(rLappArmBnImg, 0, 0, lappWidth, lappHeight);
  // Leg (ctxtLM)
  ctxtLM.drawImage(rLappLegImg[0], 0, 0, lappWidth, lappHeight);
  // Clothes (ctxtLC)
  ctxtLC.drawImage(rLappClothesImg, 0, 0, lappWidth, lappHeight);
  // ArmF (ctxtLF)
  ctxtLF.drawImage(rLappArmFnImg, 0, 0, lappWidth, lappHeight);
  // 绘制结束
  ctxtLB.restore();
  ctxtLM.restore();
  ctxtLC.restore();
  ctxtLF.restore();
}
