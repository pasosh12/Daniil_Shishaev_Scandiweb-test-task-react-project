// import React, { Fragment } from "react";
// import AttributProductPage from "./Attribute";
// import { productClick } from "../graphQl/GetProduct"
//
// class ProductPage extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             flag: ''
//         }
//     }
//
//     render() {
//         return (
//             <Fragment>
//                 {
//                     this.props.data.product &&
//
//                     <div className="flex_product_block" key={this.props.data.product.id}>
//                         <div className="product_pictures">
//                             {
//                                 this.props.data.product.gallery.map(img =>
//                                     <img key={img} src={img} onClick={() => this.setState({ flag: img })} />
//                                 )
//                             }
//                             {
//                             }
//                         </div>
//                         <img src={this.props.data.product.gallery[0]} className="main_img_product" />
//                         <div className="description_product">
//                             <div className="name_product">{this.props.data.product.name}</div>
//                             <div className="brand">{this.props.data.product.brand}</div>
//                             <div className="prise_title">Prise:</div>
//                             <div className="prise">
//
//                                 {this.props.data.product.prices.filter(k => k.currency.label === this.props.currency)[0].currency.symbol + this.props.data.product.prices.filter(k => k.currency.label === this.props.currency)[0].amount}
//
//                             </div>
//                             {
//                                 this.props.data.product.inStock
//                                     ? <AttributProductPage item={this.props.data.product} prise={this.props.data.product.prices.filter(k => k.currency.label === this.props.currency)[0].amount} />
//                                     : <div className="not_attributes_product">The product is out of stock</div>
//                             }
//                             <div className="text_description" dangerouslySetInnerHTML={{ __html: `${this.props.data.product.description}` }}></div>
//                         </div>
//                     </div>
//                 }
//                 {
//                     this.state.flag.length
//                         ?
//                         <div className="overflow" onClick={(event) => event.target.className === "overflow" && this.setState({ flag: '' })}>
//                             <div className="img_and_close_block">
//                                 {/*<img src={this.state.flag} />*/}
//                                 {/*<div className="close" onClick={() => this.setState({ flag: '' })}>&#10006;</div>*/}
//                             </div>
//                         </div>
//                         : null
//                 }
//             </Fragment>
//         )
//     }
// }
//
//
// export default productClick(ProductPage);
