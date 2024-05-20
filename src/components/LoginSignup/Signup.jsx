import { useRef, useState } from "react";
import './styles.css';
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import axios from "axios";

export default function SignUp(){
    const [loading, setLoading] = useState(false)
    const goTo = useNavigate()
    const userNameRef = useRef(null)
    const passwordRef = useRef(null)
    const firstNameRef = useRef(null)
    const lastNameref = useRef(null)
    const occupationRef = useRef(null)
    const discriptionRef = useRef(null)
    const locationRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const handleRegister = async () => {
        setLoading(true)
        if (!userNameRef.current.value 
            || !passwordRef.current.value 
            || !firstNameRef.current.value 
            || !lastNameref.current.value
            || !confirmPasswordRef.current.value) {
            alert("Please fill all details!");
            setLoading(false);
            return;
        }
        else if (confirmPasswordRef.current.value !== passwordRef.current.value){
            alert("Confirm Password not match!")
            setLoading(false);
            return;
        }
        const body = {
            user_name: userNameRef.current.value,
            password: passwordRef.current.value,
            first_name: firstNameRef.current.value,
            last_name: lastNameref.current.value,
            occupation: occupationRef.current.value,
            location: locationRef.current.value,
            description: discriptionRef.current.value
        }
        try{
            const res = await axios.post(
                "https://7y9cdp-8081.csb.app/api/admin/register",
                body
                )
            setLoading(false)
            alert("Account created successfully!")
            goTo("/login")
        }catch(e){
            setLoading(false)
            alert(e.response.data.message);
            console.error("Failed to create account!",e)
        }
    }

    return (
        <div className="login-container">
            <h2>Register</h2>
            <div className="input-box-container">
                <span className="input-discription first-name">First Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="firstname-input" 
                        ref={firstNameRef}
                        required
                    />
                </div>
                </div>
                <div className="input-box-container">
                <span className="input-discription name">Last Name: </span>
                <div className="input-box name">
                    <input 
                        type="text" 
                        className="lastname-input" 
                        ref={lastNameref}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription user">User name: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="username-input" 
                        ref={userNameRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription pass">Password: </span>
                <div className="input-box">
                    <input 
                        className="password-input"
                        ref={passwordRef}
                        type="password"
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription pass">Confirm Password: </span>
                <div className="input-box">
                    <input 
                        className="password-input"
                        ref={confirmPasswordRef}
                        type="password"
                        required
                    />
                </div>
            </div>            
            <div className="input-box-container">
                <span className="input-discription">Occupation: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="ocupation-input" 
                        ref={occupationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription location">Location: </span>
                <div className="input-box">
                    <input 
                        type="text" 
                        className="ocupation-input" 
                        ref={locationRef}
                        required
                    />
                </div>
            </div>
            <div className="input-box-container">
                <span className="input-discription discription">Discription: </span>
                <div className="input-box">
                    <input 
                        name="discription" 
                        id="discription" 
                        ref={discriptionRef}
                        required
                    >
                    </input>
                </div>
            </div>

            <div className="btn-login">
                <button onClick={handleRegister} style={{ backgroundColor: "#007bff" }}>Register Me</button>
            </div>
            {loading && <div className="alert">
                <Loading/>
            </div>}
        </div>
    )
}