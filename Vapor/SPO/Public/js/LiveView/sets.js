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
// Canvas - 前景
let canvasFore = $("#canvas_fore")[0];
let ctxtF = canvasFore.getContext('2d');
// Canvas - 物品
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
// Canvas - 尺寸
let canvasWidth = canvasBack.width;
let canvasHeight = canvasBack.height;

// 对象
var camera;
var lappland;

// Cell尺寸与偏移
let CellXBia = 108; // Cell在X方向右移1，像素在X方向右移108
let CellYBiaX = -42; // Cell在Y方向下移1，像素在X方向左移42
let CellYBiaY = 48; // Cell在Y方向下移1，像素在Y方向下移48

// Lappland原始尺寸
let LappWidth = 84;
let LappHeight = 108;
let LappShadowYBia = 5; // 影子偏移

// 地砖尺寸与偏移
let BlockWidth = 130;
let BlockHeight = 72;
let BlockYBia = 67;

// 钻石尺寸与偏移
let DiamondSize = 54;
let DiamondYBia = -108;

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

// 动画频率
let LappRockInterval = 200; // 摇摆间隔 (ms)
let LappBlinkInterval = 2500; // 眨眼间隔 (ms)
let BreakInterval = 800; // 两动画间的休息间隔 (ms)
let LappWalkInterval = 80; // 行走迈步间隔 (ms)
let LappTurnInterval = 100; // 转向间隔 (loopCount)
let LappLogInterval = 2500; // 对话间隔 (ms)
let DiamondInterval = 100; // 钻石旋转间隔 (ms)

// 行走步长
let LappPaceXBia = CellXBia / 12; // 一个step的长度为此数值乘以12
let LappPaceYBiaX = CellYBiaX / 12;
let LappPaceYBiaY = CellYBiaY / 12;
let LappMoveHeight = 10; // 上升/下降高度

// 图片 - 背景
let backgroundImg = $("#img_bg")[0];
// 图片 - 前景
let blockNormalImg = $("#img_fg_b_n")[0];
let blockBlueImg = $("#img_fg_b_b")[0];
let blockDarkImg = $("#img_fg_b_d")[0];
let blockGreenImg = $("#img_fg_b_g")[0];
let blockPurpleImg = $("#img_fg_b_p")[0];
let blockRedImg = $("#img_fg_b_r")[0];
let blockYellowImg = $("#img_fg_b_y")[0];
// 图片 - Items
let diamondImg = [$("#img_it_d_0")[0], $("#img_it_d_1")[0], $("#img_it_d_2")[0], $("#img_it_d_3")[0]];
let arrayDownImg = [$("#img_it_ad_0")[0], $("#img_it_ad_1")[0], $("#img_it_ad_2")[0], $("#img_it_ad_3")[0], $("#img_it_ad_4")[0]];
let arrayUpImg = [$("#img_it_au_0")[0], $("#img_it_au_1")[0], $("#img_it_au_2")[0], $("#img_it_au_3")[0], $("#img_it_au_4")[0]];
// 图片 - Lappland - Right Direction
// N: 0-1-2-2-1-0-...
let rLappHairImg = [$("#imgr_h_0")[0], $("#imgr_h_1")[0], $("#imgr_h_2")[0],
                    $("#imgr_h_2")[0], $("#imgr_h_1")[0], $("#imgr_h_0")[0]];
// N: 0-1-2-2-1-0-...
let rLappTailImg = [$("#imgr_t_0")[0], $("#imgr_t_1")[0], $("#imgr_t_2")[0],
                    $("#imgr_t_2")[0], $("#imgr_t_1")[0], $("#imgr_t_0")[0]];
// N: 0-1-2-2-1-0-...
let rLappRibbonImg = [$("#imgr_r_0")[0], $("#imgr_r_1")[0], $("#imgr_r_2")[0],
                      $("#imgr_r_2")[0], $("#imgr_r_1")[0], $("#imgr_r_0")[0]];
// P: ...-0-0-1-2-1-0-0-...
let rLappFaceImg = [$("#imgr_f_0")[0], $("#imgr_f_1")[0], $("#imgr_f_2")[0], $("#imgr_f_1")[0]];
let rLappClothesImg = $("#imgr_cl")[0];
let rLappLegnImg = $("#imgr_l")[0];
// M(12): 1-2-3-4-5-6-7-6-5-4-3-2-...
let rLappLegImg = [$("#imgr_l_1")[0], $("#imgr_l_2")[0], $("#imgr_l_3")[0],
                   $("#imgr_l_4")[0], $("#imgr_l_5")[0], $("#imgr_l_6")[0],
                   $("#imgr_l_7")[0], $("#imgr_l_6")[0], $("#imgr_l_5")[0],
                   $("#imgr_l_4")[0], $("#imgr_l_3")[0], $("#imgr_l_2")[0]];
