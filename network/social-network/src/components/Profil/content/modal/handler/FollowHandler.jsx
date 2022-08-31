import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {isEmpty} from "../../../../../Utils/Utils";
import axios from "axios";
import {getUser} from "../../../../../redux/slices/userSlice/user.slice";

const FollowHandler = ({idToFollow}) => {
    const userData = useSelector(state => state.user);
    const [isFollowed, setIsFollowed] = useState(false);
    const dispatch =useDispatch()

    const handleFollow = () => {

        axios.patch(`${process.env.REACT_APP_API}api/user/follow/${userData._id}`,{
            idToFollow
        }).then(res=> {
            dispatch(getUser(res.data))
        }).catch(err=> console.log(err))

        setIsFollowed(true)
    }

    const handleUnfollow = () => {

        axios.patch(`${process.env.REACT_APP_API}api/user/unfollow/${userData._id}`,{
            idToFollow
        }).then(res=> {
            dispatch(getUser(res.data))
        }).catch(err=> console.log(err))

        setIsFollowed(false)
    }

    useEffect(() => {

        if (!isEmpty(userData.following)) {
            if (userData.following.includes(idToFollow)) {
                setIsFollowed(true)
            } else {
                setIsFollowed(false)
            }
        }


    }, [userData, idToFollow])
    return (
        <>
            {isFollowed && !isEmpty(userData) &&(
                <span onClick={handleUnfollow}>
                <button >Abonné</button>
            </span>)}
            {isFollowed === false && !isEmpty(userData) && (<span onClick={handleFollow}>
                <button>Suivre</button>
            </span>)}


        </>);
};

export default FollowHandler;