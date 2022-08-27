import React, {useContext} from 'react';
import {

    IonRouterOutlet,

} from '@ionic/react';
import tabsRoutes from "./tabsRoutes";
import Login from "../components/Login/Login";
import {IonReactRouter} from "@ionic/react-router";
import {Route} from "react-router-dom";
import {UserIdContext} from "../components/context/AppContext";

const Routes = () => {

    const userId= useContext((UserIdContext))
    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path="/" component={userId ? tabsRoutes : Login}></Route>
            </IonRouterOutlet>
        </IonReactRouter>


    );
};

export default Routes;