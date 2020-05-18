/** 枚举类型： 动作类型，包括: "GO", "LOG", "TURN", "COLLECT", ... */
var ActionType = {
  NONE: "NONE",
  // Lappland
  GO: "GO",
  LOG: "LOG",
  TURN: "TURN",
  COLLECT: "COLLECT",
  SWITCHIT: "SWITCHIT",
  // Scene
  BLOCK: "BLOCK",
  BLOCKSWITCH: "SWITCH",
  BLOCKINIT: "INIT",
}

/** Action 类，描述Lappland动作要素
 * @constructor
 */
function Action(type, d, dir, log, pos, b) {
  this.type = type;
  this.d = d; // 行走距离
  this.dir = dir; // 接下来的朝向
  this.log = log; // 语句
  // Block类
  this.pos = pos; // Block位置
  this.b = b; // Block行为
}
