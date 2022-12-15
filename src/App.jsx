import React, {Component} from "react";
import Home from "./pages/Home";
import ProductDetailed from "./pages/ProductDetailed";
import Cart from "./pages/Cart";
import {BrowserRouter, Route} from "react-router-dom";
import {Routes} from "react-router";
import './styles/index.css'
import ModalAddBusketProduct from "./components/ModalProductAddBusket";


const production = process.env.REACT_APP_ENV === 'production';


// ModalAddBusketProduct.propTypes = {openModal: PropTypes.func};

class App extends Component {

    constructor(props) {
        super(props)
        this.state = {
            closeModal: false,
            openModalProductAddBusket: '',
            idProduct: '',
        }
    }
    idProduct = (id) => this.setState({ idProduct: id })

    openModalProductAddBusketFunction = (element) => this.setState({openModalProductAddBusket: element})

    render() {
        return (

            <BrowserRouter>
                <div className="container">
                    {/*<ModalAddBusketProduct openModalProductAddBusket={this.state.openModalProductAddBusket}*/}
                    {/*                       closeModal={this.openModalProductAddBusketFunction} />*/}
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/cart" element={<Cart />}/>
                        <Route path='/product/:id' element={<ProductDetailed/>}/>

                        {/*<Route path={'/product'} element={<ProductDetailed2 idProduct={this.state.idProduct}/>}/>*/}
                    </Routes>
                </div>
            </BrowserRouter>

        )
    }
}


export default App;