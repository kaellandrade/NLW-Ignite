import * as Clipboard from 'expo-clipboard';
import {Button, useToast, Center, Box} from 'native-base';
import {ActivityIndicator, Modal, ModalProps, Text, TouchableOpacity, View} from "react-native";
import {styles} from './styles';
import {MaterialIcons} from '@expo/vector-icons';
import {CheckCircle} from 'phosphor-react-native';
import {THEME} from "../../theme";
import {Heading} from "../Heading";
import {useState} from "react";

interface Props extends ModalProps {
	discord: string;
	onClose: () => void;
}


export function DuoMatch({discord, onClose, ...rest}: Props) {
	const [isCopping, setIsCopping] = useState<boolean>(false);
	const toast = useToast();

	async function handleCopyDiscordToClipboard() {
		setIsCopping(true);
		await Clipboard.setStringAsync(discord);
		toast.show({
			render: () => {
				return <Box bg={THEME.COLORS.TEXT} px="4" py="1" rounded="sm" mb={5}>
					<View style={{flex:1, flexDirection:'row', justifyContent:'space-evenly'}}>
						<CheckCircle size={25} color={THEME.COLORS.SUCCESS} weight="bold"/>
						<Text style={styles.toast}>
							Discord copiado!
						</Text>
					</View>
				</Box>;
			}
		});
		setIsCopping(false);
		onClose();
	}


	return (
		<Modal statusBarTranslucent transparent {...rest} animationType="fade">
			<View style={styles.container}>
				<View style={styles.content}>
					<TouchableOpacity style={styles.closeIcon} onPress={onClose}>
						<MaterialIcons name="close" size={20} color={THEME.COLORS.CAPTION_500}/>
					</TouchableOpacity>
					<CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight="bold"/>
					<Heading
						title="Let's play!"
						subtitle="Agora é só começar a jogar!"
						style={{alignItems: "center", marginTop: 24}}
					/>
					<Text style={styles.label}>
						Adicione no Discord
					</Text>
					<TouchableOpacity disabled={isCopping} onPress={handleCopyDiscordToClipboard} style={styles.discordButton}>
						<Text style={styles.discord}>
							{ isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
						</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}
