(function($){
  $(function(){

    // 导航栏的Links变到侧边栏（浏览器窗口过窄的情况）
    $('.sidenav').sidenav();

    // 关卡选择按钮级（固定，左下角）
    $(document).ready(function(){
      $('.fixed-action-btn').floatingActionButton(/*{direction: 'right'}*/);
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
