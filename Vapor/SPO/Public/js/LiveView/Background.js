/** Background 类，使用 Pixi 的 TilingSprite
 * @constructor
 */
function Background() {
  this.sprite = new PIXI.TilingSprite(backgroundTexture, CanvasWidth, CanvasHeight);
  this.sprite.zIndex = 0; // 最底部
	this.sprite.tilePosition.x = SceneData.puzzle.backInitX;
	this.sprite.tilePosition.y = SceneData.puzzle.backInitY;
  Stage.addChild(this.sprite);
  console.log("Background Added");
}

/** 重置 */
Background.prototype.reset = function() {
	this.sprite.tilePosition.x = SceneData.puzzle.backInitX;
	this.sprite.tilePosition.y = SceneData.puzzle.backInitY;
  console.log("Background Reset");
}

/** 绘制 */
Background.prototype.update = function() {
  // this.sprite.tilePosition.x -= 0.64;
  // this.sprite.tilePosition.y -= 0.32;
};
