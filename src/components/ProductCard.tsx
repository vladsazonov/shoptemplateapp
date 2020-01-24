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
        productCard: {
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
        productCard__imageArea: {
            height: 280,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        productCard__image: {
            height: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
        },
        productCard__name: {
            fontSize: '1.5rem',
            margin: '30px 0 10px 0'
        },
        productCard__price: {
            fontSize: '2rem',
            fontWeight: 'bold'
        },
        productCard__button: {
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
        toCart: {
            backgroundColor: '#551a8b',
            '&:hover': {
                backgroundColor: '#33155e',
            },
        },
        productCard__link: {
            marginTop: 'auto',
            textDecoration: 'none',
            width: '100%',
        }
    }),
);

export const ProductCard: React.FC<IProductCArdProps> = (props) => {
    const classes = useStyles()
    const [alreadyShipping, setAlreadyShipping] = useState(false) // Если true, то меняется кнопка отправки товара в корзину
    const alreadyShippingCheck: object = shippingItems.find(item => item.id === props.id) // Провера товаров, уже находящихся в корзине

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
        <div className={classes.productCard}>
            <div className={classes.productCard__imageArea}>
                <img className={classes.productCard__image} src={props.image} alt={'productCover ' + props.id}/>
            </div>
            <Typography variant="h5" className={classes.productCard__name}>{props.name}</Typography>
            <Typography variant="h4" className={classes.productCard__price}>{props.price} ₽</Typography>
            {
                !alreadyShipping ? (
                    <Button
                        onClick={addingToCart}
                        variant="contained"
                        className={classes.productCard__button}
                        fullWidth>
                        В корзину
                    </Button>
                ) : (
                    <Link to='/cart' className={classes.productCard__link}>
                        <Button
                            variant="contained"
                            className={classes.productCard__button + ' ' + classes.toCart}
                            fullWidth>
                            Оформить заказ
                        </Button>
                    </Link>
                )
            }
        </div>
    )
};