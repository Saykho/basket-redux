import React from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { BasketItem, ShopActonType } from "../types/store";
import { Link } from "react-router-dom";
import "./Basket.scss";

export function Basket() {

    const dispatch = useDispatch();
    const basket = useTypedSelector(b => b.shop.basket);
    const products = useTypedSelector(state => state.shop.products);

    const getProductName = (basketItem: BasketItem) => {
        const foundProduct = products.find(p => p.id === basketItem.productId);
        return !!foundProduct ? foundProduct.name : null;
    };

    const getProductCoast = (basketItem: BasketItem) => {
        const foundProduct = products.find(p => p.id === basketItem.productId);
        return !!foundProduct ? (foundProduct.price * basketItem.count) : 0;
    };

    const getTotalCoast = () => {
        const productCoasts = basket.map(b => getProductCoast(b));
        return productCoasts.reduce((prev, current) => prev + current, 0);
    };

    return (
        <>
            <div className="basket">
                {basket.map(b =>
                    (<div className="basket__product"
                          key={b.productId}>
                        <div className="product-id">Id: {b.productId}</div>
                        <div className="product-name">Name: {getProductName(b)}</div>
                        <div className="basket__count">
                            <button className="button-add"
                                    onClick={() => {
                                        dispatch({
                                            type: ShopActonType.ADD_PRODUCT_TO_BASKET,
                                            payload: {
                                                count: 1,
                                                productId: b.productId
                                            }
                                        });
                                    }}>+
                            </button>
                            <div className="product-count">Count: {b.count}</div>
                            <button className="basket-delete"
                                    onClick={() => {
                                        dispatch({
                                            type: ShopActonType.DELETE_PRODUCT,
                                            payload: {
                                                count: 1,
                                                productId: b.productId
                                            }
                                        });
                                    }}>-
                            </button>
                        </div>
                        <div className="basket__product-coast">Coast: {getProductCoast(b)} {"rub"}</div>
                        <br/>
                    </div>)
                )}
            </div>
            <div className="basket-total-coast">Total coast: {getTotalCoast()} {"rub"}</div>
            <div className="basket-buttons">
                <button className="basket-buttons__delete"
                        onClick={() => {
                            dispatch({
                                type: ShopActonType.DELETE_ALL_PRODUCTS,
                            });
                        }}
                >Удалить все
                </button>
                <Link to="/" className="basket-buttons__jump-button">
                    <button className="button-back">Вернуться в главное меню</button>
                </Link>
            </div>
        </>
    );
}