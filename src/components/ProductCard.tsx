import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {addToCart, shippingItems} from "../service"

interface IProductCArdProps {
    id: number,
    image: string,
    name: string,
    price: number,
}

const useStyles = makeStyles({
    root: {
        padding: 26,
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 570,
        width: 440,
        margin: '15px 17px',
        boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.06)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center'
    },
    productImageArea: {
        height: 280,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    productImage: {
        height: '100%',
        maxWidth: '100%',
        objectFit: 'contain',
    },
    productName: {
        fontSize: '2rem',
        margin: '30px 0 10px 0'
    },
    productPrice: {
        fontSize: '2rem',
        fontWeight: 'bold'
    },
    productButton: {
        textDecoration: 'none',
        marginTop: 'auto',
        boxShadow: 'none',
        height: 50,
        backgroundColor: '#000',
        color: '#fff',
    }
});

export const ProductCard: React.FC<IProductCArdProps> = (props) => {
    const classes = useStyles()
    const [alreadyShipping, setAlreadyShipping] = useState(false)
    const alreadyShippingCheck: object = shippingItems.find(item => item.id === props.id)

    const addingToCart = () => {
        addToCart(props.id, props.image, props.name, props.price)
        setAlreadyShipping(true)
    }

    useEffect(() => {
        if (alreadyShippingCheck) {
            setAlreadyShipping(true)
        }
    }, [alreadyShipping, alreadyShippingCheck])

    return (
        <div className={classes.root}>
            <div className={classes.productImageArea}>
                <img className={classes.productImage} src={props.image} alt="productCover"/>
            </div>
            <Typography variant="h5" className={classes.productName}>{props.name}</Typography>
            <Typography variant="h4" className={classes.productPrice}>{props.price} ₽</Typography>
            <Button disabled={alreadyShipping} onClick={addingToCart} variant="contained" className={classes.productButton} fullWidth>{alreadyShipping ? 'В корзине' : 'В корзину'}</Button>
        </div>
    )
};

//onClick={( (event: React.MouseEvent<HTMLElement>) => {
//                 addingToCart
//             })}