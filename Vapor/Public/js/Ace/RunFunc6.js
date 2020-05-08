/** 初始化代码编辑器 */
let func1Editor = setEditor("func_editor_big");
let func2Editor = setEditor("func_editor_small");
let mainEditor = setEditor("main_editor_tiny");

/** 预定义内容 */
func1Editor.setValue("goForward()\ngoForward()\ncollect()\nturnLeft()\nturnLeft()\ngoForward()\ngoForward()");

/** 获取用户代码的方法 */
function getEditorCode() {
  let func1Code = "func collectTurnAround() {\n" + func1Editor.getValue() + "\n}\n"
  let func2Code = "func solveRow() {\n" + func2Editor.getValue() + "\n}\n"
  let mainCode = mainEditor.getValue();
  return func1Code + func2Code + mainCode;
}
