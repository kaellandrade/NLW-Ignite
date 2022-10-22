import { X } from 'phosphor-react';
import { ButtonNlw } from './Button';
import { toast } from 'react-toastify';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useContext } from 'react';
import AuthContext, { Auth, Context } from '../context/auth';
import {CONFIG_TOAST} from "../constants";

interface Props {
	name: string;
	urlAvatar: string;
	user: string;
}

export function ProfileDiscord(props: Props) {
	const context = useContext(AuthContext) as Context;

	const copyDiscord = () => {
		toast.success('Nick copiado', CONFIG_TOAST);
	};
	const logout = () => {
		context.logout();
		toast.info('Desconectado!', CONFIG_TOAST);
	};
	return (
		<div className="flex bg-[#2A2634] p-2 absolute left-0 right-0 top-0 justify-between">
			<CopyToClipboard
				text={`${props.name}${props.user}`}
				onCopy={copyDiscord}
			>
				<div className="flex relative justify-center items-center px-4 hover:bg-[#3e434a] rounded-md cursor-pointer">
					<div className="mr-5 relative">
						<img
							className="rounded-full w-10 "
							src={props.urlAvatar}
							alt=""
						/>
						<div className="w-3 h-3 bg-[#00a562] rounded-full absolute bottom-0 left-18 right-0 border-2 border-[#292b2f]" />
					</div>
					<div>
						<h6 className="text-[#d3d4d5] font-black">
							{props.name}
						</h6>
						<span className="text-zinc-400">{props.user}</span>
					</div>
				</div>
			</CopyToClipboard>
			<ButtonNlw
				title=""
				className="text-[#d3d4d5] px-2 h-12 font-semibold items-center
                hover:bg-[#3d4248] rounded-md"
				onClick={logout}
			>
				<X size={32} />
			</ButtonNlw>
		</div>
	);
}
