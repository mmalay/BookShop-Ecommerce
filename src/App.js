import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
//import { createBrowserHistory } from 'history';
// import createBrowserHistory from 'history';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Orders from './components/Orders';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/details/:id" component={Details} />
          <Route path="/cart/:id" component={ShoppingCart} />
          <Route path="/orders/:id" component={Orders} />
          <Route path="/profile" component={Profile} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
