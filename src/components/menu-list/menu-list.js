import React, {Component} from 'react';
import MenuListItem from '../menu-list-item';
import {connect} from 'react-redux';
import WithRestoService from "../hoc"; //как пропс передает сюда сервис
import {menuLoaded, menuRequested, menuError} from "../../actions";
import Spinner from "../spinner";
import Error from "../error";

import './menu-list.css';

class MenuList extends Component {
    //получить данные с сервера с помощью сервиса и отправить их в redux-store
    componentDidMount() {
        this.props.menuRequested();

        const {RestoService} = this.props;
        RestoService.getMenuItems()
            .then(res => this.props.menuLoaded(res))
            .catch(error => this.props.menuError);
    }

    render() {
        const {menuItems, loading, error} = this.props;
        if (error) {
            return <Error/>
        }
        if (loading) {
            return <Spinner/>
        }

        const items = menuItems.map(menuItem => {
            return (
                <MenuListItem key={menuItem.id} menuItem={menuItem}/>
            )
        })

        return (
            <View items={items}/>
        )

    }
};

//получаем элементы, которые находятся в reducer (initialState)
const mapStateToProps = (state) => {
    return {
        menuItems: state.menu,
        loading: state.loading,
        error: state.error
    }
}

//отправить action-действие к store. в store мы отравляем res, чтобы он записался в reducer в массив menu, который лежит в initialState
const mapDispatchToProps = {
    menuLoaded,
    menuRequested,
    menuError
};

const View = ({items}) => {

    return (
        <ul className="menu__list">
            {items}
        </ul>
    )
}

//компоненты высшего порядка: получаем доступ к сервису и редьюсеру через redux
export default WithRestoService()(connect(mapStateToProps, mapDispatchToProps)(MenuList));