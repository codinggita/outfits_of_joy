import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const AuthHandler = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();

    useEffect(() => {
        if (!isLoading && isAuthenticated && user) {
            const saveUserToDB = async () => {
                try {
                    const response = await fetch('https://outfits-of-joy.onrender.com/outfits-of-joy/users', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firstName: user.given_name || '',
                            lastName: user.family_name || '',
                            email: user.email,
                            phone: '',
                            address: '',
                        }),
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data = await response.json();
                } catch (error) {
                    console.error('Error saving user:', error);
                }
            };

            saveUserToDB();
        }
    }, [isLoading, isAuthenticated, user]);

    return null;
};

export default AuthHandler;
