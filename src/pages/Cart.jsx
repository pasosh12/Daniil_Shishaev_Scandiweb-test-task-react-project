import React from "react";
import {connect} from "react-redux";
import '../styles/Cart.css'
import CartItem from "../components/CartComponents/CartItem";
import NavbarContainer from "../components/NavBar/NavbarContainer";


class Cart extends React.Component {
    rounded = (number) => {
        return +number.toFixed(2)
    }

    render() {
        const totalPrices = [];
        let currentCurrencySymbol = ''
        let totalQuantityProducts = this.props.bagItems.map(item => item.quantity).reduce((prev, curr) => prev + curr, 0)
        return (
            <div>
                <NavbarContainer/>
                <div className='main'>
                    <div className='cartPage'>
                        <div className='myBag'>
                            <div className='cartTitle'>Cart</div>
                        </div>
                        {totalQuantityProducts > 0 ?
                            <div className='items'>
                                {this.props.bagItems.map((item) => {
                                    const currentCurrencyPrice = item.prices.find(
                                        (currency) => currency.currency.label === this.props.currency);
                                    currentCurrencySymbol = currentCurrencyPrice.currency.symbol

                                    totalPrices.push(item.quantity * currentCurrencyPrice.amount);
                                    return (
                                        <CartItem key={item.id} currentCurrencySymbol={currentCurrencySymbol}
                                                  price={currentCurrencyPrice} data={item}/>
                                    );
                                })}
                            </div>
                            :
                            <div className='noProduct'>No products in cart yet</div>
                        }
                        <div className='bottom'>
                            <div className='tax'> Tax 21%:
                                <span className='taxQuantityValue'>
                                {currentCurrencySymbol}
                                    {this.rounded(totalPrices.reduce((prev, nxt) => prev + nxt, 0) * 0.21)}
                            </span>
                            </div>
                            <div className='quantity'> Quantity
                                <span className='quantityValue'> {totalQuantityProducts}</span>
                            </div>
                            <div className='total'> Total :
                                <span>
                                {currentCurrencySymbol}
                                    {
                                        this.rounded(totalPrices.reduce((prev, nxt) => prev + nxt, 0))
                                    }
                            </span>
                            </div>
                            <div className='buttons'>
                                <button className='checkout'>
                                    ORDER
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        bagItems: state.bag,
        currency: state.currency,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeProductOptions: (productOption) =>
            dispatch({
                type: "PRODUCT_OPTIONS_UPDATE",
                productOptions: productOption,
            }),
        clearBagItems: () => dispatch({type: "CLEAR_BAG"}),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);

