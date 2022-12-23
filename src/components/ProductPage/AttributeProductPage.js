import React, {Fragment} from "react";
import ButtonProductPade from "./ButtonProductPage";
import '../../styles/Attributes.css'

export default class AttributeProductPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            classNameState: [],
            massColorProduct: [],
        }
    }

    render() {
        return (
            <Fragment>
                {
                    this.props.item.attributes.map(el =>
                        <div className="attributes" key={el.id}>
                            <div className="name_attributes">
                                {el.name + ':'}</div>
                            <div className="product_attributes">
                                {
                                    el.name === "Color"
                                        ?
                                        el.items.map(it =>
                                            <div
                                                className={this.state.massColorProduct.filter(item => item.name === it.id).length ? "new_attributes_color active" : "new_attributes_color"}
                                                onClick={() => {
                                                    this.state.massColorProduct.length
                                                        ? this.setState({
                                                            massColorProduct: this.state.massColorProduct.map(item => item.id !== it.id ? {
                                                                element: this.props.item.id,
                                                                title: el.name,
                                                                name: it.id,
                                                                value: it.value,
                                                                id: el.id,
                                                            } : item)
                                                        })
                                                        : this.setState({
                                                            massColorProduct: [{
                                                                element: this.props.item.id,
                                                                title: el.name,
                                                                name: it.id,
                                                                value: it.value,
                                                                id: el.id
                                                            }]
                                                        })
                                                }}
                                                style={{backgroundColor: `${it.value}`}} key={it.id}>
                                            </div>
                                        )
                                        :
                                        el.items.map(it =>
                                            <div
                                                className={this.state.classNameState.filter(item => item.title === el.name && item.value === it.id).length ? "new_attributes active" : "new_attributes"}
                                                onClick={() => {
                                                    this.state.classNameState.filter(item => item.title === el.name).length
                                                        ? this.setState({
                                                            classNameState: this.state.classNameState.map(item => item.title === el.name ? {
                                                                element: this.props.item.id,
                                                                title: el.name,
                                                                name: it.id,
                                                                value: it.id,
                                                                id: el.id
                                                            } : item)
                                                        })
                                                        : this.setState({
                                                            classNameState: [...this.state.classNameState, {
                                                                element: this.props.item.id,
                                                                title: el.name,
                                                                name: it.id,
                                                                value: it.id,
                                                                id: el.id
                                                            }]
                                                        })
                                                }}
                                                key={it.id + '_' + el.name}>
                                                {it.value}
                                            </div>
                                        )
                                }
                            </div>
                        </div>
                    )
                }

                <ButtonProductPade price={this.props.price} massColorProduct={this.state.massColorProduct}
                                   classNameState={this.state.classNameState} item={this.props.item}/>
            </Fragment>
        )
    }
}