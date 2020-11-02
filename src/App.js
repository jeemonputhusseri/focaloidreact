import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from './components/Login.js';
import MyAccount from './components/MyAccount.js';
import MoviesSearch from './components/MoviesSearch';
import MyMovies from './components/MyMovies.jsx';
import Header from './components/Header.js';
import './Style/style.css'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" ><Login key={'login'} /></Route>
          <PrivateRoute path="/myaccount">
            <MyAccount />
          </PrivateRoute>
          <PrivateRoute path="/mymovies">
            <MyMovies />
          </PrivateRoute>
          <PrivateRoute path="/moviessearch">
            <MoviesSearch />
          </PrivateRoute>
          <PrivateRoute exact path="/">
            <Header standalone/>
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        localStorage.getItem('username') ? (
          children
        ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
      }
    />
  );
}
export default App;

