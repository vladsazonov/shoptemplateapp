interface IStorageItem {
            id: number;
            image: string;
            name: string;
            price: number
}

export let shippingItems: any[] = JSON.parse(localStorage.getItem('shippingItems') as any) || [];
export default function service(): void {
}

export const getCatalog = (): Promise<any> => {
    console.log('Fetch started')
    return fetch('https://appevent.ru/dev/task1/catalog')
        .then(res => res.json())
        .catch(e => console.log('Error ', e))
}

export const addToCart = (Id: number, Image: string, Name: string, Price: number) => {
    const sameItem = shippingItems.find(item => item.id === Id);
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
    console.log('shippingItems', shippingItems)
}