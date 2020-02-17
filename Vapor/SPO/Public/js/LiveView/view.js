// 初始化整个场景
function init() {
  // 初始化对象
  puzzleStatus = new PuzzleStatus();
  puzzleMsg = new PuzzleMsg();
  camera = new Camera();
  lappland = new Lappland();
  lappland.init();

  // GET方法从后端获取数据
  $.get("/spo/" + pid + "/scene", function(data, status) {
    // alert("Get Scene " + pid + ": \n" + JSON.stringify(data));
    // 利用后端得到的数据初始化
    initFromServer(data)
  })

  // 初始化时间间隔计数器
  loopCount = 1;
  lastStamp = Date.now();
  interval = 0;
}

function gameloop() {
  requestAnimFrame(gameloop);
  // 计时
  loopCount += 1;
  var nowStamp = Date.now();
  interval = nowStamp - lastStamp;
  lastStamp = nowStamp;
  if (loopCount % 1200 == 0) {
    // M.toast({html: "Hello?", classes: "rounded my-toast-test"});
    console.log(loopCount);
  }
  // 清空旧图像
  ctxtB.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtF.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtI.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtS.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtLB.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtLM.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtLC.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtLF.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtCtn.clearRect(0, 0, canvasWidth, canvasHeight);
  ctxtMsg.clearRect(0, 0, canvasWidthAdd, canvasHeight);
  // 绘制背景
  drawBackground();
  // 绘制前景
  for (var i = 0; i < blocks.length; i++) {
    blocks[i].draw();
    blocks[i].drawDiamond();
  }
  // 绘制对象
  lappland.draw();
  // 绘制Puzzle信息
  puzzleMsg.drawInfo();
  // 查看小地图
  puzzleMsg.viewMap();
  // 绘制加载动画
  puzzleMsg.drawLoading();
  // 检测状态：是否成功/失败，并结算成果
  puzzleStatus.judge();
  // 绘制通关/失败动画
  puzzleMsg.drawResult();
}

$(function(){ // document ready
  init();
  gameloop();
});
