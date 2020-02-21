// 使用js定制css

var toastStyleSheet = (function() {
	// Create the <style> tag
	let style = document.createElement("style");
	// Add the <style> element to the page
	document.head.appendChild(style);
	return style.sheet;
})();

function toastReplaceRule(cssLeft, cssTop, logLength) {
  // 先删除已有css
  if (toastStyleSheet.cssRules.length > 0) {
    toastStyleSheet.deleteRule(0);
  }
  // 调整位置
  let realTop = cssTop + ToastYBia;
  let realLeft = cssLeft;
  if (actionManager.direction == 2 || actionManager.direction == 1) { // Right, Up, 置于左侧
    if (logLength > ToastLineNum) { // 长消息
      realLeft += ToastLeftX;
    } else { // 短消息
      realLeft += ToastLeftC - (logLength + ToastFrameNum) * ToastBiaPerLetter / 2;
    }
  } else if (actionManager.direction == 0 || actionManager.direction == 3) { // Left, Down, 置于右侧
    if (logLength > ToastLineNum) { // 长消息
      realLeft += ToastRightX;
    } else { // 短消息
      realLeft += ToastRightC - (logLength + ToastFrameNum) * ToastBiaPerLetter / 2;
    }
  } else {
    alert("toaststyle.js - toastReplaceRule(): No Direction !");
  }
  // console.log("- Log Top: " + realTop);
  // console.log("- Log Left: " + realLeft);
  // 组装
  let cssRule = ".my-toast { position: fixed !important; "
                + "max-width: " + ToastMaxWidth + "px !important; bottom: auto !important; "
                + "top: " + realTop + "px !important; left: " + realLeft + "px !important; }";
  // 再添加所需的Rule
  toastStyleSheet.insertRule(cssRule, 0);
  // console.log(toastStyleSheet);
}
