import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'
import {store} from '../redux/store'
import '../styles/ProductCardList.css'
import {ReactComponent as ProductCartImage} from '../assets/images/addToCartIco.svg';
import ModalAddBasketProduct from "./ModalProductAddBasket";


class Product extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currency: store.getState().currency,
            product: {
                name: this.props.data.name,
                prices: this.props.data.prices,
                image: this.props.data.gallery[0],
                brand: this.props.data.brand,
                id: Math.floor(Math.random() * 1000),
                attributes: this.props.data.attributes,
                quantity: 1
            },
            isModalOpened: false,
            focus: '',
        }
    }
    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {

            this.setState({
                currency: store.getState().currency,
            })
        })
    }

    addToBag = (e) => {
        e.preventDefault();
        const x = this.props.data.name;
        const item = store.getState().bag.find((item) => {
            return item.name === x;
        });

        const y = this.props.data
        this.props.setAttributes(y.attributes)
        if (item) {
            this.props.incrementQunatity(item.id)
        } else this.props.addtoBag(this.state.product);

    }

    componentWillUnmount() {
        this.unsubscribe();
    }
    changeProduct = (id) => {
        this.props.changeProductID(id)
    }
    closeModal = (b) => {
        this.setState({isModalOpened: false})
    }
    basketButton = (id) => {
        this.props.data.id === id && this.setState({focus: `${this.props.data.id}`})
    }
    basketButtonRemove = (id) => {
        this.props.data.id === id && this.setState({focus: ''})
    }

    render() {
        const currentCurrencyPrice = this.props.data.prices.find(currency => currency.currency.label === this.state.currency)
        const productInStockFlag = this.props.data.inStock
        return (
            <>
                 {this.state.isModalOpened && this.props.data
                    ?
                    <ModalAddBasketProduct data={this.props.data} closeModal={this.closeModal}/>
                    :
                    null
                }
                <div className='card' onMouseEnter={() => this.basketButton(this.props.data.id)}
                     onMouseLeave={() => this.basketButtonRemove(this.props.data.id)}>
                    {
                        productInStockFlag ?
                            <>
                                <NavLink to={`/product/${this.props.data.id}`} data-id="element"
                                         onClick={() => this.changeProduct(this.props.data.id)}>
                                    <div className='image_block_card'>
                                        <img className='img_card'
                                             src={this.props.data.gallery[0]}
                                             alt={this.props.data.name}
                                        />
                                    </div>
                                    <div className='product_name'>{this.props.data.name}</div>
                                    <div className='product_price'>
                                        {currentCurrencyPrice.currency.symbol}
                                        {currentCurrencyPrice.amount}
                                    </div>
                                </NavLink>
                            </>
                            :
                            <>

                                <NavLink to={`/product/${this.props.data.id}`} data-id="element"
                                         onClick={() => this.changeProduct(this.props.data.id)}>
                                    <div className="background_card_overflow">
                                        <div className="stock_text">OUT OF STOCK</div>
                                        <div className='image_block_card'>
                                            <img className='img_card'
                                                 src={this.props.data.gallery[0]}
                                                 height="300"
                                                 width="auto"
                                                 alt={this.props.data.name}
                                            />
                                        </div>
                                        <div className='product_name' data-id="element">{this.props.data.name}</div>
                                        <div className='product_price' data-id="element">
                                            {currentCurrencyPrice.currency.symbol}
                                            {currentCurrencyPrice.amount}
                                        </div>
                                    </div>
                                </NavLink>
                            </>
                    }
                    {
                        this.state.focus === this.props.data.id && productInStockFlag === true
                            ?
                            <ProductCartImage className='add_cart_button'
                                              onClick={() => this.setState({isModalOpened: true})}/>
                            : null
                    }
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bagItems: state.bag,
        product: state.product,
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        incrementQunatity: (id) => dispatch({type: "QUANTITY_INC", id}),
        changeProductID: (productID) => dispatch({type: "PRODUCT_ID_UPDATE", productID: productID}),
        addtoBag: (product) => dispatch({type: "ADD_TO_BAG", product: product}),
        setAttributes: (attributesArray) => dispatch({type: "SET_ATTRIBUTES_ARRAY", attributes: attributesArray}),
        clearBagItems: () => dispatch({type: "CLEAR_BAG"}),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Product)