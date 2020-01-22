import React, {useEffect} from 'react';
import './App.css';
import {AppBar} from "./components/AppBar";
import {CatalogPage} from "./components/CatalogPage"

const App: React.FC = () => {

    useEffect(() => {
        if (localStorage.shippingItems === undefined) {
            localStorage.setItem('shippingItems', '[]')
        }
    })

    return (
        <div className="App">
            <AppBar/>
            <CatalogPage/>
        </div>
    );
};

export default App;
