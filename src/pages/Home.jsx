import React from "react";
import  styles from "../styles/HomePage.module.css"
import '../styles/ProductCardList.css'
import {store} from "../redux/store"
import Product from '../components/Product'
import {gql} from "@apollo/client"
import {graphql} from "@apollo/client/react/hoc";
import NavbarContainer from "../components/NavBar/NavbarContainer";


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            category: store.getState().category,
            currency: store.getState().currency,

        }
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                category: store.getState().category,
                currency: store.getState().currency,
            })
        })
    }

    componentWillUnmount() {
        this.unsubscribe()
    }


    showProducts() {
        if (!this.props.data.loading) {
            const categories = this.props.data.categories;
            const {products} = categories.find(category => category.name === this.state.category)
            return (
                products.map(product => {
                    const currentCurrencyPrice = product.prices.find(currency => currency.currency.label === this.state.currency)
                    return <Product data={product} price={currentCurrencyPrice} key={product.id}/>
                })
            )
        } else return <h1>Loading...</h1>
    }

    render() {
        return (
            <>
                {this.props.data.categories  && (
                    <>
                        <NavbarContainer />
                        <div className='categoryTitle'>{this.state.category}</div>
                        <div className={styles.productsList}>{this.showProducts()}</div>
                    </>
                )}
            </>
        );
    }
}

const GET_DATA = gql`{
  categories{
    name
    products{
      id
      name
      brand
      inStock
      gallery
      prices{
        amount
        currency{
          symbol
          label
        }
      }
      attributes{
        type
        name
        items{
          value
          displayValue
          id
        }
      }
    }
  }
}`


export default graphql(GET_DATA)(Home)