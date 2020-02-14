var Camera = function() {
  this.x = 0;
  this.y = 0;
}

// 获取相机X坐标，使得Lappland在左侧黄金分割点
Camera.prototype.setXL = function() {
  this.x = lappland.getX() - canvasWidth * 0.382;
}
// 获取相机X坐标，使得Lappland在右侧黄金分割点
Camera.prototype.setXR = function() {
  this.x = lappland.getX() - canvasWidth * 0.618;
}
// 获取相机Y坐标，使得Lappland在黄金分割点
Camera.prototype.setY = function() {
  this.y = lappland.getY() - canvasHeight * 0.618;
}

// 移动相机
Camera.prototype.move = function(dx, dy) {
  this.x += dx;
  this.y += dy;
}
