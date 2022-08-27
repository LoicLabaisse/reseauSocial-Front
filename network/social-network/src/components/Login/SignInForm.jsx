import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useHistory} from "react-router";
import {useDispatch} from "react-redux";
import {login} from "../../redux/slices/loginSlices/loginSlice"

const SignInForm = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory()
    const dispatch = useDispatch()


    const handleConnexion = (e) => {
        e.preventDefault();

        const emailError = document.querySelector('.email_error')
        const passwordError = document.querySelector('.password_error')

        axios.post(`${process.env.REACT_APP_API}api/user/login`, {
                headers: {
                    "withCredentials": 'include'
                },
                data: {

                    email: email,
                    password: password

                }
            }
        ).then((res) => {
            console.log(res.data)

            if (res.status === 404) {
                console.log(res)
                console.log('ok')
                emailError.innerHTML = res.data.error.email
                passwordError.innerHTML = res.data.error.password
            } else {
                dispatch(login(res.data))
                history.push("/tab1")
            }
        }).catch((err) => console.log(err))
    }
    return (
        <div>
            <form action="" onSubmit={handleConnexion} id="sign-in-form" className="signInForm">
                <label htmlFor="email">Email</label>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email"
                       className="signInForm_input"/>
                <div className="email_error"></div>
                <label htmlFor="password">Mot de passe</label>

                <input onChange={(e) => setPassword(e.target.value)} id="password" value={password} type="password"
                       className="signInForm_input"/>
                <div className="password_error"></div>
                <input className="signInForm_input_connexion" type="submit" value="Se Connecter"/>
            </form>
        </div>
    );
};

export default SignInForm;