import { useState, useEffect } from 'react';

const useAuth = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		// Fetch user data or handle authentication
		const fetchUser = async () => {
			// Assume fetchUserAPI is a function to get user data
			const userData = await fetchUserAPI();
			setUser(userData);
		};

		fetchUser();
	}, []);

	return user;
};

export default useAuth;
