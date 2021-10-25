// babel 的插件

const types = require("@babel/types");

const map = new Map();
// 需要维护一个debug 队列
map.set("debug", "live");

module.exports = function deleteDebug() {
  return {
    name: "ignore-debug",
    visitor: {
      ExpressionStatement(path) {
        // 获取表达式
        const expression = path.node.expression;
        console.log('path.node: ', path.node); //! dhj test
        // console.log('expression: ', expression); //! dhj test
        // 判断是否是表达式
        if (types.isCallExpression(expression)) {
          const callee = expression.callee;
          if (types.isMemberExpression(callee)) {
            const objectName = callee.object.name;
            const propertyName = callee.property.name;
            if (map.get(objectName) === propertyName) {
              path.remove();
            }
          }
        }
      },
    },
  };
};
