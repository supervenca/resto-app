export default class RestoService {
    _apiBase = 'http://localhost:3000';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
        }
        return await res.json();
    }
    async getMenuItems() {
        return await this.getResource(`/menu/`);
    }
    async getItem(id) {
        const res = await this.getResource('/menu/');
        const item = res.find( (el) => {
            console.log(`el.id: ${el.id}, id: ${id}`);
            return el.id === +id;
        })
        return item;
    }

    async setOrder(order) {
        const number = await this.getOrderNumber();
        const newOrder = {
            id: number,
            order: order
        }
        const response = await fetch(`${this._apiBase}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newOrder)
        });
        if (!response.ok){
            throw new Error('json error');
        }
        if (response.ok) {
            alert(`Your order has been placed`);
        }
    }

    async getOrderNumber(){
        const res = await this.getResource('/orders/');
        const orderNumber = res.length+1;

        return orderNumber
    }
}