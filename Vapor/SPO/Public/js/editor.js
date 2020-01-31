var editor = ace.edit("pz_editor");
// 设置代码编辑器主题套装
editor.setTheme("ace/theme/idle_fingers");
// 设置当前编辑器支持的语言（似乎一次只能选一种语言，我暂时未找到一次支持多语言的写法）
editor.getSession().setMode('ace/mode/swift');
// 不使用检查者（解决下面的bug我才使用的这个）
editor.getSession().setUseWorker(false);
// 设置光标所在的激活行是否高亮
editor.setHighlightActiveLine(true);
// 设置代码的字体大小
editor.setFontSize(14);
// 设置是否开启代码折叠效果
editor.getSession().setUseWrapMode(true);
editor.getSession().setUseSoftTabs(true);
// 开启代码自动提示补全
editor.setOptions({
  enableBasicAutocompletion: true,
  enableSnippets: true,
  enableLiveAutocompletion: true
});
// 监听编辑器内容变化
editor.getSession().on('change', function(e) {
  // 获取编辑区的代码内容
  var data = editor.getValue();
});
