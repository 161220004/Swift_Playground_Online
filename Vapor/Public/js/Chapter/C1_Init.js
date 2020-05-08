$(function(){ // document ready
  initView();
  gameloop();
});

// PIXI - Stage & Renderer
var Stage;
var Renderer;

// Canvas - Pixi
const C1CanvasPixi = $("#c1_canvas_pixi")[0];
const C1CtxtP = C1CanvasPixi.getContext('2d');
// Canvas - 尺寸
const C1CanvasWidth = C1CanvasPixi.width;
const C1CanvasHeight = C1CanvasPixi.height;

// Lappland原始尺寸与位移
const LappWidth = 84;
const LappHeight = 108;
const LappShadowYBia = 5; // 影子偏移

/** 初始化Pixi的Stage和Renderer */
function initView() {
  Stage = new PIXI.Container();
  Stage.sortableChildren = true; // 所有对象可排列上下关系
  Renderer = PIXI.autoDetectRenderer({width: C1CanvasWidth, height: C1CanvasHeight, view: C1CanvasPixi});
}

/** 循环刷新 */
function gameloop() {
  Stage.sortChildren();
  if (c1lappland) c1lappland.update();
	Renderer.render(Stage);
  requestAnimationFrame(gameloop);
};
