import {useNavigation, useRoute} from "@react-navigation/native";
import {
	FlatList,
	Image,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import {Entypo} from "@expo/vector-icons";

import {Gameparams} from "../../@types/navigation";
import {Background} from "../../components/Background";
import logoImg from "../../assets/logo-nlw-esports.png";

import {styles} from "./styles";
import {THEME} from "../../theme";
import {Heading} from "../../components/Heading";
import {DuoCard, DuoCardPros} from "../../components/DuoCard";
import {useEffect, useState} from "react";
import API from "../../../api/api";
import {DuoMatch} from "../../components/DuoMatch";

export function Game() {
	const [duos, setDuos] = useState<DuoCardPros[]>([]);
	const [discordDuoSelected, setDiscordDuoSelected] = useState<string>('');

	const route = useRoute();
	const game = route.params as Gameparams;
	const navigation = useNavigation();

	function handleGoBack() {
		navigation.goBack();
	}

	async function getDiscordUser(adsId: string) {
		const resp = await API.get(`/ads/${adsId}/discord`);
		setDiscordDuoSelected(resp.data.discord);
	}

	useEffect(function () {
		const getAds = async () => {
			const ads = await API.get(`/games/${game.id}/ads`);
			setDuos(ads.data);
		};
		getAds();
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleGoBack}>
						<Entypo
							name="chevron-thin-left"
							color={THEME.COLORS.CAPTION_300}
							size={20}
						/>
					</TouchableOpacity>
					<Image source={logoImg} style={styles.logo}/>
					<View style={styles.right}/>
				</View>
				<Image
					resizeMode="cover"
					source={{uri: game.bannerUrl}}
					style={styles.cover}
				/>
				<Heading title={game.title} subtitle="Conecte-se e comece a jogar!"/>

				<FlatList
					data={duos}
					keyExtractor={(item) => item.id}
					renderItem={({item}) => (
						<DuoCard onConnect={_ => getDiscordUser(item.id)} data={item}/>
					)}
					horizontal
					contentContainerStyle={[
						duos.length > 0 ? styles.contentList : styles.emptyListContent,
					]}
					style={styles.containerList}
					showsHorizontalScrollIndicator={false}
					ListEmptyComponent={() => (
						<Text style={styles.emptyList}>
							N??o h?? an??ncios publicados ainda.
						</Text>
					)}
				/>
				<DuoMatch onClose={() => setDiscordDuoSelected('')} discord={discordDuoSelected}
						  visible={discordDuoSelected.length > 0}/>
			</SafeAreaView>
		</Background>
	);
}
