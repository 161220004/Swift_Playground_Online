// Materialize 初始化一些控件
$(function(){ // document ready

  // 导航栏的Links变到侧边栏（浏览器窗口过窄的情况）
  $('.sidenav').sidenav();
  $('.fixed-action-btn').floatingActionButton(/*{direction: 'right'}*/);

  // 题干的Tips
  $('.collapsible').collapsible();

  // 运行信息对话框
  $('.modal').modal();
});
