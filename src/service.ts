import {observable} from "mobx"

interface IStorageItem {
    id: number;
    image: string;
    name: string;
    price: number
}

export let shippingItems: any[] = observable(JSON.parse(localStorage.getItem('shippingItems') as any) || []); // Получаем массив товаров, находящихся в корзине, из localstorage

export const getCatalog = (): Promise<any> => {
    console.log('Fetch started')

    return fetch('https://appevent.ru/dev/task1/catalog')
        .then(res => res.json())
        .catch(e => {
            console.log('Произошла ошибка' + e)
        })
}

export const addToCart = (Id: number, Image: string, Name: string, Price: number) => {
    const sameItem = shippingItems.find(item => item.id === Id); // Ищем нет ли данного товара в корзине

    if (!sameItem) {
        let storageItem: IStorageItem = {
            id: Id,
            image: Image,
            name: Name,
            price: Price,
        }
        shippingItems.push(storageItem)
        localStorage.setItem('shippingItems', JSON.stringify(shippingItems));
    }
}

export const removeFromCart = (Id: number) => {
    const deleteItems = shippingItems.findIndex(elem => elem.id === Id) // Ищем удаляемый товар

    shippingItems.splice(deleteItems, 1)
    localStorage.setItem('shippingItems', JSON.stringify(shippingItems));
}

export const clearCart = () => {
    shippingItems.length = 0 // отчистка массива товаров в корзине
    localStorage.setItem('shippingItems', JSON.stringify(shippingItems));
}