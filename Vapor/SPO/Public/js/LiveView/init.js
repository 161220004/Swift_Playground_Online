// 从后端获取的初始位置设定

var backgroundInitX = 0;
var backgroundInitY = 0;

var lappInitX = 300;
var lappInitY = 300;
var lappInitDirection = 2; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)

var blocks = [];

function initFromServer() {
  var block0 = new Block(300, 300);
  var block1 = new Block(408, 300);
  var block2 = new Block(516, 300);
  var block3 = new Block(624, 300);
  var block4 = new Block(732, 300);
  blocks[0] = block0;
  blocks[1] = block1;
  blocks[2] = block2;
  blocks[3] = block3;
  blocks[4] = block4;
}
