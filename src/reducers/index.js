//задаем state по умолчанию
const initialState = {
    //элементы, получаемые с сервера
    menu: [],
    loading: true,
    error: false,
    //элементы, получаемые динамически (пользователь добавляет в корзину)
    items: [],
    totalPrice: 0
}

//после того, как мы сделали запрос на сервер, выполнится действие 'MENU_LOADED', когда оно выполнится, в state запишется новое свойство menu, которое поместятся те данные, которые загрузились с сервера
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MENU_LOADED':
            return {
                //возвращаем значения из предыдущего state с помощью spread оператора (те, что не будут изменяться в этом case)
                ...state,
                //изменяемые значения:
                menu: action.payload,
                loading: false,
                error: false
            };

        case 'MENU_REQUESTED':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: false
            };

        case 'MENU_ERROR':
            return {
                ...state,
                menu: state.menu,
                loading: true,
                error: true
            };

        case 'ITEM_ADD_TO_CART':
            const id = action.payload;
            const itemInd = state.items.findIndex(item => item.id === id);
            //если товар уже был в корзине, увеличивать количество
            if (itemInd >= 0){
                const itemInState = state.items.find(item => item.id === id);
                const newItem = {
                    ...itemInState,
                    qtty: ++itemInState.qtty
                }
                return {
                    ...state,
                    items: [
                        ...state.items.slice(0, itemInd),
                        newItem,
                        ...state.items.slice(itemInd + 1)
                    ],
                    totalPrice: state.totalPrice + newItem.price
                }
            }
            // товара раньше не было в корзине
            const item = state.menu.find(item => item.id === id);
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id,
                qtty: 1
            };
            return {
                ...state,
                items: [
                    ...state.items,
                    newItem
                ],
                totalPrice: state.totalPrice + newItem.price
            };

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            //среди тех элементов, которые находятся в корзине, находим тот, который соответствует индексу, который был передан в action
            //номер элемента в массиве
            const itemIndex = state.items.findIndex(item => item.id === idx);
            const price = state.items[itemIndex]['price'] * state.items[itemIndex]['qtty'];
            return {
                ...state,
                items: [
                    //формируем новый массив, исключая тот элемент, что удален, обрезая массив на до и после нужного элемента и соединяя заново
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ],
                totalPrice: state.totalPrice - price
            }

        default:
            return state;
    }
}

export default reducer;
