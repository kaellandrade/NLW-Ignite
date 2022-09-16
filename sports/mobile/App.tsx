import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, Touchable, TouchableOpacity, View} from 'react-native';

interface ButtonProps {
	title: string
}

function Button(props: ButtonProps) {
	return <TouchableOpacity>
		<Text>
			{props.title}
		</Text>
	</TouchableOpacity>
}


export default function App() {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>Hello, World!</Text>
			<StatusBar style="auto"/>
			<Button title='Clique aqui'/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#093085',
		alignItems: 'center',
		justifyContent: 'center',
	},
	text: {
		backgroundColor:'red',
		color: 'white',
		fontWeight: 'bold'
	}
});
