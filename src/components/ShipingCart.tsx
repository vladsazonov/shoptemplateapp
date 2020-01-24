import React, {ReactElement, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {shippingItems, clearCart} from "../service";
import {ShippingItemCard} from "./ShippingItemCard";
import Typography from "@material-ui/core/Typography";
import {observer} from "mobx-react-lite"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    itemsArea: {
        position: 'absolute',
        overflowY: 'auto',
        bottom: 0,
        left: 0,
        right: '35%',
        top: 71,
        padding: '2%',
        backgroundColor: '#fff',
    },
    summaryArea: {
        position: 'absolute',
        bottom: 0,
        top: 71,
        padding: 20,
        right: 0,
        left: '65%',
        backgroundColor: '#f6f6f6',
        textAlign: 'start'
    },
    itemsArea__header: {
        fontWeight: 'bold',
    },
    summaryArea__checkout: {
        textDecoration: 'none',
        boxShadow: 'none',
        height: 50,
        width: 326,
        backgroundColor: '#000',
        color: '#fff',
        marginTop: 50,
        '&:hover': {
            backgroundColor: '#551a8b',
        },
    },
    summaryArea__summaryHeader: {
        fontSize: '2.3rem',
    },
    summaryArea__productCounter: {
        fontSize: '1.5rem',
        marginTop: 100,
    },
    summaryArea_price: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        marginTop: 10
    },
    itemsArea__emptyCart: {
        position: 'absolute',
        top: '50%',
        left: '40%',
        fontWeight: 'lighter',
        color: '#cacaca',
        fontSize: '2rem'
    },
    purchaseCompletion: {
        backgroundColor: '#551a8b',
    }
});

export const ShippingCart: React.FC = observer(() => {
    const classes = useStyles();
    const [purchaseCompletion, setPurchaseCompletion] = useState<boolean>(false)

    const makePurchase = () => {
        clearCart()
        setPurchaseCompletion(true) // Меняем кнопку оформления заказа
    }

    const shippingItemsView = (): ReactElement[] | ReactElement => {
        if (shippingItems) {
            return (
                shippingItems.map((elem) => {
                    return (
                        <ShippingItemCard key={elem.id}
                                          id={elem.id}
                                          image={elem.image}
                                          name={elem.name}
                                          price={elem.price}/>
                    )
                })
            )
        } else return <Typography variant="caption">Не удалось получить данные</Typography>
    }

    const priceCount = (): number | ReactElement => {
        let count: number = 0

        if (shippingItems) {
            shippingItems.map((elem) => count += elem.price)
            return count
        } else return 0
    }

    return (
        <>
            <div className={classes.itemsArea}>
                <Typography variant="h3" className={classes.itemsArea__header}>Корзина</Typography>
                {
                    shippingItems.length === 0 ?
                        <Typography className={classes.itemsArea__emptyCart} variant="h6">Корзина пуста</Typography> : ''
                }
                {shippingItemsView()}
            </div>

            <div className={classes.summaryArea}>
                <Typography className={classes.summaryArea__summaryHeader} variant="h3">Итоговая корзина</Typography>
                <Typography className={classes.summaryArea__productCounter} variant="h4">
                    Товаров в корзине: {shippingItems.length} шт.
                </Typography>
                <Typography className={classes.summaryArea_price} variant="h4">{priceCount()} ₽</Typography>
                <Button disabled={shippingItems.length === 0}
                        variant="contained"
                        className={classes.summaryArea__checkout}
                        style={{backgroundColor: purchaseCompletion ? '#551a8b' : '', color:  purchaseCompletion ? '#fff' : ''}}
                        onClick={makePurchase}>
                    {
                        purchaseCompletion ? 'Спасибо за покупку' : 'Оформить'
                    }
                </Button>
            </div>
        </>
    )
});