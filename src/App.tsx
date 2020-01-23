import React, {useEffect} from 'react';
import {AppBar} from "./components/AppBar";
import {CatalogPage} from "./components/CatalogPage"
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import {ShippingCart} from "./components/ShipingCart";

function ScreenSwitcher() {
    return (
        <div>
            <AppBar/>
            <Switch>
                <Redirect exact from="/" to="catalog"/>
                <Route exact path="/catalog">
                    <CatalogPage/>
                </Route>
                <Route path="/cart">
                    <ShippingCart/>
                </Route>
            </Switch>
        </div>
    )
}

const App: React.FC = () => {

    useEffect(() => {
        if (localStorage.shippingItems === undefined) {
            localStorage.setItem('shippingItems', '[]')
        }
    })

    return (
        <Router>
            <ScreenSwitcher/>
        </Router>
    );
};

export default App;
