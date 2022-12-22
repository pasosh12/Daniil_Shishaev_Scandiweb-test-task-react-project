import React, {Component} from "react";
import '../../styles/Cart.css'
import {connect} from "react-redux";
import {store} from "../../redux/store";
import AttributesActive from "../ProductPage/AttributesActive";

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
                quantity: item  ? item.quantity : 0,
                currencySymbol: this.props.currencySymbol,

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
            <div className='product_card_basket'>
                <div className='product_description'>
                    <div className='product_name'>
                        <p>{el.brand}</p>
                        <p>{el.name}</p>
                    </div>
                    <div className='product_price'>
                        {this.props.currentCurrencySymbol}
                        {this.props.price.amount}
                    </div>

                    <div className='attributes'>
                        <AttributesActive data={el}/>
                    </div>
                </div>
                <div className='img_block_basket'>
                    <div className='counter'>
                        <div className='plus' onClick={this.increment}>&#43;</div>
                        <div className='product_quantity'>{this.state.quantity}</div>
                        <div className='minus' onClick={this.decrement}>&#8722;</div>
                    </div>
                    <div className='images_container'>
                        <img
                            src={el.image}
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
        gallery: state.gallery,
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

