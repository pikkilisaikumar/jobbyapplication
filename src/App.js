import {Switch, Route, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'

import './App.css'

import ProtectedRoute from './components/ProtectedRoute'

import JobItemDetails from './components/JobItemDetails'

import Home from './components/Home'

import NotFound from './components/NotFound'

import Jobs from './components/Jobs'
// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    <Route exact path="/bad-path" component={NotFound} />
    <Redirect to="/bad-path" />
  </Switch>
)

export default App
