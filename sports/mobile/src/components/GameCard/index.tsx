import React from "react";
import {
  Text,
  TouchableOpacity,
  ImageBackground,
  ImageSourcePropType,
  TouchableOpacityProps,
} from "react-native";

import { styles } from "./styles";
import { THEME } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
export interface GameCardProps {
  id: string;
  bannerUrl: string;
  title: string;
  adsCount: number;
  _count: {
	ads: number;
  };
}

interface Props extends TouchableOpacityProps {
  data: GameCardProps;
}

export function GameCard({ data, ...rest }: Props) {
  return (
    <TouchableOpacity style={styles.container} {...rest}>
      <ImageBackground style={styles.cover} source={{uri:data.bannerUrl}}>
        <LinearGradient colors={THEME.COLORS.FOOTER} style={styles.footer}>
          <Text style={styles.name}>{data.title}</Text>

          <Text style={styles.ads}>{data._count.ads} anúcios</Text>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
}
