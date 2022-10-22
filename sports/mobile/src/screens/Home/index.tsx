import React, {useEffect, useState} from "react";
import API from "../../../api/api";
import {SafeAreaView, Image, FlatList, View} from "react-native";

import logoImg from "../../assets/logo-nlw-esports.png";
import {Heading} from "../../components/Heading";

import {styles} from "./styles";
import {GameCard, GameCardProps} from "../../components/GameCard";
import {Background} from "../../components/Background";
import {useNavigation} from "@react-navigation/native";

export function Home() {
	const [games, setGames] = useState<GameCardProps[]>([]);
	const navigation = useNavigation();

	function handleOpengame({id, title, bannerUrl}: GameCardProps) {
		navigation.navigate("game", {id, title, bannerUrl});
	}

	useEffect(function () {
		const getAllGames = async () => {
			const allGames = await API.get("/games");
			setGames(allGames.data);
		};
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
