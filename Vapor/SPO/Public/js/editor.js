(function($){
  $(function(){

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
      var code = Object();
      code.lines = editor.getValue();
      alert("Get Value: \n" + $("#test_live_view").html());
      $.post("/spo/p0/code", JSON.stringify(code), function(data){
        // Get放在Post内，确保编译运行结束后才从后端取结果
        $.get("/spo/p0/result", function(data){
          $('.result').html(data);
          alert("Get Result: \n" + JSON.stringify(data));
          // Test: 更改LiveView区内容为后端返回的data
          $("#test_live_view").html(JSON.stringify(data))
        })
      })
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space
