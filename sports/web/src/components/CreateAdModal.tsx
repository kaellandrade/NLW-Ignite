import * as Dialog from '@radix-ui/react-dialog';
import * as CheckBox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { CaretDown, CaretUp, Check, GameController } from 'phosphor-react';
import { Input } from './Form/input';
import { FormEvent, useEffect, useState } from 'react';
import { WEEK_DAYS } from '../constants';
import API from '../../api/api';
import axios from 'axios';
interface Game {
	id: string;
	title: string;
}

export function CreateAdModal() {
	const [games, setGames] = useState<Game[]>([]);
	const [weekdays, setDays] = useState<string[]>([]);

	useEffect(function () {
		const getAllGames = async () => {
			const allGames = await API.get('/games');
			setGames(allGames.data);
		};
		getAllGames();
	}, []);

	function handleCreateAd(event: FormEvent) {
		// Validar

		event.preventDefault();
		const formData = new FormData(event.target as HTMLFormElement);
		const data = Object.fromEntries(formData);
		const weekDaysObj = weekdays
			.map((item) => {
				return {
					[WEEK_DAYS[Number(item)].toLocaleLowerCase()]: item,
				};
			})
			.reduce((pre, cur) => {
				return { ...pre, ...cur };
			}, {});
		try {
			API.post(`/games/${data.game}/ads`, {
				name: data.name,
				yearsPlaying: Number(data.yearsPlaying),
				discord: data.discord,
				weekDays: weekDaysObj,
				hourStart: data.hourStart,
				hourEnd: data.hoursEnd,
				useVoiceChannel: Boolean(data.useVoiceChannel),
			});
			alert('Anúcio criado com sucesso!');
		} catch (error) {
			alert(error);
		}
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="bg-black/60 inset-0 fixed" />
			<Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[600px] shadow-lg shadow-black/25">
				<Dialog.Title className="text-3xl text-white font-black">
					Publique um anúncio.
				</Dialog.Title>
				<form
					className="mt-8 flex flex-col gap-4"
					onSubmit={handleCreateAd}
				>
					<div className="flex flex-col gap-2 rounded p-1 bg-zinc-900 content-center ">
						<Select.Root name="game">
							<Select.SelectTrigger
								aria-label="Games"
								className="flex text-sm text-white4 py-3 px-4 rounded justify-between"
							>
								<Select.SelectValue
									className="text-sm"
									placeholder="Selecione o game que deseja jogar"
								/>
								<Select.Icon>
									<CaretDown size={20} />
								</Select.Icon>
							</Select.SelectTrigger>
							<Select.SelectPortal>
								<Select.Content className="rounded p-1 bg-violet-500">
									<Select.ScrollUpButton className="flex items-center content-center h-6">
										<CaretUp size={20} />
									</Select.ScrollUpButton>
									<Select.Viewport className="p-3">
										{games.map((game: Game) => (
											<Select.Item
												value={game.id}
												className="flex cursor-pointer text-sm text-white font-thin rounded items-center p-1 relative hover:bg-violet-600"
												key={game.id}
											>
												<Select.ItemText>
													{game.title}
												</Select.ItemText>
												<Select.ItemIndicator className="font-semibold w-7 items-center content-center inline-flex text-violet-900">
													<Check size={20} />
												</Select.ItemIndicator>
											</Select.Item>
										))}
									</Select.Viewport>
									<Select.ScrollDownButton className="flex items-center content-center h-6">
										<CaretDown size={20} />
									</Select.ScrollDownButton>
								</Select.Content>
							</Select.SelectPortal>
						</Select.Root>
					</div>
					<div className="flex flex-col gap-2">
						<label htmlFor="name">Seu nome (ou nickname)</label>
						<Input
							id="name"
							name="name"
							placeholder="Como te chamam dentro do game ?"
						/>
					</div>
					<div className="grid grid-cols-2 gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="yearsPlaying">
								Joga há quantos anos ?
							</label>
							<Input
								type="number"
								id="yearsPlaying"
								name="yearsPlaying"
								placeholder="Tudo bem ser ZERO"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<label htmlFor="discord">Qual seu Discord ?</label>
							<Input
								type="text"
								id="discord"
								name="discord"
								placeholder="Usuario#0000"
							/>
						</div>
					</div>

					<div className="flex gap-6">
						<div className="flex flex-col gap-2">
							<label htmlFor="weekDays">
								Quando constuma jogar ?
							</label>
							<div className="">
								<ToggleGroup.Root
									type="multiple"
									className="flex gap-2"
									onValueChange={setDays}
								>
									{WEEK_DAYS.map((day, index) => (
										<ToggleGroup.Item
											name="weekday"
											value={String(index)}
											title={day}
											className={`w-8 h-8 rounded ${
												weekdays.includes(String(index))
													? 'bg-violet-600'
													: 'bg-zinc-900'
											}`}
										>
											{day.slice(0, 1).toUpperCase()}
										</ToggleGroup.Item>
									))}
								</ToggleGroup.Root>
							</div>
						</div>
						<div className="flex flex-col gap-2 flex-1">
							<label htmlFor="hourStart">
								Qual horário do dia?
							</label>
							<div className="grid grid-cols-2 gap-2">
								<Input
									type="time"
									id="hourStart"
									placeholder="De"
									name="hourStart"
								/>
								<Input
									type="time"
									id="hoursEnd"
									placeholder="Até"
									name="hoursEnd"
								/>
							</div>
						</div>
					</div>

					<div className="mt-2 flex gap-2 text-sm items-center">
						<CheckBox.Root
							className="w-6 h-6 rounded p-1 bg-zinc-900"
							id="useVoiceChannel"
							name="useVoiceChannel"
							value={'on'}
						>
							<CheckBox.Indicator>
								<Check className="w-4 h-4 text-emerald-400" />
							</CheckBox.Indicator>
						</CheckBox.Root>
						<label
							htmlFor="useVoiceChannel"
							className="cursor-pointer"
						>
							Costumo me conectar ao chat de voz
						</label>
					</div>

					<footer className="mt-4 flex justify-end gap-4">
						<Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600">
							Cancelar
						</Dialog.Close>
						<button
							className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600"
							type="submit"
						>
							<GameController size={24} /> Encontrar duo
						</button>
					</footer>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}
