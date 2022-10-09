import { SwiperSlide } from 'swiper/react';

interface GameBannerProps {
	id?: string;
	bannerUrl: string;
	title: string;
	adsCount: number;
}

export function GameBanner(props: GameBannerProps) {
	return (
		<a href="" className="relative">
			<img src={props.bannerUrl} alt="" />

			<div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0 rounded-lg overflow-hidden">
				<strong className="font-bold text-white block">
					{props.title}
				</strong>
				<span className="text-zinc-300 block">
					{props.adsCount} anúncio(s)
				</span>
			</div>
		</a>
	);
}
