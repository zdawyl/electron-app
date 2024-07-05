const { notarize } = require('@electron/notarize');

exports.default = async function afterPack (context) {
  const { electronPlatformName, appOutDir, packager } = context;
  if (electronPlatformName !== 'darwin') {
    return;
  }

  const appName = packager.appInfo.productFilename;
  const appPath = `${appOutDir}/${appName}.app`;

  console.log(`正在对macOS应用程序进行公正: ${appName}`);

  try {
    await notarize({
      appBundleId: 'fun.mindshow.app', // 替换为您的应用程序的bundle ID
      appPath: appPath,
      tool: "notarytool", // 根据最新苹果的指引，推荐使用notarytool
      teamId: '94956TVL69', // 从环境变量读取开发者团队ID
      appleId: 'developer@mindshow.fun', // 从环境变量读取苹果开发者账号
      appleIdPassword: 'ewmp-nyuu-imuf-yrkz', // 从环境变量读取账号密码或专用密码
    });
    console.log(`公正成功: ${appName}`);
  } catch (error) {
    console.error(`公正失败: ${error}`);
    process.exit(1);
  }
};
