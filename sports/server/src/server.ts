import url from 'url';
import axios from 'axios';
import express from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import {
	convertHoursStringToMinutes,
	convertMinutesToString,
} from './utils/convertTime';
const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
	log: ['query'],
});

app.get('/games', async (request, response) => {
	const game = await prisma.game.findMany({
		include: {
			_count: {
				select: {
					ads: true,
				},
			},
		},
	});
	return response.json(game);
});

app.post('/games/:id/ads', async (request, response) => {
	const gameId = request.params.id;
	const body: any = request.body;

	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays,
			hourStart: convertHoursStringToMinutes(body.hourStart),
			hourEnd: convertHoursStringToMinutes(body.hourEnd),
			useVoiceChannel: body.useVoiceChannel,
		},
	});

	return response.status(201).json(ad);
});

app.get('/games/:gameId/ads', async (request, response) => {
	const { gameId } = request.params;

	const ads = await prisma.ad.findMany({
		where: { gameId },
		select: {
			id: true,
			name: true,
			weekDays: true,
			useVoiceChannel: true,
			yearsPlaying: true,
			hourStart: true,
			hourEnd: true,
		},
		orderBy: {
			createdAt: 'desc',
		},
	});

	return response.json(
		ads.map((ad) => {
			return {
				...ad,
				hourStart: convertMinutesToString(ad.hourStart),
				hourEnd: convertMinutesToString(ad.hourEnd),
			};
		})
	);
});

app.post('/games/:id/ads', async (request, response) => {
	const gameId = request.params.id;
	const body: any = request.body;

	const ad = await prisma.ad.create({
		data: {
			gameId,
			name: body.name,
			yearsPlaying: body.yearsPlaying,
			discord: body.discord,
			weekDays: body.weekDays,
			hourStart: convertHoursStringToMinutes(body.hourStart),
			hourEnd: convertHoursStringToMinutes(body.hourEnd),
			useVoiceChannel: body.useVoiceChannel,
		},
	});

	return response.status(201).json(ad);
});

app.post('/login', async (request, response) => {
	const { code } = request.query;
	if (code) {
		try {
			const formData = new url.URLSearchParams({
				client_id: '1028716796179660914',
				client_secret: 'Q_A0kjJOvkP3AoVuKS07R_pfSh6fclQQ',
				code: code.toString(),
				grant_type: 'authorization_code',
				redirect_uri: 'http://localhost:5173',
				scope: 'identify',
			});
			const res = await axios.post(
				'https://discord.com/api/oauth2/token',
				formData.toString(),
				{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				}
			);
			return response.json(res.data);
		} catch (error: any) {
			return response.send(error.toJSON());
		}
	}
});

app.listen(3333);
