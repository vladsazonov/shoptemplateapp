import React, {ReactElement, useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {getCatalog} from "../service";
import {ProductCard} from "./ProductCard";
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        marginTop: 71,
        padding: '35px 71px',
    },
    catalogHeader: {
        fontWeight: 'bold',
    },
    catalogArea: {
        marginTop: 20,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    loader: {
        position: 'absolute',
        top: '50%',
        left: '50%',
    }
});

interface ICatalogItems {
    id: number;
    image: string;
    name: string;
    price: number
}

let catalog: ICatalogItems[] = []

export const CatalogPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState<Boolean>(true);
    const classes = useStyles();

    useEffect(() => {
        getCatalog().then(prom => {
            if (typeof prom != "undefined") {
                catalog = prom.items
                if (catalog) {
                    setIsLoading(false)
                }
            } else alert('Произошла ошибка, проверьте консоль')
        })
    })

    const catalogView = (): ReactElement[] | ReactElement => {
        if (catalog) {
            return (
                catalog.map(elem => {
                    return (
                        <ProductCard key={elem.id}
                                     id={elem.id}
                                     image={elem.image}
                                     name={elem.name}
                                     price={elem.price}/>
                    )
                })
            )
        } else return <CircularProgress className={classes.loader}/>
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.catalogHeader}>Каталог</Typography>
            <div className={classes.catalogArea}>
                {
                    !isLoading ? catalogView() : <CircularProgress className={classes.loader}/>
                }
            </div>
        </div>
    )
};