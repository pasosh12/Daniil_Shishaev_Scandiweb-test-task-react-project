import React, {Component} from "react";
import {connect} from "react-redux";
import {store} from "../redux/store";
// import deleteIcon from "../Static/delete.svg";

import '../styles/cart.css'
import CartGallery from "./CartGallery";
import AttributeItem from "./AttributeItem";
import AttributeProductPage from "./ProductPage/AttributeProductPage";

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: this.props.data.quantity,
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
                    {/*    {console.log(this.props.data)}*/}
                    {/*    {console.log(this.props.price.amount)}*/}
                    {/*    /!*<AttributeProductPage  item={this.props.data}*!/*/}
                    {/*    /!*                       price={this.props.price.amount}>*!/*/}

                    {/*    /!*</AttributeProductPage>*!/*/}
                    {/*    /!*<AttributeItem></AttributeItem>*!/*/}

                    {/*/////////////////////////////////////////////////////////////*/}

                    {

                        // el.attributes.map(item =>
                        //     <div className="attributes" key={item.id}>
                        //         <div className="name_attributes">{item.name + ':'}</div>
                        //         <div className="product_attributes">
                        //             {
                        //                 item.id === "Color"
                        //                     ?
                        //                     item.items.map(it =>
                        //                         <div
                        //                             className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes color_attr active" : "new_attributes color_attr"}
                        //                             style={{backgroundColor: `${it.value}`}} key={it.id}></div>
                        //                     )
                        //                     :
                        //                     item.items.map(it =>
                        //                         <div
                        //                             className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes active" : "new_attributes"}
                        //                             key={it.id}> {it.value}</div>
                        //                     )
                        //             }
                        //         </div>
                        //     </div>
                        // )
                    }
                    </div>

                    {/*////////////////////////////////////////////*/}
                    {/*/!*{Object.entries(this.props.data.attributes).map((attribute) => {*!/*/}
                    {/*/!*    return (<span key={attribute}>*!/*/}
                    {/*/!*           {attribute[0]}: <b>{attribute[1]}</b> {" "}*!/*/}
                    {/*/!*         </span>);*!/*/}
                    {/*/!*})}*!/*/}
                </div>

                <div className='right'>
                    {/*<div className={styles.productQuantity}>*/}
                    <div className='counter'>

                        <button onClick={this.increment}>+</button>
                        <p>{this.state.quantity}</p>
                        <button onClick={this.decrement}>-</button>
                    </div>
                    {/*{console.log(this.props.data.name, this.props.data.gallery, this.props.data)}*/}
                    {/*<CartGallery name={this.props.data.name} gallery={this.props.data.gallery} />*/}
                    <div className='mainImageContainer'>
                        <img
                            src={this.props.data.image}
                            width="150"
                            height="auto"
                            alt="prod"
                        />

                        {/*<button*/}
                        {/*    onClick={this.removeItem}*/}
                        {/*    className='next'*/}
                        {/*/>*/}
                    </div>
                    {/*<img*/}
                    {/*    src={deleteIcon}*/}
                    {/*    width="32"*/}
                    {/*    height="auto"*/}
                    {/*    alt="trash can icon"*/}
                    {/*/>*/}
                    {/*</button>*/}
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

