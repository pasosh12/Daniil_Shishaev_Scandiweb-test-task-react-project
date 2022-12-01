import React from "react";
import ImagesProductInBusket from "./ImagesProductInBusket";
import ImagesProductInBusketModal from "./ImagesProductInBusketModal";


export default class BasketProducts extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            JSON.parse(localStorage.getItem('attributes')).length
                ?
                JSON.parse(localStorage.getItem('attributes')).map((el, index) =>
                    <div className="product_card_basket" key={index}>
                        <div className="product_description">
                            <div className="product_name">{el.Product.name}</div>
                            <div className="product_prise">

                                {
                                    el.Product.prices.filter(curr => curr.currency.label === this.props.currency)[0].currency.symbol + el.Product.prices.filter(curr => curr.currency.label === this.props.currency)[0].amount
                                }

                            </div>
                            {
                                el.Product.attributes.map(item =>
                                    <div className="attributes" key={item.id}>
                                        <div className="name_attributes">{item.name + ':'}</div>
                                        <div className="product_attributes">
                                            {
                                                item.id === "Color"
                                                    ?
                                                    item.items.map(it =>
                                                        <div
                                                            className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes color_attr active" : "new_attributes color_attr"}
                                                            style={{backgroundColor: `${it.value}`}} key={it.id}></div>
                                                    )
                                                    :
                                                    item.items.map(it =>
                                                        <div
                                                            className={el.attributes.filter(i => i.name === it.id && i.title === item.id)[0] ? "new_attributes active" : "new_attributes"}
                                                            key={it.id}> {it.value}</div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                        <div className="img_block_basket">
                            <div className="quantity_of_goods">
                                <div className="plus"

                                     onClick={() => {
                                         localStorage.setItem('numberProductsInBusket', +localStorage.getItem('numberProductsInBusket') + 1)
                                         this.props.numberProductsInBusket(localStorage.getItem('numberProductsInBusket'))
                                         localStorage.setItem(el.Product.id + JSON.stringify(el.attributes), +localStorage.getItem(el.Product.id + JSON.stringify(el.attributes)) + 1)
                                         this.props.priseFunction()
                                     }}

                                >&#10010;</div>

                                {
                                    <div
                                        className="number_product">{+localStorage.getItem(el.Product.id + JSON.stringify(el.attributes))}</div>
                                }

                                <div className="minus"

                                     onClick={() => {
                                         this.props.numberProductsInBusket(localStorage.getItem('numberProductsInBusket'))
                                         localStorage.setItem('numberProductsInBusket', +localStorage.getItem('numberProductsInBusket') - 1)
                                         if (!(+localStorage.getItem(el.Product.id + JSON.stringify(el.attributes)) - 1)) {
                                             this.props.removeProductsInBusket(el.Product.id + JSON.stringify(el.attributes), localStorage.getItem(el.Product.id + JSON.stringify(el.attributes)), JSON.stringify(el.attributes))
                                         } else {
                                             localStorage.setItem(el.Product.id + JSON.stringify(el.attributes), +localStorage.getItem(el.Product.id + JSON.stringify(el.attributes)) - 1)
                                             this.props.priseFunction()
                                         }
                                     }}

                                >&mdash;</div>

                            </div>
                            {/*{*/}
                            {/*    this.props.flag === 'basket'*/}
                            {/*        ? <ImagesProductInBusket images={el.Product.gallery}/>*/}
                            {/*        : <ImagesProductInBusketModal images={el.Product.gallery}/>*/}
                            {/*}*/}
                        </div>
                    </div>
                )
                : <div className="no_products">you don't have any added products yet</div>
        )
    }
}