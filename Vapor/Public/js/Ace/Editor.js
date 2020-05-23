/** 编辑器相关设置 */
function setEditor(editorId) {
  let editor = ace.edit(editorId);
  // 主题风格
  editor.setTheme("ace/theme/chrome");
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
  return editor;
}

/** 设置自动提示补全代码 */
function setCompleteData(data) {
  var langTools = ace.require("ace/ext/language_tools");
  langTools.addCompleter({
    getCompletions: function(editor, session, pos, prefix, callback) {
      if (prefix.length === 0) {
        return callback(null, []);
      } else {
        return callback(null, data);
      }
    }
  });
}

// 使用main函数包装的头部
const mainFuncHead = "func main() {\nSAVE_RESULT_ON_SERVER_SIDE(\"\")\n";
// 使用main函数包装的尾部
const mainFuncTail = "\n}\n";

// “Run”按钮点击事件
$("#run_code").click(function(){
  // 重置LiveView
  resetLiveView();
  puzzleMap.isVisible = false; // 先关闭小地图
  // 设置Random场景
  foreground.setRandom();
  // 封装传给后端的数据，包括code和Scene（帮助后端确认Random的最终值）
  let sceneInfo = Object();
  sceneInfo.puzzle = SceneData.puzzle;
  sceneInfo.blocks = [];
  for (let i = 0; i < foreground.blocks.length; i++) {
    sceneInfo.blocks[i] = Object();
    sceneInfo.blocks[i].id = foreground.blocks[i].id;
    sceneInfo.blocks[i].type = foreground.blocks[i].type;
    sceneInfo.blocks[i].cellX = foreground.blocks[i].cellX;
    sceneInfo.blocks[i].cellY = foreground.blocks[i].cellY;
    sceneInfo.blocks[i].item = foreground.blocks[i].itemType;
  }
  let runInfo = Object();
  runInfo.code = getEditorCode();
  runInfo.scene = sceneInfo;
  // $("#test_live_view").html("Running...")
  // 等待后端处理
  puzzle.isCompiling = true;
  puzzle.playLoadingSprite();
  $.post("/puzzle/" + PID + "/code", JSON.stringify(runInfo), function(data) {
    if (puzzle.isCompiling) {
      // 防止在编译中Restart的情况
      console.log("Run !");
      // 解析结果并开启动画
      puzzle.getActions(data);
      puzzle.performActions();
    }
  })
});
