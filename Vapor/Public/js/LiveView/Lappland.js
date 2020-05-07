/** Lappland 类，其各个部位以 AnimatedSprite 和 Sprite 实现
 * @constructor
 */
function Lappland() {
  // 方向 [L, U, R, D]
  this.direction = SceneData.puzzle.lappInitDir; // 初始向右
  // 骨骼动画
  this.hair = new PIXI.AnimatedSprite(lappTextures["Hair"][this.direction]);
  this.tail = new PIXI.AnimatedSprite(lappTextures["Tail"][this.direction]);
  this.ribbon = new PIXI.AnimatedSprite(lappTextures["Ribbon"][this.direction]);
  this.face = new PIXI.AnimatedSprite(lappTextures["Face"][this.direction]);
  this.clothes = new PIXI.Sprite(lappTextures["Clothes"][this.direction]);
  this.leg = new PIXI.AnimatedSprite(lappTextures["Leg"][this.direction]);
  this.armb = new PIXI.AnimatedSprite(lappTextures["ArmB"][this.direction]);
  this.armf = new PIXI.AnimatedSprite(lappTextures["ArmF"][this.direction]);
  this.shadow = new PIXI.Sprite(lappTextures["Shadow"][this.direction]);
  this.shock = new PIXI.Sprite(lappTextures["Shock"][this.direction]);
  this.shock.visible = false;
  this.bubble = new PIXI.Sprite(lappTextures["Bubble"][this.direction][5]);
  this.bubble.visible = false;
  // 基本动画
  this.playNormal();
  // 与动画相关的其他属性
  this.legTexture; // 静止状态的腿部图片
  this.armbTexture; // 静止状态的胳膊图片
  this.armfTexture; // 静止状态的胳膊图片
  // 添加到Stage
  this.addToStage();
  // 计时器
  this.timer = 0;
  // 位置
  this.setCell(0, 0, 0);
  this.setPosition();
  // 动作序列
  this.actions = [];
  this.actionIndex = 0; // 当前执行到第几个动作
  this.actionsStr = ""; // 便于调试
  this.restTime = BreakInterval; // 距离开始下一个动画剩余的时间
  this.isActing = false; // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
  // 与动作相关的属性
  this.walkTime = 0; // GO: 行走剩余时间
  this.logTime = LappLogInterval; // LOG: 对话剩余时间
  this.lastDirection = this.direction; // TURN: 上一次的朝向
  this.turnTime = LappTurnInterval; // TURN: 转向剩余时间
  this.turnRotation = Math.PI / 2 * this.direction; // TURN: 转体角度
  this.turnXBia = 0; // TURN: 转向时X方向相机偏移量，用于矫正Block的位置计算
  this.collectTime = LappCollectInterval; // COLLECT: 收集宝石跳跃时间
  this.switchTime = LappSwitchInterval; // SWITCH: 切换砖块时间
  this.isSwitched = false; // SWITCH: 是否切换砖块完成
  console.log("Lappland Added");
}

/** 重置所有属性 */
Lappland.prototype.reset = function() {
  this.setDirection(SceneData.puzzle.lappInitDir); // 初始方向
  this.setCell(0, 0, 0);
  this.setPosition();
  this.playNormal();
  this.shock.visible = false;
  this.bubble.visible = false;
  this.timer = 0;
  this.actions = [];
  this.actionIndex = 0; // 当前执行到第几个动作
  this.actionsStr = ""; // 便于调试
  this.restTime = BreakInterval; // 距离开始下一个动画剩余的时间
  this.isActing = false; // 是否正在动作中，配合着 puzzle.isRunning 鉴定当前状态
  this.walkTime = 0; // GO: 行走剩余时间
  this.logTime = LappLogInterval; // LOG: 对话剩余时间
  this.lastDirection = this.direction; // TURN: 上一次的朝向
  this.turnTime = LappTurnInterval; // TURN: 转向剩余时间
  this.turnXBia = 0; // TURN: 转向时X方向相机偏移量，用于矫正Block的位置计算
  this.collectTime = LappCollectInterval; // COLLECT: 收集宝石跳跃时间
  this.switchTime = LappSwitchInterval; // SWITCH: 切换砖块时间
  this.isSwitched = false; // SWITCH: 是否切换砖块完成
  console.log("Lappland Reset");
}

