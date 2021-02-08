import React from 'react';
import {MainPage, CartPage} from '../pages';
import AppHeader from '../app-header';
import WithRestoService from "../hoc";

import Background from './food-bg.jpg';

const App = ({RestoService}) => {
    console.log(RestoService.getMenuItems());
    return (
        <div style={{background: `url(${Background}) center center/cover no-repeat`}} className="app">
            <AppHeader total={50}/>
            <MainPage/>
            <CartPage/>
        </div>
    )
}
//оборачиваем в компонент высшего порядка
export default WithRestoService()(App);