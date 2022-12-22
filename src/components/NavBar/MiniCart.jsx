import React, {Component} from "react";
import '../../styles/MiniCart.css'
import {connect} from "react-redux";
import CartItem from "../CartComponents/CartItem";
import {NavLink} from "react-router-dom";
import {store} from '../../redux/store';

class MiniCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: store.getState().currency,
            currentCurrencySymbol: store.getState().currencySymbol,
            isOpen: false,
            cart: store.getState().cart
        };
    }

    rounded = (number) => {
        return +number.toFixed(2)
    }
    onClickOutsideOverlay = (e) => {
        if (e.target.className === 'overflow') {
            return this.props.toggleMiniBag()
        }
    }
    render() {
        const totalPrices = [];
        let currentCurrencySymbol = ''
        this.props.bagItems.forEach((item) => {
             const currentCurrencyPrice = item.prices.find( (currency) => {
                return currency.currency.label === this.props.currency
            });
            currentCurrencySymbol = currentCurrencyPrice.currency.symbol
            totalPrices.push( item.quantity * currentCurrencyPrice.amount);
        })
        if (this.props.bagItems.length === 0) {
            return (
                <div className="overflow"
                     onClick={(event) => this.onClickOutsideOverlay(event)}
                    >
                    <div className="modal_basket">
                        <div className="container_modal_basket">
                            <div className="title">
                                <div className='noProduct'>No products in cart yet</div>
                                <div className="buttons_modal">
                                    <NavLink to={'/cart '}>
                                        <div className="button_view_bag"
                                             onClick={() => this.setState({modalCloseAndOpen: false})}>VIEW BAG
                                        </div>
                                    </NavLink>
                                    <div className="button_check_out">CHECK OUT</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        } else return (
            <div className="overflow"
                 onClick={event => this.onClickOutsideOverlay(event)}>
                <div className="modal_basket">
                    <div className="container_modal_basket">
                        <div className="title">
                            <span>My Bag:</span> {this.props.bagItems.length} items
                        </div>
                        <div className="mini_attributes">
                            {
                                this.props.bagItems.map(item => {
                                    const currentCurrencyPrice = item.prices.find( (currency) => {
                                            return currency.currency.label === this.props.currency
                                        });
                                    currentCurrencySymbol = currentCurrencyPrice.currency.symbol
                                    return (
                                        <CartItem
                                            key={item.id}
                                            price={currentCurrencyPrice}
                                            data={item}
                                            currentCurrencySymbol={currentCurrencySymbol}/>
                                    )
                                })
                            }
                        </div>
                        <div className="total_modal">
                            <div className="total_text">Total</div>
                            <div className="product_price">
                                {currentCurrencySymbol}
                                {this.rounded(totalPrices.reduce((prev, nxt) => prev + nxt, 0))}
                            </div>
                        </div>
                        <div className="buttons_modal">
                            <NavLink to={'/cart '}>
                                <div className="button_view_bag"
                                     onClick={() => this.setState({modalCloseAndOpen: false})}>VIEW BAG
                                </div>
                            </NavLink>
                            <div className="button_check_out">CHECK OUT</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);
