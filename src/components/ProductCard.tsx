import React, {useEffect, useState} from 'react';
import {createStyles, Theme, makeStyles} from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {addToCart, shippingItems} from "../service"
import {Link} from "react-router-dom";

interface IProductCArdProps {
    id: number,
    image: string,
    name: string,
    price: number,
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            padding: 26,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 570,
            width: 440,
            boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.06)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            flex: '1 0 31%',
            boxSizing: 'border-box',
            margin: '1rem 1.05em',
            [theme.breakpoints.down('sm')]: {
                flex: '1 0 46%',
            },
           
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
            fontSize: '1.5rem',
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
            '&:hover': {
                backgroundColor: '#551a8b',
            },
        },
        toCartButton: {
            textDecoration: 'none',
            boxShadow: 'none',
            height: 50,
            backgroundColor: '#551a8b',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#33155e',
            },
        },
        toCartLink: {
            marginTop: 'auto',
            textDecoration: 'none',
            width: '100%',
        }
    }),
);

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
                <img className={classes.productImage} src={props.image} alt={'productCover ' + props.id}/>
            </div>
            <Typography variant="h5" className={classes.productName}>{props.name}</Typography>
            <Typography variant="h4" className={classes.productPrice}>{props.price} ₽</Typography>
            {
                !alreadyShipping ? (
                    <Button
                        onClick={addingToCart}
                        variant="contained"
                        className={classes.productButton}
                        fullWidth>
                        В корзину
                    </Button>
                ) : (
                    <Link to='/cart' className={classes.toCartLink}>
                        <Button
                            variant="contained"
                            className={classes.toCartButton}
                            fullWidth>
                            Оформить заказ
                        </Button>
                    </Link>
                )
            }
        </div>
    )
};