import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/auth';
import { Rotas } from './routes';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

function App() {
	return (
		<AuthProvider>
			<Router>
				<ToastContainer autoClose={8000} />
				<Rotas />
			</Router>
		</AuthProvider>
	);
}

export default App;
