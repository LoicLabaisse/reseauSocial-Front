import {Route} from 'react-router-dom';
import {
    IonApp,
    setupIonicReact
} from '@ionic/react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Routes from "./routes/routes";
import {UserIdContext} from "./components/context/AppContext";
import {useEffect, useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import React from 'react';
import {getUser} from "./redux/slices/userSlice/user.slice";
import {getAllUsers} from "./redux/slices/allUsers/AllUsers.slice";

setupIonicReact();

const App: React.FC = () => {
    // @ts-ignore
    const loginSelector = useSelector(state=> state.login)
    const [userId, setUserId] = useState(null)
    const dispatch = useDispatch()

    // @ts-ignore
    useEffect(() => {
        const fetchToken = async () => {
            await axios.post(`${process.env.REACT_APP_API}jwtid`, {withCredentials: true, data: {
                token : loginSelector.token
                }}).then((res) => {
                console.log(res);
                setUserId((res.data))
            }).catch(err => {
                console.log("no token")
            })
        }

        fetchToken();

        if(userId) {
            axios.get(`${process.env.REACT_APP_API}api/user/${userId}`).then((res)=> {
                dispatch(getUser(res.data))
            }).catch(err => console.log(err))


        }

        axios.get(`${process.env.REACT_APP_API}api/user/`).then((res)=> {
            dispatch(getAllUsers(res.data))
        }).catch(err => console.log(err))

    }, [dispatch, loginSelector.token, userId])


    return (

        <IonApp>
            <UserIdContext.Provider value={userId}>
                <Routes/>
            </UserIdContext.Provider>
        </IonApp>
    )
};

export default App;
