// register apps
import {App} from './interface'
import {routerListener} from './router'


let apps: App[] = []

// 注册子项目信息
export const registerMicroApps = (registerApps: App[] = []) => {
  apps = registerApps
}

// 获取注册的子项目
export const getMicroApps = (): App[] => {
  return apps
}

export const runMicroApp = () => {
  routerListener(apps)
}