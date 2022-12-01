// import React from 'react';
// import ShoppingCart from "../assets/images/ShoppingCart.svg"
// import {store} from "../redux/store";
// import CartSlider from "./CartSlider";
// import withClickOutside from "../Common/withClickOutside";
//
// // const Dropdown = withClickOutside(CartSlider)
//
// class CartLogoComponent extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             isMiniBagOpen: false,
//         }
//     }
//
//     toggle = () => {
//         console.log(this.state)
//         this.setState({isMiniBagOpen: !this.state.isMiniBagOpen})
//     }
//
//     render() {
//         return (
//             // <div className='cart'>
//             //     <img className='cartIcon' src={ShoppingCart} onClick={this.toggle}/>
//             //     {this.state.isMiniBagOpen && <CartSlider
//             //         currency={this.props.currency}
//             //         onClickOutside={this.onClickOutsideOverlay}
//             //     />}
//             // </div>
//         )
//     }
// }
//
// export default CartLogoComponent