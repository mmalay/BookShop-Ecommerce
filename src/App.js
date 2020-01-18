import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Home';
import Details from './components/Details';
import Orders from './components/Orders';
import ShoppingCart from './components/ShoppingCart';
import Footer from './components/Footer';
import Profile from './components/Profile';
import AddressForm from './components/AddressForm';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <br />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/details/:id" component={Details} />
          <Route path="/cart/" component={ShoppingCart} />
          <Route path="/orders/" component={Orders} />
          <Route path="/profile" component={Profile} />
          <Route path="/address" component={AddressForm} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
