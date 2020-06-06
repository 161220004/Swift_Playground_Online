// 查看地图按钮
$("#view_map").click(function() {
  puzzleMap.isVisible = !puzzleMap.isVisible;
});

// 重置按钮
$("#restart").click(function() {
  if (puzzle.isCompiling) {
    alert("请在未开始编译时或动画运行后开始新的一次尝试～");
  } else {
    console.log("Restart !");
    resetLiveView();
    puzzleMap.isVisible = false;
  }
});
