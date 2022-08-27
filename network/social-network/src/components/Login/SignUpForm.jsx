import React, {useState} from 'react';
import {IonContent, IonPage} from "@ionic/react";
import axios from "axios";
import SignInForm from "./SignInForm";
import "./login.css"

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false)
    const [pseudo, setPseudo] = useState()
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [controlPassword, setControlPassword] = useState()

    const [confirmPasswordData, setConfirmPasswordData] = useState('')
    const [pseudoConfirmData, setPseudoConfirmData] = useState('')
    const [emailConfirmData, setEmailConfirmData] = useState('')
    const [passwordConfirmData, setPasswordConfirmData] = useState("")
    const [termsConfirmData, setTermsConfirmData] = useState('')


    const handleRegister = async (e) => {
        e.preventDefault();
        const terms = document.getElementById('terms')


        if (password !== controlPassword || !terms.checked) {
            if (password !== controlPassword) {
                setConfirmPasswordData("Les mots de passe ne correspondent pas")
            }
            if (!terms.checked) {
                setTermsConfirmData("Veuillez acceptez les conditions générales")
            }
        } else {
            await axios.post(`${process.env.REACT_APP_API}api/user/register`, {
                pseudo,
                email,
                password
            }).then((res) => {
                console.log(res)
                if (res.data.error) {
                    setEmailConfirmData(res.data.error.email)
                    setPseudoConfirmData(res.data.error.pseudo)
                    setPasswordConfirmData(res.data.error.password)

                } else {
                    setFormSubmit(true)
                }
            }).catch((err) =>
                console.log(err)
            )
        }


    }

    console.log(confirmPasswordData)
    return (
        <>
            {
                formSubmit ? (
                    <>
                        <SignInForm/>
                        <h4 className="signIn_success">Enregistrement réussi, veuillez vous connecter</h4>
                    </>
                ) : (
                    <form action="" onSubmit={handleRegister} className="signUpForm" id='signUpForm'>

                        <label htmlFor="pseudo">Pseudo</label>
                        <input onChange={(e) => setPseudo(e.target.value)} value={pseudo} type="text" id="pseudo"
                               className="signInForm_input"/>
                        <div className="email_error" dangerouslySetInnerHTML={{__html: pseudoConfirmData}} ></div>

                        <label htmlFor="email">Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email"
                               className="signInForm_input"/>
                        <div className="email_error" dangerouslySetInnerHTML={{__html: emailConfirmData}}></div>


                        <label htmlFor="password">Mot de passe</label>

                        <input onChange={(e) => setPassword(e.target.value)} id="password" value={password}
                               type="password"
                               className="signInForm_input"/>

                        <div className="email_error" dangerouslySetInnerHTML={{__html: passwordConfirmData}}></div>


                        <label htmlFor="controlPassword">Confirmez votre mot de passe</label>

                        <input onChange={(e) => setControlPassword(e.target.value)} id="controlPassword"
                               value={controlPassword}
                               type="password"
                               className="signInForm_input"/>


                        <div className="email_error" dangerouslySetInnerHTML={{__html: confirmPasswordData}}></div>

                        <div className="signUpCheck">
                        <input type="checkbox" id="terms"/>
                        <label htmlFor="terms">J'accepte les <a href="/" target="_blank" rel="noopener noreferrer">conditions
                            générales</a></label>
                        </div>

                        <div className="email_error" dangerouslySetInnerHTML={{__html: termsConfirmData}} ></div>


                        <input className="signInForm_input_connexion" type="submit" value="Valider l'inscription"/>

                    </form>
                )

            }
        </>
    );
};

export default SignUpForm;