import React, {Fragment} from "react";
import {buttonProductPageContext} from "../../context/buttonProductPageContext";
import styles from "../../styles/ProductDetailed.css"
import {connect} from "react-redux";
import {store} from "../../redux/store";

class ButtonProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            notAttributesProductText: '',
            product: {
                attributes: {}
            },
        }
    }

    createProductObject = () => {
        const product = {
            name: this.props.item.name,
            prices: this.props.price,
            image: this.props.item.gallery[0],
            brand: this.props.item.brand,
            quantity: 1,
            id: Math.floor(Math.random() * 1000),
            attributes: {}
        }

        this.props.item.attributes.forEach(attribute => {
            product.attributes[attribute.name] = ""
        });

        this.setState({
            product: product
        })
    }
    handleChoice = (attributeName, itemID) => {
        // console.log('attributeName ', attributeName, 'itemID ', itemID)
        this.setState({
            product: {
                ...this.state.product,
                attributeSelected: false,
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID

                }
            },

        })
    }
    addToBag = (e) => {
        // e.preventDefault();
        this.handleChoice()
        console.log(this.state)
        // const x = this.props.item.name;
        // const item = store.getState().bag.find((item) => {
        //     return item.name === x;
        // });
        // console.log(item)
        // if (item) {
        //     this.props.incrementQunatity(item.id)
        //     console.log('item.id ', item.id)
        // } else this.props.addtoBag(this.state.product);
    }

    render() {
        console.log(this.props.price)
        console.log('mascolorProd',this.props.massColorProduct)
        console.log('clasname',this.props.classNameState)
        // console.log(this.props.item)
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

                    >ADD TO CART
                    </div>
                </div>
                {this.state.notAttributesProductText &&
                    <div className="not_attributes_product">{this.state.notAttributesProductText}</div>}
            </Fragment>
            // }
            // </>
            // {/*</buttonProductPageContext.Consumer>*/}
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addtoBag: (product) => dispatch({type: "ADD_TO_BAG", product}),
    }
}

export default connect(mapDispatchToProps)(ButtonProductPage)