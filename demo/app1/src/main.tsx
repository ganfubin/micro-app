import React, {FC} from "react";
import ReactDOM, {unmountComponentAtNode} from 'react-dom'
import './style.less'

(window as any).aa = 1

const Root: FC = () => {
  return <div className={'aa'}>app1</div>
}


export const mount = () => {
  ReactDOM.render(
    <Root />,
    document.getElementById('app-root')
  )
}

export const unmount = () => {
  unmountComponentAtNode(document.getElementById('app-root'))
}