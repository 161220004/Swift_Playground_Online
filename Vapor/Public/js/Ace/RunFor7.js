/** 初始化代码编辑器 */
let forEditor = setEditor("for_editor_big");
let mainEditor = setEditor("main_editor_tiny");

/** 获取用户代码的方法 */
function getEditorCode() {
  let forNumber = $("#for_number").val();
  let forContent = forEditor.getValue();
  if (!forNumber || forNumber == "") forNumber = "number"; // 禁止为空，避免死循环
  let forCode = "for i in 1..." + forNumber + " {\n" + forContent + "\n}\n";
  let mainCode = mainEditor.getValue();
  return mainFuncHead + forCode + mainCode + mainFuncTail;
}
