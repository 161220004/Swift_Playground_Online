// 查看地图按钮
$("#view_map").click(function() {
  if (!puzzle.isCompiling && !puzzle.isCompleted) {
    if (puzzleMap) puzzleMap.isVisible = !puzzleMap.isVisible;
  }
});

// 重置按钮
$("#restart").click(function() {
  // 仅当一轮结束或未开始时可以重置LiveView
  if (puzzle.isCompleted || (!puzzle.isCompiled && !puzzle.isCompiling && !puzzle.isCompleted)) {
    console.log("Restart !");
    resetLiveView();
  }
});
