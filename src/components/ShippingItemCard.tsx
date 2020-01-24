import React from "react";
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Close from "@material-ui/icons/Close"
import Button from "@material-ui/core/Button";
import {removeFromCart} from "../service";

interface IShippingItemProps {
    id: number,
    image: string,
    name: string,
    price: number,
}

const useStyles = makeStyles({
    shippingItem: {
        margin: '60px 0',
        display: 'flex',
        alignItems: 'center',
    },
    shippingItem__imageArea: {
        height: 100,
        width: 200,
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center'
    },
    shippingItem__image: {
        height: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
    },
    shippingItem__removeButton: {
        marginLeft: 'auto',
    },
    shippingItem__name: {
        fontSize: '1.15rem',
        fontWeight: 400,
    },
    shippingItem__price: {
        fontWeight: 'bold',
    },
});

export const ShippingItemCard: React.FC<IShippingItemProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.shippingItem}>
            <div className={classes.shippingItem__imageArea}>
                <img className={classes.shippingItem__image} src={props.image}
                     alt={'shippingItemCover' + props.id.toString()}/>
            </div>
            <div>
                <Typography className={classes.shippingItem__name} variant="h6">{props.name}</Typography>
                <Typography className={classes.shippingItem__price} variant="h4">{props.price} ₽</Typography>
            </div>
            <Button className={classes.shippingItem__removeButton}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        removeFromCart(props.id)
                    }}>
                <Close/>
            </Button>
        </div>
    )
}
