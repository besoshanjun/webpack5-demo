const inquirer = require("inquirer");
const execa = require("execa");

const promptlist = [
  {
    type: "list",
    message: "请选择环境",
    name: "env",
    default: 0,
    choices: [
      {
        name: "开发环境",
        value: "development",
      },
      {
        name: "生产环境",
        value: "production",
      },
    ],
  },
];

async function showPrompt() {
  const result = await inquirer.prompt(promptlist);
  return result;
}

showPrompt().then(({ env }) => {
  console.log("env: ", env); //! dhj test
  process.env.LOCAL = "true"; // 标记为本地开发环境
  process.env.NODE_ENV = env;
  // 运行webpack
  // '--max_old_space_size=4096' 防止内存溢出，设置4G大小
  execa("node", ['--max_old_space_size=4096', "node_modules/webpack/bin/webpack", 'server', '--hot', '--mode', 'development'], {
    // 配置咋父进程和紫禁城之间建立的管道 [0,1,2] -> 标准输入、输出、错误
    stdio: [0, 1, 2],
  });
});
