import { useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../App";
import { storeInSession } from "../common/session";

const GithubAuthCallback = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const { setUserAuth } = useContext(UserContext);

    useEffect(() => {
        const handleAuth = async () => {
            // Get the 'code' from the URL query string
            const code = new URLSearchParams(location.search).get('code');

            if (code) {
                try {
                    // Send the code to your backend
                    const { data } = await axios.post(
                        import.meta.env.VITE_SERVER_DOMAIN + "/github-auth",
                        { code }
                    );
                    
                    // Log the user in (same as in userAuthForm.page.jsx)
                    storeInSession("user", JSON.stringify(data));
                    setUserAuth(data);
                    navigate("/"); // Redirect to home page

                } catch (err) {
                    console.error("Failed to authenticate with GitHub", err);
                    navigate("/signin"); // Redirect to sign-in on failure
                }
            } else {
                console.error("No auth code from GitHub");
                navigate("/signin");
            }
        };

        handleAuth();
    }, [location, navigate, setUserAuth]);

    // Show a simple loading message
    return (
        <div className="w-screen h-screen flex items-center justify-center">
            <p>Logging you in...</p>
        </div>
    );
};

export default GithubAuthCallback;