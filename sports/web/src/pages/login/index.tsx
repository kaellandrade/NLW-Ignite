import { DiscordLogo, GameController } from 'phosphor-react';
import logo from '../../assets/logo-nlw-esports.svg';
import { ButtonNlw } from '../../components/Button';

export function Login() {
	return (
		<div className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[600px] shadow-lg shadow-black/25 text-center">
			<img src={logo} alt="" className='m-auto'/>
			<h2 className="text-2xl text-white font-black mt-20 my-20">
				Faça login com Discord para acessar todos os benefícios!
			</h2>
			<ButtonNlw
				className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3
				 hover:bg-violet-600 text-white m-auto"
				title="vamos nessa!"
			>
				<DiscordLogo size={32} />
			</ButtonNlw>
		</div>
	);
}
