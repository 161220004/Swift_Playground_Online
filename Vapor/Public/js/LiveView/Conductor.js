/** Conductor 类，作为用户所有指令的指挥者
 * @constructor
 */
function Conductor() {
  // 全部指令集
  this.actions = [];
  this.actionIndex = 0; // 当前执行到第几个动作
  this.actionsStr = ""; // 便于调试
  this.restTime = BreakInterval; // 距离开始下一个动画剩余的时间
  // Lappland动作相关
  this.lappIsActing = false;  // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
  this.walkTime = 0; // GO: 行走剩余时间
  this.logTime = LappLogInterval; // LOG: 对话剩余时间
  this.turnTime = LappTurnInterval; // TURN: 转向剩余时间
  this.turnRotation = Math.PI / 2 * SceneData.puzzle.lappInitDir; // TURN: 转体角度
  this.turnXBia = 0; // TURN: 转向时X方向相机偏移量，用于矫正Block的位置计算
  this.collectTime = LappCollectInterval; // COLLECT: 收集宝石跳跃时间
  this.switchTime = LappSwitchInterval; // SWITCH: 切换砖块时间
  this.isSwitched = false; // SWITCH: 是否切换砖块完成
  // 场景指令相关
  this.sceneIsActing = false;  // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
}

/** 重置所有属性 */
Conductor.prototype.reset = function() {
  this.actions = [];
  this.actionIndex = 0; // 当前执行到第几个动作
  this.actionsStr = ""; // 便于调试
  this.restTime = BreakInterval; // 距离开始下一个动画剩余的时间
  this.lappIsActing = false; // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
  this.walkTime = 0; // GO: 行走剩余时间
  this.logTime = LappLogInterval; // LOG: 对话剩余时间
  this.turnTime = LappTurnInterval; // TURN: 转向剩余时间
  this.turnXBia = 0; // TURN: 转向时X方向相机偏移量，用于矫正Block的位置计算
  this.collectTime = LappCollectInterval; // COLLECT: 收集宝石跳跃时间
  this.switchTime = LappSwitchInterval; // SWITCH: 切换砖块时间
  this.isSwitched = false; // SWITCH: 是否切换砖块完成

  this.sceneIsActing = false;  // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
}

/** 获取当前动作类型 */
Conductor.prototype.getCurActType = function() {
  if (this.actionIndex < this.actions.length){
    return this.actions[this.actionIndex].type;
  } else {
    return ActionType.NONE;
  }
}

