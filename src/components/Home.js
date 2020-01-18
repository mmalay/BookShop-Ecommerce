import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

const Item = props => (
  <div
    className="card"
    style={{ width: '20rem', display: 'table', margin: '5px auto' }}
  >
    <div
      className="card-body"
      onClick={() => {
        props.push(`/details/${props.item.product_id}`, props.item.product_id);
      }}
    >
      <img
        src={`http://localhost:5000/images/${props.item.image}`}
        class="card-img-top"
        alt="..."
      />
      <h5 className="card-title">{props.item.name}</h5>
      <h5 className="card-title">Price : {props.item.price}</h5>
      <h5 className="card-title">Authour : {props.item.authour}</h5>
    </div>
    <div
      className="btn btn-primary"
      onClick={() => {
        props.addToCart(1, props.item.product_id, 1);
      }}
    >
      Add to Cart
    </div>
  </div>
);

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.sortby = this.sortby.bind(this);

    this.state = { products: [] };
  }

  componentDidMount() {
    axios
      .get('http://localhost:5000/')
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  sortby(order) {
    axios
      .get(`http://localhost:5000/${order}`)
      .then(response => {
        this.setState({ products: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  addToCart(customerID, productID, quantity) {
    const item = {
      customer_id: customerID,
      product_id: productID,
      quantity: quantity
    };
    axios
      .post(`http://localhost:5000/cart/add`, item)
      .then(response => {})
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <h4>Sort By Price:</h4>

          <div
            className="btn btn-primary"
            onClick={() => {
              this.sortby('lowtohigh');
            }}
          >
            Low to High
          </div>

          <div
            className="btn btn-primary"
            onClick={() => {
              this.sortby('hightolow');
            }}
          >
            High to Low
          </div>
        </div>
        <div>
          {_.chunk(this.state.products, 3).map((currentItem, rowIndex) => {
            return (
              <div key={rowIndex} className="row">
                {currentItem.map((col, colIndex) => {
                  return (
                    <Item
                      item={col}
                      push={this.props.history.push}
                      addToCart={this.addToCart}
                      key={col.product_id}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
