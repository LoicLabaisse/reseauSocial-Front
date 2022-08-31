import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {getUser} from "../../../../redux/slices/userSlice/user.slice";

const UploadImg = () => {

    const [file, setFile] = useState();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.user)
    const handlePicture = (e) => {
        e.preventDefault()
        const data = new FormData();
        data.append("name", userData.pseudo);
        data.append("userId", userData._id);
        data.append("file", file)

        axios.post(`${process.env.REACT_APP_API}api/user/upload`, data).then(res => {
            return axios.get(`${process.env.REACT_APP_API}api/user/${userData._id}`).then(
                res => {
                    dispatch(getUser(res.data))
                }
            ).catch(err => console.log(err))
        }).catch(err => console.log(err))
    }
    return (
        <form action="" onSubmit={handlePicture} className="uploadpicture_form">
            <label htmlFor="file">Changer d'image</label>
            <input type="file" id="file" name="file" accept=".jpg, .jpeg, .png"
                   onChange={(e) => setFile(e.target.files[0])}/>
            <br/>
            <input type="submit" value="Envoyer"/>
        </form>
    );
};

export default UploadImg;