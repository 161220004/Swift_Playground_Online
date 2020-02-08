// Canvas循环计数
var loopCount;
// 上次记录的时间
var lastStamp;
// 两帧间隔时间
var interval;

// 两个Canvas及其Context
var canvasBack; // 背景
var canvasItems; // 物品
var canvasLappB; // Lappland's Tail/ArmB
var canvasLappM; // Lappland's Face/Leg
var canvasLappC; // Lappland's Clothes
var canvasLappF; // Lappland's Hair/Ribbon/ArmF
var ctxtB;
var ctxtI;
var ctxtLB; // Lappland's Tail/ArmB
var ctxtLM; // Lappland's Face/Leg
var ctxtLC; // Lappland's Clothes
var ctxtLF; // Lappland's Hair/Ribbon/ArmF
// Canvas的尺寸
var canvasWidth;
var canvasHeight;

// 对象
var lappland;

// Lappland尺寸
let lappWidth = 84;
let lappHeight = 108;

// 动作频率
let LappRockInterval = 200; // 摇摆间隔
let LappBlinkInterval = 2500; // 眨眼间隔

// 图片
var backgroundImg;
// Lappland - Right Direction
var rLappHairImg;    // N: 0-1-2-2-1-0-...
var rLappTailImg;    // N: 0-1-2-2-1-0-...
var rLappRibbonImg;  // N: 0-1-2-2-1-0-...
var rLappFaceImg;    // P: ...-0-0-1-2-1-0-0-...
var rLappClothesImg; // -
var rLappLegImg;     // M: 0-1-2-3-4-5-6-5-4-3-2-1-...
var rLappArmBnImg;   // -
var rLappArmBImg;    // M: 0-1-2-3-4-5-6-5-4-3-2-1-...
var rLappArmFnImg;   // -
var rLappArmFImg;    // M: 0-1-2-3-4-5-6-5-4-3-2-1-...

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
