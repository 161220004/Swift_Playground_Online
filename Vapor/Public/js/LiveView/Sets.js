// 当前URL路径部分
const UrlPath = window.location.pathname;
// 当前Puzzle序号（从URL中取得）
const PID = (function() {
  let val = UrlPath.replace(/[^0-9]/ig, "");
  console.log("URL_PATH: " + UrlPath + ", pid = " + val);
  return val;
})();

// Canvas - Pixi
const CanvasPixi = $("#canvas_pixi")[0];
const CtxtP = CanvasPixi.getContext('2d');
// Canvas - 尺寸
const CanvasWidth = CanvasPixi.width;
const CanvasHeight = CanvasPixi.height;

// 相机位置
const CameraX = [0.618 * CanvasWidth, 0.382 * CanvasWidth, 0.382 * CanvasWidth, 0.618 * CanvasWidth]; // [L, U(R), R, D(L)]
const CameraY = 0.618 * CanvasHeight;
const CameraLRSpace = CanvasWidth * (0.618 - 0.382); // 左侧/右侧镜头转换时，相机移动距离

// Cell尺寸与偏移
const XBia = 108; // Cell在X方向右移1，像素在X方向右移108
const YBiaX = -42; // Cell在Y方向下移1，像素在X方向左移42
const YBiaY = 48; // Cell在Y方向下移1，像素在Y方向下移48
const ZBia = 108; // Cell在Z方向下移1，像素在Y方向下移108

// Background 不同PID不同层次的移动速度
const BackID = (PID + 1) % 3; // 采用的背景序号
const BackCellBia = 50; // 一个Cell长度对应于多少背景偏移
const BackgroundSpeed = {0: [[0, 0], [-1.8, 0.6], [0.2, 0]],
                         1: [[0, 0], [0, 0], [-0.5, 0]],
                         2: [[0, 0], [1, 0], [-0.5, 0]]}

// Lappland原始尺寸与位移
const LappWidth = 84;
const LappHeight = 108;
const LappShadowYBia = 5; // 影子偏移
const LappJumpZA = -0.036; // 跳跃初速度（Cell）
const LappBubbleXBia = 50; // 表情气泡X偏移
const LappBubbleYBia = -70; // 表情气泡Y偏移
const LappBubbleWidth = 55; // 表情气泡大小
const LappBubbleHeight = 50; // 表情气泡大小

// 地砖/钻石偏移
const BlockYBia = 67;
const DiamondYBia = -108;

// Puzzle信息栏的钻石尺寸与偏移
const MiniDiamondX = 460; // 基础偏移（左上）
const MiniDiamondY = 16; // 基础偏移（左上）
const MiniDiamondSpace = 18; // X方向间距
const MiniDiamondFlyInterval = 20; // 钻石飞行时间

// Puzzle信息栏的砖块尺寸与偏移
const MiniSwitchX = 460;
const MiniSwitchY = 36;
const MiniSwitchR = 7;
const MiniSwitchSpace = 18; // X方向间距

// Puzzle信息栏的方向指示
const MiniDirX = 440;
const MiniDirY = 440;

// 对话框尺寸与偏移
const ToastMaxWidth = CanvasWidth * 0.55;
const ToastLeftX = CanvasWidth * 0.1; // Left: 10% ~ 66.4%
const ToastLeftC = CanvasWidth * 0.382;
const ToastRightX = CanvasWidth * 0.336; // Right: 33.6% ~ 90%
const ToastRightC = CanvasWidth * 0.618;
const ToastLineNum = 24; // 满一行时字母个数
const ToastFrameNum = 2 * 3; // 双侧边框宽相当于多少个字母
const ToastBiaPerLetter = ToastMaxWidth / (ToastLineNum + ToastFrameNum); // 一个字母对应偏移量
const ToastYBia = 150;

// 小地图尺寸与偏移
const MapPostionLU = 10; // 小地图左上XY坐标
const MapMargin = 30; // 小地图内容与边框的距离
const MapSpace = 40; // 小地图Block间距
const MapBlockSize = 30; // 小地图地砖大小
const MapLappSize = 60; // 小地图Lappland大小
const MapDiamondWidth = 15; // 小地图钻石大小
const MapDiamondHeight = 20; // 小地图钻石大小

// 动画间隔或持续时间
const BreakInterval = 30; // 两动画间的休息间隔 (loopCount)
const LappTurnInterval = 40; // 转向间隔 (loopCount)
const LappLogInterval = 150; // 对话间隔 (loopCount)
const LappWalkInterval = 50; // 行走每一步的间隔 (loopCount)
const LappJumpInterval = 16; // 跳起间隔 = 落地间隔 (loopCount)
const DiamShrankInterval = 28; // 钻石缩小时间 (loopCount)
const LappCollectInterval = LappJumpInterval + DiamShrankInterval +
                            MiniDiamondFlyInterval - BreakInterval / 2; // 收集钻石等待时间（跳起+缩小+飞，并提前一些结束）
const LappSwitchInterval = 30; // 切换砖块颜色时间 (loopCount)
const FinalWaitInterval = 50; // 等待最终结果的时间 (loopCount)
const FinalLappEmoInterval = 100; // 气泡表情持续时间 (loopCount)
const FinalAppearInterval = 100; // 结果淡出时间 (loopCount)

// 随机概率
const RandDiamPercent = 0.6; // 随机宝石概率
const RandOnPercent = 0.4; // 随机黄色砖块概率
const RandSwitchPercent = 0.5; // 随机砖块不是宝石概率
