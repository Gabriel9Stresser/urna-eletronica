import { createContext, useState, useContext, useEffect } from 'react';

import { User, AuthProviderProps, IAuthContextData } from '../../types/global';

const AuthContext = createContext({} as IAuthContextData);

const getUser = () => {
	return JSON.parse(localStorage.getItem('user')) || null;
};

function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User>({} as User);

	useEffect(() => {
		const userFromLocalStorage = window.localStorage.getItem('user') || null;
		if (userFromLocalStorage && userFromLocalStorage !== 'undefined') {
			const userJson = JSON.parse(userFromLocalStorage) as User;
			setUser(userJson);
		}
	}, []);

	const setData = async (response: User) => {
		window.localStorage.setItem('user', JSON.stringify(response));
		setUser(response);
	};

	const removeData = () => {
		window.localStorage.removeItem('user');
		setUser({} as User);
	};

	return (
		<AuthContext.Provider value={{ user, removeData, setData }}>
			{children}
		</AuthContext.Provider>
	);
}

function useAuth() {
	const context = useContext(AuthContext);

	return context;
}

export { AuthProvider, useAuth, getUser };
