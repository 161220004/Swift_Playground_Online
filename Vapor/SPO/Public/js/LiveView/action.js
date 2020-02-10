// 动作状态
var isRunning = false; // 是否正在展示用户代码的运行结果
var isCompiled = false; // 是否编译运行成功（待后端传值）
var isLegal = false; // 动画是否合法（比如超出画面范围）
var isRight = false; // 是否是正确答案
var description;
var actions = []; // 接下来的所有动作（按顺序的Action数组）（待后端传值）
var actionCount = 0; // 当前执行到第几个动作

var currentDirection = 2; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)
var stepsRest = 0; // 行走剩余步数（等于0说明没有行走）

// 枚举类型： 动作类型，包括: "GO", "LOG", "TURN", ...
var ActionType = {
  GO: "GO",
  LOG: "LOG",
  TURN: "TURN"
}

var Action = function(type, d, dir, log) {
  this.type = type;
  this.d = d; // 行走距离
  this.dir = dir; // 接下来的朝向
  this.log = log; // 语句
  this.isFinished = false; // 动画是否结束
}

// 开启当前动画
Action.prototype.start = function() {
  var action = actions[actionCount];
  console.log("Start Action: " + action.type);
  switch (action.type) {
    case ActionType.GO:
      stepsRest = action.d;
      break;
    default:
      alert("action.js - start(): No Such Action Type !");
  }
}

// 结束当前动画
Action.prototype.finish = function() {
  console.log("Finish Action: index = " + actionCount);
  this.isFinished = true;
  // 为下一步动画作准备
  if (actionCount < actions.length - 1) { // 还有未开始的动画
    actionCount += 1;
    actions[actionCount].start();
  } else { // 最后一个动画也结束了
    isRunning = false;
  }
}

// 从后端获取行动过程（data为后端传来的数据）
function getActionsFromServer(data) {
  isCompiled = data.isCompiled;
  isLegal = data.isLegal;
  isRight = data.isRight;
  description = data.description;
  for (var i = 0; i < data.paces.length; i++) {
    var pace = data.paces[i];
    var action = new Action(pace.type, pace.d, pace.dir, pace.log);
    console.log(action);
    actions[i] = action;
  }
}

// 开始动画
function performActions() {
  if (isCompiled == true) {
    isRunning = true;
    // 初始化第一个动画
    actionCount = 0;
    stepsRest = 0;
    currentDirection = lappInitDirection;
    actions[actionCount].start();
  }
}
