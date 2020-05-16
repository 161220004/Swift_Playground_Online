/** 初始化代码编辑器 */
let innerEditor = setEditor("func_editor_small");
let exterEditor = setEditor("func_editor_big");

/** 获取用户代码的方法 */
function getEditorCode() {
  let innerCode = "while " + $("#inner_cond").val() + " {\n" + innerEditor.getValue() + "\n}\n";
  let exterCode = "while " + $("#exter_cond").val() + " {\n" + innerCode + exterEditor.getValue() + "\n}\n";
  return exterCode;
}
