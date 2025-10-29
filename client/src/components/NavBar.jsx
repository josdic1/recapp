import { NavLink } from "react-router-dom";
import { LogInIcon, LogOutIcon, LayoutDashboardIcon, TestTubeDiagonalIcon, UserIcon } from "lucide-react";
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
            <NavLink to="/" className="nav-link">
                Home
            </NavLink>

            {/* Show Dashboard only if logged in */}
            {isAuthenticated && (
                <NavLink to="/dashboard" className="nav-link">
                    <LayoutDashboardIcon size={24} strokeWidth={2} />
                </NavLink>
            )}

            {/* Show Test page (you can remove this later) */}
            <NavLink to="/test" className="nav-link">
                <TestTubeDiagonalIcon size={24} strokeWidth={2} />
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