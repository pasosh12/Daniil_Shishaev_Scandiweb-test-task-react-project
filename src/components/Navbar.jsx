// import {Badge} from "@material-ui/core";

import React from "react";
import "../styles/navbarDesktopView.css";
import styled from "styled-components";
import CartLogoImage from "../assets/images/CartLogo.svg"
import {ReactComponent as ShoppingCartLogo} from "../assets/images/ShoppingCart.svg"
import {Link, NavLink} from "react-router-dom";
import {store} from "../redux/store";
import CartSlider from "./MiniBag";
import upArrow from "../assets/images/upArrow.svg"
import downArrow from "../assets/images/downArrow.svg"


const Logo = styled.img.attrs(
    {'src': CartLogoImage}
)``;


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currency: store.getState().currency,
            isMiniBagOpen: false,
            isCurrencyArrayOpen: false,
            categories: store.getState().categories,
            cart: store.getState().bag,
            currenciesArray: store.getState().currenciesArray,
            currencySymbol: store.getState().currencySymbol
        };
    }

    componentDidMount() {
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                currency: store.getState().currency,
                categories: store.getState().categories,
                cart: store.getState().bag,
                currenciesArray: store.getState().currenciesArray
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    handleCurrency = (e) => {
        let currentCurrencySymbol = this.props.currenciesArray.find(item => item.label === e.target.value).symbol
        this.props.changeCurrency(e.target.value);
        this.props.changeCurrencySymbol(currentCurrencySymbol)
        localStorage.setItem("preferredCurrency", e.target.value);
        localStorage.setItem("preferredCurrencySymbol", currentCurrencySymbol);


    };

    showMiniBag = () => {
        this.setState({
            isMiniBagOpen: !this.state.isMiniBagOpen,
        });

        if (window.location.pathname.split("/")[1] === "bag") {
            this.setState({
                isMiniBagOpen: false,
            });
        }
    };
    showCurrencies = () => {
        this.setState({
            isCurrencyArrayOpen: !this.state.isCurrencyArrayOpen,
        })
    }
    changeCategory = (name, index) => {
        // navigate("/")
        this.props.changeCategory(name);
        this.props.changeCategoryIndex(index)
    }

    categoryToggle = () => {

    }

    render() {
        return (
            <div className='wrapper'>


                <div className='header'>
                    <div className='headerContainer'>


                        <nav className='navigation'>

                            <Link to={{pathname: '/'}} className='link'>
                                {
                                    this.props.categories.map((item, index) => (
                                        <span
                                            onClick={() => this.changeCategory(item.name, index)}
                                            // to={`/${item.name}`}
                                            className={this.props.categoryIndex === index ? 'headerElementSelected'
                                                : 'headerElement'}
                                            key={item.name}
                                        >

                                    {item.name}
                                </span>
                                    ))
                                }
                            </Link>

                        </nav>

                        <div className='logoContainer'>
                            <Logo className="logo"></Logo>
                        </div>

                        <div className='shoppingCartAndCurrencyContainer'>
                            {/*<div className='smallContainer'>*/}
                            <div className='currencyButtonContainer'>
                                <div className='currencyButton'>


                                    <div> {this.props.currencySymbol}</div>
                                    {this.state.isCurrencyArrayOpen ?
                                        <img src={upArrow} onClick={this.showCurrencies}/> :
                                        <img src={downArrow} onClick={this.showCurrencies}/>}
                                    {this.state.isCurrencyArrayOpen ? (
                                            <div className='prise_modal'>
                                                <div className='container_price_modal'>
                                                    {this.props.currenciesArray.map(currency => (
                                                        <div className='conversion'>
                                                            <option className='currencyButton' key={currency.value}
                                                                    onClick={this.handleCurrency}>{currency.label}
                                                            </option>
                                                        </div>
                                                    ))
                                                    }
                                                </div>
                                            </div>
                                        )
                                        : ''}
                                </div>
                            </div>
                            <div className='shoppingCartButtonContainer'>
                                <button className='shoppingCartButton' onClick={this.showMiniBag}>
                                    <ShoppingCartLogo/>
                                    <span className='totalItems'>{this.props.cartQuantity}</span>
                                </button>
                            </div>
                            {/*</div>*/}
                            {
                                this.state.isMiniBagOpen ? (
                                        <CartSlider
                                            currency={this.props.currency}
                                            onClickOutside={this.onClickOutsideOverlay}
                                        />
                                    )
                                    :
                                    ''
                            }
                        </div>
                    </div>
                </div>
            </div>
            // </div>
        );
    }
}


export default Navbar