/** 强制改变绘制位置，偏移量为 dx, dy */
Lappland.prototype.setTempPosition = function(dx, dy) {
  let x = CameraX[this.direction] + dx;
  let y = CameraY + dy;
  this.hair.position.set(x, y);
  this.tail.position.set(x, y);
  this.ribbon.position.set(x, y);
  this.face.position.set(x, y);
  this.clothes.position.set(x, y);
  this.leg.position.set(x, y);
  this.armb.position.set(x, y);
  this.armf.position.set(x, y);
  this.shadow.position.set(x, y + LappShadowYBia);
  this.shock.position.set(x, y);
  let sign = (this.direction == 2 || this.direction == 1) ? (1) : (-1);
  this.bubble.position.set(x + sign * LappBubbleXBia, y + LappBubbleYBia);
}

/** 确定当前应该的绘制位置 */
Lappland.prototype.setPosition = function() {
  this.setTempPosition(0, 0);
}

/** 设置Cell位置 */
Lappland.prototype.setCell = function(x, y, z) {
  this.cellX = x;
  this.cellY = y;
  this.cellZ = z;
}

/** 设置方向 */
Lappland.prototype.setDirection = function(dir) {
  this.lastDirection = this.direction;
  this.direction = dir;
  this.hair.textures = lappTextures["Hair"][this.direction];
  this.tail.textures = lappTextures["Tail"][this.direction];
  this.ribbon.textures = lappTextures["Ribbon"][this.direction];
  this.face.textures = lappTextures["Face"][this.direction];
  this.clothes.texture = lappTextures["Clothes"][this.direction];
  this.leg.textures = lappTextures["Leg"][this.direction];
  this.armb.textures = lappTextures["ArmB"][this.direction];
  this.armf.textures = lappTextures["ArmF"][this.direction];
  this.shadow.texture = lappTextures["Shadow"][this.direction];
  this.shock.texture = lappTextures["Shock"][this.direction];
  this.bubble.texture = lappTextures["Bubble"][this.direction][5];
  this.playNormal();
}

/** 设置图层位置（当前所在的砖块的上一层） */
Lappland.prototype.setZIndex = function() {
  let blockIndex = foreground.detectOnBlock();
  if (blockIndex >= 0) {
    let blockZ = foreground.blocks[blockIndex].blockSprite.zIndex; // 当前所在砖块的图层
    this.shadow.zIndex = blockZ + 3;
    this.tail.zIndex = blockZ + 4;
    this.armb.zIndex = blockZ + 5;
    this.leg.zIndex = blockZ + 6;
    this.face.zIndex = blockZ + 7;
    this.clothes.zIndex = blockZ + 8;
    this.ribbon.zIndex = blockZ + 9;
    this.armf.zIndex = blockZ + 10;
    this.hair.zIndex = blockZ + 11;
    this.shock.zIndex = blockZ + 12;
    this.bubble.zIndex = blockZ + 13;
  }
}

/** 添加所有组件到Stage */
Lappland.prototype.addToStage = function() {
  this.shadow.alpha = 0.3;
  this.shadow.anchor.set(0.5);
  Stage.addChild(this.shadow);
  this.tail.anchor.set(0.5);
  Stage.addChild(this.tail);
  this.armb.anchor.set(0.5);
  Stage.addChild(this.armb);
  this.leg.anchor.set(0.5);
  Stage.addChild(this.leg);
  this.face.anchor.set(0.5);
  Stage.addChild(this.face);
  this.clothes.anchor.set(0.5);
  Stage.addChild(this.clothes);
  this.ribbon.anchor.set(0.5);
  Stage.addChild(this.ribbon);
  this.armf.anchor.set(0.5);
  Stage.addChild(this.armf);
  this.hair.anchor.set(0.5);
  Stage.addChild(this.hair);
  this.shock.anchor.set(0.5);
  Stage.addChild(this.shock);
  this.bubble.anchor.set(0.5);
  Stage.addChild(this.bubble);
}