/** 刷新Lappland动作 */
Conductor.prototype.updateLappland = function() {
  if (puzzle.isRunning) {
    let currentAction = this.actions[this.actionIndex];
    if (this.lappIsActing) { // Lappland正在动作
      let isFinished = false;
      switch (currentAction.type) {
        case ActionType.GO:
          if (this.walkTime > 0) {
            this.walkTime -= 1;
            let dis = 1 / LappWalkInterval;
            switch (lappland.direction) {
              case 0: lappland.cellX -= dis; break; // Left
              case 1: lappland.cellY -= dis; break;  // Up
              case 2: lappland.cellX += dis; break; // Right
              case 3: lappland.cellY += dis; break; // Down
              default: console.log("Error: No Direction");
            }
            lappland.setZIndex(); // 换图层
          } else { // 动作结束
            if (lappland.stopWalk()) { // 成功停止
              isFinished = true;
            } // 否则延迟停止
          }
          break;
        case ActionType.TURN:
          if (this.turnTime > 0) {
            this.turnTime -= 1;
            if (lappland.direction != lappland.lastDirection && lappland.direction + lappland.lastDirection != 3) {
              // 缓慢移动相机焦点
              let sign = (lappland.direction == 2 || lappland.direction == 1) ? (1) : (-1); // 是否移向左焦点
              this.turnXBia = sign * CameraLRSpace * this.turnTime / LappTurnInterval;
              lappland.setTempPosition(this.turnXBia, 0);
            }
            // 转体角度，旋转角-180~180度
            let rotationBia = currentAction.dir * Math.PI / 2;
            this.turnRotation = Math.PI / 2 * lappland.direction - rotationBia * this.turnTime / LappTurnInterval;
          } else { // 动作结束
            lappland.setPosition();
            this.turnXBia = 0;
            this.turnRotation = Math.PI / 2 * lappland.direction;
            isFinished = true;
          }
          break;
        case ActionType.LOG:
          if (this.logTime > 0) {
            this.logTime -= 1
          } else { // 动作结束
            isFinished = true;
          }
          break;
        case ActionType.COLLECT:
          if (this.collectTime > 0) {
            let pastCollectTime = LappCollectInterval - this.collectTime; // 从 0 递增到 LappCollectInterval-1
            if (pastCollectTime < LappJumpInterval) { // 正在跳起: 0 ~ LappJumpInterval - 1
              lappland.cellZ += LappJumpZA * pastCollectTime / LappJumpInterval;
              // 在最高点时刻钻石开始缩小
              if (pastCollectTime == LappJumpInterval - 1) {
                foreground.tryCollect();
              }
            } else if (pastCollectTime < 2 * LappJumpInterval) { // 正在落下: LappJumpInterval ~ 2 * LappJumpInterval - 1
              lappland.cellZ -= LappJumpZA * (pastCollectTime - LappJumpInterval) / LappJumpInterval;
              // 落地时把cellZ置为整数以免误差的叠加
              if (pastCollectTime == 2 * LappJumpInterval - 1) {
                lappland.cellZ = Math.round(lappland.cellZ);
              }
            }
            lappland.setTempPosition(0, ZBia * lappland.cellZ);
            this.collectTime -= 1;
          } else { // 动作结束
            isFinished = true;
          }
          break;
        case ActionType.SWITCHIT:
          if (this.switchTime > 0) {
            this.switchTime -= 1;
            if (Math.random() < 0.9 - this.switchTime * 0.02) {
              foreground.trySwitch();
              this.isSwitched = !this.isSwitched;
            }
          } else { // 动作结束
            if (!this.isSwitched) foreground.trySwitch();
            if (foreground.targetOnNum != -1) {
              console.log("Block Switched (" + foreground.switchOnNum + "/" + foreground.targetOnNum + ")");
            } else {
              console.log("Block Switched (" + foreground.switchOnNum + "/" + foreground.totalSwitchNum + ")");
            }
            isFinished = true;
          }
          break;
        default: // 无动作
          console.log("Error: No Action to Perform Now");
      }
      if (isFinished) { // 若当前动作结束
        console.log("Finish Action [" + this.actionIndex + "]");
        this.actionIndex += 1; // 下一个动作
        this.lappIsActing = false; // 先休息
        this.restTime = BreakInterval;
      }
    } else if (this.sceneIsActing) { // Scene动作

    } else { // 正在休息
      if (this.restTime > 0) {
        this.restTime -= 1;
      } else if (this.actionIndex >= this.actions.length) { // 到达最后一个动作了
        puzzle.isRunning = false;
        puzzle.isCompleted = true; // 开启结算
      } else { // 休息结束（this.actionIndex已经指向了接下来的动作序号）
        // 初始化Lappland动作或Scene动作
        switch (currentAction.type) {
          case ActionType.GO:
            this.lappIsActing = true;
            this.walkTime = currentAction.d * LappWalkInterval;
            lappland.playWalk();
            console.log("Start Walking");
            break;
          case ActionType.TURN:
            this.lappIsActing = true;
            this.turnTime = LappTurnInterval;
            let targetDirection = (lappland.direction + currentAction.dir + 4) % 4;
            lappland.setDirection(targetDirection);
            if (lappland.direction != lappland.lastDirection && lappland.direction + lappland.lastDirection != 3){
              let sign = (lappland.direction == 2 || lappland.direction == 1) ? (1) : (-1); // 是否移向左焦点
              this.turnXBia = sign * CameraLRSpace;
            }
            console.log("Start Turning");
            break;
          case ActionType.LOG:
            this.lappIsActing = true;
            this.logTime = LappLogInterval;
            let message = currentAction.log;
            toastReplaceRule(CanvasPixi.getBoundingClientRect().x, CanvasPixi.getBoundingClientRect().y, message.length);
            M.toast({html: message, displayLength: LappLogInterval * 16.7, classes: "rounded my-toast"});
            console.log("Start Speaking");
            break;
          case ActionType.COLLECT:
            this.lappIsActing = true;
            this.collectTime = LappCollectInterval;
            console.log("Start Collecting");
            break;
          case ActionType.SWITCHIT:
            this.lappIsActing = true;
            this.switchTime = LappSwitchInterval;
            this.isSwitched = false;
            console.log("Start Switching");
            break;
          default: // 无动作
            console.log("Error: No Action to Perform Now");
        }
      }
    }
  }
}
