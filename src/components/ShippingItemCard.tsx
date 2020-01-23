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
    root: {
        margin: '60px 0',
        display: 'flex',
        alignItems: 'center',
    },
    shippingItemImageArea: {
        height: 100,
        width: 200,
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center'
    },
    shippingItemImage: {
        height: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
    },
    shippingItemRemoveButton: {
        marginLeft: 'auto',
    },
    shippingItemName: {
        fontSize: '1.15rem',
        fontWeight: 400,
    },
    shippingItemPrice: {
        fontWeight: 'bold',
    },
});

export const ShippingItemCard: React.FC<IShippingItemProps> = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.shippingItemImageArea}>
                <img className={classes.shippingItemImage} src={props.image}
                     alt={'shippingItemCover' + props.id.toString()}/>
            </div>
            <div>
                <Typography className={classes.shippingItemName} variant="h6">{props.name}</Typography>
                <Typography className={classes.shippingItemPrice} variant="h4">{props.price} ₽</Typography>
            </div>
            <Button className={classes.shippingItemRemoveButton}
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                        removeFromCart(props.id)
                    }}>
                <Close/>
            </Button>
        </div>
    )
}
