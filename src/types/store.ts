export interface Product {
    id: number;
    name: string;
    price: number;
}

export interface BasketItem {
    productId: number;
    count: number;
}

export interface ShopStore {
    products: Product[];
    basket: BasketItem[];
}

export enum ShopActonType {
    SET_PRODUCTS = "SET_PRODUCTS",
    ADD_PRODUCT_TO_BASKET = "ADD_PRODUCT_TO_BASKET",
    DELETE_PRODUCT = "DELETE_PRODUCT",
    DELETE_ALL_PRODUCTS = "DELETE_ALL_PRODUCTS"
}

interface SetProductsAction {
    type: ShopActonType.SET_PRODUCTS;
    payload: Product[]; //Получаем массив списка продуктов
}

interface AddProductToBasket {
    type: ShopActonType.ADD_PRODUCT_TO_BASKET;
    payload: BasketItem; //добавляем продукт
}

interface DeleteProductAction {
    type: ShopActonType.DELETE_PRODUCT;
    payload: BasketItem; //удаляем продукт
}

interface DeleteAllProductsAction {
    type: ShopActonType.DELETE_ALL_PRODUCTS;
}

export  type ShopAction = SetProductsAction | AddProductToBasket | DeleteProductAction | DeleteAllProductsAction;