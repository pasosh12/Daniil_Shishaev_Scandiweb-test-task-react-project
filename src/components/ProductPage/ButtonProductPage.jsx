import React, {Fragment} from "react";
import {connect} from "react-redux";
import {store} from "../../redux/store";

class ButtonProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    createProduct = (attributeName, item, colorAttributeArray) => {
        const attributesArray = attributeName
        Array.prototype.push.apply(attributesArray, colorAttributeArray);
        const product = {
            name: item.name,
            price: this.props.price,
            image: item.gallery[0],
            brand: item.brand,
            quantity: 1,
            id: Math.floor(Math.random() * 1000),
            prices: item.prices,
            attributes: item.attributes,
            selectedAttributes: attributesArray
        }
        return product
    }

    addToBag = (e) => {
        const product = this.createProduct(this.props.classNameState, this.props.item, this.props.massColorProduct)
        const item = store.getState().bag.find((item) => {
            return (item.name === product.name && JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes))
        })
        if (item) this.props.incrementQunatity(item.id)
        else this.props.addtoBag(product);

    }

    render() {
        return (
            <Fragment>
                <div className='button'>
                    <div className='button_add_to_cart'
                         onClick={() => {
                             this.addToBag(this.props.item)
                         }}
                    >
                        ADD TO CART
                    </div>
                </div>
                {this.state.classNameState &&
                    <div className="not_attributes_product">No product parameters chosen</div>}
            </Fragment>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        incrementQunatity: (id) => dispatch({type: "QUANTITY_INC", id}),
        addtoBag: (product) => dispatch({type: "ADD_TO_BAG", product}),
    }
}

export default connect(null, mapDispatchToProps)(ButtonProductPage)