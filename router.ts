import {App} from './interface'
import {ProxySandbox} from "./sandbox";

let instance = null

export const routerListener = (apps: App[]) => {

  const pushState = history.pushState
  history.pushState = (...args) => {
    pushState.apply(history, args)
    handler(apps)
  };

  window.addEventListener('popstate', () => handler(apps));
  window.addEventListener('load', () => handler(apps));
}

const handler = async (apps: App[]) => {
  const pathname = location.pathname

  const app = apps.find((app) => pathname.includes(app.name))

  if (!app) return

  await instance?.unmount?.()

  const dom = await getEntryDom(app.entry)

  const scripts = await getScriptByDom(dom, app.entry)


  instance = runScripts(scripts)

  await instance?.mount?.()

}

/**
 * 获取dom 信息
 * @param url
 */
const getEntryDom = (url: string): Promise<string> => {
  return fetch(url).then(res => res.text());
}

const getScriptByDom = (dom: string, baseUrl: string): Promise<string[]> => {
  const el = document.createElement('div')
  el.innerHTML = dom
  const scripts = el.querySelectorAll('script')
  return Promise.all(
    Array.from(scripts).map(script => {
      const src = script.getAttribute('src')
      if (src) return fetch(baseUrl + src).then(res => res.text())
      return Promise.resolve(script.innerHTML)
    })
  );
}

const runScripts = (scripts: string[]): any => {
  const {scope} = new ProxySandbox()
  const module = {exports: {}}, exports = module.exports;
  ;(function (window) {

    scripts.forEach((script) => {
      eval(script)
    })
  })(scope)

  return module.exports
}