import { NavLink } from "react-router-dom";
import { LogInIcon, LogOutIcon, LayoutDashboardIcon, TestTubeDiagonalIcon, UserIcon, HomeIcon, FactoryIcon, Home } from "lucide-react";
import { useUser } from "../providers";

function NavBar() {
    const { user, isAuthenticated, logout } = useUser();

    const handleLogout = async () => {
        console.log('🔴 [NavBar] Logout button clicked');
        await logout();
    };

    return (
        <>
        <nav>
                <NavLink to="/dashboard" className="nav-link">
                    <HomeIcon size={15} strokeWidth={2} />
                 Home </NavLink>

            {/* Show Dashboard only if logged in */}
            {isAuthenticated && (
                <NavLink to="/dashboard" className="nav-link">
                    <LayoutDashboardIcon size={15} strokeWidth={2} />
                 Dashboard </NavLink>
            )}

            {isAuthenticated && (
                <NavLink to="/recipes/new" className="nav-link">
                    <FactoryIcon size={15} strokeWidth={2} /> New Recipe
                </NavLink>
            )}

               {/* {isAuthenticated && (
                <NavLink to="/categories/new" className="nav-link">
                    <CassetteTapeIcon size={24} strokeWidth={2} />
                </NavLink>
            )} */}

            {/* Show Test page (you can remove this later) */}
            <NavLink to="/test" className="nav-link">
                <TestTubeDiagonalIcon size={15} strokeWidth={2} /> Test
            </NavLink>

            {/* Show Login or User Info + Logout */}
            {isAuthenticated ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <UserIcon size={20} strokeWidth={2} />
                        {user.name}
                    </span>
                    <button onClick={handleLogout} className="nav-link" style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
                        <LogOutIcon size={24} strokeWidth={2} />
                    </button>
                </div>
            ) : (
                <NavLink to="/login" className="nav-link">
                    <LogInIcon size={24} strokeWidth={2} />
                </NavLink>
            )}
        </nav>
        </>
    );
}

export default NavBar;