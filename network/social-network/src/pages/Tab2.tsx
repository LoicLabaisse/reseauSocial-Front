import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Tab2.css';
import React, {useContext} from "react";
import {UserIdContext} from "../components/context/AppContext";
import Login from "../components/Login/Login";

const Tab2: React.FC = () => {

    const userId= useContext(UserIdContext);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <div className="profil">
           {
               userId ? <h1>Profil</h1> : <div className="log-container"><Login signin={false} signup={true}/>
               </div>
           }

       </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab2;
