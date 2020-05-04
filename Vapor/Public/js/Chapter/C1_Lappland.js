function C1Lappland() {
  this.direction = 2; // 向右
  this.hair = new PIXI.AnimatedSprite(lappTextures["Hair"][this.direction]);
  this.tail = new PIXI.AnimatedSprite(lappTextures["Tail"][this.direction]);
  this.ribbon = new PIXI.AnimatedSprite(lappTextures["Ribbon"][this.direction]);
  this.face = new PIXI.AnimatedSprite(lappTextures["Face"][this.direction]);
  this.clothes = new PIXI.Sprite(lappTextures["Clothes"][this.direction]);
  this.leg = new PIXI.AnimatedSprite(lappTextures["Leg"][this.direction]);
  this.armb = new PIXI.AnimatedSprite(lappTextures["ArmB"][this.direction]);
  this.armf = new PIXI.AnimatedSprite(lappTextures["ArmF"][this.direction]);
  this.shadow = new PIXI.Sprite(lappTextures["Shadow"][this.direction]);
  this.background = new PIXI.TilingSprite(backgroundTexture, C1CanvasWidth, C1CanvasHeight);
  this.playNormal(); // 动画
  this.addToStage(); // 添加到Stage
  this.setTempPosition(C1CanvasWidth / 2, C1CanvasHeight / 2); // 位置
}

/** 强制改变绘制位置，偏移量为 dx, dy */
C1Lappland.prototype.setTempPosition = function(x, y) {
  this.hair.position.set(x, y);
  this.tail.position.set(x, y);
  this.ribbon.position.set(x, y);
  this.face.position.set(x, y);
  this.clothes.position.set(x, y);
  this.leg.position.set(x, y);
  this.armb.position.set(x, y);
  this.armf.position.set(x, y);
  this.shadow.position.set(x, y + LappShadowYBia);
  this.background.tilePosition.set(0, -375);
}

/** 添加所有组件到Stage */
C1Lappland.prototype.addToStage = function() {
  this.shadow.alpha = 0.3;
  this.shadow.zIndex = 100;
  this.shadow.anchor.set(0.5);
  Stage.addChild(this.shadow);
  this.tail.zIndex = 101;
  this.tail.anchor.set(0.5);
  Stage.addChild(this.tail);
  this.armb.zIndex = 102;
  this.armb.anchor.set(0.5);
  Stage.addChild(this.armb);
  this.leg.zIndex = 103;
  this.leg.anchor.set(0.5);
  Stage.addChild(this.leg);
  this.face.zIndex = 104;
  this.face.anchor.set(0.5);
  Stage.addChild(this.face);
  this.clothes.zIndex = 105;
  this.clothes.anchor.set(0.5);
  Stage.addChild(this.clothes);
  this.ribbon.zIndex = 106;
  this.ribbon.anchor.set(0.5);
  Stage.addChild(this.ribbon);
  this.armf.zIndex = 107;
  this.armf.anchor.set(0.5);
  Stage.addChild(this.armf);
  this.hair.zIndex = 108;
  this.hair.anchor.set(0.5);
  Stage.addChild(this.hair);
  this.background.zIndex = 0;
  Stage.addChild(this.background);
}

/** 动画 */
C1Lappland.prototype.playNormal = function() {
  this.hair.loop = true;
  this.hair.animationSpeed = 0.09;
  this.hair.play();
  this.tail.loop = true;
  this.tail.animationSpeed = 0.09;
  this.tail.play();
  this.ribbon.loop = true;
  this.ribbon.animationSpeed = 0.09;
  this.ribbon.play();
  // 删除第一个元素
  this.leg.textures.shift();
  this.armb.textures.shift();
  this.armf.textures.shift();
  // 开启动画
  this.leg.loop = true;
  this.leg.animationSpeed = 0.18;
  this.leg.play();
  this.armb.loop = true;
  this.armb.animationSpeed = 0.18;
  this.armb.play();
  this.armf.loop = true;
  this.armf.animationSpeed = 0.18;
  this.armf.play();
}

C1Lappland.prototype.update = function() {
  this.background.tilePosition.x -= 1;
}
