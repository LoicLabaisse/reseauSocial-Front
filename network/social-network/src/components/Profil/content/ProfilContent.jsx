import {useDispatch, useSelector} from "react-redux";
import UploadImg from "./UploadImg/UploadImg";
import {useEffect, useState} from "react";
import axios from "axios";
import {getUser} from "../../../redux/slices/userSlice/user.slice";
import moment from "moment";

import 'moment/locale/fr'
import {IonContent, IonModal} from "@ionic/react";
import "./profilContent.css"
import FollowingModal from "./modal/Following.modal";
import FollowersModal from "./modal/Followers.modal";


const ProfilContent = () => {

    const [bio, setBio] = useState()
    const [updateForm, setUpdateForm] = useState(false)
    const userData = useSelector(state => state.user)
    const allUsersData = useSelector(state => state.allUsers)
    const dispatch = useDispatch()
    const [followingPopup, setFollowingPopup] = useState(false)
    const [followerPopup, setFollowerPopup] = useState(false)


    const handleUpdateBio = () => {
        axios.put(`${process.env.REACT_APP_API}api/user/${userData._id}`, {
            bio
        }).then(res => {
            dispatch(getUser(res.data))
        }).catch(err => console.log(err))
        setUpdateForm(false)
    }

    return (
        <div>
            <h1>Profil de {userData.pseudo}</h1>
            <div>
                <div>
                    <h3>Photo de profil</h3>
                    <img src={userData.picture} alt="user_picture"/>
                    <UploadImg/>
                </div>
                <div>
                    <div className="profil_bioUpdata">
                        {
                            updateForm === false && (
                                <>
                                    <p onClick={() => setUpdateForm(!updateForm)}>{userData.bio}</p>
                                    <button onClick={() => setUpdateForm(!updateForm)}>Modifier bio</button>
                                </>
                            )
                        }
                        {
                            updateForm && (
                                <>
                                    <textarea type="text" defaultValue={userData.bio}
                                              onChange={(e) => setBio((e.target.value))}>

                                    </textarea>
                                    <button onClick={handleUpdateBio}>Valider modifications</button>
                                </>
                            )
                        }
                    </div>
                    <h4>Membre depuis le : {moment(userData.createdAt).locale("fr").format('LLL')} </h4>
                    <h5 onClick={() => setFollowingPopup(true)}>Abonnements
                        : {userData.following ? userData.following.length : "0"}</h5>
                    <h5 onClick={() => setFollowerPopup(true)}>Abonnés
                        : {userData.followers ? userData.followers.length : "0"}</h5>
                    <FollowingModal followingPopup={followingPopup} setFollowingPopup={setFollowingPopup}
                                    allUsersData={allUsersData} userData={userData}/>
                    <FollowersModal followerPopup={followerPopup} setFollowerPopup={setFollowerPopup}
                                    allUsersData={allUsersData} userData={userData}/>
                </div>
            </div>
        </div>
    );
};

export default ProfilContent;