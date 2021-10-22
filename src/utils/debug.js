import debug from 'debug';

const live = debug('live');

const view = live.extend('view')

const handle = {
  live,
  view,
  error: function (msg) {
    throw new Error(msg)
  },
}



const handleProxy = new Proxy(handle, {
  get(target, prop) {
    if (Reflect.has(handle, prop)) {
      // 套一层，所以无法使用 debug 原生 API 方法
      const wrapFunc = function (...args) {
        // console.log('>>', prop, args.toString())

        return target[prop](...args)
      }

      // 仅继承 enabled 属性
      ;['enabled'].forEach((e) => {
        wrapFunc[e] = target[e]?.enabled
      })

      return wrapFunc
    }
  },
})
window.debug = handleProxy
export default handleProxy