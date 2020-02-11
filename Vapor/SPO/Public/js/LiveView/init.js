// 从后端获取的初始设定

// 背景图片左上角的初始位置
var backgroundInitX = 0;
var backgroundInitY = 0;
// Lappland初始位置（像素）
var lappInitX = 300;
var lappInitY = 300;
// Lappland初始坐标 (Cell)（永远在(0, 0)）
let lappInitCellX = 0;
let lappInitCellY = 0;
// Lappland初始方向
var lappInitDirection = 2; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)

var blocks = [];

function initFromServer(data) {
  var block0 = new Block(300, 300);
  var block1 = new Block(408, 300);
  var block2 = new Block(516, 300);
  var block3 = new Block(624, 300);
  var block4 = new Block(732, 300);
  var block5 = new Block(300 + 42, 300 - 48);
  blocks[0] = block5;
  blocks[1] = block0;
  blocks[2] = block1;
  blocks[3] = block2;
  blocks[4] = block3;
  blocks[5] = block4;
}
