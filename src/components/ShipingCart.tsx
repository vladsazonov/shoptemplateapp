import React, {ReactElement, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import {shippingItems, clearCart} from "../service";
import {ShippingItemCard} from "./ShippingItemCard";
import Typography from "@material-ui/core/Typography";
import {observer} from "mobx-react-lite"
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        marginTop: 71,
        padding: '35px 71px',
        display: 'flex',
    },
    shippingItemsArea: {
        position: 'absolute',
        overflowY: 'auto',
        bottom: 0,
        left: 0,
        right: '35%',
        top: 71,
        padding: '2%',
        backgroundColor: '#fff',
    },
    cartSummaryArea: {
        position: 'absolute',
        bottom: 0,
        top: 71,
        padding: 20,
        right: 0,
        left: '65%',
        backgroundColor: '#f6f6f6',
        textAlign: 'start'
    },
    cartHeader: {
        fontWeight: 'bold',
    },
    checkoutButton: {
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
    cartSummaryHeader: {
        fontSize: '2.3rem',
    },
    cartSummaryProductCount: {
        fontSize: '1.5rem',
        marginTop: 100,
    },
    cartSummaryProductPrice: {
        fontSize: '2.1rem',
        fontWeight: 'bold',
        marginTop: 10
    },
    emptyCart: {
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
            <div className={classes.shippingItemsArea}>
                <Typography variant="h3" className={classes.cartHeader}>Корзина</Typography>
                {
                    shippingItems.length === 0 ?
                        <Typography className={classes.emptyCart} variant="h6">Корзина пуста</Typography> : ''
                }
                {shippingItemsView()}
            </div>
            <div className={classes.cartSummaryArea}>
                <Typography className={classes.cartSummaryHeader} variant="h3">Итоговая корзина</Typography>
                <Typography className={classes.cartSummaryProductCount} variant="h4">
                    Товаров в корзине: {shippingItems.length} шт.
                </Typography>
                <Typography className={classes.cartSummaryProductPrice}  variant="h4">{priceCount()} ₽</Typography>
                <Button disabled={shippingItems.length === 0}
                        variant="contained"
                        className={classes.checkoutButton}
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