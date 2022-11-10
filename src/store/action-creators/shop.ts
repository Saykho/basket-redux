import { Product, ShopAction, ShopActonType } from "../../types/store";
import { Dispatch } from "react";


const productListMock: Product[] = [
    {id: 1, name: "Cheese", price: 120},
    {id: 2, name: "Milk", price: 80},
    {id: 3, name: "Bread", price: 32},
    {id: 4, name: "Apple", price: 90},
    {id: 5, name: "Eggs", price: 80},
    {id: 6, name: "Banana", price: 50},
];

const productListMockPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve(productListMock), 500);
}); // в промис получем через 0.5с получаем список продуктов

export const fetchProducts = () => {
    return async (dispatch: Dispatch<ShopAction>) => {
        const products = await productListMockPromise as Product[];
        dispatch({type: ShopActonType.SET_PRODUCTS, payload: products});
    }; // выводим список полученных продуктов
};



