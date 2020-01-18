import React, { Component } from 'react';
import axios from 'axios';

export default class Details extends Component {
  constructor(props) {
    super(props);

    this.state = { product: [] };
  }
  componentDidMount() {
    axios
      .get(`http://localhost:5000/${this.props.location.state}`)
      .then(response => {
        this.setState({ product: response.data[0] });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="">
          <img
            src={`http://localhost:5000/images/${this.state.product.image}`}
            class=""
            alt="..."
          />
          <h5 className="">{this.state.product.name}</h5>
          <h5 className="">Price : {this.state.product.price}</h5>
          <h5 className="">Authour : {this.state.product.authour}</h5>
          <h6>Page Count: {this.state.product.authour}</h6>
          <p>{this.state.product.description}</p>
        </div>
        <a href="#" className="btn btn-primary">
          Add to Cart
        </a>
        <a href="#" className="btn btn-primary">
          Buy Now
        </a>
      </div>
    );
  }
}
