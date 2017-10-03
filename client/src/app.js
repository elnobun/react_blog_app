import React from 'react'
import {Route, Switch} from 'react-router-dom'
import MainPage from './components/pages/mainpage/main'
import Post from './components/pages/postpage/post'
import CrudPage from './components/pages/crudpage/crud'

function App () {
  return (
    <Switch>
      <Route exact path='/' component={MainPage} />
      <Route exact path='/new' component={CrudPage} />
      <Route exact path='/:category' component={MainPage} />
      <Route exact path='/:category/:postId' component={Post} />
      <Route exact path='/:category/:postId/edit' component={CrudPage} />
    </Switch>
  )
}

export default App
