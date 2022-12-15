import React, {Component} from "react";
// import '../styles/cartSlider.css'
import {connect} from "react-redux";
import CartItem from "../CartItem";
// import "../styles/navbarDesktopView.css";
import {NavLink} from "react-router-dom";
import {store} from '../../redux/store';
// import '../styles/MiniBag.module.css'
import '../../styles/MiniCartTest.css'


class MiniBag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: store.getState().currency,
            isOpen: false,
            cart: store.getState().cart
        };
    }

     onClickOutsideOverlay= (e) => {
        if (e.target.className==='overflow'){
            this.props.toggleMiniBag()
        }
    }
    //     this.setState({isOpen: false})
    //     // open cart and close overlay in one click
    //     if (this.ref.current.contains(e.target)) {
    //         e.stopImmediatePropagation()
    //     }
    // }

    render() {
        const totalPrices = [];
        if (this.props.bagItems.length === 0) {
            return (
                <div className="overflow"
                     // onClick={(event) => event.target.className === 'overflow' &&
                     onClick={()=>
                         // this.onClickOutsideOverlay(event)
                         // this.props.toggleMiniBag
                         alert('toggle')
                // && console.log(this.props)
                }>
                         {/*// this.setState({isOpen: false})}>*/}
                    <div className="modal_basket">
                        <div className="container_modal_basket">
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
        this.props.bagItems.map((item) =>
            totalPrices.push(item.price)
        )

        return (
            <div className="overflow"
                 onClick={
                (event) => {
                    this.onClickOutsideOverlay(event)
                    // event.target.className === 'overflow'
                    // &&
                    // console.log(event.target)
                    //  &&
                    // this.setState({isOpen: false})
                    // this.props.toggleMiniBag
                }
            }>
                <div className="modal_basket">
                    <div className="container_modal_basket">
                        <div className="title">
                            <span>My Bag:</span> {this.props.bagItems.length} items
                        </div>
                        <div className="mini_attributes">
                            {
                                this.props.bagItems.map(item =>
                                    <CartItem key={item.id} price={item.price} data={item}/>
                                )
                            }
                        </div>
                        <div className='total_modal'>
                            <div className='total'>Total</div>
                            <div>
                                <div className='prise'>
                                    {
                                        totalPrices.reduce((prev, nxt) => prev + nxt, 0)
                                    }
                                    {this.props.currency}

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
             </div>
        )
    }
}

const mapStateToProps = (state) => {
    // console.log('state', state)
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
