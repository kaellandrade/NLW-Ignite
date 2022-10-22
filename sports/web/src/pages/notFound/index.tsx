import ErrorPage404 from '../../assets/error404.gif';
import {ArrowLeft} from "phosphor-react";
import logo from '../../assets/logo-nlw-esports.svg';
import {Link} from "react-router-dom";

export function NotFound() {
	return <div className='flex justify-center m-3'>

		<img src={logo} alt="Logo ESports"/>
		<div
			className="items-center	rounded-lg bg-white fixed flex py-18 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg shadow-black/25">
			<div className="bg-white rounded-l-lg w-[600px] text-center">
				<h2 className="text-2xl text-[#5865f2] font-black mt-20 my-20">
					IHHHH, TÁ PERDIDO(A)?
				</h2>
				<p className="text-zinc-700">
					Você parece perdido(a), forasteiro(a). Sabe o que ajuda quando se está perdido?
					Uma tigela fumegante de macarrão. Sente-se, estamos trabalhando a todo vapor em uma coisa legal.
				</p>
			</div>
			<div>
				<img className='rounded-r-lg' src={ErrorPage404} alt=""/>
			</div>
			<Link to="home" className="fixed px-4 text-[#5865f2] py-4 flex items-center gap-3 top-0 left-0">
				<ArrowLeft size={32}/> Página inicial
			</Link>
		</div>
	</div>
}