let rLappArmBnImg = $("#imgr_ab")[0];
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let rLappArmBImg = [$("#imgr_ab_0")[0], $("#imgr_ab_1")[0], $("#imgr_ab_2")[0],
                    $("#imgr_ab_3")[0], $("#imgr_ab_4")[0], $("#imgr_ab_5")[0],
                    $("#imgr_ab_6")[0], $("#imgr_ab_5")[0], $("#imgr_ab_4")[0],
                    $("#imgr_ab_3")[0], $("#imgr_ab_2")[0], $("#imgr_ab_1")[0]];
let rLappArmFnImg = $("#imgr_af")[0];
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let rLappArmFImg = [$("#imgr_af_0")[0], $("#imgr_af_1")[0], $("#imgr_af_2")[0],
                    $("#imgr_af_3")[0], $("#imgr_af_4")[0], $("#imgr_af_5")[0],
                    $("#imgr_af_6")[0], $("#imgr_af_5")[0], $("#imgr_af_4")[0],
                    $("#imgr_af_3")[0], $("#imgr_af_2")[0], $("#imgr_af_1")[0]];
let rLappShadowImg = $("#imgr_s")[0];
// 图片 - Lappland - Left Direction
// N: 0-1-2-2-1-0-...
let lLappHairImg = [$("#imgl_h_0")[0], $("#imgl_h_1")[0], $("#imgl_h_2")[0],
                    $("#imgl_h_2")[0], $("#imgl_h_1")[0], $("#imgl_h_0")[0]];
// N: 0-1-2-2-1-0-...
let lLappTailImg = [$("#imgl_t_0")[0], $("#imgl_t_1")[0], $("#imgl_t_2")[0],
                    $("#imgl_t_2")[0], $("#imgl_t_1")[0], $("#imgl_t_0")[0]];
// N: 0-1-2-2-1-0-...
let lLappRibbonImg = [$("#imgl_r_0")[0], $("#imgl_r_1")[0], $("#imgl_r_2")[0],
                      $("#imgl_r_2")[0], $("#imgl_r_1")[0], $("#imgl_r_0")[0]];
// P: ...-0-0-1-2-1-0-0-...
let lLappFaceImg = [$("#imgl_f_0")[0], $("#imgl_f_1")[0], $("#imgl_f_2")[0], $("#imgl_f_1")[0]];
let lLappClothesImg = $("#imgl_cl")[0];
let lLappLegnImg = $("#imgl_l")[0];
// M(12): 1-2-3-4-5-6-7-6-5-4-3-2-...
let lLappLegImg = [$("#imgl_l_1")[0], $("#imgl_l_2")[0], $("#imgl_l_3")[0],
                   $("#imgl_l_4")[0], $("#imgl_l_5")[0], $("#imgl_l_6")[0],
                   $("#imgl_l_7")[0], $("#imgl_l_6")[0], $("#imgl_l_5")[0],
                   $("#imgl_l_4")[0], $("#imgl_l_3")[0], $("#imgl_l_2")[0]];
let lLappArmBnImg = $("#imgl_ab")[0];
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let lLappArmBImg = [$("#imgl_ab_0")[0], $("#imgl_ab_1")[0], $("#imgl_ab_2")[0],
                    $("#imgl_ab_3")[0], $("#imgl_ab_4")[0], $("#imgl_ab_5")[0],
                    $("#imgl_ab_6")[0], $("#imgl_ab_5")[0], $("#imgl_ab_4")[0],
                    $("#imgl_ab_3")[0], $("#imgl_ab_2")[0], $("#imgl_ab_1")[0]];
let lLappArmFnImg = $("#imgl_af")[0];
// M(12): 0-1-2-3-4-5-6-5-4-3-2-1-...
let lLappArmFImg = [$("#imgl_af_0")[0], $("#imgl_af_1")[0], $("#imgl_af_2")[0],
                    $("#imgl_af_3")[0], $("#imgl_af_4")[0], $("#imgl_af_5")[0],
                    $("#imgl_af_6")[0], $("#imgl_af_5")[0], $("#imgl_af_4")[0],
                    $("#imgl_af_3")[0], $("#imgl_af_2")[0], $("#imgl_af_1")[0]];
let lLappShadowImg = $("#imgl_s")[0];

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
