import Navbar from "./Navbar";
import React from "react";
import {connect} from "react-redux";
import {store} from "../../redux/store";
import {gql} from "@apollo/client";
import {graphql} from "@apollo/client/react/hoc";


class NavbarContainerWith extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            category: store.getState().category,
            categories: this.props.data.categories,
            currenciesArray: store.getState().currenciesArray,
        }
    }

    editState = (data) => {
        if (data.loading === false) {
            let currenciesArray = []
            data.categories[0].products[0].prices.forEach(prices => currenciesArray.push(prices.currency))
            this.props.setCurrencies(currenciesArray)
            this.props.setCategories(data.categories)

        } else return false
    }

    componentDidMount() {
        this.editState(this.props.data)
    }



    componentDidUpdate(prevProps, prevState) {
        if (this.props.data.categories !== prevProps.data.categories) {
            this.editState(this.props.data)
        }
    }

    render() {
        return (
            <>
                {this.props.categories && this.state.currenciesArray && (
                    <Navbar {...this.props}/>
                )}

            </>
        )
    }
}

const GET_DATA = gql`{
  categories{
    name
    products{
      prices{
        amount
        currency{
          symbol
          label
        }
      }
    }
  }
  }`

function mapStateToProps(state) {
    return {
        categories: state.categories,
        cartQuantity: state.bag.length,
        categoryIndex: state.categoryIndex,
        currency: state.currency,
        currenciesArray: state.currenciesArray,
        currencySymbol : state.currencySymbol,
    }
}

function mapDispatchToProps(dispatch) {
    return {

        setCategories: (categories) =>
            dispatch({type: "SET_CATEGORIES", categories: categories}),
        changeCategory: (category) =>
            dispatch({type: "CATEGORY_UPDATE", category}),
        setCurrencies: (currenciesArray) =>
            dispatch({type: "SET_CURRENCIES_ARRAY", currenciesArray}),
        changeCurrency: (currency) =>
            dispatch({type: "CURRENCY_UPDATE", currency: currency}),
        changeCurrencySymbol: (currencySymbol) =>
            dispatch({type: "CURRENCY_SYMBOL_UPDATE", currencySymbol:currencySymbol}),
        changeCategoryIndex: (categoryIndex) =>
            dispatch({type: "CHANGE_CATEGORY_INDEX", categoryIndex}),
    }
}

const NavbarContainer = graphql(GET_DATA)(NavbarContainerWith)
export default connect(mapStateToProps, mapDispatchToProps)(NavbarContainer)
