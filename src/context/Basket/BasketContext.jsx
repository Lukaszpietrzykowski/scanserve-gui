import React, {createContext, useState} from "react";

export const BasketContext = createContext();


export function BasketProvider({children}) {

    const [basketItems, setBasketItems] = useState([])

    function addItemToBasket(item) {
        setBasketItems([...basketItems, item])
    }

    function removeItemFromBasket(itemId) {
        setBasketItems(basketItems.filter(item => item.menuItemInfo.id !== itemId))
    }

    function clearBasketContext() {
        setBasketItems([])
    }

    return (
        <BasketContext.Provider value={{addItemToBasket, removeItemFromBasket, basketItems, clearBasketContext}}>
            {children}
        </BasketContext.Provider>
    )

}