/** Background 类，使用 Pixi 的 TilingSprite
 * @constructor
 */
function Background() {
  this.sprite = [];
  // 最底部大背景/中部流动背景/顶部流动背景
  for (let i = 0; i < 3; i++) {
    this.sprite[i] = new PIXI.TilingSprite(backgroundTextures[i], CanvasWidth, CanvasHeight);
    this.sprite[i].zIndex = i;
  	this.sprite[i].tilePosition.set(SceneData.puzzle.backInitX, SceneData.puzzle.backInitY);
    Stage.addChild(this.sprite[i]);
  }
  console.log("Background Added");
}

/** 重置 */
Background.prototype.reset = function() {
  this.sprite[0].tilePosition.set(SceneData.puzzle.backInitX, SceneData.puzzle.backInitY);
  console.log("Background Reset");
}

/** 绘制 */
Background.prototype.update = function() {
  // 底层随着Lappland按一定比例移动
  let tileX = (-1) * BackCellBia * (lappland.cellX + 0.4 * lappland.cellY);
  this.sprite[0].tilePosition.set(tileX, 0);
  // 中层和顶层按固定速率移动
  for (let i = 1; i < 3; i++) {
    this.sprite[i].tilePosition.x += BackgroundSpeed[BackID][i][0];
    this.sprite[i].tilePosition.y += BackgroundSpeed[BackID][i][1];
  }
};
