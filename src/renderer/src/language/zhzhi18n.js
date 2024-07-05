import { createI18n } from "vue-i18n"; //引入vue-i18n组件
import en from './en'
import zhCN from './zhCN'
import zhtw from './zhtw'
import jp from './jp'
import ko from './ko'
import es from './es'
import fr from './fr'
import it from './it'
import pt from './pt'
let messages = {
  en,
  zhCN,
  zhtw,
  jp,
  ko,
  es,
  fr,
  it,
  pt
}
//如果禁止了cookie，弹出系统弹窗，提示用户开启cookie
if (navigator.cookieEnabled === false) {
  alert("请先允许第三方cookie再使用此功能.");
}

//如果浏览器url中包含channel
if (window.location.href.indexOf("channel") > -1) {
  window.localStorage.setItem("lang", "zhCN");
}

let lang = window.localStorage.getItem("lang");

if (lang === null) {
  lang = navigator.language || navigator.userLanguage;
  if (lang === "zh" || lang === "zh-CN") {
    lang = "zhCN";
  } else if (lang === "zh-tw" || lang === "zh-hk" || lang === "zh-mo") {
    lang = "zhtw";
  }
  else {
    lang = "en";
  }
  window.localStorage.setItem("lang", lang);
}
let language = window.localStorage.getItem("lang");
const i18n = createI18n({
  locale: language,
  fallbackLocale: "en",
  globalInjection: true,
  legacy: false, // you must specify 'legacy: false' option
  messages,
});

export default i18n;
