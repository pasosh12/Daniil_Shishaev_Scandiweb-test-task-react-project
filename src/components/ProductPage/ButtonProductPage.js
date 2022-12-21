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
            // .slice()
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
        // this.props.addtoBag(product)
    }

    addToBag = (e) => {
        const product = this.createProduct(this.props.classNameState, this.props.item, this.props.massColorProduct)

        console.log(product)

        const item = store.getState().bag.find((item) => {
            return (item.name === product.name &&  JSON.stringify(item.selectedAttributes) === JSON.stringify(product.selectedAttributes))
        })

            console.log('item', item)
        if (item) this.props.incrementQunatity(item.id)
        else  this.props.addtoBag(product);

    }

    render() {
        // console.log(this.props)
        return (

            // <buttonProductPageContext.Consumer>


            // {
            //     title =>

            <Fragment>
                <div className='button'>
                    <div className='button_add_to_cart'

                         onClick={() => {
                             this.addToBag(this.props.item)
                             // const lengthTrue = [...this.props.classNameState, ...this.props.massColorProduct]
                             // if (lengthTrue.length === this.props.item.attributes.length) {
                             //     console.log(lengthTrue)
                             //     const massAttributeProduct = [{
                             //         Product: this.props.item,
                             //         attributes: [...this.props.classNameState, ...this.props.massColorProduct]
                             //     }]
                             //     // console.log(title)
                             //     if (localStorage.getItem('attributes')) {
                             //         console.log('exist')
                             //         const mass = JSON.parse(localStorage.getItem('attributes'))
                             //         mass.filter(el => JSON.stringify(el.attributes) == JSON.stringify(lengthTrue)).length
                             //             ? localStorage.setItem('attributes', JSON.stringify([...mass]))
                             //             : localStorage.setItem('attributes', JSON.stringify([...mass, ...massAttributeProduct]))
                             //
                             //     } else localStorage.setItem('attributes', JSON.stringify(massAttributeProduct))
                             //
                             //     this.setState({notAttributesProductText: 'the product has been added to the cart'})
                             //     localStorage.getItem('numberProductsInBusket') ? localStorage.setItem('numberProductsInBusket', +localStorage.getItem('numberProductsInBusket') + 1) : localStorage.setItem('numberProductsInBusket', 1)
                             //
                             //     // this.addtoBag(localStorage.getItem('numberProductsInBusket'))
                             //     // title.numberProductsInBusket(localStorage.getItem('numberProductsInBusket'))
                             //     localStorage.getItem(this.props.item.id + JSON.stringify(lengthTrue)) ? localStorage.setItem(this.props.item.id + JSON.stringify(lengthTrue), +localStorage.getItem(this.props.item.id + JSON.stringify(lengthTrue)) + 1) : localStorage.setItem(this.props.item.id + JSON.stringify(lengthTrue), 1)
                             // } else {
                             //     this.setState({notAttributesProductText: 'you have not selected the characteristics of the product'})
                             // }
                         }}

                    >
                        ADD TO CART
                    </div>
                </div>
                {this.state.classNameState &&
                    <div className="not_attributes_product">No product parameters chosen</div>}
            </Fragment>
            // }
            // </>
            // {/*</buttonProductPageContext.Consumer>*/}
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