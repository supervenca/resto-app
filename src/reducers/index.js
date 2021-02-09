//задаем state по умолчанию
const initialState = {
    //элементы, получаемые с сервера
    menu: [],
    loading: true,
    error: false,
    //элементы, получаемые динамически (пользователь добавляет в корзину)
    items: []
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
            //внутри меню, пришедшего с сервера ищем именно тот элемент, который совпадает по id с тем, на который нажали
            const item = state.menu.find(item => item.id === id);
            //формирование нового объекта (для корзины)
            const newItem = {
                title: item.title,
                price: item.price,
                url: item.url,
                id: item.id
            };
            return {
                ...state,
                items: [
                    //все, что уже было добавлено в корзину
                    ...state.items,
                    //новый item
                    newItem
                ]
            };

        case 'ITEM_REMOVE_FROM_CART':
            const idx = action.payload;
            //среди тех элементов, которые находятся в корзине, находим тот, который соответствует индексу, который был передан в action
            //номер элемента в массиве
            const itemIndex = state.items.findIndex(item => item.id === idx);
            return {
                ...state,
                items: [
                    //формируем новый массив, исключая тот элемент, что удален, обрезая массив на до и после нужного элемента и соединяя заново
                    ...state.items.slice(0,itemIndex),
                    ...state.items.slice(itemIndex + 1)
                ]
            }

        default:
            return state;
    }
}

export default reducer;
