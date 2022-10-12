import React, { createContext, useState } from 'react';
import api from '../../api/api';
export interface Auth {
	signed?: Boolean;
	loginError?: string;
	token?: string;
	name?: string;
	nick?: string;
	access_token: String;
	expires_in: Number | null;
	refresh_token: String;
}

const AuthContext = createContext({});
const INITIAL_STATE = {
	access_token: '',
	expires_in: null,
	refresh_token: '',
	signed: false,
	name: '',
	nick: '',
} as Auth;

export const AuthProvider: React.FC = ({ children }) => {
	const [state, setState] = useState(INITIAL_STATE);

	const setLogin = (teste: string) => setState(teste);

	const login = (code: string) => {
		handdleAuth(code);
	};

	const handdleAuth = async (code: string) => {
		// TODO: recuperar nome
		try {
			const { data } = await api.post(`login?code=${code}`);
			setLogin({ ...data, signed: true });
			// TODO: Recuperando avatar => https://cdn.discordapp.com/avatars/942844784987496488/ce90a085ea17354a33d3677e3737549b.jpg
			api.defaults.headers.Authorization = `Bearer ${data.access_token}`;
			const dadosReqPerfil = await api.get(
				'https://discord.com/api/users/@me'
			);
			console.log(dadosReqPerfil.data);
		} catch (error) {
			setLogin({ signed: false });
			console.log('Error!');
		}
	};

	return (
		<AuthContext.Provider
			value={{
				state,
				login,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
