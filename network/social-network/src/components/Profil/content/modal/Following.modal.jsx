import React from 'react';
import {IonContent, IonModal} from "@ionic/react";
import FollowHandler from "./handler/FollowHandler";

const FollowingModal = ({allUsersData, followingPopup, setFollowingPopup, userData}) => {

    console.log(typeof (allUsersData))
    return (

        <IonModal initialBreakpoint={0.6} className='profil_modal' isOpen={followingPopup}
                  onDidDismiss={() => setFollowingPopup(false)}>
            <IonContent>
                <div className="modal">
                    <h3>Abonnements</h3>
                    <span onClick={() => setFollowingPopup(false)} className="cross">&#10005;</span>
                    <ul>
                        {/* {

                                // eslint-disable-next-line array-callback-return
                                allUsersData && allUsersData.map((user) => {
                                    for (let i = 0; i < userData.following.length; i++) {
                                        if (user._id === userData.following[i]) {
                                            return (
                                                <li key={user._id}>

                                                    <h4>{user.pseudo}</h4>
                                                    <FollowHandler idToFollow={user._id}/>
                                                </li>
                                            )
                                        }
                                    }
                                })
                            }*/}
                    </ul>
                </div>
            </IonContent>
        </IonModal>

    );
};

export default FollowingModal;