/** 初始化代码编辑器 */
let forEditor = setEditor("for_editor_big");
let mainEditor = setEditor("main_editor_tiny");

/** 获取用户代码的方法 */
function getEditorCode() {
  let forNumber = forEditor.getValue();
  if (!forNumber || forNumber == "") forNumber = "number"; // 禁止为空
  let forCode = "for i in 1..." + $("#for_number").val() + " {\n" + forNumber + "\n}\n"
  let mainCode = mainEditor.getValue();
  return forCode + mainCode;
}
