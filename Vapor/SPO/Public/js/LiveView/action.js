// 所有动作（按顺序的Action数组）（待后端传值）
var actions = [];
var actionCount = 0; // 当前执行到第几个动作
var actionsStr = "";

// 动作相关参数
var lastDirection = lappInitDir; // 上一次的朝向
var currentDirection = lappInitDir; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)
var stepsRest = 0; // 行走剩余步数（等于0说明没有行走）

// 枚举类型： 动作类型，包括: "GO", "LOG", "TURN", "COLLECT", ...
var ActionType = {
  GO: "GO",
  LOG: "LOG",
  TURN: "TURN",
  COLLECT: "COLLECT",
}

var Action = function(type, d, dir, log) {
  this.type = type;
  this.d = d; // 行走距离
  this.dir = dir; // 接下来的朝向
  this.log = log; // 语句
  this.isFinished = false; // 动画是否结束
}

// 两动画间的休息
Action.prototype.break = function() {
  this.isFinished = true;
  if (actionCount < actions.length - 1) { // 还有未开始的动画
    console.log("Have a Rest Now");
  } else { // 最后一个动画也结束了
    puzzleStatus.isRunning = false;
    puzzleStatus.isCompleted = true; // 开始结算成果
  }
}

// 开启当前动画
Action.prototype.start = function() {
  let action = actions[actionCount];
  console.log("Start Action [" + actionCount + "]: " + action.type);
  switch (action.type) {
    case ActionType.GO:
      stepsRest = action.d;
      break;
    case ActionType.TURN:
      lastDirection = currentDirection;
      currentDirection = action.dir;
      break;
    case ActionType.LOG:
      console.log("- Lappland says: " + action.log);
      break;
    case ActionType.COLLECT:
      console.log("- Diamond! Collect It!");
      break;
    default:
      alert("action.js - start(): No Such Action Type !");
  }
}

// 结束当前动画，开启下一个动画
Action.prototype.next = function() {
  console.log("Finish Action [" + actionCount + "]");
  // 为下一步动画作准备
  if (puzzleStatus.isRunning) {
    actionCount += 1;
    actions[actionCount].start();
  }
}

// 从后端获取行动过程并初始化（data为后端传来的数据）
function initActionsFromServer(data) {
  puzzleStatus.isCompiled = data.isCompiled;
  puzzleStatus.description = data.description;
  actions = [];
  actionsStr = "";
  actionCount = 0;
  lastDirection = lappInitDir;
  currentDirection = lappInitDir;
  stepsRest = 0;
  for (let i = 0; i < data.paces.length; i++) {
    let pace = data.paces[i];
    let action = new Action(pace.type, pace.d, pace.dir, pace.log);
    actionsStr += action.type + " - ";
    actions[i] = action;
  }
  console.log("Init Actions From User Code");
}

// 开始动画
function performActions() {
  puzzleStatus.isCompiling = false; // 编译结束
  if (puzzleStatus.isCompiled == true) { // 若编译通过
    alert("Ready to Perform Actions: " + actionsStr);
    puzzleStatus.isRunning = true;
    // 初始化第一个动画
    actionCount = 0;
    stepsRest = 0;
    currentDirection = lappInitDir;
    actions[actionCount].start();
  } else {
    // alert("Compile Failed !");
    puzzleStatus.isCompleted = true;
    puzzleStatus.isFailure = true;
    puzzleStatus.reason = FailReason.FailedToCompile;
  }
}
