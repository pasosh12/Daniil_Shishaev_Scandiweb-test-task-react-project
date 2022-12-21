import React, {Component, Fragment} from "react";
import AttributeProductPage from "./ProductPage/AttributeProductPage";

class ModalAddBusketProduct extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (

            <Fragment>
                <div className="overflow"
                     onClick={(event) => event.target.className === 'overflow' && this.props.closeModal('')}>
                    <div className="modal_attribute_product">
                        <div className="container_modal">
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