// 从后端获取的初始设定

// 背景图片左上角的初始位置
var backInitX = 0;
var backInitY = 0;
// 地砖初始位置（像素）
var blockInitX = 300;
var blockInitY = 300;
// Lappland初始位置（像素）
var lappInitX = 300;
var lappInitY = 300;
// Lappland初始坐标 (Cell)（永远在(0, 0)）
const lappInitCellX = 0;
const lappInitCellY = 0;
const lappInitCellZ = 0;
// Lappland初始方向
var lappInitDir = 2; // 朝向方向 (0: Left, 1: Up, 2: Right, 3: Down)

var blocks = [];

function initFromServer(data) {
  console.log("Init Data From Server");
  // 按id排序，确认绘制顺序
  let blocksFromServer = data.blocks;
  function compareBlockId(block1, block2){
    return block1.id - block2.id;
  }
  blocksFromServer.sort(compareBlockId);
  // 获取block数组，以及宝石总数
  blocks = [];
  for (let i = 0; i < blocksFromServer.length; i++) {
    let block = new Block(blocksFromServer[i].type, blocksFromServer[i].cellX, blocksFromServer[i].cellY, blocksFromServer[i].item);
    if (block.item == ItemType.Diamond) {
      puzzleMsg.totalNum += 1; // 宝石总数
    }
    blocks[i] = block;
  }
  // 获取其他初始值
  let puzzleInfoFromServer = data.puzzle;
  backInitX = puzzleInfoFromServer.backInitX;
  backInitY = puzzleInfoFromServer.backInitY;
  blockInitX = puzzleInfoFromServer.blockInitX;
  blockInitY = puzzleInfoFromServer.blockInitY;
  lappInitX = puzzleInfoFromServer.lappInitX;
  lappInitY = puzzleInfoFromServer.lappInitY;
  lappInitDir = puzzleInfoFromServer.lappInitDir;
  console.log(puzzleInfoFromServer.description);
}
