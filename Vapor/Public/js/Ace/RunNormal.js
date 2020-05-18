/** 初始化代码编辑器 */
let normalEditor = setEditor("normal_editor");

/** 获取用户代码的方法 */
function getEditorCode() {
  return mainFuncHead + normalEditor.getValue() + mainFuncTail;
}
