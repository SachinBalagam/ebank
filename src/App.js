import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './Components/Login/index'
import Home from './Components/Home/index'
import NotFound from './Components/NotFound/index'
import './App.css'

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/ebank/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
