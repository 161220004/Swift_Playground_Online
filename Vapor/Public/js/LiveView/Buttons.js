// 查看地图按钮
$("#view_map").click(function() {
  puzzleMap.isVisible = !puzzleMap.isVisible;
});

// 重置按钮
$("#restart").click(function() {
  console.log("Restart !");
  resetLiveView();
  puzzleMap.isVisible = false;
});
