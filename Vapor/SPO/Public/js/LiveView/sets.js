// 当前URL路径部分
const urlPath = window.location.pathname;
// 当前Puzzle序号（从URL中取得）
const pid = (function() {
  let val = urlPath.replace(/[^0-9]/ig, "");
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
const canvasBack = $("#canvas_back")[0];
const ctxtB = canvasBack.getContext('2d');
// Canvas - 前景（地砖等）
const canvasFore = $("#canvas_fore")[0];
const ctxtF = canvasFore.getContext('2d');
// Canvas - 物品（宝石等）
const canvasItem = $("#canvas_item")[0];
const ctxtI = canvasItem.getContext('2d');
// Canvas - Lappland's Shadow
const canvasShadow = $("#canvas_L_s")[0];
const ctxtS = canvasShadow.getContext('2d');
// Canvas - Lappland's Tail/ArmB
const canvasLappB = $("#canvas_L_b")[0];
const ctxtLB = canvasLappB.getContext('2d');
// Canvas - Lappland's Face/Leg
const canvasLappM = $("#canvas_L_m")[0];
const ctxtLM = canvasLappM.getContext('2d');
// Canvas - Lappland's Clothes
const canvasLappC = $("#canvas_L_c")[0];
const ctxtLC = canvasLappC.getContext('2d');
// Canvas - Lappland's Hair/Ribbon/ArmF
const canvasLappF = $("#canvas_L_f")[0];
const ctxtLF = canvasLappF.getContext('2d');
// Canvas - 幕布Curtain
const canvasCtn = $("#canvas_ctn")[0];
const ctxtCtn = canvasCtn.getContext('2d');
// Canvas - 通关信息
const canvasMsg = $("#canvas_msg")[0];
const ctxtMsg = canvasMsg.getContext('2d');

// Canvas - 尺寸
const canvasWidth = canvasBack.width;
const canvasWidthAdd = canvasMsg.width;
const canvasHeight = canvasBack.height;

// 对象
var puzzleStatus;
var puzzleMsg;
var camera;
var lappland;

// Cell尺寸与偏移
const CellXBia = 108; // Cell在X方向右移1，像素在X方向右移108
const CellYBiaX = -42; // Cell在Y方向下移1，像素在X方向左移42
const CellYBiaY = 48; // Cell在Y方向下移1，像素在Y方向下移48
const CellZBia = 108; // Cell在Z方向下移1，像素在Y方向下移108

// Lappland原始尺寸与位移
const LappWidth = 84;
const LappHeight = 108;
const LappShadowYBia = 5; // 影子偏移
const LappJumpZA = -0.035; // 跳跃初速度（Cell）
const LappBubbleXBia = 50; // 表情气泡X偏移
const LappBubbleYBia = -70; // 表情气泡Y偏移
const LappBubbleWidth = 55; // 表情气泡大小
const LappBubbleHeight = 50; // 表情气泡大小

// 加载中动画跳跃偏移
const LoadingJumpY = -10;

// 地砖尺寸与偏移
const BlockWidth = 130;
const BlockHeight = 72;
const BlockYBia = 67;

// 钻石尺寸与偏移
const DiamondSize = 54;
const DiamondYBia = -108;

// Puzzle信息栏的钻石尺寸与偏移
const MiniDiamondSize = 16.2;
const MiniDiamondX = 482; // 基础偏移（左上）
const MiniDiamondY = 6; // 基础偏移（左上）
const MiniDiamondSpace = 18; // Y方向间距

// 对话框尺寸与偏移
const ToastMaxWidth = canvasWidth * 0.55;
const ToastLeftX = canvasWidth * 0.1; // Left: 10% ~ 66.4%
const ToastLeftC = canvasWidth * 0.382;
const ToastRightX = canvasWidth * 0.336; // Right: 33.6% ~ 90%
const ToastRightC = canvasWidth * 0.618;
const ToastLineNum = 24; // 满一行时字母个数
const ToastFrameNum = 2 * 3; // 双侧边框宽相当于多少个字母
const ToastBiaPerLetter = ToastMaxWidth / (ToastLineNum + ToastFrameNum); // 一个字母对应偏移量
const ToastYBia = 150;

// 左侧/右侧镜头转换时，相机移动距离
const CameraLRSpace = canvasWidth * (0.618 - 0.382);

// 小地图尺寸与偏移
const MapPostionLU = 10; // 小地图左上XY坐标
const MapMargin = 30; // 小地图内容与边框的距离
const MapSpace = 40; // 小地图Block间距
const MapBlockSize = 30; // 小地图地砖大小
const MapLappSize = 60; // 小地图Lappland大小
const MapDiamondWidth = 15; // 小地图钻石大小
const MapDiamondHeight = 20; // 小地图钻石大小

// 动画间隔或持续时间
const LappRockInterval = 200; // 摇摆间隔 (ms)
const LappBlinkInterval = 2500; // 眨眼间隔 (ms)
const BreakInterval = 500; // 两动画间的休息间隔 (ms)
const LappWalkInterval = 80; // 行走迈步间隔 (ms)
const LappTurnInterval = 100; // 转向间隔 (loopCount)
const LappLogInterval = 2500; // 对话间隔 (ms)
const DiamondInterval = 100; // 钻石旋转间隔 (ms)
const CollectShrinkInterval = 600; // 缩小宝石间隔 (ms)
const CollectGetInterval = 400; // 收获宝石间隔 (ms)
const LappJumpInterval = 18; // 跳起间隔 = 落地间隔 (loopCount)
const FinalWaitInterval = 1000; // 等待最终结果的时间 (ms)
const FinalLappEmoInterval = 1500; // 气泡表情持续时间 (ms)
const FinalAppearInterval = 1000; // 结果淡出时间 (ms)
const LoadingJumpInterval = 100; // 加载动画间隔 (ms)

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
