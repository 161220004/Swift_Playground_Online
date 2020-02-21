// 当前状态
var PuzzleStatus = function() {
  this.isCompiling = false; // 是否正在编译
  this.isCompiled = false; // 是否编译运行成功（待后端传值）
  this.isRunning = false; // 是否正在展示用户代码的运行结果
  this.isCompleted = false; // 彻底结束
  this.description = "";
  this.isSuccess = false; // 是否成功
  this.isFailure = false; // 是否失败
  this.reason = FailReason.Undefined; // 失败原因
}

// 失败原因
var FailReason = {
  None: 0, // 成功
  FailedToCompile: 1, // Run初，失败：编译失败
  FallFromBlock: 2, // Run途中，失败：掉落
  FailedToCollect: 3, // Run途中，失败：collect空地砖
  EndNotEnough: 4, // Run结束，失败：宝石收集不全
  Undefined: 5, // Debug: 未知错误
}

// 判定动作结果
PuzzleStatus.prototype.judge = function() {
  if (!this.isCompiled && this.isCompleted) { // 编译失败
    this.isFailure = true;
    this.reason = FailReason.FailedToCompile;
  }
  if (this.isRunning) { // 运行时失败
    if (actionManager.isActing && actionManager.current == ActionType.GO) { // 行走时检测
      // 若不在地砖上
      if (detectOnBlock() < 0) {
        lappland.isShocked = true;
        actionManager.isActing = false;
        this.isRunning = false;
        this.isCompleted = true;
        this.isFailure = true;
        this.reason = FailReason.FallFromBlock;
      }
    }
    if (actionManager.isActing && actionManager.current == ActionType.COLLECT) { // 收集时检测
      // 若当前地砖没有钻石
      let blockIndex = detectOnBlock();
      if (blockIndex < 0 || blocks[blockIndex].item != ItemType.Diamond || blocks[blockIndex].isCollected) {
        actionManager.isActing = false;
        this.isRunning = false;
        this.isCompleted = true;
        this.isFailure = true;
        this.reason = FailReason.FailedToCollect;
      }
    }
  }
  if (this.isCompiled && this.isCompleted) {
    if (!this.isFailure) { // 编译成功且中途未失败
      if (puzzleMsg.collectNum >= puzzleMsg.totalNum) {
        this.isSuccess = true;
        this.reason = FailReason.None;
      } else {
        this.isFailure = true;
        this.reason = FailReason.EndNotEnough;
      }
    }
  }
}
