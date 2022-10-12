import { BrowserRouter as Router } from 'react-router-dom';
import {AuthProvider} from './context/auth';
import { Rotas } from './routes';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Rotas />
			</Router>
		</AuthProvider>
	);
}

export default App;
