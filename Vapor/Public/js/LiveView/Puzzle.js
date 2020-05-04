/** 枚举类型： 失败原因 */
var FailReason = {
  None: 0, // 成功
  FailedToCompile: 1, // Run初，失败：编译失败
  FallFromBlock: 2, // Run途中，失败：掉落
  FailedToCollect: 3, // Run途中，失败：collect空地砖
  FailedToSwitch: 4, // Run途中，失败：switch错地砖
  EndNotEnough: 5, // Run结束，失败：宝石收集不全
  EndNotOn: 6, // Run结束，失败：砖块未全部点亮
  Undefined: 7, // Debug: 未知错误
}

/** Puzzle 类，描述当前状态
 * @constructor
 */
function Puzzle() {
  this.isCompiling = false; // 是否正在编译
  this.isCompiled = false; // 是否编译运行成功（待后端传值）
  this.isRunning = false; // 是否正在展示用户代码的运行结果
  this.isCompleted = false; // 动作彻底结束
  this.isSuccess = false; // 是否成功
  this.isFailure = false; // 是否失败
  this.reason = FailReason.Undefined; // 失败原因
  // 结果动画剩余时间
  this.resultTime = FinalWaitInterval + FinalLappEmoInterval + FinalAppearInterval;
  // 黑色背景
  this.blackboard = new PIXI.Graphics(); // 黑色背景
  this.blackboard.visible = false;
  this.blackboard.zIndex = 200;
  this.blackboard.beginFill(0x000000); // 开始绘制
  this.blackboard.drawRect(0, 0, CanvasWidth, CanvasHeight);
  this.blackboard.endFill(); // 停止绘制
  Stage.addChild(this.blackboard);
  // 加载动画
  this.loadingSprite = new PIXI.AnimatedSprite(loadingTextures);
  this.loadingSprite.visible = false;
  this.loadingSprite.zIndex = 201;
  this.loadingSprite.anchor.set(0, 0);
  this.loadingSprite.position.set(0, 0);
  Stage.addChild(this.loadingSprite);
  // 结果动画
  this.resultSprite = new PIXI.Sprite(successTexture);
  this.resultSprite.visible = false;
  this.resultSprite.zIndex = 202;
  this.resultSprite.anchor.set(0, 0);
  this.resultSprite.position.set(0, 0);
  Stage.addChild(this.resultSprite);
  // 编译输出 + 错误/成功信息
  this.description = "......";
  $("#terminal_log").html(this.description);
  $("#result_log").html("");
  $("#reason_log").html("");
}

/** 重置所有属性 */
Puzzle.prototype.reset = function() {
  this.isCompiling = false; // 是否正在编译
  this.isCompiled = false; // 是否编译运行成功（待后端传值）
  this.isRunning = false; // 是否正在展示用户代码的运行结果
  this.isCompleted = false; // 动作彻底结束
  this.isSuccess = false; // 是否成功
  this.isFailure = false; // 是否失败
  this.reason = FailReason.Undefined; // 失败原因
  this.description = "......";
  $("#terminal_log").html(this.description);
  $("#result_log").html("");
  $("#reason_log").html("");
  // 结果动画剩余时间
  this.resultTime = FinalWaitInterval + FinalLappEmoInterval + FinalAppearInterval;
  this.blackboard.visible = false;
  this.loadingSprite.visible = false;
  this.resultSprite.visible = false;
  console.log("Puzzle Reset");
}

/** 从后端获取行动过程并初始化（data为后端传来的数据）*/
Puzzle.prototype.getActions = function(data) {
  this.isCompiled = data.isCompiled;
  this.description = data.description;
  $("#terminal_log").html(this.description);
  for (let i = 0; i < data.paces.length; i++) {
    let pace = data.paces[i];
    let action = new Action(pace.type, pace.d, pace.dir, pace.log);
    lappland.actionsStr += action.type + " - ";
    lappland.actions[i] = action;
  }
  console.log("Already Init Actions From User Code: " + lappland.actionsStr);
}

/** 开始动画（根据已获取的用户代码） */
Puzzle.prototype.performActions = function() {
  this.isCompiling = false; // 编译结束
  this.stopLoadingSprite();
  if (this.isCompiled == true) { // 若编译通过
    if (lappland.actions.length > 0) { // 存在动画
      // 开启动画
      this.isRunning = true;
    } else { // 没有动画
      this.isCompleted = true; // 成功与否待检测
    }
  } else { // 编译失败
    this.isCompleted = true; // 错误原因待检测
  }
}

/** 展示加载 Sprite */
Puzzle.prototype.playLoadingSprite = function() {
  this.blackboard.visible = true;
  this.blackboard.alpha = 0.5;
  this.loadingSprite.visible = true;
  this.loadingSprite.loop = true;
  this.loadingSprite.animationSpeed = 0.15;
  this.loadingSprite.gotoAndPlay(0);
}

/** 停止加载 Sprite */
Puzzle.prototype.stopLoadingSprite = function() {
  this.blackboard.visible = false;
  this.blackboard.alpha = 0;
  this.loadingSprite.visible = false;
  this.loadingSprite.stop();
}

