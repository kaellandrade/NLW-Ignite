import { DiscordLogo, GameController } from 'phosphor-react';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../../../api/api';
import logo from '../../assets/logo-nlw-esports.svg';
import { ButtonNlw } from '../../components/Button';
import AuthContext from '../../context/auth';

export function Login() {
	const context = useContext(AuthContext);
	const [searchParams] = useSearchParams();
	const code = searchParams.get('code');
	useEffect(() => {
		if (code) {
			context.login(code);
		}
	}, [code]);

	const discordLogin = (event: FormEvent) => {
		event.preventDefault();
		window.open(
			'https://discord.com/api/oauth2/authorize?client_id=1028716796179660914&redirect_uri=http%3A%2F%2Flocalhost%3A5173&response_type=code&scope=identify',
			'_top'
		);
	};

	return (
		<div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[600px] shadow-lg shadow-black/25 text-center">
			<form action="">
				<img src={logo} alt="" className="m-auto" />
				<h2 className="text-2xl text-white font-black mt-20 my-20">
					Faça login com Discord para acessar todos os benefícios!
				</h2>
				<ButtonNlw
					className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3
				hover:bg-violet-600 text-white m-auto"
					title="vamos nessa!"
					onClick={discordLogin}
				>
					<DiscordLogo size={32} />
				</ButtonNlw>
			</form>
		</div>
	);
}
