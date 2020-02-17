// 当前URL路径部分
let urlPath = window.location.pathname;
// 当前Puzzle序号（从URL中取得）
let pid = (function() {
  var val = urlPath.replace(/[^0-9]/ig, "");
  console.log("URL_PATH: " + urlPath + ", pid = " + val);
  return val;
})();

// Canvas循环计数
var loopCount;
// 上次记录的时间
var lastStamp;
// 两帧间隔时间
var interval;

// Canvas/Context
// Canvas - 背景
let canvasBack = $("#canvas_back")[0];
let ctxtB = canvasBack.getContext('2d');
// Canvas - 前景（地砖等）
let canvasFore = $("#canvas_fore")[0];
let ctxtF = canvasFore.getContext('2d');
// Canvas - 物品（宝石等）
let canvasItem = $("#canvas_item")[0];
let ctxtI = canvasItem.getContext('2d');
// Canvas - Lappland's Shadow
let canvasShadow = $("#canvas_L_s")[0];
let ctxtS = canvasShadow.getContext('2d');
// Canvas - Lappland's Tail/ArmB
let canvasLappB = $("#canvas_L_b")[0];
let ctxtLB = canvasLappB.getContext('2d');
// Canvas - Lappland's Face/Leg
let canvasLappM = $("#canvas_L_m")[0];
let ctxtLM = canvasLappM.getContext('2d');
// Canvas - Lappland's Clothes
let canvasLappC = $("#canvas_L_c")[0];
let ctxtLC = canvasLappC.getContext('2d');
// Canvas - Lappland's Hair/Ribbon/ArmF
let canvasLappF = $("#canvas_L_f")[0];
let ctxtLF = canvasLappF.getContext('2d');
// Canvas - 幕布Curtain
let canvasCtn = $("#canvas_ctn")[0];
let ctxtCtn = canvasCtn.getContext('2d');
// Canvas - 通关信息
let canvasMsg = $("#canvas_msg")[0];
let ctxtMsg = canvasMsg.getContext('2d');

// Canvas - 尺寸
let canvasWidth = canvasBack.width;
let canvasWidthAdd = canvasMsg.width;
let canvasHeight = canvasBack.height;

// 对象
var puzzleStatus;
var puzzleMsg;
var camera;
var lappland;

// Cell尺寸与偏移
let CellXBia = 108; // Cell在X方向右移1，像素在X方向右移108
let CellYBiaX = -42; // Cell在Y方向下移1，像素在X方向左移42
let CellYBiaY = 48; // Cell在Y方向下移1，像素在Y方向下移48
let CellZBia = 108; // Cell在Z方向下移1，像素在Y方向下移108

// Lappland原始尺寸与位移
let LappWidth = 84;
let LappHeight = 108;
let LappShadowYBia = 5; // 影子偏移
let LappJumpZA = -0.035; // 跳跃初速度（Cell）
let LappBubbleXBia = 50; // 表情气泡X偏移
let LappBubbleYBia = -70; // 表情气泡Y偏移
let LappBubbleWidth = 55; // 表情气泡大小
let LappBubbleHeight = 50; // 表情气泡大小

// 加载中动画跳跃偏移
let LoadingJumpY = -10;

// 地砖尺寸与偏移
let BlockWidth = 130;
let BlockHeight = 72;
let BlockYBia = 67;

// 钻石尺寸与偏移
let DiamondSize = 54;
let DiamondYBia = -108;

// Puzzle信息栏的钻石尺寸与偏移
let MiniDiamondSize = 16.2;
let MiniDiamondX = 482; // 基础偏移（左上）
let MiniDiamondY = 6; // 基础偏移（左上）
let MiniDiamondSpace = 18; // Y方向间距

// 对话框尺寸与偏移
let ToastMaxWidth = canvasWidth * 0.55;
let ToastLeftX = canvasWidth * 0.1; // Left: 10% ~ 66.4%
let ToastLeftC = canvasWidth * 0.382;
let ToastRightX = canvasWidth * 0.336; // Right: 33.6% ~ 90%
let ToastRightC = canvasWidth * 0.618;
let ToastLineNum = 24; // 满一行时字母个数
let ToastFrameNum = 2 * 3; // 双侧边框宽相当于多少个字母
let ToastBiaPerLetter = ToastMaxWidth / (ToastLineNum + ToastFrameNum); // 一个字母对应偏移量
let ToastYBia = 150;

// 左侧/右侧镜头转换时，相机移动距离
let CameraLRSpace = canvasWidth * (0.618 - 0.382);

// 小地图尺寸与偏移
let MapPostionLU = 10; // 小地图左上XY坐标
let MapMargin = 30; // 小地图内容与边框的距离
let MapSpace = 40; // 小地图Block间距
let MapBlockSize = 30; // 小地图地砖大小
let MapLappSize = 60; // 小地图Lappland大小
let MapDiamondWidth = 15; // 小地图钻石大小
let MapDiamondHeight = 20; // 小地图钻石大小

// 动画间隔或持续时间
let LappRockInterval = 200; // 摇摆间隔 (ms)
let LappBlinkInterval = 2500; // 眨眼间隔 (ms)
let BreakInterval = 500; // 两动画间的休息间隔 (ms)
let LappWalkInterval = 80; // 行走迈步间隔 (ms)
let LappTurnInterval = 100; // 转向间隔 (loopCount)
let LappLogInterval = 2500; // 对话间隔 (ms)
let DiamondInterval = 100; // 钻石旋转间隔 (ms)
let CollectShrinkInterval = 600; // 缩小宝石间隔 (ms)
let CollectGetInterval = 400; // 收获宝石间隔 (ms)
let LappJumpInterval = 18; // 跳起间隔 = 落地间隔 (loopCount)
let FinalWaitInterval = 1000; // 等待最终结果的时间 (ms)
let FinalLappEmoInterval = 1500; // 气泡表情持续时间 (ms)
let FinalAppearInterval = 1000; // 结果淡出时间 (ms)
let LoadingJumpInterval = 100; // 加载动画间隔 (ms)

// 根据浏览器设置requestAnimFrame
window.requestAnimFrame = (function() {
  // console.log("Set requestAnimFrame");
  return window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  /* param: function FrameRequestCallback, DOMElement Element */
  function(callback, element) {
    return window.setTimeout(callback, 1000 / 60);
  };
})();
