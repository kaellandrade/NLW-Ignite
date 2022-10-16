import React, { createContext, useState } from 'react';
import api from '../../api/api';
const AuthContext = createContext({});

export interface Auth {
	signed?: Boolean;
	loginError?: string;
	token?: string;
	access_token: String;
	expires_in: Number | null;
	refresh_token: String;
	user?: User | null;
}

export interface User {
	username?: string;
	avatar?: String;
	id?: string;
	discriminator?: string;
}

export interface Context {
	state: Auth;
	login: (code: string) => void;
	setLogin: (estado: Auth) => void;
	logout: () => void;
}

const INITIAL_STATE = {
	access_token: '',
	expires_in: null,
	refresh_token: '',
	signed: false,
	user: null,
} as Auth;

export const AuthProvider: React.FC = ({ children }) => {
	const [state, setState] = useState<Auth>(INITIAL_STATE);

	const setLogin = (estado: Auth) => {
		setState(estado);
	};

	const login = (code: string) => {
		handdleAuth(code);
	};
	const logout = () => {
		setState(INITIAL_STATE);
		sessionStorage.clear();
	};

	const handdleAuth = async (code: string) => {
		try {
			const { data } = await api.post(`login?code=${code}`);
			api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
			const dadosReqPerfil = await api.get(
				'https://discord.com/api/users/@me'
			);

			setLogin({ ...data, signed: true, user: dadosReqPerfil.data });
			sessionStorage.setItem(
				'state',
				JSON.stringify({
					...data,
					signed: true,
					user: dadosReqPerfil.data,
				})
			);
		} catch (error) {
			setLogin({ ...state, signed: false });
			console.log('Error!');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				login,
				setLogin,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
