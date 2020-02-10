function drawBackground() {
  ctxtB.save();
  ctxtB.drawImage(backgroundImg, -camera.x, -camera.y);
  ctxtB.restore();
}
