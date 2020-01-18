import React, { Component } from 'react';
import _ from 'lodash';
import axios from 'axios';

const Item = props => (
  <div
    className="container"
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
      <h5 className="card-title">Quantity : {props.item.quantity}</h5>
    </div>
    <div
      className="btn btn-primary"
      onClick={() => {
        props.changeQuantity(props.item.item_id, props.item.quantity + 1);
      }}
    >
      +
    </div>
    <div
      className="btn btn-primary"
      onClick={() => {
        props.changeQuantity(props.item.item_id, props.item.quantity - 1);
      }}
    >
      -
    </div>
    <div
      className="btn btn-primary"
      onClick={() => {
        props.removeItem(props.item.item_id);
      }}
    >
      Remove
    </div>
  </div>
);

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);

    this.state = { products: [], total: 0 };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/cart/1`)
      .then(response => {
        this.setState({ products: response.data });
        this.getTotal();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getTotal = () => {
    let amount = 0;
    this.state.products.map(
      currentItem =>
        (amount = amount + currentItem.price * currentItem.quantity)
    );
    // call back is added to see the effect of setState immediately
    this.setState({ total: amount }, () => {
      console.log(this.state.total);
    });
  };

  changeQuantity = (id, num) => {
    axios
      .put(`http://localhost:5000/cart/edit/${id}`, { value: num })
      .then(response => {
        //this.setState({ products: response.data });
        //this.forceUpdate();
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  removeItem = id => {
    axios
      .delete(`http://localhost:5000/cart/delete/${id}`)
      .then(response => {
        //this.setState({ products: response.data });
        //this.forceUpdate();
      })
      .catch(error => {
        console.log(error);
      });

    this.setState({
      products: this.state.products.filter(el => el.item_id !== id)
    });
    this.getTotal();
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <h4>Total Amount:{this.state.total}</h4>
          <div
            className="btn btn-primary"
            onClick={() => {
              this.props.history.push(`/address`);
            }}
          >
            Place Order
          </div>
        </div>
        {_.chunk(this.state.products, 3).map((currentItem, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {currentItem.map((col, colIndex) => {
                console.log(col);
                return (
                  <Item
                    item={col}
                    push={this.props.history.push}
                    removeItem={this.removeItem}
                    changeQuantity={this.changeQuantity}
                    key={col.product_id}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}
