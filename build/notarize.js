// import { notarize } from '@electron-notarize/core';
const { notarize } = require('@electron/notarize');
exports.default = async function afterPack (context) {
  const appName = context.packager.appInfo.productFilename
  const { electronPlatformName, appOutDir } = context
  if (electronPlatformName !== 'darwin') {
    return
  }

  let appPath = `${appOutDir}/${appName}.app`



  try {
    await notarize({
      appBundleId: 'fun.mindshow.app', // 替换为您的应用程序的bundle ID
      appPath: appPath,
      tool: "notarytool", // 根据最新苹果的指引，推荐使用notarytool
      teamId: '94956TVL69', // 从环境变量读取开发者团队ID
      appleId: 'zhangda@mindshow.fun', // 从环境变量读取苹果开发者账号
      appleIdPassword: 'fhrx-awgj-gmyy-khxw', // 从环境变量读取账号密码或专用密码
    });
    console.log(`公正成功: ${1008611}`);
  } catch (error) {
    console.error(`公正失败: ${error}`);
    process.exit(1);
  }
};
