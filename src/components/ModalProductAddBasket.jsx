import React, {Component, Fragment} from "react";
import AttributeProductPage from "./ProductPage/AttributeProductPage";
import "../styles/ModalProductAddBusket.css"
class ModalAddBusketProduct extends Component {

    render() {
        return (

            <Fragment>
                <div className="overflow"
                     onClick={(event) => event.target.className === 'overflow' && this.props.closeModal('')}>
                    <div className="modal_attribute_product">
                        <div className="container_modal">
                            <div className="close" onClick={() => this.props.closeModal()}>&#10006;</div>
                            <div className="name_product">{this.props.data.name}</div>
                            <AttributeProductPage item={this.props.data} />
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default ModalAddBusketProduct