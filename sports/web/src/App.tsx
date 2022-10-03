import * as Dialog from '@radix-ui/react-dialog';
import './styles/main.css';
import API from '../api/api';
import logo from './assets/logo-nlw-esports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import { useEffect, useState } from 'react';

interface Game {
	id: string;
	bannerUrl: string;
	title: string;
	adsCount: number;
	_count: {
		ads: number;
	};
}

function App() {
	const [games, setGames] = useState<Game[]>([]);

	useEffect(function () {
		const getAllGames = async () => {
			const allGames = await API.get('/games');
			setGames(allGames.data);
		};
		getAllGames();
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
			<img src={logo} alt="" />
			<h1 className="text-6xl text-white font-black mt-20">
				Seu
				<span className="text-transparent bg-nlw-gradient bg-clip-text">
					duo
				</span>
				está aqui.
			</h1>

			<div className="grid grid-cols-6 gap-6 mt-16">
				{games.map((game: Game) => (
					<GameBanner
						title={game.title}
						bannerUrl={game.bannerUrl}
						adsCount={game._count.ads}
						key={game.id}
					/>
				))}
			</div>
			<Dialog.Root>
				<CreateAdBanner />
				<CreateAdModal />
			</Dialog.Root>
		</div>
	);
}

export default App;
