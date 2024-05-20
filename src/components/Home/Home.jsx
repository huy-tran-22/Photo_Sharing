import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { MyContext } from "../AppContext/contextProvider";
import axios from "axios";
import './style.css'

export default function Home(){
    const goTo = useNavigate()
    const token = localStorage.getItem("token");
    const {user, setUser} = useContext(MyContext);

    useEffect(() => {
        const fetchUserProfile = async () => {
            const headers = { 'Authorization': `Bearer ${token}` };
            try{
                const res = await axios.get(
                    "https://7y9cdp-8081.csb.app/api/admin/profile",
                    {headers: headers}
                    )

                setUser(res.data);
                goTo(`/users/${res.data._id}`)
            }catch(e){
                console.error("Failed to fetch user profile", e);
            }
        }

        fetchUserProfile()
    }, [])

    return(
        <div style={{
                display:"flex",
                width:"140vh",
                height:"15vh",
                padding: 10,
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                justifyContent: "space-between"
            }}
        >
            <h1>Photo Sharing App</h1>
            <span className="link-text" >
            {!token && <span 
                onMouseEnter={(e) => (e.target.style.color = "#ff0000")}
                onMouseLeave={(e) => (e.target.style.color = "#007bff")}
                onClick={() => goTo("/login")}
            >
                Login
            </span>}
            {!token && <span>
                <span 
                onMouseEnter={(e) => (e.target.style.color = "#ff0000")}
                onMouseLeave={(e) => (e.target.style.color = "#007bff")}
                onClick={() => goTo('/signup')}> Signup</span>
            </span>}
            </span>
        </div>
    )
}