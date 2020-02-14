// 用于探测当前与Lappland最接近的一块地砖，返回该地砖下标
function detectNearBlock() {
  var index = 0;
  for (var i = 0; i < blocks.length; i++) {
    var dcx = blocks[index].cellX - lappland.cellX;
    var dcy = blocks[index].cellY - lappland.cellY;
    var dcxi = blocks[i].cellX - lappland.cellX;
    var dcyi = blocks[i].cellY - lappland.cellY;
    if (dcxi * dcxi + dcyi * dcyi < dcx * dcx + dcy * dcy) {
      index = i;
    }
  }
  return index;
}

// 用于探测Lappland当前是否处于任意一块地砖上，是则返回该地砖下标，否则返回-1
function detectOnBlock() {
  // 出界标准：左右超过cell长60%，上下超过cell高60%
  var index = detectNearBlock();
  if (Math.abs(blocks[index].cellX - lappland.cellX) < 0.6
      && Math.abs(blocks[index].cellY - lappland.cellY) < 0.6) {
    return index;
  } else {
    return -1;
  }
}
