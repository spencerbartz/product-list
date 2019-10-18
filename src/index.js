import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'

class Product extends React.Component {
  render() {
    return (
      <tr>
        <td>{ this.props.productName }</td>
        <td><img src="{ this.props.imageUrl }" alt="{ this.props.productName }"/></td>
        <td>{ this.props.price }</td>
        <td>{ this.props.description }</td>
      </tr>
    );
  }
}

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.endpoint = 'https://api.bestbuy.com/v1/products(search=oven&search=stainless&search=steel)?format=json&show=all&apiKey=mPlbr5GXMVkagVgzwT7T2V5X';
    this.state = {
      isLoaded: false,
      products: [],
    };
  }

  componentDidMount() {
    fetch(this.endpoint)
      .catch(() => {
        console.error("Could not reach server");
      })
      .then((res) => res.json())
      .then((json) => {
        // console.log(json);
        this.setState({
          isLoaded: true,
          products: json.products,
        });
      });
  }

  render() {
    const { isLoaded, products } = this.state;

    if (isLoaded) {
      console.log(products);
      return (
      <table id="productList">
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
              <td>{product.name}</td><td><img src={product.thumbnailImage} /></td><td>${product.regularPrice}</td><td>{product.shortDescription}</td>
            </tr>
          ))}

        </tbody>
      </table>
      );
    } else {
      return <div>Loading...</div>;
    }
  }
}

// {products.map(product => (
//   <Product productName={product.productName} imageUrl="image.jpg" price="100.00" description="Such cool!" />
// ))}

// class ProductList extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       squares: Array(9).fill(null),
//       xIsNext: true,
//     };
//   }
//
//   handleClick(i) {
//     // make copy of squares
//     const squares = this.state.squares.slice();
//     if (calculateWinner(squares) || squares[i]) {
//       return;
//     }
//
//     squares[i] = this.state.xIsNext ? 'X' : 'O';
//     this.setState({
//       squares: squares,
//       xIsNext: !this.state.xIsNext,
//     });
//   }
//
//   renderSquare(i) {
//     return (
//       <Square
//         value={ this.state.squares[i] }
//         onClick={ () => this.handleClick(i) }
//       />
//     );
//   }
//
//   render() {
//     const winner = calculateWinner(this.state.squares);
//     let status;
//     if (winner) {
//       status = 'Winner: ' + winner;
//     } else {
//       status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
//     }
//
//     return (
//       <div>
//         <div className="status">{status}</div>
//         <div className="board-row">
//           {this.renderSquare(0)}
//           {this.renderSquare(1)}
//           {this.renderSquare(2)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(3)}
//           {this.renderSquare(4)}
//           {this.renderSquare(5)}
//         </div>
//         <div className="board-row">
//           {this.renderSquare(6)}
//           {this.renderSquare(7)}
//           {this.renderSquare(8)}
//         </div>
//       </div>
//     );
//   }
// }

// class Game extends React.Component {
//   render() {
//     return (
//       <div className="game">
//         <div className="game-board">
//           <Board />
//         </div>
//         <div className="game-info">
//           <div>{/* status */}</div>
//           <ol>{/* TODO */}</ol>
//         </div>
//       </div>
//     );
//   }
// }

// ========================================

ReactDOM.render(
  <ProductList />,
  document.getElementById('root')
);
