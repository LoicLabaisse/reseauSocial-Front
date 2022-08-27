import React, {useState} from 'react';
import {IonContent, IonPage, IonText} from "@ionic/react";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import "./login.css"

const Login = (props) => {
    const [signUpModal, setSignUpModal] = useState(false)
    const [signInModal, setSignInModal] = useState(true)

    const handleModals = (e) => {
        if (e.target.id === "register") {
            setSignInModal(false)
            setSignUpModal(true)
        } else if (e.target.id === "connexion") {
            setSignInModal(true)
            setSignUpModal(false)
        }
    }
    return (
        <IonPage>
            <IonContent>
                    <div className="connexion-form-container">
                        <ul className="connexion-form_list">
                            <li  id="register" onClick={handleModals}
                                className={signUpModal ? "active-btn" : "connexion-form_list_item"}>S'inscrire
                            </li>
                            <li id="connexion" onClick={handleModals} className={signInModal ? "active-btn" : "connexion-form_list_item"}>Se
                                Connecter
                            </li>
                        </ul>
                        {
                            signInModal && <SignInForm/>
                        }
                        {
                            signUpModal && <SignUpForm/>
                        }
                    </div>

            </IonContent>

        </IonPage>
    );
};

export default Login;