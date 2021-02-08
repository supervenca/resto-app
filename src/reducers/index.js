//задаем state по умолчанию
const initialState = {
    menu: [],
    loading: true,
    error: false
}

//после того, как мы сделали запрос на сервер, выполнится действие 'MENU_LOADED', когда оно выполнится, в state запишется новое свойство menu, которое поместятся те данные, которые загрузились с сервера
const reducer = (state = initialState, action) => {

    switch (action.type) {
        case 'MENU_LOADED':
            return {
                menu: action.payload,
                loading: false,
                error: false
            };
        case 'MENU_REQUESTED':
            return {
                menu: state.menu,
                loading: true,
                error: false
            };
        case 'MENU_ERROR':
            return {
                menu: state.menu,
                loading: true,
                error: true
            };
        default:
            return state;
    }
}

export default reducer;
