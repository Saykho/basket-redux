import { ShopAction, ShopActonType, ShopStore } from "../../types/store";

const initialShopStore: ShopStore = {
    basket: [],
    products: [],
};

export const shopReducer = (state = initialShopStore, action: ShopAction): ShopStore => {
    switch (action.type) {
        case ShopActonType.SET_PRODUCTS:
            return {...state, products: action.payload}; //получаем новое состояние ...state
        case ShopActonType.ADD_PRODUCT_TO_BASKET: {
            let basket = state.basket;
            const basketItem = basket.find(b => b.productId === action.payload.productId); //в корзине ищем определенный продукт по id
            if (basketItem) { //если нашли
                basketItem.count += action.payload.count; //то увеличиваем число basketItem
            } else { //если не нашли
                basket = [...basket, action.payload]; //возвращаем
            }
            return {...state, basket: [...basket]}; //возвращаем новое состояние и новый массив списка продуктов в корзине
        }
        case ShopActonType.DELETE_PRODUCT: {
            let basket = state.basket;
            let basketItem = basket.find(b => b.productId === action.payload.productId);
            if (basketItem) { //если нашли
                if (basketItem.count - action.payload.count <= 0) { //если count = 0
                    basket = basket.filter(b => b.productId !== action.payload.productId); // удалить продукт из корзины
                } else { // иначе
                    basketItem.count -= action.payload.count; //уменьшаем число продуктов в корзине
                }
            }

            return {...state, basket: [...basket]};
        }
        case ShopActonType.DELETE_ALL_PRODUCTS: {
            return {...state, basket: []}; //при удалении всех продуктов в корзине, возвращаем пустой массив
        }
        default:
            return state;
    }
};