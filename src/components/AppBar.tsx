import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined";
import {Link} from "react-router-dom";
import {shippingItems} from "../service";
import {observer} from "mobx-react-lite"

const useStyles = makeStyles({
    root: {
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
    logoText: {
        fontWeight: 'bold',
    },
    catalogButton: {
        textTransform: 'none',
        marginLeft: 73,
        fontSize: '17pt'
    },
    shoppingCartIcon: {
        textTransform: 'none',
        fontSize: '17pt'
    },
    linkStyle: {
        textDecoration: 'none',
    },
    logoLink: {
        color: '#551a8b',
    },
    linkMargin: {
        marginLeft: 'auto'
    },
    placeAnOrderButton: {
        textDecoration: 'none',
        marginTop: 'auto',
        boxShadow: 'none',
        height: 50,
        backgroundColor: '#000',
        color: '#fff',
    }
});

export const AppBar: React.FC = observer(() => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Link to="/catalog" className={classes.linkStyle + ' ' + classes.logoLink}>
                <Typography variant="h4" className={classes.logoText}>Good Store.</Typography>
            </Link>
            <Link to="/catalog" className={classes.linkStyle}>
                <Button variant="text" className={classes.catalogButton}>Каталог</Button>
            </Link>
            <Link to="/cart" className={classes.linkStyle + ' ' + classes.linkMargin}>
                <Button variant="text" className={classes.shoppingCartIcon}>
                    {
                        shippingItems.length > 0 ? shippingItems.length : ''
                    }
                    <ShoppingCart/>
                </Button>
            </Link>
        </div>
    )
});