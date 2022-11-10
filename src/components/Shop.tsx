import React from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { BasketItem, Product, ShopActonType } from "../types/store";
import { Link } from "react-router-dom";
import "./Shop.scss";

export function Shop() {
    const dispatch = useDispatch();
    const products = useTypedSelector(r => r.shop.products);
    const basket = useTypedSelector(r => r.shop.basket);

    const getProductCount = (product: Product) => {
        //найти количество в basket
        //каждый продукт ищется в корзине
        const foundProduct = basket.find(b => b.productId === product.id);
        return !!foundProduct ? foundProduct.count : 0;
    };

    return (
        <div className="content">
            <div className="shop">
                {products.map(p =>
                    (<div className="shop__product"
                        key={p.id}>
                        <div className="product-id">Id: {p.id}</div>
                        <div className="product-name">Name: {p.name}</div>
                        <div className="product-price">Price: {p.price} {"rub"}</div>
                        <button className="shop__add-button"
                                onClick={() => {
                                    dispatch({
                                        type: ShopActonType.ADD_PRODUCT_TO_BASKET, payload: {
                                            productId: p.id,
                                            count: 1
                                        } as BasketItem
                                    });
                                }}>Add to basket
                        </button>
                        <div>Quantity in basket: {getProductCount(p)}</div>
                        <button className="shop__delete-button"
                                onClick={() => dispatch({
                                    type: ShopActonType.DELETE_PRODUCT,
                                    payload: {
                                        count: 1,
                                        productId: p.id
                                    } as BasketItem
                                })}
                        >Remove from basket
                        </button>
                    </div>)
                )}
            </div>
            <Link to="/basket" className="jump-button">
                <button className="jump-button__btn">Go to basket</button>
            </Link>
        </div>
    );
}