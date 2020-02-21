// 枚举类型： 动作类型，包括: "GO", "LOG", "TURN", "COLLECT", ...
var ActionType = {
  NONE: "NONE",
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
}

var ActionManager = function() {
  // 所有动作（按顺序的Action数组）（待后端传值）
  this.actions = [];
  this.actionCount = 0; // 当前执行到第几个动作
  this.actionsStr = "";
  // 动作相关参数
  this.lastDirection = scene.lappInitDir; // 上一次的朝向
  this.direction = scene.lappInitDir; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)
  this.stepsRest = 0; // 行走剩余步数（等于0说明没有行走）
  this.message = ""; // Log内容
  this.breakTime = BreakInterval; // 休息时间
  // 当前状态
  this.isActing = false; // 是否正在动作中
  this.current = ActionType.NONE; // 当前动作类型
}

// 从后端获取行动过程并初始化（data为后端传来的数据）
ActionManager.prototype.initFromServer = function(data) {
  puzzleStatus.isCompiled = data.isCompiled;
  puzzleStatus.description = data.description;
  for (let i = 0; i < data.paces.length; i++) {
    let pace = data.paces[i];
    let action = new Action(pace.type, pace.d, pace.dir, pace.log);
    this.actionsStr += action.type + " - ";
    this.actions[i] = action;
  }
  console.log("Already Init Actions From User Code");
}

// 开始全部动画
ActionManager.prototype.performActions = function() {
  puzzleStatus.isCompiling = false; // 编译结束
  if (puzzleStatus.isCompiled == true) { // 若编译通过
    if (this.actions.length > 0) { // 存在动画
      alert("Ready to Perform Actions: " + this.actionsStr);
      puzzleStatus.isRunning = true;
      // 开启动画
      this.start();
    } else { // 没有动画
      alert("No Action to Perform");
      puzzleStatus.isCompleted = true; // 成功与否待检测
    }
  } else { // 编译失败
    puzzleStatus.isCompleted = true;
  }
}

// 开启当前动画
ActionManager.prototype.start = function() {
  let action = this.actions[this.actionCount];
  this.isActing = true;
  this.current = action.type;
  console.log("Start Action [" + this.actionCount + "]: " + this.current);
  switch (this.current) {
    case ActionType.GO:
      this.stepsRest = action.d;
      break;
    case ActionType.TURN:
      this.lastDirection = this.direction;
      this.direction = action.dir;
      break;
    case ActionType.LOG:
      this.message = action.log;
      break;
    case ActionType.COLLECT:
      scene.blocks[scene.detectOnBlock()].isCollecting = true;
      break;
    default:
      alert("action.js - start(): No Such Action Type !");
  }
}

// 两动画间的休息
ActionManager.prototype.break = function(time = 0) {
  this.isActing = false;
  this.breakTime = BreakInterval + time;
  console.log("Have a Rest Now");
}

// 结束当前动画，开启下一个动画
ActionManager.prototype.next = function() {
  console.log("Finish Action [" + this.actionCount + "]");
  // 还有未开始的动画
  if (this.actionCount < this.actions.length - 1) {
    // 为下一步动画作准备
    this.actionCount += 1;
    this.start();
  } else { // 最后一个动画也结束了
    puzzleStatus.isRunning = false;
    puzzleStatus.isCompleted = true; // 开始结算成果
  }
}
