// 检查文档是否处于全屏状态
export function isDocumentInFullScreen () {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullScreenElement ||
    document.msFullscreenElement
  );
}
// 退出全屏模式
export function ExPortExitScreen () {
  if (isDocumentInFullScreen()) {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
// 进入全屏模式
export function ExPortFullScreen (el) {
  if (!isDocumentInFullScreen()) {
    let element = document.documentElement;
    if (el && document.getElementById(el)) {
      element = document.getElementById(el)
    }
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  }
}
