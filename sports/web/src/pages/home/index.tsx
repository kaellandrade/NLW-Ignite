import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCards } from 'swiper';

import * as Dialog from '@radix-ui/react-dialog';
import '../../styles/main.css';
import API from '../../../api/api';
import logo from '../../assets/logo-nlw-esports.svg';
import { GameBanner } from '../../components/GameBanner';
import { CreateAdBanner } from '../../components/CreateAdBanner';
import { CreateAdModal } from '../../components/CreateAdModal';
import { useContext, useEffect, useState } from 'react';
import AuthContext, { Context } from '../../context/auth';
import { ProfileDiscord } from '../../components/ProfileDiscord';

interface Game {
	id: string;
	bannerUrl: string;
	title: string;
	adsCount: number;
	_count: {
		ads: number;
	};
}

export function Home() {
	const getAllGames = async () => {
		const allGames = await API.get('/games');
		setGames(allGames.data);
	};
	const [games, setGames] = useState<Game[]>([]);
	const context = useContext(AuthContext) as Context;
	const { username, avatar, id, discriminator } = context.state.user;
	const [open, setOpen] = useState(false);

	useEffect(function () {
		getAllGames();
	}, []);

	return (
		<div className="max-w-[1344px] mx-auto flex flex-col items-center">
			<ProfileDiscord
				name={username}
				urlAvatar={`https://cdn.discordapp.com/avatars/${id}/${avatar}.jpg`}
				user={`#${discriminator}`}
			/>
			<img src={logo} alt="" className='mt-20'/>
			<h1 className="text-4xl text-white font-black mt-10">
				Seu duo está aqui.
			</h1>
			<Swiper
				effect={'cards'}
				grabCursor={true}
				modules={[EffectCards]}
				className="mySwiper my-10"
			>
				{games.map((game: Game) => (
					<SwiperSlide key={game.id}>
						<GameBanner
							title={game.title}
							bannerUrl={game.bannerUrl}
							adsCount={game._count.ads}
							key={game.id}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Dialog.Root open={open} onOpenChange={setOpen}>
				<CreateAdBanner />
				<CreateAdModal getAllGames={getAllGames} setOpen={setOpen}/>
			</Dialog.Root>
		</div>
	);
}
