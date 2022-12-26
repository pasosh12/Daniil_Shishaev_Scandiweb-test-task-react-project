const currentID = window.location.pathname.split('/')[2]
const preferredCurrency = localStorage.getItem('preferredCurrency')
const preferredCurrencySymbol = localStorage.getItem('preferredCurrencySymbol')
const bag = JSON.parse(localStorage.getItem("bag"));
const CATEGORY_UPDATE = 'CATEGORY_UPDATE';
const CURRENCY_UPDATE = 'CURRENCY_UPDATE';
const PRODUCT_ID_UPDATE = 'PRODUCT_ID_UPDATE';
const ADD_TO_BAG = 'ADD_TO_BAG';
const CLEAR_BAG = 'CLEAR_BAG';
const REMOVE_BAG_ITEM = 'REMOVE_BAG_ITEM';
const QUANTITY_INC = 'QUANTITY_INC';
const QUANTITY_DEC = 'QUANTITY_DEC';
const SET_CATEGORIES = 'SET_CATEGORIES';
const CHANGE_CATEGORY_INDEX = 'CHANGE_CATEGORY_INDEX';
const SET_CURRENCIES_ARRAY = 'SET_CURRENCIES_ARRAY';
const SET_ATTRIBUTES_ARRAY = 'SET_ATTRIBUTES_ARRAY;';
const CURRENCY_SYMBOL_UPDATE = 'CURRENCY_SYMBOL_UPDATE'

const initialState = {
    category: "all",
    isMiniBagOpen:false,
    productID: currentID,
    currency: preferredCurrency || "USD",
    currencySymbol : preferredCurrencySymbol || "$",
    bag: bag || [],
    categoryIndex:0,
    categories: [],
    currenciesArray:[],
    attributes : {}
}

const rootReducer = (state = initialState, action) => {


    switch (action.type) {

        case SET_CURRENCIES_ARRAY:{
            return {
                ...state,
                currenciesArray: action.currenciesArray,
            }
        }
        case SET_CATEGORIES:{
            return{
                ...state,
                categories: action.categories,
            }
        }
        case SET_ATTRIBUTES_ARRAY: {
            return {
                ...state,
                attributes: action.attributes,
            }
        }
        case CURRENCY_SYMBOL_UPDATE:{
            return {
                ...state,
                currencySymbol: action.currencySymbol
            }
        }
        case CHANGE_CATEGORY_INDEX:{
            return{
                ...state,
                categoryIndex: action.categoryIndex
            }
        }
        case CATEGORY_UPDATE: {
            return {
                ...state,
                category: action.category,
            }
        }
        case CURRENCY_UPDATE : {
            return {
                ...state,
                currency: action.currency
            }
        }
        case PRODUCT_ID_UPDATE : {
            return {
                ...state,
                productID: action.productID
            }
        }
        case ADD_TO_BAG : {
            localStorage.setItem("bag", JSON.stringify([...state.bag, action.product]))
            return {
                ...state,
                bag: [...state.bag, action.product]
            }
        }
        case CLEAR_BAG : {
            localStorage.removeItem("bag")
            return {
                ...state,
                bag: []
            }
        }
        case REMOVE_BAG_ITEM : {
            const newBag = state.bag.filter(bagItem => bagItem.id !== action.id)
            localStorage.setItem("bag", JSON.stringify(newBag))

            return {
                ...state,
                bag: newBag
            }
        }
        case QUANTITY_INC: {
            const newBag = state.bag.map(item => {
                if (item.id === action.id) {
                    if (item.quantity < 10) {
                        return {
                            ...item,
                            quantity: Number(item.quantity) + 1
                        }
                    } else return item
                } else return item
            })
            localStorage.setItem("bag", JSON.stringify(newBag))
            return {
                ...state,
                bag: newBag
            }
        }
        case QUANTITY_DEC: {
            const newBag = state.bag.map(item => {
                if (item.id === action.id) {
                    if (item.quantity > 1) {
                        return {
                            ...item,
                            quantity: Number(item.quantity) - 1
                        }
                    } else return item
                } else return item
            })
            localStorage.setItem("bag", JSON.stringify(newBag))
            return {
                ...state,
                bag: newBag
            }
        }
        default:
            return state

    }
}
export default rootReducer