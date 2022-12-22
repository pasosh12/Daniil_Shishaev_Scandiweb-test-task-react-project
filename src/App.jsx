import React, {Component} from "react";
import Home from "./pages/Home";
import ProductDetailed from "./pages/ProductDetailed";
import Cart from "./pages/Cart";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import './styles/index.css'



class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            closeModal: false,
            openModalProductAddBusket: '',
            idProduct: '',
        }
    }

    idProduct = (id) => this.setState({idProduct: id})

    render() {
        return (
            <BrowserRouter>
                <div className="container">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path='/product/:id' element={<ProductDetailed/>}/>
                    </Routes>
                </div>
            </BrowserRouter>

        )
    }
}


export default App;