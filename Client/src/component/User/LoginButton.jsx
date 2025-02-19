import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithPopup } = useAuth0();

    return <button onClick={() => loginWithPopup()}>Sign in with Google/Facebook</button>;
};

export default LoginButton;