/** 基本动画 */
Lappland.prototype.playNormal = function() {
  this.hair.loop = true;
  this.hair.animationSpeed = 0.09;
  this.hair.play();
  this.tail.loop = true;
  this.tail.animationSpeed = 0.09;
  this.tail.play();
  this.ribbon.loop = true;
  this.ribbon.animationSpeed = 0.09;
  this.ribbon.play();
}

/** 行走动画 -- 开始 */
Lappland.prototype.playWalk = function() {
  // 删除第一个元素
  this.legTexture = this.leg.textures.shift();
  this.armbTexture = this.armb.textures.shift();
  this.armfTexture = this.armf.textures.shift();
  // 开启动画
  this.leg.loop = true;
  this.leg.animationSpeed = 0.24;
  this.leg.play();
  this.armb.loop = true;
  this.armb.animationSpeed = 0.24;
  this.armb.play();
  this.armf.loop = true;
  this.armf.animationSpeed = 0.24;
  this.armf.play();
}

/** 行走动画 -- 停止 */
Lappland.prototype.stopWalk = function() {
  let frameNum = this.leg.textures.length;
  if (this.leg.currentFrame == frameNum - 1) { // 可以停止，并添加 0 号帧
    this.leg.textures.unshift(this.legTexture);
    this.armb.textures.unshift(this.armbTexture);
    this.armf.textures.unshift(this.armfTexture);
    this.leg.gotoAndStop(0);
    this.armb.gotoAndStop(0);
    this.armf.gotoAndStop(0);
    return true;
  } else { // 不能停止
    return false;
  }
}

/** 终止一切动画 */
Lappland.prototype.stopAll = function() {
  this.hair.stop();
  this.tail.stop();
  this.ribbon.stop();
  this.leg.stop();
  this.armb.stop();
  this.armf.stop();
}

/** 失足惊吓动画 */
Lappland.prototype.showShock = function() {
  // 归还行走缺失的帧
  this.leg.textures.unshift(this.legTexture);
  this.armb.textures.unshift(this.armbTexture);
  this.armf.textures.unshift(this.armfTexture);
  this.stopAll();
  this.shock.visible = true;
  console.log("Lappland is Shocked");
}

/** 显示结果气泡动画 */
Lappland.prototype.showBubble = function(index) {
  this.bubble.texture = lappTextures["Bubble"][this.direction][index];
  this.bubble.visible = true;
  console.log("Show Bubble: " + bubbleImg[index]);
}

/** 获取当前动作类型 */
Lappland.prototype.getCurActType = function() {
  if (this.actionIndex < this.actions.length){
    return this.actions[this.actionIndex].type;
  } else {
    return ActionType.NONE;
  }
}

