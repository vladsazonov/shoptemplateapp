import React from 'react';
import {makeStyles} from "@material-ui/styles";
import {shippingItems} from "../service";
import {ShippingItemCard} from "./ShippingItemCard";
import Typography from "@material-ui/core/Typography";
import {observer} from "mobx-react-lite"

const useStyles = makeStyles({
    root: {
        marginTop: 117,
        padding: '35px 71px',
        display: 'flex',
    },
    shippingItemsArea: {
        position: 'absolute',
        overflowY: 'auto',
        bottom: 0,
        left: 0,
        top: 111,
        padding: '2%',
        backgroundColor: '#fff',
    },
    cartSummaryArea: {
        position: 'absolute',
        bottom: 0,
        top: 111,
        padding: 20,
        right: 0,
        backgroundColor: '#f6f6f6',
    },
    cartHeader: {
        fontWeight: 'bold',
    }
});

export const ShippingCart: React.FC = observer(() => {
    const classes = useStyles();

    const shippingItemsView = (): any => {
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
        } else return (<h1>ашипка</h1>)
    }

    return (
        <div className={classes.root}>
            <div className={classes.shippingItemsArea}>
                <Typography variant="h3" className={classes.cartHeader}>Корзина</Typography>
                {shippingItemsView()}
            </div>
            <div className={classes.cartSummaryArea}>
                kek
            </div>
        </div>
    )
});