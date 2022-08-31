import React, {useContext} from 'react';
import {UserIdContext} from "../context/AppContext";
import Login from "../Login/Login";
import ProfilContent from "./content/ProfilContent";

const Profil = () => {

    const userId = useContext(UserIdContext)
    return (
        <div>
            {
                userId ? <ProfilContent/> : <Login signin={false} signup={true}/>
            }
        </div>
    );
};

export default Profil;