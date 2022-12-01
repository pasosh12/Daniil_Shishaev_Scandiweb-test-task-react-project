import React, {Component} from "react";
// import '../styles/cartSlider.css'
import {connect} from "react-redux";
import CartItem from "./CartItem";
// import "../styles/navbarDesktopView.css";
import {Link, NavLink} from "react-router-dom";
import {store} from '../redux/store';
// import '../styles/MiniBag.module.css'
import '../styles/MiniCartTest.css'
// import '../styles/index.css'


class MiniBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            cart: store.getState().cart
        };
    }

    onClickOutsideOverlay(e) {
        this.setState({isVisible: false})
        // open cart and close overlay in one click
        if (this.ref.current.contains(e.target)) {
            e.stopImmediatePropagation()
        }
    }

    render() {
        const totalPrices = [];
        if (this.props.bagItems.length === 0) {
            return (
                <div className="overflow"
                     onClick={(event) => event.target.className === 'overflow' && this.setState({isOpen: false})}>
                    <div className="modal_basket">
                        <div className="conteiner_modal_busket">
                            <div className="title">
                                <p>Your cart is empty</p>
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
                // {/*// <div className='cartOverlay empty'>*/}
                // {/*//     /!*<EmptyCart />*!/*/}
                // {/*//     <p>Your cart is empty</p>*/}
                // {/*// </div>*/}
            )
        }
        // console.log(this.props.bagItems)
        return (
            <div className="overflow"
                 onClick={(event) => event.target.className === 'overflow' && this.setState({isOpen: false})}>
                <div className="modal_basket">
                    <div className="conteiner_modal_busket">
                        <div className="title">
                            <span>My Bag:</span> {this.props.bagItems.length} items
                        </div>
                        <div className="mini_attributes">
                            {
                                JSON.parse(localStorage.getItem('attributes')).map((el, index) =>
                                    console.log(el, index))
                                // this.props.bagItems.map(item =>
                                // item.id === "Color"
                                //     ?
                                //     item.items.map(it =>
                                //         <div
                                //             className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes color_attr active" : "new_attributes color_attr"}
                                //             style={{backgroundColor: `${it.value}`}} key={it.id}></div>
                                //     )
                                //     :
                                //     item.items.map(it =>
                                //         <div
                                //             className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes active" : "new_attributes"}
                                //             key={it.id}> {it.value}</div>
                                //     )
                                // )
                            }
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
// ????????????????????????????????????????????????????????????/

        // <div className='dropDownShoppingCart'>
        //     <div className='dropDownShoppingCartTitle'>
        //         My Bag, <span className='itemCounter'>{this.props.bagItems.length} items</span>
        //     </div>
        //
        //     {/* <div className={styles.minibag}>
        //         <h1 style={{ textAlign: "center" }}>
        //             {this.props.bagItems.length} items
        //         </h1> */}
        //
        //     <div className='itemsContainer'>
        //         {this.props.bagItems.map((item) => {
        //             const currentCurrencyPrice = item.prices.find(
        //                 (currency) => currency.currency.label === this.props.currency
        //             );
        //             totalPrices.push(
        //                 Math.ceil(item.quantity * currentCurrencyPrice.amount)
        //             );
        //
        //             return (
        //                 <CartItem
        //                     key={item.id}
        //                     price={currentCurrencyPrice}
        //                     data={item}
        //                 />
        //             );
        //         })}
        //     </div>
        //
        //     {/* <h2 style={{ textAlign: "center" }}>
        //             Total Price: {totalPrices.reduce((prev, nxt) => prev + nxt, 0)}{" "}
        //             {this.props.currency}
        //         </h2> */}
        //     <div className='dropDownShoppingCartButtonContainer'>
        //         <div>
        //             <Link to="/cart">
        //                 <button className='viewBag'>VIEW BAG</button>
        //             </Link>
        //         </div>
        //         <div>
        //             <button className='checkout'>CHECKOUT</button>
        //         </div>
        //     </div>
        // </div>
    )
        ;
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

export default connect(mapStateToProps, mapDispatchToProps)(MiniBag);
