import React, {useEffect, useState} from 'react';
import {makeStyles} from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import {getCatalog} from "../service";
import {ProductCard} from "./ProductCard";

const useStyles = makeStyles({
    root: {
        marginTop: 117,
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
        getCatalog().then(a => {
            catalog = a.items
            console.log(catalog)
            if (catalog) {
                setIsLoading(false)
            }
        })
    })

    const catalogView = (): any => {
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

        } else return (<h1>ашипка</h1>)
    }

    return (
        <div className={classes.root}>
            <Typography variant="h3" className={classes.catalogHeader}>Каталог</Typography>
            {
                !isLoading ? (
                    <div className={classes.catalogArea}>
                        {
                            catalogView()
                        }
                    </div>
                ) : (
                    <Typography variant="h3">Loading</Typography>
                )
            }
        </div>
    )
};