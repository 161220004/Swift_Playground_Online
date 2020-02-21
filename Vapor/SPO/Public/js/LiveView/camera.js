var Camera = function() {
  this.x = 0;
  this.y = 0;
  this.setY();
  this.setX();
}

// 获取相机X坐标，使得Lappland在黄金分割点
Camera.prototype.setX = function() {
  if (actionManager.direction == 0 || actionManager.direction == 3) { // Left, Down
    this.x = lappland.getX() - canvasWidth * 0.618;
  } else if (actionManager.direction == 2 || actionManager.direction == 1) { // Right, Up
    this.x = lappland.getX() - canvasWidth * 0.382;
  } else {
    alert("camera.js - setX(): No Direction !");
  }
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
