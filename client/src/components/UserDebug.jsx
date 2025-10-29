import { useUser } from '../providers';

function UserDebug() {
    const { user, isAuthenticated } = useUser();
    
    console.log('UserDebug:', { isAuthenticated, user });

    return (
        <div style={{ 
            border: '2px solid red', 
            padding: '20px', 
            margin: '20px',
            background: 'yellow',
            color: 'black',
            fontSize: '18px'
        }}>
            <h3>🔍 User Debug</h3>
            <p>Authenticated: {isAuthenticated ? '✅ YES' : '❌ NO'}</p>
            <p>User: {user ? user.name : '(none)'}</p>
        </div>
    );
}

export default UserDebug;