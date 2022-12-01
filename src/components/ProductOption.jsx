import React from "react";
import {connect} from "react-redux";
import '../styles/cart.css'
import AttributeItem from "./AttributeItem";

class ProductOption extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedIndex: false,
            product: {
                attributes: {}
            },
            quantityError: null,
            // addToBagMsg: "Select Choices To Add To Bag"
        }
    }

    createProductObject = () => {
        const product = {
            name: this.props.data.name,
            prices: this.props.data.prices,
            image: this.props.data.gallery[0],
            brand: this.props.data.brand,
            quantity: 1,
            id: Math.floor(Math.random()*1000),
            attributes: {}
        }

        this.props.data.attributes.forEach(attribute => {
            product.attributes[attribute.name] = ""
        });

        this.setState({
            product: product
        })
    }

    componentDidMount() {
        // this.createProductObject()
    }

    handleChoice = (attributeName, itemID) => {
        console.log('attributeName ', attributeName, 'itemID ', itemID)
        this.setState({
            product: {
                ...this.state.product,
                attributeSelected: false,
                attributes: {
                    ...this.state.product.attributes,
                    [attributeName]: itemID

                }
            }
        })
    }

    handleBag = () => {
        this.props.addtoBag(this.state.product);
        //
        //
        //     this.createProductObject()
    }
    selectedIndex;

    render() {
        return (
            <>
                {
                    this.props.data.attributes.map((attribute) => {
                            console.log(attribute)

                            return (
                                <>
                                    <div className='attribute' key={attribute.name}>
                                        <div className='name' key={attribute.name}>{attribute.name}</div>
                                        <div className='attributeItems'>
                                            {attribute.items.map((i, index) => {
                                                return (
                                                     <>
                                                    <AttributeItem
                                                        key={i.id}
                                                        type={attribute.type}
                                                        selected={this.props.selectedIndex === index}
                                                        value={i.displayValue}
                                                        // onSelected={() => this.props.onChange?.(index)}

                                                    />
                                                    {/*<button*/}
                                                    {/*    key={item.id}*/}
                                                    {/*    // style={{*/}
                                                    {/*    //     backgroundColor: item.value,*/}
                                                    {/*    //     border: "1px solid black",*/}
                                                    {/*    //     minWidth: "40px",*/}
                                                    {/*    //     height: "30px",*/}
                                                    {/*    //     margin: "5px",*/}
                                                    {/*    //     padding: "1%"*/}
                                                    {/*    // }}*/}
                                                    {/*    className={attribute.type + (this.state.attributeSelected ? ' selected' : '')}*/}
                                                    {/*    // style={{backgroundColor: 'green'}}*/}
                                                    {/*    onClick={() => this.handleChoice(attribute.name, item.id)}*/}
                                                    {/*>*/}
                                                    {/*     {attribute.type === "swatch" ? "" : item.displayValue}*/}
                                                    {/* </button>*/}
                                                </>

                                                )
                                            })
                                            }
                                        </div>
                                    </div>

                                </>
                            )
                        }
                    )
                }
            </>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        bagItems: state.bag
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addtoBag: (product) => dispatch({type: "ADD_TO_BAG", product}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductOption)

