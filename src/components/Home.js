import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Item = props => (
  <div className="card" style={{ width: '18rem' }}>
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
    <a href="#" className="btn btn-primary">
      Add to Cart
    </a>
    <a href="#" className="btn btn-primary">
      Buy Now
    </a>
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
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    console.log(this.props);
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
          {this.state.products.map(currentItem => {
            return (
              <Item
                item={currentItem}
                push={this.props.history.push}
                key={currentItem.product_id}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
