import React from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import ShoppingCart from "@material-ui/icons/ShoppingCartOutlined"

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '30px 71px',
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
        marginLeft: 'auto',
        fontSize: '17pt'
    }
});

export const AppBar: React.FC = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant="h4" className={classes.logoText}>Good Store.</Typography>
            <Button variant="text" className={classes.catalogButton}>Каталог</Button>
            <Button variant="text" className={classes.shoppingCartIcon}><ShoppingCart/></Button>
        </div>
    )
};