/** 刷新时的操作 */
Lappland.prototype.update = function() {
  // 眨眼动画
  this.timer += 1;
  if (this.timer >= 400) {
    this.timer %= 400;
    // 眨一次眼
    this.face.loop = false;
    this.face.animationSpeed = 0.18;
    this.face.gotoAndPlay(0);
  }
  // 其他动作动画
  if (puzzle.isRunning) {
    let currentAction = this.actions[this.actionIndex];
    if (this.isActing) { // 正在动作
      let isFinished = false;
      switch (currentAction.type) {
        case ActionType.GO:
          if (this.walkTime > 0) {
            this.walkTime -= 1;
            let dis = 1 / LappWalkInterval;
            switch (this.direction) {
              case 0: this.cellX -= dis; break; // Left
              case 1: this.cellY -= dis; break;  // Up
              case 2: this.cellX += dis; break; // Right
              case 3: this.cellY += dis; break; // Down
              default: console.log("Error: No Direction");
            }
            this.setZIndex(); // 换图层
          } else { // 动作结束
            if (this.stopWalk()) { // 成功停止
              isFinished = true;
            } // 否则延迟停止
          }
          break;
        case ActionType.TURN:
          if (this.turnTime > 0) {
            this.turnTime -= 1;
            if (this.direction != this.lastDirection && this.direction + this.lastDirection != 3) {
              // 缓慢移动相机焦点
              let sign = (this.direction == 2 || this.direction == 1) ? (1) : (-1); // 是否移向左焦点
              this.turnXBia = sign * CameraLRSpace * this.turnTime / LappTurnInterval;
              this.setTempPosition(this.turnXBia, 0);
            }
            // 计算转体角度
            let rotationBia = this.direction - this.lastDirection;
            if (rotationBia < -2) rotationBia += 4;
            if (rotationBia > 2) rotationBia -= 4; // 保证旋转角<180度
            rotationBia *= Math.PI / 2;
            this.turnRotation = Math.PI / 2 * this.direction - rotationBia * this.turnTime / LappTurnInterval;
          } else { // 动作结束
            this.setPosition();
            this.turnXBia = 0;
            this.turnRotation = Math.PI / 2 * this.direction;
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
              this.cellZ += LappJumpZA * pastCollectTime / LappJumpInterval;
              // 在最高点时刻钻石开始缩小
              if (pastCollectTime == LappJumpInterval - 1) {
                foreground.tryCollect();
              }
            } else if (pastCollectTime < 2 * LappJumpInterval) { // 正在落下: LappJumpInterval ~ 2 * LappJumpInterval - 1
              this.cellZ -= LappJumpZA * (pastCollectTime - LappJumpInterval) / LappJumpInterval;
              // 落地时把cellZ置为整数以免误差的叠加
              if (pastCollectTime == 2 * LappJumpInterval - 1) {
                this.cellZ = Math.round(this.cellZ);
              }
            }
            this.setTempPosition(0, ZBia * this.cellZ);
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
        this.isActing = false; // 先休息
        this.restTime = BreakInterval;
      }
    } else { // 正在休息
      if (this.restTime > 0) {
        this.restTime -= 1;
      } else if (this.actionIndex >= this.actions.length) { // 到达最后一个动作了
        puzzle.isRunning = false;
        puzzle.isCompleted = true; // 开启结算
      } else { // 休息结束（this.actionIndex已经指向了接下来的动作序号）
        // 初始化动作
        switch (currentAction.type) {
          case ActionType.GO:
            this.walkTime = currentAction.d * LappWalkInterval;
            this.playWalk();
            console.log("Start Walking");
            break;
          case ActionType.TURN:
            this.turnTime = LappTurnInterval;
            this.setDirection(currentAction.dir);
            if (this.direction != this.lastDirection && this.direction + this.lastDirection != 3){
              let sign = (this.direction == 2 || this.direction == 1) ? (1) : (-1); // 是否移向左焦点
              this.turnXBia = sign * CameraLRSpace;
            }
            console.log("Start Turning");
            break;
          case ActionType.LOG:
            this.logTime = LappLogInterval;
            let message = currentAction.log;
            toastReplaceRule(CanvasPixi.getBoundingClientRect().x, CanvasPixi.getBoundingClientRect().y, message.length);
            M.toast({html: message, displayLength: LappLogInterval * 16.7, classes: "rounded my-toast"});
            console.log("Start Speaking");
            break;
          case ActionType.COLLECT:
            this.collectTime = LappCollectInterval;
            console.log("Start Collecting");
            break;
          case ActionType.SWITCHIT:
            this.switchTime = LappSwitchInterval;
            this.isSwitched = false;
            console.log("Start Switching");
            break;
          default: // 无动作
            console.log("Error: No Action to Perform Now");
        }
        this.isActing = true;
      }
    }
  } else { // puzzle.isRunning = false
    if (foreground) this.setZIndex(); // 确认图层
  }
}
