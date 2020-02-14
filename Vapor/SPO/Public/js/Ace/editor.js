// 编辑器相关设置：
var editor = ace.edit("pz_editor");
// 主题风格
editor.setTheme("ace/theme/tomorrow_night_eighties");
// 当前语言Swift
editor.getSession().setMode('ace/mode/swift');
// 光标行高亮
editor.setHighlightActiveLine(true);
// 设置字体大小
editor.setFontSize(14);
// 开启代码折叠
editor.getSession().setUseWrapMode(true);
editor.getSession().setUseSoftTabs(true);
// 开启代码自动补全
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});

// “Run”按钮点击事件
$("#run_code").click(function(){
  loopCount = 0;
  // 重置LiveView
  init();
  // 封装传给后端的数据
  var runInfo = Object();
  runInfo.code = editor.getValue();
  runInfo.dir = currentDirection;
  // $("#test_live_view").html("Running...")
  // 等待后端处理
  isCompiling = true;
  $.post("/spo/" + pid + "/code", JSON.stringify(runInfo), function(data) {
    // alert("Get Result: \n" + JSON.stringify(data));
    // 解析结果并开启动画
    initActionsFromServer(data);
    performActions();
    // Test: 更改LiveView区内容为后端返回的data
    // $("#test_live_view").html(JSON.stringify(data))
  })
});
