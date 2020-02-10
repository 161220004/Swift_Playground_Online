var Block = function(bx, by) {
  this.type = "Normal"; // 地砖种类，决定放哪个图片
  this.x = bx;
  this.y = by;
  this.img = blockNormalImg;
}

Block.prototype.draw = function() {
  ctxtF.save();
  ctxtF.translate(this.x - blockWidth / 2 - camera.x, this.y - blockHeight / 2 - camera.y);
  ctxtF.drawImage(this.img, 0, blockYBia, blockWidth, blockHeight);
  ctxtF.restore();
}
