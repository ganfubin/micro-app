export class ProxySandbox {
  public scope: {};

  constructor() {
    const copyWindow = {};
    const scopeWindow = new Proxy(copyWindow, {
      get(target, prop) {

        if (target.hasOwnProperty(prop)) {
          return target[prop];
        }
        // 否则兜底到window对象上取值
        const rawValue = Reflect.get(window, prop)

        // 如果兜底的值为函数，则需要绑定window对象，如：console、alert等
        if (typeof rawValue === 'function') {
          const valueStr = rawValue.toString()
          // 排除构造函数
          if (!/^function\s+[A-Z]/.test(valueStr) && !/^class\s+/.test(valueStr)) {
            return rawValue.bind(window)
          }
        }
        return rawValue
      },
      set(target, prop, receiver) {
        target[prop] = receiver;
        return true;
      }
    });
    this.scope = scopeWindow;
  }
}