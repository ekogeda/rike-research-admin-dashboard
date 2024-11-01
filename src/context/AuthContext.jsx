import { createContext, useState, useEffect } from 'react';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {
	const [token, setToken] = useState(() => {
		const savedToken = localStorage.getItem('token');
		return savedToken ? JSON.parse(savedToken) : null;
	});

	const [user, setUser] = useState(() => {
		const savedUser = localStorage.getItem('user');
		return savedUser ? JSON.parse(savedUser) : null;
	});

	useEffect(() => {
		if (token) {
			localStorage.setItem('token', JSON.stringify(token));
		} else {
			localStorage.removeItem('token');
		}
	}, [token]);

	useEffect(() => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
	}, [user]);

	const userToken = (uToken) => setToken(uToken);

	const login = (userData) => setUser(userData);

	const logout = () => {
		setUser(null);
		setToken(null);
	};

	return <AuthContext.Provider value={{ userToken, user, login, logout }}>{children}</AuthContext.Provider>;
};
