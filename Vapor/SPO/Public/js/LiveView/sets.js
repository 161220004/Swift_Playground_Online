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
let canvasHeight = canvasBack.height;

// 对象
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

// 动画频率
let LappRockInterval = 200; // 摇摆间隔 (ms)
let LappBlinkInterval = 2500; // 眨眼间隔 (ms)
let BreakInterval = 800; // 两动画间的休息间隔 (ms)
let LappWalkInterval = 80; // 行走迈步间隔 (ms)
let LappTurnInterval = 100; // 转向间隔 (loopCount)
let LappLogInterval = 2500; // 对话间隔 (ms)
let DiamondInterval = 100; // 钻石旋转间隔 (ms)
let CollectShrinkInterval = 600; // 缩小宝石间隔 (ms)
let CollectGetInterval = 400; // 收获宝石间隔 (ms)
let LappJumpInterval = 18; // 跳起间隔 = 落地间隔 (loopCount)

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
// 图片 - Lappland - Mini
let miniLappImg = $("#img_lapp_mini")[0];
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