/** 展示结果 Sprite */
Puzzle.prototype.showResultSprite = function() {
  if (this.isSuccess) {
    this.resultSprite.texture = successTexture;
  }
  if (this.isFailure) {
    this.resultSprite.texture = failureTexture;
  }
  this.blackboard.visible = true;
  this.blackboard.alpha = 0;
  this.resultSprite.visible = true;
  this.resultSprite.alpha = 0;
}

/** 判定用户代码的动作最终结果 */
Puzzle.prototype.judgeResult = function() {
  // 若已经有结果了则不再重复检测
  if (this.isFailure || this.isSuccess) { return; }
  // 编译失败
  if (!this.isCompiled && this.isCompleted) {
    this.isFailure = true;
    this.reason = FailReason.FailedToCompile;
    this.showResultSprite();
    $("#result_log").html("Result: Failure");
    $("#reason_log").html("Reason: Failed To Compile");
    console.log("The End: Failed To Compile");
    return;
  }
  // 运行时失败
  if (this.isRunning && lappland.isActing) {
    if (lappland.getCurActType() == ActionType.GO) { // 行走时检测
      // 若不在地砖上
      if (foreground.detectOnBlock() < 0) {
        lappland.isActing = false;
        lappland.showShock();
        this.isRunning = false;
        this.isCompleted = true;
        this.isFailure = true;
        this.reason = FailReason.FallFromBlock;
        this.showResultSprite();
        $("#result_log").html("Result: Failure");
        $("#reason_log").html("Reason: Lappland Fall From Block");
        console.log("The End: Fall From Block");
        return;
      }
    }
    if (lappland.getCurActType() == ActionType.COLLECT) { // 收集时检测
      // 若当前地砖没有钻石
      let blockIndex = foreground.detectOnBlock();
      if (blockIndex < 0 || foreground.blocks[blockIndex].itemType != ItemType.Diamond || foreground.blocks[blockIndex].isCollected) {
        lappland.isActing = false;
        this.isRunning = false;
        this.isCompleted = true;
        this.isFailure = true;
        this.reason = FailReason.FailedToCollect;
        this.showResultSprite();
        $("#result_log").html("Result: Failure");
        $("#reason_log").html("Reason: No Diamond To Collect Here");
        console.log("The End: Failed To Collect");
        return;
      }
    }
    if (lappland.getCurActType() == ActionType.SWITCHIT) { // 转换砖块时检测
      // 若当前地砖不能转换
      let blockIndex = foreground.detectOnBlock();
      if (blockIndex < 0 || (foreground.blocks[blockIndex].type != BlockType.Dark && foreground.blocks[blockIndex].type != BlockType.Yellow)) {
        lappland.isActing = false;
        this.isRunning = false;
        this.isCompleted = true;
        this.isFailure = true;
        this.reason = FailReason.FailedToSwitch;
        this.showResultSprite();
        $("#result_log").html("Result: Failure");
        $("#reason_log").html("Reason: No Block To Switch Here");
        console.log("The End: Failed To Switch");
        return;
      }
    }
  }
  // 结束时失败
  if (this.isCompiled && this.isCompleted) {
    if (foreground.collectedNum != foreground.targetDiamNum) { // 宝石数不正确
      this.isFailure = true;
      this.reason = FailReason.EndNotEnough;
      this.showResultSprite();
      $("#result_log").html("Result: Failure");
      $("#reason_log").html("Reason: Collected Diamond Number Is Not Correct");
      console.log("The End: Diamond Not Enough");
      return;
    } else if (foreground.switchOnNum != foreground.targetOnNum) {  // 可变砖块数不正确
      this.isFailure = true;
      this.reason = FailReason.EndNotOn;
      this.showResultSprite();
      $("#result_log").html("Result: Failure");
      $("#reason_log").html("Reason: Switched Block Number Is Not Correct");
      console.log("The End: Switch Not On");
      return;
    } else {
      this.isSuccess = true;
      this.reason = FailReason.None;
      this.showResultSprite();
      $("#result_log").html("Result: Success");
      $("#reason_log").html("Congratulations");
      console.log("The End: Success");
      return;
    }
  }
}

/** 判定用户代码的动作最终结果 */
Puzzle.prototype.showResult = function() {
  if (this.isSuccess || this.isFailure) {
    if (this.resultTime > 0) {
      if (this.resultTime == FinalLappEmoInterval + FinalAppearInterval) { // 初始化Bubble
        lappland.showBubble(this.reason);
      } else if (this.resultTime <= FinalAppearInterval) { // 正在淡出结果
        this.blackboard.alpha += 0.02;
        this.blackboard.alpha = (this.blackboard.alpha > 0.7) ? (0.7) : (this.blackboard.alpha);
        this.resultSprite.alpha += 0.02;
        this.resultSprite.alpha = (this.resultSprite.alpha > 1) ? (1) : (this.resultSprite.alpha);
      }
      this.resultTime -= 1;
    }
  }
}
