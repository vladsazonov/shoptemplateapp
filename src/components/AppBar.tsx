import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import {Link} from "react-router-dom";
import {shippingItems} from "../service";
import {observer} from "mobx-react-lite"

const useStyles = makeStyles({
    appBar: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '10px 71px',
        zIndex: 1,
        boxShadow: '0 1px 10px 0 rgba(0, 0, 0, 0.09)',
    },
    appBar__logoText: {
        fontWeight: 'bold',
    },
    appBar__catalogButton: {
        textTransform: 'none',
        marginLeft: 73,
        fontSize: '17pt'
    },
    appBar__shoppingCartIcon: {
        marginLeft: 5,
    },
    appBar__shoppingCartButton: {
        textTransform: 'none',
        fontSize: '17pt',
        color: '#551a8b',
        fontWeight: 400,
    },
    appBar__link: {
        textDecoration: 'none',
    },
    logo: {
        color: '#551a8b',
    },
    margin: {
        marginLeft: 'auto'
    },
});

export const AppBar: React.FC = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.appBar}>
            <Link to="/catalog" className={classes.appBar__link + ' ' + classes.logo}>
                <Typography variant="h4" className={classes.appBar__logoText}>Good Store.</Typography>
            </Link>
            <Link to="/catalog" className={classes.appBar__link}>
                <Button variant="text" className={classes.appBar__catalogButton}>Каталог</Button>
            </Link>
            <Link to="/cart" className={classes.appBar__link + ' ' + classes.margin}>
                <Button variant="text" className={classes.appBar__shoppingCartButton}>
                    {
                        shippingItems.length > 0 ? shippingItems.length : ''
                    }
                    <ShoppingCart className={classes.appBar__shoppingCartIcon}/>
                </Button>
            </Link>
        </div>
    )
});