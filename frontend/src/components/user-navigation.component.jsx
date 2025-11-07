import { useContext } from "react";
import AnimationWrapper from "../common/page-animation";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { removeFromSession } from "../common/session";

const UserNavigationPanel = () => {

    const { userAuth: { username }, setUserAuth } = useContext(UserContext);

    let navigate = useNavigate();

    const signOutUser = () => {
        // Clear the session first
        removeFromSession("user");
        
        // Navigate home
        navigate("/");

        // Use a small delay. This ensures navigation happens
        // BEFORE the state update causes this component to unmount.
        setTimeout(() => {
            setUserAuth({ access_token: null });
        }, 10); 
    }

    // This function will stop the click from closing the panel
    const handleClick = (e) => {
        e.stopPropagation();
    }

    return (
        <AnimationWrapper 
            className="absolute right-0 z-50"
            transition={{ duration: 0.2 }}
        >
            {/* Add onMouseDown={handleClick} here. 
              We use onMouseDown because it fires before onBlur,
              preventing the panel from closing.
            */}
            <div 
                className="bg-white abosolute right-0 border border-grey w-60 duration-200"
                onMouseDown={handleClick} 
            >
                
                <Link to="/editor" className="flex gap-2 link md:hidden pl-8 py-4">
                    <i className="fi fi-rr-file-edit"></i>
                    <p>Write</p>
                </Link> 
                
                <Link to={`/user/${username}`} className="link pl-8 py-4">
                    Profile
                </Link>

                <Link to="/dashboard/blogs" className="link pl-8 py-4">
                    Dashboard
                </Link>

                <Link to="/settings/edit-profile" className="link pl-8 py-4">
                    Settings
                </Link>

                <span className="absolute border-t border-grey w-[100%]"></span>

                <button 
                    className="text-left p-4 hover:bg-grey w-full pl-8 py-4"
                    onClick={signOutUser}
                >
                    <h1 className="font-bold text-xl mg-1">Sign Out</h1>
                    <p className="text-dark-grey">@{username}</p>
                </button>

            </div>

        </AnimationWrapper>
    )

}

export default UserNavigationPanel;