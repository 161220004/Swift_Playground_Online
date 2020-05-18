/** 初始化代码编辑器 */
let funcEditor = setEditor("func_editor_big");
let mainEditor = setEditor("main_editor_big");

/** 获取用户代码的方法 */
function getEditorCode() {
  let funcCode = "func goForward(step: Int) {\n" + funcEditor.getValue() + "\n}\n";
  let mainCode = mainEditor.getValue();
  return funcCode + mainFuncHead + mainCode + mainFuncTail;
}
