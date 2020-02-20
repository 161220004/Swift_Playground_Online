// 当前状态
var PuzzleStatus = function() {
  this.isCompiling = false; // 是否正在编译
  this.isCompiled = false; // 是否编译运行成功（待后端传值）
  this.isRunning = false; // 是否正在展示用户代码的运行结果
  this.isCompleted = false; // 彻底结束
  this.description = "";
  this.isSuccess = false; // 是否成功
  this.isFailure = false; // 是否失败
  this.reason = FailReason.None; // 失败原因
}

// 失败原因
var FailReason = {
  FailedToCompile: 1, // Run初，失败：编译失败
  FallFromBlock: 2, // Run途中，失败：掉落
  FailedToCollect: 3, // Run途中，失败：collect空地砖
  EndNotEnough: 4, // Run结束，失败：宝石收集不全
  None: 5,
}

// 若所有动作结束，判定结果
PuzzleStatus.prototype.judge = function() {
  if (this.isCompiled && this.isCompleted) {
    if (!this.isFailure) { // 编译成功且中途未失败
      if (puzzleMsg.collectNum >= puzzleMsg.totalNum) {
        this.isSuccess = true;
      } else {
        this.isFailure = true;
        this.reason = FailReason.EndNotEnough;
      }
    }
  }
}
