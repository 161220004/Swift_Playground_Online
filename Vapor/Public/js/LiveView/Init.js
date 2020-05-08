$(function(){ // document ready
  initView();
  // 开启循环
  gameloop();
});

// PIXI - Stage & Renderer
var Stage;
var Renderer;

// 后端数据
var SceneData;

// Puzzle状态
var puzzle;

// Puzzle 地图
var puzzleMap;

/** 初始化Pixi的Stage和Renderer */
function initView() {
  Stage = new PIXI.Container();
  Stage.sortableChildren = true; // 所有对象可排列上下关系
  Renderer = PIXI.autoDetectRenderer({width: CanvasWidth, height: CanvasHeight, view: CanvasPixi});
  console.log("LiveView Already Inited");
  // 添加 Sprite 则需要在所有图片加载成功后进行
}

/** 每当用户代码运行，重置LiveView */
function resetLiveView() {
  // 重置当前Puzzle状态
  puzzle.reset();
  // 重置 Sprite
  lappland.reset();
  foreground.reset();
  background.reset();
  // 重置动作指挥
  conductor.reset();
}

/** 循环刷新 */
function gameloop() {
  Stage.sortChildren();
  if (lappland) lappland.update();
  if (foreground) foreground.update();
  if (background) background.update();
  if (puzzleMap) puzzleMap.update();
  if (puzzle) {
    puzzle.judgeResult();
    puzzle.showResult();
  }
	Renderer.render(Stage);
  requestAnimationFrame(gameloop);
};
