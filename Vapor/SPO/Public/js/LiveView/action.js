/** 枚举类型： 动作类型，包括: "GO", "LOG", "TURN", "COLLECT", ... */
var ActionType = {
  NONE: "NONE",
  GO: "GO",
  LOG: "LOG",
  TURN: "TURN",
  COLLECT: "COLLECT",
}

/** Action 类，描述Lappland动作要素
 * @constructor
 */
function Action(type, d, dir, log) {
  this.type = type;
  this.d = d; // 行走距离
  this.dir = dir; // 接下来的朝向
  this.log = log; // 语句
}
