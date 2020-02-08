(function($){

  // 初始化变量
  function init() {
    // 初始化Canvas
    canvasBack = $("#canvas_back")[0]; // DOM对象
    ctxtB = canvasBack.getContext('2d');
    canvasItems = $("#canvas_items")[0];
    ctxtI = canvasItems.getContext('2d');
    canvasLappB = $("#canvas_L_b")[0];
    ctxtLB = canvasLappB.getContext('2d');
    canvasLappM = $("#canvas_L_m")[0];
    ctxtLM = canvasLappM.getContext('2d');
    canvasLappC = $("#canvas_L_c")[0];
    ctxtLC = canvasLappC.getContext('2d');
    canvasLappF = $("#canvas_L_f")[0];
    ctxtLF = canvasLappF.getContext('2d');
    // 获取尺寸
    canvasWidth = canvasBack.width;
    canvasHeight = canvasBack.height;

    // 初始化图片
    backgroundImg = $("#img_bg")[0]; // DOM对象
    rLappHairImg = [$("#imgr_h_0")[0], $("#imgr_h_1")[0], $("#imgr_h_2")[0],
                    $("#imgr_h_2")[0], $("#imgr_h_1")[0], $("#imgr_h_0")[0]];
    rLappTailImg = [$("#imgr_t_0")[0], $("#imgr_t_1")[0], $("#imgr_t_2")[0],
                    $("#imgr_t_2")[0], $("#imgr_t_1")[0], $("#imgr_t_0")[0]];
    rLappRibbonImg = [$("#imgr_r_0")[0], $("#imgr_r_1")[0], $("#imgr_r_2")[0],
                      $("#imgr_r_2")[0], $("#imgr_r_1")[0], $("#imgr_r_0")[0]];
    rLappFaceImg = [$("#imgr_f_0")[0], $("#imgr_f_1")[0], $("#imgr_f_2")[0], $("#imgr_f_1")[0]];
    rLappClothesImg = $("#imgr_cl")[0];
    rLappLegImg = [$("#imgr_l_0")[0], $("#imgr_l_1")[0], $("#imgr_l_2")[0],
                   $("#imgr_l_3")[0], $("#imgr_l_4")[0], $("#imgr_l_5")[0],
                   $("#imgr_l_6")[0], $("#imgr_l_5")[0], $("#imgr_l_4")[0],
                   $("#imgr_l_3")[0], $("#imgr_l_2")[0], $("#imgr_l_1")[0]];
    rLappArmBnImg = $("#imgr_ab")[0];
    rLappArmBImg = [$("#imgr_ab_0")[0], $("#imgr_ab_1")[0], $("#imgr_ab_2")[0],
                    $("#imgr_ab_3")[0], $("#imgr_ab_4")[0], $("#imgr_ab_5")[0],
                    $("#imgr_ab_6")[0], $("#imgr_ab_5")[0], $("#imgr_ab_4")[0],
                    $("#imgr_ab_3")[0], $("#imgr_ab_2")[0], $("#imgr_ab_1")[0]];
    rLappArmFnImg = $("#imgr_af")[0];
    rLappArmFImg = [$("#imgr_af_0")[0], $("#imgr_af_1")[0], $("#imgr_af_2")[0],
                    $("#imgr_af_3")[0], $("#imgr_af_4")[0], $("#imgr_af_5")[0],
                    $("#imgr_af_6")[0], $("#imgr_af_5")[0], $("#imgr_af_4")[0],
                    $("#imgr_af_3")[0], $("#imgr_af_2")[0], $("#imgr_af_1")[0]];

    // 初始化对象
    lappland = new Lappland();
    lappland.init();

    // 初始化时间间隔计数器
    loopCount = 1;
    lastStamp = Date.now();
    interval = 0;
  }

  function drawBackground() {
    ctxtB.drawImage(backgroundImg, 0, 0, canvasWidth, canvasHeight);

  }

  function gameloop() {
    requestAnimFrame(gameloop);
    // 计时
    loopCount += 1;
    var nowStamp = Date.now();
    interval = nowStamp - lastStamp;
    lastStamp = nowStamp;
    if (loopCount % 600 == 0) {
      console.log(loopCount);
      console.log(interval/1000); // 单位：s
    }
    // console.log("loop");
    // 清空旧图像
    ctxtI.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxtLB.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxtLM.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxtLC.clearRect(0, 0, canvasWidth, canvasHeight);
    ctxtLF.clearRect(0, 0, canvasWidth, canvasHeight);
    // 绘制对象
    lappland.draw();
  }

  $(function(){
    init();
    drawBackground();
    gameloop();
  }); // end of document ready

})(jQuery); // end of jQuery name space
