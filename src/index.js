import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

/*
  class: ProductList
  desc: Retrieves a list of products from the API endpoint and renders them
  in a table
*/
class ProductList extends React.Component {
  /*
    constructor
    desc: initialize API endpoint and state
  */
  constructor(props) {
    super(props);
    this.endpoint = 'https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=mPlbr5GXMVkagVgzwT7T2V5X';
    this.state = {
      isLoaded: false,
      products: [],
    };
  }

  /*
    function: componentDidMount
    receives: none
    returns: none
    desc: Hook that guarantees the component has loaded before we make API calls
  */
  componentDidMount() {
    fetch(this.endpoint)
      .catch(() => {
        console.error("Could not reach server");
      })
      .then((res) => res.json())
      .then((json) => {
        this.setState({
          isLoaded: true,
          products: json.products,
        });
      });
  }

  /*
    function: render
    receives: none
    returns: view template
    desc: If the products have been loaded (i.e. componentDidMount is complete)
    we display the products in a styled table. If not, display "Loading..."
  */
  render() {
    const { isLoaded, products } = this.state;

    if (isLoaded) {
      return (
        <div className="listContainer">
          <table className="productList">
            <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
            </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.sku}>
                  <td>{product.name}</td>
                  <td>{ product.thumbnailImage ?  <img src={product.thumbnailImage} alt=""/> : "Image Not found" }</td>
                  <td>${product.regularPrice}</td>
                  <td>{product.shortDescription}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

ReactDOM.render(
  <ProductList />,
  document.getElementById('root')
);
