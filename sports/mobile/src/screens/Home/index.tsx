import React, {useEffect, useState} from "react";
import API from "../../../api/api";
import {SafeAreaView, Image, FlatList, View, RefreshControl} from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import {Heading} from "../../components/Heading";

import {styles} from "./styles";
import {GameCard, GameCardProps} from "../../components/GameCard";
import {Background} from "../../components/Background";
import {useNavigation} from "@react-navigation/native";
import {THEME} from "../../theme";

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([]);
	const [refreshing, setRefreshing] = useState<boolean>(false);

	const navigation = useNavigation();

	function handleOpengame({id, title, bannerUrl}: GameCardProps) {
		navigation.navigate("game", {id, title, bannerUrl});
	}

	const getAllGames = async () => {
		setRefreshing(true);
		const allGames = await API.get("/games");
		setGames(allGames.data);
		setRefreshing(false);

	};

	useEffect(function () {
		getAllGames();
	}, []);

	return (
		<Background>
			<SafeAreaView style={styles.container}>
				<Image source={logoImg} style={styles.logo}/>
				<Heading
					title="Encontre seu duo!"
					subtitle="Selecione o game que deseja jogar..."
				/>
				<FlatList
					refreshControl={
						<RefreshControl
							colors={[THEME.COLORS.PRIMARY]}
							onRefresh={getAllGames}
							refreshing={refreshing}
						/>
					}
					data={games}
					renderItem={({item}) => (
						<GameCard onPress={(_) => handleOpengame(item)} data={item}/>
					)}
					keyExtractor={(item) => item.id}
					numColumns={3}
					showsVerticalScrollIndicator={false}
				/>
			</SafeAreaView>
		</Background>
	);
}
