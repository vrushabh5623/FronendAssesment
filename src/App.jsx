import {Switch, Route} from 'react-router-dom' 
import LoginPage from './component/LoginPage'
import Home from './component/Home'
import DetailsPage from './component/DetailsPage'
import NotFound from './component/NotFound'
import FailureView from './component/FailureView'
import ProtectedRoute from './component/ProtectedRoute'
import './App.css'
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min'

const App = () =>(
  <Switch>
    <Route exact path='/login' component={LoginPage}/>
    <ProtectedRoute exact path='/' component={Home}/>
    <ProtectedRoute exact path='/referrals/:id' component={DetailsPage}/>
    <Route path='/not-found' component={NotFound}/>
    <Redirect to='not-found'/>
  </Switch>
  )


export default App
