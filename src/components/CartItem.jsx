import React, {Component} from "react";
import {connect} from "react-redux";
import {store} from "../redux/store";
// import deleteIcon from "../Static/delete.svg";

import '../styles/cart.css'
import CartGallery from "./CartGallery";
import AttributeItem from "./AttributeItem";
import AttributeProductPage from "./ProductPage/AttributeProductPage";
import AttributesActive from "./ProductPage/AttributesActive";

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.data.quantity,
            // currency: this.props.cu
        };
    }

    componentDidMount() {
        this.unsub = store.subscribe(() => {
            const x = this.props.data.id;
            const item = store.getState().bag.find((item) => {
                return item.id === x
            });

            this.setState({
                quantity: item.quantity ? item.quantity : 0

            });
        });
    }


    componentWillUnmount() {
        this.unsub();

    }

    increment = () => {
        this.props.incrementQunatity(this.props.data.id);
    };
    decrement = () => {
        if (this.state.quantity === 1) {
            this.unsub()
            this.removeItem()
        } else this.props.decrementQunatity(this.props.data.id);
    };
    removeItem = () => {
        this.props.removeItem(this.props.data.id);
    };

    render() {
        let el = this.props.data;

        return (
            <div className='item'>
                <div className='left'>
                    <div className='productName'>
                        <p>{this.props.data.brand}</p>
                        <p>{this.props.data.name}</p>
                    </div>
                    <div className='price'>
                        {this.props.price.currency && (<>
                                {this.props.price.currency.symbol}
                                {this.props.price.amount}
                            </>

                        )}

                    </div>

                    <div className='attributes'>
                        <AttributesActive data={this.props.data}/>

                    </div>

                    {/*////////////////////////////////////////////*/}
                    {/*/!*{Object.entries(this.props.data.attributes).map((attribute) => {*!/*/}
                    {/*/!*    return (<span key={attribute}>*!/*/}
                    {/*/!*           {attribute[0]}: <b>{attribute[1]}</b> {" "}*!/*/}
                    {/*/!*         </span>);*!/*/}
                    {/*/!*})}*!/*/}
                </div>
                {/*{data.product.inStock ?*/}
                {


                    // :
                    // <div className='outOfStock'>Out of stock</div>
                }
                <div className='right'>
                    {/*<div className={styles.productQuantity}>*/}
                    <div className='counter'>

                        <button onClick={this.increment}>+</button>
                        <p className='productQuantity'>{this.state.quantity}</p>
                        <button onClick={this.decrement}>-</button>
                    </div>
                    {/*<CartGallery name={this.props.data.name} gallery={this.props.data.gallery} />*/}
                    <div className='mainImageContainer'>
                        <img
                            src={this.props.data.image}
                            width="150"
                            height="auto"
                            alt="prod"
                        />


                    </div>

                </div>
            </div>);
    }
}

const mapStateToProps = (state) => {

    return {
        gallery: state.gallery
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        incrementQunatity: (id) => dispatch({type: "QUANTITY_INC", id}),
        decrementQunatity: (id) => dispatch({type: "QUANTITY_DEC", id}),
        removeItem: (id) => dispatch({type: "REMOVE_BAG_ITEM", id}),

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);

