import React, {FC} from "react";
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import {Button} from 'antd';
import 'antd/dist/antd.css'

const Home: FC = () => {
  return (<>
    <Button type="primary"><Link to={'/app1'}>app1</Link></Button>
    <Button type="primary"><Link to={'/app2'}>app2</Link></Button>

    <div id="app-root">base</div>

  </>)
}

const App: FC = () => {
  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/*"  element={<Home />}/>
      </Routes>
    </BrowserRouter>
  </div>

}

export default App