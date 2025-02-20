import { Auth0Provider } from '@auth0/auth0-react';
import AuthHandler from './AuthHandler';

const AuthProvider = ({ children }) => {
    return (
        <Auth0Provider
            domain="dev-szphg2t1eedemu6z.us.auth0.com"
            clientId="fpBzSKCLhE3MUNiiLc1OVigdofc2P4oy"
            authorizationParams={{
                redirect_uri: window.location.origin, 
            }}
        >
            {children}
            <AuthHandler />
        </Auth0Provider>
    );
};

export default AuthProvider;
