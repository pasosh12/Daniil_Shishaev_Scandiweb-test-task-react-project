import React from "react";
import "../../styles/Attributes.css"

export default class AttributesActive extends React.Component {
    render() {
        const bagProduct = this.props.data
        // console.log('attr',bagProduct.attributes)
        // console.log('selected attr',bagProduct.selectedAttributes)
        return (
            bagProduct.attributes.map(item =>
                <div className="attributes" key={item.id}>
                    <div className="name_attributes">{item.name + ':'}</div>
                    <div className="product_attributes">
                        {
                            item.id === "Color"
                                ?
                                item.items.map(it =>
                                    <div
                                        className={bagProduct.selectedAttributes.filter(i =>
                                            i.name === it.id && i.title === item.id
                                        )[0] ?   "new_attributes color_attr active" : "new_attributes color_attr" }
                                        style={{backgroundColor: `${it.value}`}}
                                        key={it.id}>

                                    </div>
                                )
                                :
                                item.items.map(it =>
                                    <div
                                        className={bagProduct.selectedAttributes.filter(i => i.name === it.id
                                        )[0] ? "new_attributes active" : "new_attributes"}
                                        key={it.id}>
                                        {it.value}
                                    </div>
                                )
                        }
                    </div>
                </div>
            )
        )
    }
}