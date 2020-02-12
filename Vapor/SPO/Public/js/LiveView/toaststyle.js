// 使用js定制css

var toastStyleSheet = (function() {
	// Create the <style> tag
	var style = document.createElement("style");
	// style.appendChild(document.createTextNode(""));
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
  var realTop = cssTop + ToastYBia;
  var realLeft = cssLeft;
  if (currentDirection == 2 || currentDirection == 1) { // Right, Up, 置于左侧
    if (logLength > ToastLineNum) { // 长消息
      realLeft += ToastLeftX;
    } else { // 短消息
      realLeft += ToastLeftC - (logLength + ToastFrameNum) * ToastBiaPerLetter / 2;
    }
  } else if (currentDirection == 0 || currentDirection == 3) { // Left, Down, 置于右侧
    if (logLength > ToastLineNum) { // 长消息
      realLeft += ToastRightX;
    } else { // 短消息
      realLeft += ToastRightC - (logLength + ToastFrameNum) * ToastBiaPerLetter / 2;
    }
  } else {
    alert("toaststyle.js - toastReplaceRule(): No Direction !");
  }
  console.log("- Log Top: " + realTop);
  console.log("- Log Left: " + realLeft);
  // 组装
  var cssRule = ".my-toast { position: fixed !important; "
                + "max-width: " + ToastMaxWidth + "px !important; bottom: auto !important; "
                + "top: " + realTop + "px !important; left: " + realLeft + "px !important; }";
  // 再添加所需的Rule
  toastStyleSheet.insertRule(cssRule, 0);
  // console.log(toastStyleSheet);
}
