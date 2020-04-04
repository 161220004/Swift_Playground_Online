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
  // 仅当一轮结束或未开始时可以开始运行
  if (puzzle.isCompleted || (!puzzle.isCompiled && !puzzle.isCompiling && !puzzle.isCompleted)) {
    // 重置LiveView
    resetLiveView();
    // 封装传给后端的数据
    let runInfo = Object();
    runInfo.code = editor.getValue();
    runInfo.dir = lappland.direction;
    // $("#test_live_view").html("Running...")
    // 等待后端处理
    puzzle.isCompiling = true;
    puzzle.playLoadingSprite();
    $.post("/spo/" + PID + "/code", JSON.stringify(runInfo), function(data) {
      // alert("Get Result: \n" + JSON.stringify(data));
      console.log("Run !");
      // 解析结果并开启动画
      puzzle.getActions(data);
      puzzle.performActions();
      // Test: 更改LiveView区内容为后端返回的data
      // $("#test_live_view").html(JSON.stringify(data))
    })
  } else {
    alert("请在未开始编译或动画运行完全结束后开始新的一次尝试～");
  }
});
