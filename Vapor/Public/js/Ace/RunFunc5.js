/** 初始化代码编辑器 */
let funcEditor = setEditor("func_editor_big");
let mainEditor = setEditor("main_editor_small");

/** 获取用户代码的方法 */
function getEditorCode() {
  let funcCode = "func " + $("#func_name").val() + "() {\n" + funcEditor.getValue() + "\n}\n";
  let mainCode = mainEditor.getValue();
  return funcCode + mainCode;
}
