import { NavLink } from "react-router-dom";
import { Hamburger, CakeSlice } from "lucide-react";

function NavBar() {

    return (
        <>
        <nav>
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/home" className="nav-link"><Hamburger size={24} strokeWidth={2} /></NavLink>
            <NavLink to="/categories" className="nav-link"><CakeSlice size={24} strokeWidth={2} /></NavLink>
        </nav>
        </>
    )   

}

export default NavBar