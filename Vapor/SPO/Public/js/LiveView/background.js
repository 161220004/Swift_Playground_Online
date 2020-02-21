function drawBackground() {
  let backgroundWidth = backgroundImg.width;
  let backgroundHeight = backgroundImg.height;
  ctxtB.save();
  ctxtB.translate(backInitX - camera.x, backInitY - camera.y);
  ctxtB.drawImage(backgroundImg, 0, 0);
  // 若背景图片不够大，补一张
  let needRight = (backInitX - camera.x + backgroundWidth < canvasWidth); // 右侧需要补
  let needLeft = (backInitX - camera.x > 0); // 左侧需要补
  let needUp = (backInitY - camera.y > 0); // 上面需要补
  let needDown = (backInitY - camera.y + backgroundHeight < canvasHeight); // 下面需要补
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
