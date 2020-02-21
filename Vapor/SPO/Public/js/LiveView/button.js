// 查看地图按钮
$("#view_map").click(function() {
  if (!puzzleStatus.isCompiling && !puzzleStatus.isCompleted) {
    puzzleMsg.isViewingMap = !puzzleMsg.isViewingMap;
  }
});

// 重置按钮
$("#restart").click(function() {
  // 仅当一轮结束或未开始时可以重置
  if (puzzleStatus.isTheEnd || (!puzzleStatus.isCompiled && !puzzleStatus.isCompiling &&!puzzleStatus.isCompleted)) {
    // 重置LiveView
    init();
  }
});
