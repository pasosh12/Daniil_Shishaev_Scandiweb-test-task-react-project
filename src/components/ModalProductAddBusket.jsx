import React, {Component, Fragment} from "react";
import AttributeItem from "./AttributeItem";
import {productClick} from "../graphQl/GetProduct";
import AttributeProductPage from "./ProductPage/AttributeProductPage";

class ModalAddBusketProduct extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.data)
        return (

            <Fragment>
                <div className="overflow"
                     onClick={(event) => event.target.className === 'overflow' && this.props.closeModal('')}>
                    <div className="modal_attribute_product">
                        <div className="conteiner_modal">
                            <div className="name_product">{this.props.data.name}</div>
                            <div className="close" onClick={() => this.props.closeModal()}>&#10006;</div>

                            <AttributeProductPage item={this.props.data} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ModalAddBusketProduct